import React, { useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  ReactFlowInstance,
  useKeyPress,
  EdgeTypes,
} from 'reactflow';
import Toolbar from './Toolbar';
import { useStore } from '../store';
import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';
import PDFLayer from './PDFLayer';
import TopBar from './TopBar';

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 250, y: 100 },
    data: { label: 'Başlat', shape: 'rectangle' },
  },
];

const FlowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { selectedShape } = useStore();
  const flowRef = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = React.useState<ReactFlowInstance | null>(null);
  const deletePressed = useKeyPress('Delete');
  const backspacePressed = useKeyPress('Backspace');

  useEffect(() => {
    if (deletePressed || backspacePressed) {
      setEdges((eds) => eds.filter((edge) => !edge.selected));
    }
  }, [deletePressed, backspacePressed, setEdges]);

  const onInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
  }, []);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      if (params.source === params.target) {
        return;
      }
      setEdges((eds) => addEdge({ 
        ...params, 
        type: 'custom',
        style: { strokeWidth: 2 }
      }, eds));
    },
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!flowRef.current || !reactFlowInstance) return;

      const reactFlowBounds = flowRef.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `node_${nodes.length + 1}`,
        type: 'custom',
        position,
        data: { label: 'Yeni Düğüm', shape: selectedShape },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes.length, selectedShape, setNodes, reactFlowInstance],
  );

  return (
    <div className="flex flex-col h-full">
      <TopBar flowRef={flowRef} nodes={nodes} edges={edges} />
      <div className="flex flex-1 overflow-hidden">
        <Toolbar />
        <div className="flex-1 h-full" ref={flowRef}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={onInit}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={{
              type: 'custom',
              style: { strokeWidth: 2 }
            }}
            fitView
            className="bg-gray-50"
            edgesFocusable={true}
            selectNodesOnDrag={false}
          >
            <PDFLayer />
            <Controls />
            <MiniMap />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default FlowEditor;