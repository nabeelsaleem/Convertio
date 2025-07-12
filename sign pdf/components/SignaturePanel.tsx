
import React, { useState, useRef, ChangeEvent } from 'react';
import { Signature } from '../types';
import SignaturePad from './SignaturePad';
import TrashIcon from './icons/TrashIcon';

interface SignaturePanelProps {
  signatures: Signature[];
  onAddSignature: (signature: Signature) => void;
  onDeleteSignature: (id: string) => void;
  onSelectSignature: (signature: Signature) => void;
}

const SignaturePanel: React.FC<SignaturePanelProps> = ({
  signatures,
  onAddSignature,
  onDeleteSignature,
  onSelectSignature
}) => {
  const [activeTab, setActiveTab] = useState<'draw' | 'type' | 'upload'>('draw');
  
  // Type Tab State
  const [typedText, setTypedText] = useState('');
  const [font, setFont] = useState('cursive');

  // Upload Tab State
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveTypedSignature = () => {
    if (!typedText.trim()) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasFont = `48px ${font}`;
    ctx.font = canvasFont;
    const textMetrics = ctx.measureText(typedText);
    canvas.width = textMetrics.width + 40;
    canvas.height = 100;

    ctx.font = canvasFont;
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(typedText, canvas.width / 2, canvas.height / 2);

    onAddSignature({
      id: `typed-${Date.now()}`,
      type: 'type',
      dataUrl: canvas.toDataURL('image/png'),
    });
    setTypedText('');
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onAddSignature({
          id: `upload-${Date.now()}`,
          type: 'upload',
          dataUrl: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
    // Reset file input
    if(e.target) e.target.value = '';
  };
  
  const TabButton: React.FC<{tabId: 'draw'|'type'|'upload', children: React.ReactNode}> = ({tabId, children}) => (
    <button
      onClick={() => setActiveTab(tabId)}
      className={`flex-1 pb-2 text-center font-semibold border-b-2 transition-colors ${
        activeTab === tabId
          ? 'border-[#da3f0b] text-[#da3f0b]'
          : 'border-transparent text-gray-500 hover:text-gray-800'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Your Signature</h2>

      {/* Tabs */}
      <div className="flex mb-4 border-b border-gray-200">
        <TabButton tabId="draw">Draw</TabButton>
        <TabButton tabId="type">Type</TabButton>
        <TabButton tabId="upload">Upload</TabButton>
      </div>

      {/* Tab Content */}
      <div className="flex-grow">
        {activeTab === 'draw' && <SignaturePad onSave={onAddSignature} />}
        
        {activeTab === 'type' && (
          <div className="flex flex-col gap-4">
             <input
                type="text"
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                placeholder="Type your name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#da3f0b] focus:border-[#da3f0b]"
             />
             <select value={font} onChange={(e) => setFont(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
                <option value="cursive">Cursive</option>
                <option value="Caveat">Caveat</option>
                <option value="sans-serif">Sans-serif</option>
                <option value="monospace">Monospace</option>
             </select>
             <div className="p-4 bg-gray-50 rounded border text-center text-2xl h-[80px] flex items-center justify-center" style={{ fontFamily: font }}>
                {typedText || 'Signature Preview'}
             </div>
             <button onClick={handleSaveTypedSignature} className="w-full bg-[#da3f0b] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#c3370a]">
                Save Typed Signature
             </button>
          </div>
        )}

        {activeTab === 'upload' && (
            <div>
                 <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/png, image/jpeg"
                    className="hidden"
                 />
                 <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full text-center p-8 border-2 border-dashed border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-colors"
                >
                    Click to upload
                 </button>
                 <p className="text-xs text-center text-gray-500 mt-2">Recommended: PNG with transparent background</p>
            </div>
        )}
      </div>

      {/* Saved Signatures */}
      {signatures.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Signatures</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {signatures.map(sig => (
              <div key={sig.id} className="group flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div 
                  className="flex-grow flex items-center cursor-pointer"
                  onClick={() => onSelectSignature(sig)}
                >
                    <img src={sig.dataUrl} alt="signature" className="h-10 w-24 object-contain" />
                </div>
                <button
                  onClick={() => onDeleteSignature(sig.id)}
                  className="p-2 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignaturePanel;
