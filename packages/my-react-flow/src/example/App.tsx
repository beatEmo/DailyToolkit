import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import OscillatorNode from "../components/OscillatorNode";
import VolumeNode from "../components/VolumeNode";
import OutputNode from "../components/OutputNode";
import audio from "../audio";

const initialNodes: Node[] = [
  {
    id: "a",
    type: "osc",
    data: { frequency: 220, type: "square" },
    position: { x: 200, y: 0 },
  },
  {
    id: "b",
    type: "volume",
    data: { gain: 0.5 },
    position: { x: 150, y: 250 },
  },
  {
    id: "c",
    type: "out",
    data: {},
    position: { x: 350, y: 400 },
  },
];
const initialEdges: Edge[] = [];

const nodeTypes = {
  osc: OscillatorNode,
  volume: VolumeNode,
  out: OutputNode,
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params: Connection) => {
    audio.connect(params.source, params.target);
    setEdges((eds) => addEdge(params, eds));
  };

  const addOsc = () => {
    const id = Math.random().toString().slice(2, 8);
    const position = { x: 0, y: 0 };
    const type = "osc";
    const data = { frequency: 400, type: "sine" };
    setNodes([...nodes, { id, type, data, position }]);
    audio.createAudioNode(id, type, data);
  };

  const addVolume = () => {
    const id = Math.random().toString().slice(2, 8);
    const data = { gain: 0.5 };
    const position = { x: 0, y: 0 };
    const type = "volume";

    setNodes([...nodes, { id, type, data, position }]);
    audio.createAudioNode(id, type, data);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        onNodesDelete={(nodes) => {
          for (const { id } of nodes) {
            audio.removeAudioNode(id);
          }
        }}
        onEdgesDelete={(edges) => {
          for (const item of edges) {
            const { source, target } = item;
            audio.disconnect(source, target);
          }
        }}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Lines} />
        <Panel className="space-x-4" position="top-right">
          <button
            className="p-[4px] bg-gray-300 rounded shadow"
            onClick={addOsc}
          >
            增加振荡器
          </button>
          <button
            className="p-[4px] bg-gray-300 rounded shadow"
            onClick={addVolume}
          >
            增加声音
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}
