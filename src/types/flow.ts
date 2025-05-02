import {
  Node,
} from '@xyflow/react';

export type TaskNodeData= {
  label: string;
}

export type TaskNodeType = Node<TaskNodeData, 'taskNode'>;
