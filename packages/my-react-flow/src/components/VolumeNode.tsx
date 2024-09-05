import { ChangeEventHandler, FC, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import audio from "../audio";

interface VolumeNodeProps {
  id: string;
  data: {
    gain: number;
  };
}

const VolumeNode: FC<VolumeNodeProps> = ({ id, data }) => {
  const [gain, setGain] = useState(data.gain);
  const changeGain: ChangeEventHandler<HTMLInputElement> = (e) => {
    setGain(+e.target.value);
    audio.updateAudio(id, { gain: +e.target.value });
  };

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="bg-white shadow-xl" key={id}>
        <p className="text-white bg-blue-500 rounded-t-md p-[8px]">
          音量调节器
        </p>
        <div className="flex flex-col p-[8px]">
          <span>Gain</span>
          <input
            className="nodrag"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={gain}
            onChange={changeGain}
          />
          <span className="text-right">{gain.toFixed(2)}</span>
        </div>
        <Handle type="source" position={Position.Bottom} />
      </div>
    </>
  );
};

export default VolumeNode;
