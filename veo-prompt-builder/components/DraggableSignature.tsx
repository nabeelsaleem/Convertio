
import React, { useState, useRef } from 'react';
import { RenderedSignature } from '../types';
import TrashIcon from './icons/TrashIcon';

interface DraggableSignatureProps {
  signature: RenderedSignature;
  boundsRef: React.RefObject<HTMLDivElement>;
  onUpdate: (id: string, newProps: Partial<RenderedSignature>) => void;
  onDelete: (id: string) => void;
}

const DraggableSignature: React.FC<DraggableSignatureProps> = ({ signature, boundsRef, onUpdate, onDelete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    const rect = elementRef.current?.getBoundingClientRect();
    if (rect) {
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const parentRect = boundsRef.current?.getBoundingClientRect();
      if (!parentRect) return;

      let newX = moveEvent.clientX - parentRect.left - dragOffset.current.x;
      let newY = moveEvent.clientY - parentRect.top - dragOffset.current.y;

      // Constrain within bounds
      newX = Math.max(0, Math.min(newX, parentRect.width - signature.width));
      newY = Math.max(0, Math.min(newY, parentRect.height - signature.height));

      onUpdate(signature.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = signature.width;
    const startHeight = signature.height;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const parentRect = boundsRef.current?.getBoundingClientRect();
      if (!parentRect) return;

      let newWidth = startWidth + (moveEvent.clientX - startX);
      let newHeight = startHeight + (moveEvent.clientY - startY);
      
      newWidth = Math.max(50, Math.min(newWidth, parentRect.width - signature.x));
      newHeight = Math.max(25, Math.min(newHeight, parentRect.height - signature.y));

      onUpdate(signature.id, { width: newWidth, height: newHeight });
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={elementRef}
      className={`absolute group cursor-move border-2 border-dashed border-[#da3f0b] hover:border-red-500 p-1`}
      style={{
        left: `${signature.x}px`,
        top: `${signature.y}px`,
        width: `${signature.width}px`,
        height: `${signature.height}px`,
        zIndex: isDragging || isResizing ? 10 : 5,
      }}
      onMouseDown={handleDragStart}
    >
      <img src={signature.dataUrl} className="w-full h-full object-contain" alt="Signature" />

      {/* Delete Handle */}
      <button 
        className="absolute -top-3 -right-3 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-700"
        onClick={(e) => {
            e.stopPropagation();
            onDelete(signature.id);
        }}
      >
        <TrashIcon className="w-3 h-3" />
      </button>
      
      {/* Resize Handle */}
      <div 
        className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border-2 border-[#da3f0b] rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-se-resize"
        onMouseDown={handleResizeStart}
      />
    </div>
  );
};

export default DraggableSignature;
