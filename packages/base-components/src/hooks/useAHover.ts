import { RefObject, useEffect, useState } from "react";

interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
  onChange?: (isHovering: boolean) => void;
}

function useAHover(ref: RefObject<HTMLElement>, options?: Options): boolean {
  const { onEnter, onLeave, onChange } = options || {};

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const curRef = ref.current;
    if (!curRef) return;

    curRef.addEventListener("mouseenter", () => {
      onEnter?.();
      setIsHovered(true);
      onChange?.(true);
    });

    curRef.addEventListener("mouseleave", () => {
      onLeave?.();
      setIsHovered(false);
      onChange?.(false);
    });
  }, [ref]);

  return isHovered;
}

export default useAHover;
