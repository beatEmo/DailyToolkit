import { useEffect, useRef } from "react";
import Portal from "../Portal";

function App() {
  const containerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    console.log(containerRef);
  }, []);

  return (
    <>
      {/* 基本测试 */}
      <Portal attach={document.body}>
        <div className="btn">
          <button>按钮1</button>
        </div>
      </Portal>
      <hr />
      {/* 测试ref */}
      <Portal attach={document.body} ref={containerRef}>
        <div className="btn">
          <button>按钮2</button>
        </div>
      </Portal>
    </>
  );
}

export default App;
