
import React, { useRef, useEffect, useState } from 'react';
import { Signature } from '../types';

interface SignaturePadProps {
  onSave: (signature: Signature) => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);

  const getCtx = () => canvasRef.current?.getContext('2d');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = getCtx();
    if (!ctx) return;
    
    // Set canvas dimensions based on container
    const rect = canvas.parentElement!.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 200;

    // High DPI for better quality
    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;
    canvas.width *= dpr;
    canvas.height *= dpr;
    ctx.scale(dpr, dpr);

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const ctx = getCtx();
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const ctx = getCtx();
    if (!ctx) return;
    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const ctx = getCtx();
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawing(false);
    }
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawing) return;
    
    // Trim transparent space for a clean image
    const dataUrl = trimCanvas(canvas).toDataURL('image/png');
    onSave({
        id: `drawn-${Date.now()}`,
        type: 'draw',
        dataUrl: dataUrl
    });
    clearCanvas();
  };
  
  // Helper to trim transparent pixels
  const trimCanvas = (c: HTMLCanvasElement) => {
    const ctx = c.getContext('2d')!;
    const copy = document.createElement('canvas');
    const copyCtx = copy.getContext('2d')!;
    copy.width = c.width;
    copy.height = c.height;
    copyCtx.drawImage(c, 0, 0);

    const { data } = ctx.getImageData(0, 0, c.width, c.height);
    let top = c.height, right = 0, bottom = 0, left = c.width;

    for (let i = 3; i < data.length; i += 4) {
      if (data[i] > 0) { // Check alpha channel
        const x = (i - 3) / 4 % c.width;
        const y = Math.floor((i - 3) / 4 / c.width);
        top = Math.min(top, y);
        right = Math.max(right, x);
        bottom = Math.max(bottom, y);
        left = Math.min(left, x);
      }
    }

    const trimWidth = right - left + 1;
    const trimHeight = bottom - top + 1;
    const trimmed = document.createElement('canvas');
    trimmed.width = trimWidth;
    trimmed.height = trimHeight;
    trimmed.getContext('2d')!.drawImage(copy, left, top, trimWidth, trimHeight, 0, 0, trimWidth, trimHeight);
    return trimmed;
  }

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={canvasRef}
        className="w-full h-[200px] bg-gray-50 border border-gray-300 rounded-lg cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <div className="flex space-x-2">
        <button onClick={clearCanvas} className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
            Clear
        </button>
        <button onClick={saveSignature} disabled={!hasDrawing} className="flex-1 bg-[#da3f0b] hover:bg-[#c13609] text-white py-2 px-4 rounded-lg font-semibold transition-colors disabled:bg-gray-400">
            Save Drawn Signature
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
