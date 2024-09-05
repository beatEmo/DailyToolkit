import { FC, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import audio from "../audio";

interface OutputNodeProps {
  id: string;
}

const VolumeNode: FC<OutputNodeProps> = ({ id }) => {
  const [isRuning, setIsRuning] = useState<boolean>(false);

  const toggleAudio = () => {
    setIsRuning((isRuning) => !isRuning);
    audio.toggleAudio();
  };

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="bg-white shadow-xl" key={id}>
        <p className="text-black p-[8px]">输出节点</p>
        <button onClick={toggleAudio}>
          {isRuning ? <span role="img">📢</span> : <span role="img">🔇</span>}
        </button>
      </div>
    </>
  );
};

export default VolumeNode;
