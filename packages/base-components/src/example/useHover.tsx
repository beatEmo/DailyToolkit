import React from "react";

import useHover from "../hooks/useHover";

function App() {
  const [hoverable, isHovered] = useHover((hoverable: boolean) => (
    <div
      onMouseEnter={(e) => {
        console.log("enter", e);
      }}
    >
      hover me{hoverable ? "hover" : ""}
    </div>
  ));
  return (
    <>
      {hoverable}
      <div>{isHovered ? "hover" : ""}</div>
    </>
  );
}

export default App;
