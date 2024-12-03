import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import FlowEditor from './components/FlowEditor';
import 'reactflow/dist/style.css';

function App() {
  return (
    <div className="w-full h-screen bg-gray-50">
      <ReactFlowProvider>
        <FlowEditor />
      </ReactFlowProvider>
    </div>
  );
}

export default App;