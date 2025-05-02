import React, { useState, useEffect } from 'react';
import Button from './ui/Button';

interface TaskEditPanelProps {
  initialLabel: string;
  onConfirm: (newLabel: string) => void;
  onCancel: () => void;
}

const TaskEditPanel: React.FC<TaskEditPanelProps> = ({ initialLabel, onConfirm, onCancel }) => {
  const [label, setLabel] = useState(initialLabel);

  useEffect(() => {
    setLabel(initialLabel);
  }, [initialLabel]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const handleConfirm = () => {
    onConfirm(label);
  };

  return (
    <div className="h-full w-64 bg-white shadow-lg p-4 z-50">
      <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
      <input
        type="text"
        value={label}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-end space-x-2">
        <Button onClick={handleConfirm} >
          OK
        </Button>
        <Button variant='secondary'  onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default TaskEditPanel;
