import {
  Node,
} from '@xyflow/react';

export type TaskNodeData= {
  label: string;
  onChange: (id: string, label: string) => void;
}

export type TaskNodeType = Node<TaskNodeData, 'taskNode'>;
