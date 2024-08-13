import React from "react";
import copy from "copy-to-clipboard";

interface CopyToClipboardProps {
  text: string;
  children: React.ReactElement;
  onCopy?: (text: string, result: boolean) => void;
  options?: {
    debug?: boolean;
    message?: string;
    format?: string;
  };
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = (props) => {
  const { text, children, onCopy, options } = props;

  // 断言判断只有一个children
  const elem = React.Children.only(children);

  // 自定义的onClick事件 children中已有onClick事件就不再重复绑定
  function onClick(event: MouseEvent) {
    const elem = React.Children.only(children);

    const result = copy(text, options);

    if (onCopy) {
      onCopy(text, result);
    }

    if (typeof elem.props.onClick === "function") {
      elem.props.onClick(event);
    }
  }

  return React.cloneElement(elem, { onClick });
};

export default CopyToClipboard;
