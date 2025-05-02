import {
  ReactFlow,
  useNodesState,
  MiniMap,
  Controls,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TaskNode from './TaskNode';
import { TaskNodeType } from '../types/flow';
import Button from './ui/Button';


const initialNodes: TaskNodeType[] = [
  {
    id: '1',
    type: 'taskNode',
    data: { label: 'Task 1', onChange: () => {} },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'taskNode',
    data: { label: 'Task 2', onChange: () => {}  },
    position: { x: 100, y: 100 },
  },
];

const FlowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<TaskNodeType>(initialNodes);

  const handleAddTask = () => {
    const newNode: TaskNodeType = {
      id: (nodes.length + 1).toString(),
      type: 'taskNode',
      data: { label: `Task ${nodes.length + 1}`, onChange: handleNodeLabelChange },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const handleNodeLabelChange = (id: string, label: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label } } : node
      )
    );
  };

  const nodeTypes = {
    taskNode: TaskNode,
  };

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-500"
      >
        <MiniMap />
        <Background />
        <Controls />
      </ReactFlow>
      <div className="absolute top-4 right-4">
        <Button onClick={handleAddTask}>Add Task</Button>
      </div>
    </div>
  );
};

export default FlowCanvas;
