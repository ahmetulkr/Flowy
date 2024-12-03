import React, { useCallback } from 'react';
import { Download, Upload } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Edge, Node } from 'reactflow';
import { useStore } from '../store';

interface TopBarProps {
  flowRef: React.RefObject<HTMLDivElement>;
  nodes: Node[];
  edges: Edge[];
}

const TopBar: React.FC<TopBarProps> = ({ flowRef, nodes, edges }) => {
  const { setPdfFile } = useStore();

  const exportToPDF = useCallback(async () => {
    if (!flowRef.current) return;

    try {
      const canvas = await html2canvas(flowRef.current, {
        backgroundColor: '#f9fafb',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('flow-diagram.pdf');
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  }, [flowRef]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPdfFile(file);
    }
  }, [setPdfFile]);

  return (
    <div className="h-14 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">Flow Diagram Editor</h1>
      <div className="flex items-center space-x-4">
        <label className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
          <Upload className="w-5 h-5" />
          <span>Import PDF</span>
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
        <button
          onClick={exportToPDF}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Download className="w-5 h-5" />
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default TopBar;