import React, { CSSProperties, useEffect, useRef, useState } from "react";

interface LazyLoadProps {
  className?: string;
  style?: CSSProperties;
  placeholder?: React.ReactNode;
  offset?: number | string;
  width?: number | string;
  height?: number | string;
  onContentVisible?: () => void;
  children: React.ReactNode;
}

const LazyLoad: React.FC<LazyLoadProps> = (props) => {
  const {
    className = "",
    style,
    placeholder,
    offset = 0,
    width,
    height,
    onContentVisible,
    children,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);

  /**
   * 触发交叉比监听回调函数
   * 1. 将visible设置为true 显示子组件
   * 2. 执行props.onContentVisible回调函数
   * 3. 停止监听
   */
  function lazyloadHandler(entries: IntersectionObserverEntry[]) {
    const [entry] = entries;
    const { isIntersecting } = entry;

    if (isIntersecting) {
      setVisible(true);
      onContentVisible && onContentVisible();

      const node = containerRef.current;
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node);
      }
    }
  }

  /**
   * 创建IntersectionObserver实例
   * 因为这里不止下面组件一渲染就执行的effect中需要用到
   * 上面lazyloadHandler函数也会用到
   * 所以这里用useRef包装一下IntersectionObserver实例 保证只创建一次
   */
  //! 先当成固定写法 需要在不同作用域中共享变量所以全局定义变量时 用useRef自定义ref内容的方式
  const elementObserver = useRef<IntersectionObserver>();
  //! 先当成固定写法 除了需要顶层使用的内置hook外 组件初始化的东西都要如这般这般
  useEffect(() => {
    const options: IntersectionObserverInit = {
      rootMargin: typeof offset === "number" ? `${offset}px` : offset || "0px",
      threshold: 0,
    };

    elementObserver.current = new IntersectionObserver(
      lazyloadHandler,
      options
    );

    // 监听的dom节点存在时 开始监听
    const node = containerRef.current;
    if (node && node instanceof HTMLElement) {
      elementObserver.current.observe(node);
    }

    // 当组件卸载、刷新时 销毁上次的IntersectionObserver实例
    return () => {
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.disconnect();
        elementObserver.current?.unobserve(node);
      }
    };
  }, []);

  const styles = { height, width, ...style };

  return (
    <div ref={containerRef} style={styles} className={className}>
      {visible ? children : placeholder}
    </div>
  );
};

export default LazyLoad;
