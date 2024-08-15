import { RefObject, useEffect, useState } from "react";

type Size = {
  width: number;
  height: number;
};

function useSize(ref: RefObject<HTMLElement>) {
  const [size, setSize] = useState<Size | null>(() => {
    const curRef = ref.current;
    return curRef
      ? { width: curRef.clientWidth, height: curRef.clientHeight }
      : null;
  });

  useEffect(() => {
    const curRef = ref.current;
    if (!curRef) return;

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { clientWidth, clientHeight } = entry.target;
        setSize({
          width: clientWidth,
          height: clientHeight,
        });
      });
    });

    resizeObserver.observe(curRef);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return size;
}

export default useSize;
