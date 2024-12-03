import React from 'react';
import { Square, Circle, Diamond, Triangle } from 'lucide-react';
import { useStore } from '../store';

const shapes = [
  { id: 'rectangle', icon: Square, label: 'Rectangle' },
  { id: 'circle', icon: Circle, label: 'Circle' },
  { id: 'diamond', icon: Diamond, label: 'Diamond' },
  { id: 'triangle', icon: Triangle, label: 'Triangle' },
];

const Toolbar = () => {
  const { setSelectedShape } = useStore();

  const onDragStart = (event: React.DragEvent, shape: string) => {
    event.dataTransfer.setData('application/reactflow', shape);
    event.dataTransfer.effectAllowed = 'move';
    setSelectedShape(shape);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Shapes</h2>
      <div className="space-y-2">
        {shapes.map(({ id, icon: Icon, label }) => (
          <div
            key={id}
            className="flex items-center p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
            draggable
            onDragStart={(e) => onDragStart(e, id)}
          >
            <Icon className="w-6 h-6 text-gray-600 mr-2" />
            <span className="text-sm text-gray-700">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;