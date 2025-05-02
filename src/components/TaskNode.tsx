import { Handle, Position, NodeProps } from '@xyflow/react';
import { TaskNodeType } from '../types/flow';



const TaskNode: React.FC<NodeProps<TaskNodeType>> = ({ data, selected }) => {

  return (
    <div className={`p-4 bg-white rounded shadow-md border ${selected ? 'border-blue-500' : 'border-gray-300'}`}>
       <h3 className="text-center font-semibold">{data.label}</h3>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default TaskNode;
