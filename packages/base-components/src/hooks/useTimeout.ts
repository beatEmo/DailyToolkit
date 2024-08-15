import { useCallback, useEffect, useRef } from "react";

const useTimeout = (fn: () => void, delay?: number) => {
  // useRef 保存回调函数，每次调用都会更新这个函数，避免闭包陷阱（函数里引用之前的 state）
  const fnRef = useRef<() => void>(fn);

  fnRef.current = fn;

  const timerRef = useRef<number>();

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(fnRef.current, delay);

    return clear;
  }, [clear, delay]);

  return clear;
};

export default useTimeout;
