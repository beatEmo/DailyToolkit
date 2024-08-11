import React from "react";
import { Icon, IconProps } from "./";

const loadedSet = new Set<string>();

export function createFromIconfont(scriptUrl: string) {
  /**
   * 这里会传入scriptUrl 下载字体文件，然后通过Iconfont组件渲染图标
   * 1. 没必要重复的script下载，所以可以用set把Url存起来
   * 2. 全局下载好字体后，用 <use xlinkHref={`#${type}`} /> 使用对应字体图标
   */

  if (
    typeof scriptUrl === "string" &&
    scriptUrl.length > 0 &&
    !loadedSet.has(scriptUrl)
  ) {
    const script = document.createElement("script");
    script.setAttribute("src", scriptUrl);
    script.setAttribute("data-namespace", scriptUrl);
    document.body.appendChild(script);
    loadedSet.add(scriptUrl);
  }

  const Iconfont = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    const { type, ...rest } = props;

    return (
      <Icon {...rest} ref={ref}>
        {type ? <use xlinkHref={`#${type}`} /> : null}
      </Icon>
    );
  });

  return Iconfont;
}
