import React, { useState, useCallback } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

const CustomNode: React.FC<NodeProps> = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  const onDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(evt.target.value);
  }, []);

  const onKeyDown = useCallback(
    (evt: React.KeyboardEvent) => {
      if (evt.key === 'Enter') {
        setIsEditing(false);
        data.label = label;
      }
    },
    [data, label],
  );

  const getShapeStyles = () => {
    const baseStyles = 'min-w-[100px] min-h-[50px] p-4 flex items-center justify-center bg-white border-2 border-gray-300 transition-colors hover:border-blue-400';
    
    switch (data.shape) {
      case 'circle':
        return `${baseStyles} rounded-full aspect-square`;
      case 'diamond':
        return `${baseStyles} transform rotate-45`;
      case 'triangle':
        return `${baseStyles} clip-path-triangle`;
      default:
        return `${baseStyles} rounded-lg`;
    }
  };

  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} />
      <div className={getShapeStyles()}>
        {isEditing ? (
          <input
            type="text"
            value={label}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className="bg-transparent text-center w-24 border-none outline-none"
            autoFocus
          />
        ) : (
          <div
            onDoubleClick={onDoubleClick}
            className={`text-gray-700 font-medium ${data.shape === 'diamond' ? 'transform -rotate-45' : ''}`}
          >
            {label}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;