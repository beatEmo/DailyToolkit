import React, { PropsWithChildren, forwardRef } from "react";
import cs from "classnames";

import "./index.scss";

type BaseIconProps = {
  className?: string;
  style?: React.CSSProperties;
  size?: string | string[];
  spin?: boolean;
};

export type IconProps = BaseIconProps &
  Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>;

/**
 * 处理传入的size
 * 1.传入 [??px, ??px] 分别指定宽高
 * 2.传入 ??px 同时指定宽高
 */
const getSize = (size: IconProps["size"]) => {
  if (Array.isArray(size) && size.length === 2) {
    return size as string[];
  }
  const width = (size as string) || "1em";
  const height = (size as string) || "1em";

  return [width, height];
};

export const Icon = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>(
  (props, ref) => {
    const { style, className, spin, size = "1em", children, ...rest } = props;

    const [width, height] = getSize(size);

    const cn = cs(
      "icon",
      {
        "icon-spin": spin,
      },
      className
    );

    return (
      <svg
        ref={ref}
        className={cn}
        style={style}
        width={width}
        height={height}
        fill="currentColor"
        {...rest}
      >
        {children}
      </svg>
    );
  }
);
