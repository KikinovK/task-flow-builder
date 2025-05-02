import {
  ReactFlow,
  useNodesState,
  MiniMap,
  Controls,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    data: { label: 'Task 1' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Task 2' },
    position: { x: 100, y: 100 },
  },
];

const FlowCanvas = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        fitView
        className="bg-gray-500"
      >
        <MiniMap />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;
