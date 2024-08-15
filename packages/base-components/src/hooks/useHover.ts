import { cloneElement, ReactElement, useState } from "react";

export type Element = ReactElement | ((state: boolean) => ReactElement);

const useHover = (element: Element): [ReactElement, boolean] => {
  const [state, setState] = useState(false);

  const handleMouseEnter = (originalOnMouseEnter?: any) => (event: any) => {
    console.log(1);

    originalOnMouseEnter?.(event);
    setState(true);
  };

  const handleMouseLeave = (originalOnMouseLeave?: any) => (event: any) => {
    originalOnMouseLeave?.(event);
    setState(false);
  };

  if (typeof element === "function") {
    element = element(state);
  }

  const el = cloneElement(element, {
    onMouseEnter: handleMouseEnter(element.props?.onMouseEnter),
    onMouseLeave: handleMouseLeave(element.props?.onMouseLeave),
  });

  return [el, state];
};

export default useHover;
