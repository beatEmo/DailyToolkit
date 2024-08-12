import { forwardRef, useEffect, useMemo, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

/**
 * attach: 要挂载到的dom节点 默认是document.body
 * children: 要渲染的子组件
 */
export interface PortalProps {
  attach?: HTMLElement | string;
  children: React.ReactNode;
}

// 使用forwardRef包裹组件，使其可以被ref属性引用
const Portal = forwardRef((props: PortalProps, ref) => {
  const { attach = document.body, children } = props;

  // 组件一初始化就 创建存放要渲染的子组件的容器
  const container = useMemo(() => {
    const el = document.createElement("div");
    el.className = `portal-wrapper`;
    return el;
  }, []);
  // 一旦传入的attach发生变化 就销毁之前的容器 并创建新的容器
  useEffect(() => {
    const parentElement = getAttach(attach);
    parentElement?.appendChild?.(container);

    return () => {
      parentElement?.removeChild?.(container);
    };
  }, [container, attach]);

  // 自定义父组件通过ref获取的内容
  useImperativeHandle(ref, () => container);
  // 调用createPortal 渲染子组件
  return createPortal(children, container);
});

export default Portal;

export function getAttach(attach: PortalProps["attach"]) {
  if (typeof attach === "string") {
    return document.querySelector(attach);
  }
  if (typeof attach === "object" && attach instanceof window.HTMLElement) {
    return attach;
  }
  return document.body;
}
