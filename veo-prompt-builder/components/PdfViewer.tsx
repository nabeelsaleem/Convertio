import React, { useRef, useEffect, useState } from 'react';
import { PdfDocument, RenderedSignature, Signature } from '../types';
import { renderPage } from '../services/pdfService';
import DraggableSignature from './DraggableSignature';
import Spinner from './Spinner';

interface PdfViewerProps {
  pdfDocument: PdfDocument;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  placedSignatures: RenderedSignature[];
  signatureForPlacing: Signature | null;
  onPlaceSignature: (pos: { x: number; y: number; width: number; height: number}) => void;
  onUpdatePlacedSignature: (id: string, newProps: Partial<RenderedSignature>) => void;
  onDeletePlacedSignature: (id: string) => void;
  onCancelPlacing: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({
  pdfDocument,
  currentPage,
  setCurrentPage,
  placedSignatures,
  signatureForPlacing,
  onPlaceSignature,
  onUpdatePlacedSignature,
  onDeletePlacedSignature,
  onCancelPlacing,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const render = async () => {
      if (pdfDocument && canvasRef.current) {
        setIsLoading(true);
        await renderPage(pdfDocument, currentPage, canvasRef.current);
        setIsLoading(false);
      }
    };
    render();
  }, [pdfDocument, currentPage]);
  
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!signatureForPlacing || !viewerRef.current) return;
    
    const rect = viewerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const signatureWidth = 150;
    const signatureHeight = 75;

    onPlaceSignature({ 
      x: x - signatureWidth / 2,
      y: y - signatureHeight / 2,
      width: signatureWidth,
      height: signatureHeight,
    });
  };

  const totalPages = pdfDocument?.numPages || 0;

  return (
    <div className="flex-grow flex flex-col h-full">
      {/* Viewer Header */}
      <div className="flex-shrink-0 flex justify-between items-center mb-4 px-2">
        <h2 className="text-xl font-semibold text-gray-800">Document Preview</h2>
        <div className="flex items-center space-x-2">
            <button 
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              &lt;
            </button>
            <span className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">
              {currentPage} / {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              &gt;
            </button>
        </div>
      </div>

      {/* Viewer Body */}
      <div className="flex-grow relative bg-gray-100 rounded-lg overflow-auto p-4 flex items-start justify-center">
          <div 
            ref={viewerRef}
            className="relative shadow-lg"
            style={{ cursor: signatureForPlacing ? 'crosshair' : 'default' }}
            onClick={handleCanvasClick}
          >
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                  <Spinner className="w-8 h-8 text-[#da3f0b]" />
              </div>
            )}
             {signatureForPlacing && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-max bg-[#da3f0b] text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg z-20">
                    Click on the document to place your signature.
                    <button onClick={(e) => { e.stopPropagation(); onCancelPlacing(); }} className="ml-4 font-bold">✕</button>
                </div>
             )}
            <canvas ref={canvasRef} />
            <div className="absolute inset-0">
                {placedSignatures.map(sig => (
                    <DraggableSignature 
                        key={sig.id}
                        signature={sig}
                        boundsRef={viewerRef}
                        onUpdate={onUpdatePlacedSignature}
                        onDelete={onDeletePlacedSignature}
                    />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;