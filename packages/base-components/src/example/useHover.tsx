// import useHover from "../hooks/useHover";

import useHover from "../hooks/useAHover";
import { useRef } from "react";

function App() {
  // const element = (hoverable: boolean) => (
  //   <div
  //     onMouseEnter={(e) => {
  //       console.log("enter", e);
  //     }}
  //   >
  //     hover me{hoverable ? "hover" : ""}
  //   </div>
  // );
  // const [hoverable, isHovered] = useHover(element);
  // return (
  //   <>
  //     {hoverable}
  //     <div>{isHovered ? "hover" : ""}</div>
  //   </>
  // );

  const ref = useRef<HTMLDivElement>(null);

  const isHovered = useHover(ref);

  return <div ref={ref}>{isHovered ? "hover" : "leaveHover"}</div>;
}

export default App;
