import { cloneElement, ReactElement, useState } from "react";

export type Element = ReactElement | ((state: boolean) => ReactElement);

const useHover = (element: Element): [ReactElement, boolean] => {
  const [state, setState] = useState(false);

  // 定义两个函数 用来处理鼠标移入移出事件
  // 并且若element原先有onMouseEnter onMouseLeave事件 就先执行一下
  const handleMouseEnter =
    (originalOnMouseEnter?: unknown) => (event: unknown) => {
      if (typeof originalOnMouseEnter === "function") {
        originalOnMouseEnter?.(event);
      }
      setState(true);
    };
  const handleMouseLeave =
    (originalOnMouseLeave?: unknown) => (event: unknown) => {
      if (typeof originalOnMouseLeave === "function") {
        originalOnMouseLeave?.(event);
      }
      setState(false);
    };

  // 传入的element是函数 调用把element统一变成一个ReactElement
  if (typeof element === "function") {
    element = element(state);
  }
  // 通过cloneElement扩展传入的element 给它加上onMouseEnter onMouseLeave事件
  // 并把原有的事件函数传给新事件函数
  const el = cloneElement(element, {
    onMouseEnter: handleMouseEnter(element.props?.onMouseEnter),
    onMouseLeave: handleMouseLeave(element.props?.onMouseLeave),
  });

  return [el, state];
};

export default useHover;
