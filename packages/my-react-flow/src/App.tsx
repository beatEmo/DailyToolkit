import { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  BackgroundVariant,
  Handle,
  Position,
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
  Panel,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, type: "red", data: { label: "1" } },
  { id: "2", position: { x: 300, y: 300 }, type: "blue", data: { label: "2" } },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2", type: "custom" }];

interface NodeProps {
  data: {
    label: string;
  };
}
// 自定义节点
function RedNode({ data }: NodeProps) {
  return (
    <div
      style={{
        backgroundColor: "red",
        width: "100px",
        height: "100px",
        padding: "10px",
      }}
    >
      {/* 定义连接点  可以指定黑点所在节点的位置 */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Bottom} />
      <Handle type="target" position={Position.Left} />
      {data.label}
    </div>
  );
}
// 自定义节点
function BlueNode({ data }: NodeProps) {
  return (
    <div
      style={{
        backgroundColor: "blue",
        width: "100px",
        height: "100px",
        padding: "10px",
      }}
    >
      {/* 定义连接点 */}
      <Handle type="source" position={Position.Top} />
      <Handle type="target" position={Position.Left} />
      {data.label}
    </div>
  );
}
// 自定义边
function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  // 涉及到边的修改（增、删、改颜色等）所以通过 useReactFlow 获取 setEdges 方法
  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  console.log("edgePath", edgePath, "labelX", labelX, "labelY", labelY);

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // EdgeLabelRenderer 里的组件默认不处理鼠标事件，如果要处理就要声明 pointerEvents: all
            pointerEvents: "all",
          }}
        >
          <button onClick={onEdgeClick}>×</button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => {
      console.log("handle onConnect", params);
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  return (
    <div
      style={{
        width: "800px",
        height: "500px",
        border: "1px solid #000",
        margin: "50px auto",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={{
          red: RedNode,
          blue: BlueNode,
        }}
        edgeTypes={{
          custom: CustomEdge,
        }}
      >
        <MiniMap zoomable />
        <Controls />
        <Background variant={BackgroundVariant.Lines} />
        <Panel position="top-right">
          <button
            onClick={() => {
              setNodes([
                ...nodes,
                {
                  id: Math.random().toString().slice(2, 6) + "",
                  type: "red",
                  position: { x: 0, y: 0 },
                  data: {
                    label: "光",
                  },
                },
              ]);
            }}
          >
            添加节点
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default Flow;
