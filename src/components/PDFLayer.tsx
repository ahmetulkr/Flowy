import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useStore } from '../store';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFLayer = () => {
  const { pdfFile } = useStore();

  if (!pdfFile) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-[-1]">
      <Document file={pdfFile}>
        <Page
          pageNumber={1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="pdf-page"
        />
      </Document>
    </div>
  );
};

export default PDFLayer;