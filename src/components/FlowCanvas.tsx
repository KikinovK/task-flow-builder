import { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  Panel,
  Connection,
  MarkerType,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TaskNode from './TaskNode';
import { TaskNodeType } from '../types/flow';
import Button from './ui/Button';
import TaskEditPanel from './TaskEditPanel';
import CustomEdge from './CustomEdge';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  addNode,
  updateNode,
  deselectAllNodes,
  setNodes,
} from '../store/nodesSlice';
import {
  addEdge,
  setEdges,
} from '../store/edgesSlice';


const FlowCanvas = () => {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector((state) => state.nodes.nodes);
  const edges = useAppSelector((state) => state.edges.edges);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const onNodesChange: OnNodesChange<TaskNodeType> = useCallback(
    (changes) => {
      const clonedNodes = structuredClone(nodes);
      const updatedNodes = applyNodeChanges(changes, clonedNodes);
      dispatch(setNodes(updatedNodes));
    },
    [dispatch, nodes]
  );

  const onEdgesChange: OnEdgesChange<Edge> = useCallback(
    (changes) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      dispatch(setEdges(updatedEdges));
    },
    [dispatch, edges]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        id: `${params.source}-${params.target}`,
        type: 'custom',
        markerEnd: {
          type: MarkerType.Arrow,
        },
      };
      dispatch(addEdge(newEdge));
    },
    [dispatch]
  );

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
    dispatch(deselectAllNodes());
    const newNode: TaskNodeType = {
      id: (nodes.length + 1).toString(),
      type: 'taskNode',
      data: { label: `Task ${nodes.length + 1}` },
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      selected: true,
    };
    dispatch(addNode(newNode));
    setActiveNodeId(newNode.id);
  };

  const handleNodeLabelChange = useCallback(
    (id: string, label: string) => {
      dispatch(updateNode({ id, label }));
    },
    [dispatch]
  );

  const nodeTypes = {
    taskNode: TaskNode,
  };

  const edgeTypes = {
    custom: CustomEdge,
  };

  const activeNode = nodes.find((node) => node.id === activeNodeId);

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
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
