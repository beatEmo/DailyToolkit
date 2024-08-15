import { RefObject, useEffect, useState } from "react";

const useScrolling = (ref: RefObject<HTMLElement>) => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const refCurrent = ref.current;
    if (!refCurrent) return;

    let scrollTimer: number;

    const handleScrollEnd = () => {
      setScrolling(false);
    };

    const handleScroll = () => {
      setScrolling(true);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => handleScrollEnd(), 150);
    };

    refCurrent.addEventListener("scroll", handleScroll);

    return () => {
      if (refCurrent) {
        refCurrent?.removeEventListener("scroll", handleScroll);
      }
    };
  }, [ref]);

  return scrolling;
};

export default useScrolling;
