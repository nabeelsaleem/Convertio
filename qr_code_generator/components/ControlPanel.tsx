import React from 'react';
import type { DotType, CornerType, ErrorCorrectionLevel } from '../types';
import { UploadIcon, DownloadIcon } from './icons';

interface ControlPanelProps {
  text: string;
  dotColor: string;
  backgroundColor: string;
  dotType: DotType;
  eyeType: CornerType;
  errorCorrectionLevel: ErrorCorrectionLevel;
  onTextChange: (text: string) => void;
  onLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDotColorChange: (color: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onDotTypeChange: (type: DotType) => void;
  onEyeTypeChange: (type: CornerType) => void;
  onErrorCorrectionLevelChange: (level: ErrorCorrectionLevel) => void;
  onDownloadPNG: () => void;
  onDownloadSVG: () => void;
}

const ControlInput: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="mb-6">
    <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
    {children}
  </div>
);

export const ControlPanel: React.FC<ControlPanelProps> = ({
  text,
  dotColor,
  backgroundColor,
  dotType,
  eyeType,
  errorCorrectionLevel,
  onTextChange,
  onLogoChange,
  onDotColorChange,
  onBackgroundColorChange,
  onDotTypeChange,
  onEyeTypeChange,
  onErrorCorrectionLevelChange,
  onDownloadPNG,
  onDownloadSVG,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Customize QR Code</h2>

      <ControlInput label="Text or URL">
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#da3f0b]/40 focus:border-[#da3f0b] transition"
          rows={3}
          placeholder="Enter URL or text here..."
        />
      </ControlInput>

      <ControlInput label="Upload Logo">
        <div 
            className="w-full p-8 border-4 border-dashed border-gray-300 rounded-xl cursor-pointer transition-all duration-300 text-center flex flex-col items-center justify-center bg-gray-50 hover:border-[#da3f0b] hover:bg-orange-50"
            onClick={() => fileInputRef.current?.click()}
        >
            <UploadIcon />
            <p className="mt-4 text-sm font-semibold text-gray-600">Click to upload logo</p>
            <p className="text-xs text-gray-500">PNG, JPG, SVG</p>
            <input
                type="file"
                ref={fileInputRef}
                onChange={onLogoChange}
                accept="image/png, image/jpeg, image/svg+xml"
                className="hidden"
            />
        </div>
      </ControlInput>

      <div className="grid grid-cols-2 gap-4">
        <ControlInput label="Dot Color">
          <div className="relative">
            <input
              type="color"
              value={dotColor}
              onChange={(e) => onDotColorChange(e.target.value)}
              className="w-full h-12 p-1 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
        </ControlInput>
        <ControlInput label="Background Color">
          <div className="relative">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="w-full h-12 p-1 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
        </ControlInput>
      </div>

      <ControlInput label="Dot Style">
        <select
          value={dotType}
          onChange={(e) => onDotTypeChange(e.target.value as DotType)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#da3f0b]/40 focus:border-[#da3f0b] transition"
        >
          <option value="square">Square</option>
          <option value="rounded">Rounded</option>
          <option value="extra-rounded">Extra Rounded</option>
        </select>
      </ControlInput>

      <ControlInput label="Corner 'Eye' Style">
        <select
          value={eyeType}
          onChange={(e) => onEyeTypeChange(e.target.value as CornerType)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#da3f0b]/40 focus:border-[#da3f0b] transition"
        >
          <option value="square">Square</option>
          <option value="extra-rounded">Rounded</option>
        </select>
      </ControlInput>
      
      <ControlInput label="Error Correction Level">
        <select
          value={errorCorrectionLevel}
          onChange={(e) => onErrorCorrectionLevelChange(e.target.value as ErrorCorrectionLevel)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#da3f0b]/40 focus:border-[#da3f0b] transition"
        >
          <option value="L">Low (recovers ~7% of data)</option>
          <option value="M">Medium (recovers ~15% of data)</option>
          <option value="Q">Quartile (recovers ~25% of data)</option>
          <option value="H">High (recovers ~30% of data)</option>
        </select>
      </ControlInput>

      <div className="mt-8 pt-6 border-t">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Download</h3>
        <div className="flex flex-col sm:flex-row gap-4">
            <button
                onClick={onDownloadPNG}
                className="w-full flex items-center justify-center bg-[#da3f0b] hover:bg-[#c3370a] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={!text}
            >
                <DownloadIcon />
                Download PNG
            </button>
            <button
                onClick={onDownloadSVG}
                className="w-full flex items-center justify-center bg-transparent text-gray-600 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 font-semibold py-3 px-6 rounded-lg transition-all"
                disabled={!text}
            >
                <DownloadIcon />
                Download SVG
            </button>
        </div>
      </div>
    </div>
  );
};
