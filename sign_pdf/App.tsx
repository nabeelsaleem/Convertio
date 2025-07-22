
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { PdfDocument, Signature, PlacedSignature, RenderedSignature } from './types';
import { loadPdf, savePdf } from './services/pdfService';

import Dropzone from './components/Dropzone';
import PdfViewer from './components/PdfViewer';
import SignaturePanel from './components/SignaturePanel';
import Spinner from './components/Spinner';

const App: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfDocument, setPdfDocument] = useState<PdfDocument | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [placedSignatures, setPlacedSignatures] = useState<PlacedSignature[]>([]);
  const [signatureForPlacing, setSignatureForPlacing] = useState<Signature | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const handleFileDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    const pdf = acceptedFiles[0];
    if (!pdf || pdf.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }

    setIsProcessing(true);
    try {
      const doc = await loadPdf(pdf);
      setPdfFile(pdf);
      setPdfDocument(doc);
      setCurrentPage(1);
      setPlacedSignatures([]);
      setSignatureForPlacing(null);
    } catch (err) {
      console.error(err);
      setError('Could not process the PDF file. It may be corrupt or protected.');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  const handleAddSignature = (newSignature: Signature) => {
    setSignatures(prev => [...prev, newSignature]);
  };

  const handleDeleteSignature = (id: string) => {
    setSignatures(prev => prev.filter(s => s.id !== id));
  };

  const handleSelectSignatureForPlacing = (signature: Signature) => {
    setSignatureForPlacing(signature);
  };
  
  const handlePlaceSignature = (pos: { x: number; y: number; width: number; height: number}) => {
    if (!signatureForPlacing) return;
    const newPlacedSignature: PlacedSignature = {
      id: `placed-${Date.now()}`,
      signatureId: signatureForPlacing.id,
      pageIndex: currentPage - 1,
      ...pos,
    };
    setPlacedSignatures(prev => [...prev, newPlacedSignature]);
    setSignatureForPlacing(null);
  };
  
  const updatePlacedSignature = (id: string, newProps: Partial<PlacedSignature>) => {
    setPlacedSignatures(current =>
      current.map(p => (p.id === id ? { ...p, ...newProps } : p))
    );
  };

  const deletePlacedSignature = (id: string) => {
    setPlacedSignatures(current => current.filter(p => p.id !== id));
  };
  
  const handleDownload = async () => {
    if (!pdfFile || !pdfDocument) return;

    setIsProcessing(true);
    setError(null);
    try {
      const renderedSignatures: RenderedSignature[] = placedSignatures.map(p => {
        const sigData = signatures.find(s => s.id === p.signatureId);
        return { ...p, dataUrl: sigData?.dataUrl || '' };
      }).filter(s => s.dataUrl);

      const signedPdfBytes = await savePdf(pdfFile, pdfDocument, renderedSignatures);
      const blob = new Blob([signedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `signed-${pdfFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError("An error occurred while saving the PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  const resetTool = () => {
    setPdfFile(null);
    setPdfDocument(null);
    setPlacedSignatures([]);
    setSignatureForPlacing(null);
    setError(null);
  };

  const renderedSignaturesForPage = placedSignatures
    .filter(p => p.pageIndex === currentPage - 1)
    .map(p => {
      const sigData = signatures.find(s => s.id === p.signatureId);
      return { ...p, dataUrl: sigData?.dataUrl || '' };
    })
    .filter(s => s.dataUrl);

  return (
    <div className="min-h-screen flex flex-col p-4">
      <main className="w-full max-w-7xl mx-auto flex-grow flex flex-col">
        <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Sign PDF</h1>
            <p className="text-gray-500 mt-2">Add your signature to any PDF document, securely in your browser.</p>
        </div>
        
        {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
        )}

        {isProcessing && !pdfDocument && (
          <div className="flex-grow flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8">
            <Spinner className="h-10 w-10 text-[#da3f0b]" />
            <p className="mt-4 text-gray-600 font-medium">Loading your document...</p>
          </div>
        )}

        {!pdfDocument && !isProcessing && (
           <div className="flex-grow flex items-center justify-center">
             <div className="w-full max-w-2xl">
                <Dropzone
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                    isDragActive={isDragActive}
                />
             </div>
           </div>
        )}

        {pdfDocument && (
          <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
             {isProcessing && (
              <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-30 rounded-lg">
                <Spinner className="w-12 h-12 text-[#da3f0b]" />
                <p className="mt-4 text-lg text-gray-700 font-medium">Saving PDF...</p>
              </div>
            )}
            
            {/* Left Column: PDF Viewer */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-4 flex flex-col">
                <PdfViewer 
                    pdfDocument={pdfDocument}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    placedSignatures={renderedSignaturesForPage}
                    signatureForPlacing={signatureForPlacing}
                    onPlaceSignature={handlePlaceSignature}
                    onUpdatePlacedSignature={updatePlacedSignature}
                    onDeletePlacedSignature={deletePlacedSignature}
                    onCancelPlacing={() => setSignatureForPlacing(null)}
                />
            </div>

            {/* Right Column: Signature Panel */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 flex flex-col">
                <SignaturePanel 
                    signatures={signatures}
                    onAddSignature={handleAddSignature}
                    onDeleteSignature={handleDeleteSignature}
                    onSelectSignature={handleSelectSignatureForPlacing}
                />
                
                <div className="mt-auto pt-6 border-t border-gray-200 flex flex-col gap-3">
                    <button
                        onClick={handleDownload}
                        disabled={isProcessing}
                        className="w-full flex items-center justify-center px-6 py-3 bg-[#da3f0b] text-white font-bold rounded-lg shadow-md hover:bg-[#c3370a] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                    >
                       Download Signed PDF
                    </button>
                    <button
                        onClick={resetTool}
                        className="w-full text-center px-6 py-3 border-2 border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-colors"
                    >
                        Sign Another PDF
                    </button>
                </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
