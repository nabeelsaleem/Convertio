
import React from 'react';
import { PdfFile } from '../types';
import RotateLeftIcon from './icons/RotateLeftIcon';
import RotateRightIcon from './icons/RotateRightIcon';
import TrashIcon from './icons/TrashIcon';

interface PdfThumbnailProps {
  file: PdfFile;
  onRemove: (id: string) => void;
  onRotate: (id: string, direction: 'left' | 'right') => void;
}

const PdfThumbnail: React.FC<PdfThumbnailProps> = ({ file, onRemove, onRotate }) => {
  return (
    <div className="group relative flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      <div className="p-2 bg-gray-100 flex-shrink-0">
        <img
          src={file.thumbnailUrl}
          alt={`Preview of ${file.file.name}`}
          className="w-full h-40 object-contain transition-transform duration-300"
          style={{ transform: `rotate(${file.rotation}deg)` }}
        />
      </div>
      <div className="p-3 flex-grow flex flex-col justify-between">
        <p className="text-xs text-gray-600 font-medium break-all truncate" title={file.file.name}>
          {file.file.name}
        </p>
        <div className="flex justify-center items-center mt-3 space-x-2">
            <button
                onClick={() => onRotate(file.id, 'left')}
                className="p-1.5 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800 transition-colors"
                title="Rotate Left"
            >
                <RotateLeftIcon className="w-4 h-4" />
            </button>
            <button
                onClick={() => onRemove(file.id)}
                className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 transition-colors"
                title="Remove"
            >
                <TrashIcon className="w-4 h-4" />
            </button>
            <button
                onClick={() => onRotate(file.id, 'right')}
                className="p-1.5 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800 transition-colors"
                title="Rotate Right"
            >
                <RotateRightIcon className="w-4 h-4" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default PdfThumbnail;
