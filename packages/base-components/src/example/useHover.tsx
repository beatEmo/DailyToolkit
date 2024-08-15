import useHover from "../hooks/useHover";

function App() {
  const element = (hoverable: boolean) => (
    <div
      onMouseEnter={(e) => {
        console.log("enter", e);
      }}
    >
      hover me{hoverable ? "hover" : ""}
    </div>
  );

  const [hoverable, isHovered] = useHover(element);
  return (
    <>
      {hoverable}
      <div>{isHovered ? "hover" : ""}</div>
    </>
  );
}

export default App;
