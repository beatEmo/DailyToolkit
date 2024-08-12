import { useEffect } from "react";

const defaultOptions: MutationObserverInit = {
  childList: true,
  subtree: true,
  attributeFilter: ["style", "class"],
};
export default function useMutateObserver(
  nodeOrLists: HTMLElement | HTMLElement[],
  callback: MutationCallback,
  options: MutationObserverInit = defaultOptions
) {
  useEffect(() => {
    if (!nodeOrLists) return;

    let instance: MutationObserver;

    const nodeLists = Array.isArray(nodeOrLists) ? nodeOrLists : [nodeOrLists];

    if ("MutationObserver" in window) {
      const instance = new MutationObserver(callback);
      nodeLists.forEach((node) => {
        instance.observe(node, options);
      });
    }

    return () => {
      instance?.disconnect();
      instance?.takeRecords();
    };
  }, [options, nodeOrLists]);
}
