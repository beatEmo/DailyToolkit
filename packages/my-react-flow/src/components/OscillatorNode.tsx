import { Handle, Position } from "@xyflow/react";
import { ChangeEventHandler, FC, useState } from "react";
import audio from "../audio";

export interface OscillatorNodeProps {
  id: string;
  data: {
    frequency: number;
    type: string;
  };
}

const OscillatorNode: FC<OscillatorNodeProps> = ({ id, data }) => {
  const [frequency, setFrequency] = useState(data.frequency);
  const [type, setType] = useState(data.type);

  const changeFrequency: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFrequency(+e.target.value);
    audio.updateAudio(id, { frequency: +e.target.value });
  };
  const changeType: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setType(e.target.value);
    audio.updateAudio(id, { type: e.target.value });
  };

  return (
    <>
      <div className="bg-white shadow-xl" key={id}>
        <p className="text-white bg-pink-500 rounded-t-md p-[8px]">
          震荡器节点
        </p>
        <div className="flex flex-col p-[8px]">
          <span>频率</span>
          <input
            className="nodrag"
            type="range"
            min="10"
            max="1000"
            value={frequency}
            onChange={changeFrequency}
          />
          <span className="text-right">{frequency}赫兹</span>
        </div>
        <hr className="mx-[4px]" />
        <div className="flex flex-col p-[8px]">
          <p>波形</p>
          <select value={type} onChange={changeType}>
            <option value="sine">正弦波</option>
            <option value="triangle">三角波</option>
            <option value="sawtooth">锯齿波</option>
            <option value="square">方波</option>
          </select>
        </div>
        <Handle type="source" position={Position.Bottom} />
      </div>
    </>
  );
};

export default OscillatorNode;
