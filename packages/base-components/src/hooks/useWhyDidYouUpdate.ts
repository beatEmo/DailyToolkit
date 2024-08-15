import { useEffect, useRef } from "react";

// 任意对象的ts类型
export type IProps = Record<string, unknown>;

export default function useWhyDidYouUpdate(
  componentName: string,
  props: IProps
) {
  // 使用ref缓存上一次的props
  const prevProps = useRef<IProps>({});
  // 只要组件渲染就会执行这个useEffect
  useEffect(() => {
    if (prevProps.current) {
      const allKeys = Object.keys({ ...prevProps.current, ...props });
      const changedProps: IProps = {};
      // 遍历props，找出变化的props 放到changedProps
      allKeys.forEach((key) => {
        if (!Object.is(prevProps.current[key], props[key])) {
          changedProps[key] = {
            from: prevProps.current[key],
            to: props[key],
          };
        }
      });
      // 如果有变化的props 打印日志
      if (Object.keys(changedProps).length) {
        console.log("[why-did-you-update]", componentName, changedProps);
      }
    }
    // 更新缓存的props
    prevProps.current = props;
  });
}
