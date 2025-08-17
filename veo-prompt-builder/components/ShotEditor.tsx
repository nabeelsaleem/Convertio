import React, { useState } from 'react';
import { Shot } from '../types';
import TrashIcon from './icons/TrashIcon';
import ChevronUpIcon from './icons/ChevronUpIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import Select from './ui/Select';
import Slider from './ui/Slider';

interface ShotEditorProps {
  shot: Shot;
  index: number;
  totalShots: number;
  updateShot: (id: number, field: keyof Shot, value: any) => void;
  removeShot: (id: number) => void;
  moveShot: (index: number, direction: 'up' | 'down') => void;
}

const PRESETS = {
  "Noir City": "A rainy noir city at midnight, cinematic, high contrast, shadows, neon signs reflecting on wet pavement.",
  "Fantasy Forest": "An enchanted forest, bioluminescent mushrooms, ancient trees with glowing runes, ethereal mist, fantasy art style.",
  "Product Macro": "Macro shot of a luxury watch, clean studio lighting, sharp focus, high detail, product photography.",
};

const SAFETY_NEGATIVES = "blurry, distorted, low resolution, watermark, ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs, disfigured, deformed, body out of frame, bad anatomy, blurred, grainy, signature, cut off, draft";

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">{title}</h3>
    {children}
  </div>
);

const ShotEditor: React.FC<ShotEditorProps> = ({ shot, index, totalShots, updateShot, removeShot, moveShot }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleChange = (field: keyof Shot, value: any) => {
    updateShot(shot.id, field, value);
  };

  const handlePreset = (presetValue: string) => {
    const newValue = shot.scene ? `${shot.scene}, ${presetValue}` : presetValue;
    handleChange('scene', newValue);
  };
  
  const handleAddSafetyNegatives = () => {
    const newValue = shot.negativePrompt ? `${shot.negativePrompt}, ${SAFETY_NEGATIVES}` : SAFETY_NEGATIVES;
    handleChange('negativePrompt', newValue);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800">
            Shot #{index + 1}
          </h2>
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-gray-500 hover:text-gray-800">
            {isCollapsed ? 'Show' : 'Hide'} Details
          </button>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={() => moveShot(index, 'up')} disabled={index === 0} className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronUpIcon className="w-5 h-5" />
          </button>
          <button onClick={() => moveShot(index, 'down')} disabled={index === totalShots - 1} className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronDownIcon className="w-5 h-5" />
          </button>
          <button onClick={() => removeShot(shot.id)} className="p-2 rounded-md text-red-500 hover:bg-red-50">
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="space-y-8">
          {/* Scene Setting */}
          <Section title="Scene Setting">
            <textarea
              value={shot.scene}
              onChange={(e) => handleChange('scene', e.target.value)}
              placeholder="e.g., A futuristic city with flying cars"
              className="w-full h-24 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#da3f0b] focus:border-[#da3f0b]"
            />
            <div className="flex flex-wrap gap-2">
              {Object.entries(PRESETS).map(([name, value]) => (
                <button key={name} onClick={() => handlePreset(value)} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
                  {name}
                </button>
              ))}
            </div>
          </Section>
          
          {/* Negative Prompts */}
          <Section title="Negative Prompts">
             <textarea
              value={shot.negativePrompt}
              onChange={(e) => handleChange('negativePrompt', e.target.value)}
              placeholder="e.g., blurry, distorted faces"
              className="w-full h-20 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#da3f0b] focus:border-[#da3f0b]"
            />
            <button onClick={handleAddSafetyNegatives} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
              Add Default Safety Negatives
            </button>
          </Section>

          {/* Shot Configuration */}
          <Section title="Shot Configuration">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select label="Camera Angle" value={shot.cameraAngle} onChange={e => handleChange('cameraAngle', e.target.value)} options={[
                  {value: 'wide', label: 'Wide'}, {value: 'pov', label: 'Point of View'}, {value: 'drone', label: 'Drone'}, {value: 'close-up', label: 'Close-up'}, {value: 'eye-level', label: 'Eye-level'}
              ]}/>
              <Select label="Camera Movement" value={shot.cameraMovement} onChange={e => handleChange('cameraMovement', e.target.value)} options={[
                  {value: 'static', label: 'Static'}, {value: 'pan', label: 'Pan'}, {value: 'dolly', label: 'Dolly'}, {value: 'tilt', label: 'Tilt'}, {value: 'zoom', label: 'Zoom'}
              ]}/>
              <Select label="Lighting" value={shot.lighting} onChange={e => handleChange('lighting', e.target.value)} options={[
                  {value: 'natural', label: 'Natural'}, {value: 'cinematic', label: 'Cinematic'}, {value: 'neon', label: 'Neon'}, {value: 'softbox', label: 'Softbox'}, {value: 'dramatic', label: 'Dramatic'}
              ]}/>
              <Select label="Aspect Ratio" value={shot.aspectRatio} onChange={e => handleChange('aspectRatio', e.target.value)} options={[
                  {value: '16:9', label: '16:9'}, {value: '9:16', label: '9:16'}, {value: '1:1', label: '1:1'}, {value: '4:3', label: '4:3'}
              ]}/>
              <Select label="Resolution" value={shot.resolution} onChange={e => handleChange('resolution', e.target.value)} options={[
                  {value: '720p', label: '720p'}, {value: '1080p', label: '1080p'}, {value: '4K', label: '4K'}
              ]}/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <Slider label="Duration (seconds)" value={shot.duration} onChange={e => handleChange('duration', parseInt(e.target.value))} min={1} max={30} />
              <Slider label="Frame Rate (fps)" value={shot.frameRate} onChange={e => handleChange('frameRate', parseInt(e.target.value))} min={12} max={60} step={1} />
              <Slider label="Contrast" value={shot.contrast} onChange={e => handleChange('contrast', parseInt(e.target.value))} min={0} max={100} />
              <Slider label="Saturation" value={shot.saturation} onChange={e => handleChange('saturation', parseInt(e.target.value))} min={0} max={100} />
              <Slider label="Color Grading" value={shot.colorGrading} onChange={e => handleChange('colorGrading', parseInt(e.target.value))} min={-100} max={100} minLabel="Cool" maxLabel="Warm"/>
            </div>
          </Section>

          {/* Shot Notes */}
          <Section title="Shot Notes">
            <textarea
                value={shot.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Client wants warmer tones..."
                className="w-full h-20 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#da3f0b] focus:border-[#da3f0b]"
            />
          </Section>
        </div>
      )}
    </div>
  );
};

export default ShotEditor;
