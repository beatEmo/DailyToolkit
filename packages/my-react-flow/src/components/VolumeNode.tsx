import { FC } from "react";
import { Handle, Position } from "@xyflow/react";

interface VolumeNodeProps {
  id: string;
  data: {
    gain: number;
  };
}

const VolumeNode: FC<VolumeNodeProps> = ({ id, data }) => {
  console.log("VolumeNode", id, data);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="bg-white shadow-xl" key={id}>
        <p className="text-white bg-blue-500 rounded-t-md p-[8px]">
          音量调节器
        </p>
        <div className="flex flex-col p-[8px]">
          <span>Gain</span>
          <input type="range" min="0" max="1" step="0.01" value={data.gain} />
          <span className="text-right">{data.gain.toFixed(2)}</span>
        </div>
        <Handle type="source" position={Position.Bottom} />
      </div>
    </>
  );
};

export default VolumeNode;
