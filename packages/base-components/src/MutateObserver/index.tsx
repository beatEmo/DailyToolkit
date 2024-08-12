import React, { useLayoutEffect, useRef, useState } from "react";
import useMutateObserver from "./useMutateObserver";

/**
 * MutationObserver 组件
 * useMutationObserver hook已经封好 关于MutationObserver的调用可以使用hook
 * 这个组件主要是获取包裹的children元素 去监听其变化
 */

interface MutateObserverProps {
  options?: MutationObserverInit;
  onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void;
  children: React.ReactElement;
}

const MutateObserver = (props: MutateObserverProps) => {
  const { options, onMutate = () => {}, children } = props;

  const elementRef = useRef<HTMLElement>(null);

  const [target, setTarget] = useState<HTMLElement>();

  useMutateObserver(target!, onMutate, options);

  useLayoutEffect(() => {
    setTarget(elementRef.current!);
  });

  // 这种可以获取传入children的元素节点
  return React.cloneElement(children, { ref: elementRef });
};

export default MutateObserver;
