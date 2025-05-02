import React, { useState, useEffect } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { TaskNodeType } from '../types/flow';



const TaskNode: React.FC<NodeProps<TaskNodeType>> = ({ id, data, selected }) => {
  const [label, setLabel] = useState(data.label || '');

  useEffect(() => {
    setLabel(data.label || '');
  }, [data.label]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
    data.onChange(id, e.target.value);
  };

  return (
    <div className={`p-4 bg-white rounded shadow-md border ${selected ? 'border-blue-500' : 'border-gray-300'}`}>
      <input
        type="text"
        value={label}
        onChange={handleChange}
        className="w-full border-none outline-none bg-transparent text-center"
      />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default TaskNode;
