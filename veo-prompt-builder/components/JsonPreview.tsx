import React, { useState, useEffect } from 'react';
import ClipboardIcon from './icons/ClipboardIcon';
import DownloadIcon from './icons/DownloadIcon';
import { Shot } from '../types';

interface JsonPreviewProps {
  shots: Shot[];
  templateType: 'Image' | 'Video';
}

const JsonPreview: React.FC<JsonPreviewProps> = ({ shots, templateType }) => {
  const [jsonString, setJsonString] = useState('');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  useEffect(() => {
    const generateJson = () => {
      // Create a clean object for export, removing the client-side 'id'
      const exportShots = shots.map(({ id, ...rest }) => rest);
      const output = templateType === 'Video' 
        ? { shots: exportShots }
        : exportShots[0] || {}; // For image, just use the first shot's data
      
      return JSON.stringify(output, null, 2);
    };
    setJsonString(generateJson());
  }, [shots, templateType]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString).then(() => {
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompt.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col h-full sticky top-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Live JSON Preview</h2>
        <div className="flex items-center gap-2">
          <button onClick={handleCopy} className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-600" title="Copy to Clipboard">
            {copyStatus === 'idle' ? <ClipboardIcon className="w-5 h-5" /> : <span className="text-sm font-semibold text-[#da3f0b]">Copied!</span>}
          </button>
          <button onClick={handleDownload} className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-600" title="Download JSON">
            <DownloadIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex-grow bg-gray-900 text-white rounded-lg p-4 overflow-auto font-mono text-sm">
        <pre><code>{jsonString}</code></pre>
      </div>
    </div>
  );
};

export default JsonPreview;
