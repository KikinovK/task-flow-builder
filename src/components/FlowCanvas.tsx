import { useCallback, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  MiniMap,
  Controls,
  Background,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TaskNode from './TaskNode';
import { TaskNodeType } from '../types/flow';
import Button from './ui/Button';
import TaskEditPanel from './TaskEditPanel';


const initialNodes: TaskNodeType[] = [
  {
    id: '1',
    type: 'taskNode',
    data: { label: 'Task 1' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'taskNode',
    data: { label: 'Task 2' },
    position: { x: 100, y: 100 },
  },
];

const FlowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<TaskNodeType>(initialNodes);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const onNodeClick = useCallback((event: React.MouseEvent, node: TaskNodeType) => {
    event.stopPropagation();
    setActiveNodeId(node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setActiveNodeId(null);
  }, []);

  const onNodeDragStart = useCallback(
    (_event: React.MouseEvent, node: TaskNodeType) => {
      if (node.id !== activeNodeId) {
        setActiveNodeId(null);
      }
    },
    [activeNodeId]
  );

  const handleAddTask = () => {
    const newNode: TaskNodeType = {
      id: (nodes.length + 1).toString(),
      type: 'taskNode',
      data: { label: `Task ${nodes.length + 1}` },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      selected: true,
    };
    setNodes((nds) => {
      return  nds.map((node) => (node.selected ? { ...node, selected: false } : node)).concat(newNode)
    });
    setActiveNodeId(newNode.id);
  };

  const handleNodeLabelChange = useCallback((id: string, label: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label } } : node
      )
    );
  }, [setNodes]);

  const nodeTypes = {
    taskNode: TaskNode,
  };

  const activeNode = nodes.find((node) => node.id === activeNodeId);

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onNodeDragStart={onNodeDragStart}
        fitView
      >
        {activeNode && (
          <Panel position="top-right">
            <TaskEditPanel
              initialLabel={activeNode.data.label}
              onConfirm={(newLabel) => {
                handleNodeLabelChange(activeNode.id, newLabel);
                setActiveNodeId(null);
              }}
              onCancel={() => setActiveNodeId(null)}
            />
          </Panel>
        )}
        <Panel position="top-left">
          <Button onClick={handleAddTask}>Add Task</Button>
        </Panel>
        <MiniMap />
        <Background />
        <Controls />
      </ReactFlow>

    </div>
  );
};

export default FlowCanvas;
