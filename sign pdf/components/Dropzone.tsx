
import React from 'react';
import { DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';
import UploadIcon from './icons/UploadIcon';

interface DropzoneProps {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  isDragActive: boolean;
}

const Dropzone: React.FC<DropzoneProps> = ({ getRootProps, getInputProps, isDragActive }) => {
  return (
    <div
      {...getRootProps()}
      className={`w-full p-10 md:p-16 border-4 border-dashed rounded-xl cursor-pointer transition-all duration-300 text-center flex flex-col items-center justify-center
        ${isDragActive ? 'border-[#da3f0b] bg-orange-50' : 'border-gray-300 bg-gray-50 hover:border-gray-400'}`}
    >
      <input {...getInputProps()} />
      <UploadIcon className="w-16 h-16 text-gray-400 mb-4" />
      <p className="text-xl font-semibold text-gray-700">
        {isDragActive ? 'Drop the PDF here...' : 'Drag & drop your PDF here'}
      </p>
      <p className="text-gray-500 mt-2">or click to select a file</p>
      <p className="text-sm text-gray-500 mt-4">Max file size: 10MB</p>
    </div>
  );
};

export default Dropzone;
