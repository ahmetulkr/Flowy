import React from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';

const CustomEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  selected,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <path
      id={id}
      style={{
        ...style,
        strokeWidth: selected ? 3 : 2,
        stroke: selected ? '#3b82f6' : '#64748b',
      }}
      className="react-flow__edge-path"
      d={edgePath}
      fill="none"
    />
  );
};

export default CustomEdge;