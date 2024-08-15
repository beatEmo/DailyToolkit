import { useState } from "react";
import { useTimeout } from "ahooks";

function Example() {
  const [state, setState] = useState(1);
  useTimeout(() => {
    setState(state + 1);
  }, 3000);

  return <div>{state}</div>;
}

export default Example;
