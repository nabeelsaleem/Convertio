import React from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: number | string;
  minLabel?: string;
  maxLabel?: string;
}

const Slider: React.FC<SliderProps> = ({ label, value, minLabel, maxLabel, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="flex items-center gap-4">
      <input
        type="range"
        {...props}
        value={value}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#da3f0b]"
      />
      <span className="text-sm font-semibold text-gray-800 w-12 text-center">{value}</span>
    </div>
    {(minLabel || maxLabel) && (
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    )}
  </div>
);

export default Slider;
