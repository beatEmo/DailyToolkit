import { FC, useState } from "react";
import { Handle, Position } from "@xyflow/react";

interface OutputNodeProps {
  id: string;
}

const VolumeNode: FC<OutputNodeProps> = ({ id }) => {
  console.log("VolumeNode", id);

  const [isRuning, setIsRuning] = useState<boolean>(false);

  const toggleAudio = () => {
    setIsRuning((isRuning) => !isRuning);
  };

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="bg-white shadow-xl" key={id}>
        <p className="text-black p-[8px]">输出节点</p>
        <button onClick={toggleAudio}>
          {isRuning ? <span role="img">"📢</span> : <span role="img">🔇</span>}
        </button>
      </div>
    </>
  );
};

export default VolumeNode;
