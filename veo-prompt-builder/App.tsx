import React, { useState } from 'react';
import { Shot } from './types';
import ShotEditor from './components/ShotEditor';
import JsonPreview from './components/JsonPreview';
import PlusIcon from './components/icons/PlusIcon';

const createNewShot = (): Shot => ({
  id: Date.now(),
  scene: '',
  negativePrompt: '',
  cameraAngle: 'wide',
  cameraMovement: 'static',
  lighting: 'natural',
  aspectRatio: '16:9',
  resolution: '1080p',
  duration: 5,
  frameRate: 24,
  contrast: 50,
  saturation: 50,
  colorGrading: 0,
  notes: '',
});

const App: React.FC = () => {
  const [shots, setShots] = useState<Shot[]>([createNewShot()]);
  const [templateType, setTemplateType] = useState<'Image' | 'Video'>('Video');

  const addShot = () => {
    setShots(prev => [...prev, createNewShot()]);
  };

  const removeShot = (id: number) => {
    setShots(prev => prev.length > 1 ? prev.filter(shot => shot.id !== id) : prev);
  };
  
  const updateShot = (id: number, field: keyof Shot, value: any) => {
    setShots(prev => prev.map(shot => shot.id === id ? { ...shot, [field]: value } : shot));
  };
  
  const moveShot = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === shots.length - 1) return;

    const newShots = [...shots];
    const shotToMove = newShots[index];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    newShots[index] = newShots[swapIndex];
    newShots[swapIndex] = shotToMove;
    setShots(newShots);
  };
  
  const isImageTemplate = templateType === 'Image';

  return (
    <div className="min-h-screen p-4 md:p-8">
      <main className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">VEO Prompt Builder</h1>
            <p className="text-gray-500 mt-2">Visually construct and export prompts for video generation models.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Editors */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Global Settings</h2>
                <div className="flex items-center gap-4">
                  <label className="font-medium">Template:</label>
                  <div className="flex rounded-lg p-1 bg-gray-100">
                    <button onClick={() => setTemplateType('Video')} className={`px-4 py-1 text-sm font-semibold rounded-md transition-colors ${templateType === 'Video' ? 'bg-[#da3f0b] text-white' : 'text-gray-600'}`}>Video</button>
                    <button onClick={() => setTemplateType('Image')} className={`px-4 py-1 text-sm font-semibold rounded-md transition-colors ${templateType === 'Image' ? 'bg-[#da3f0b] text-white' : 'text-gray-600'}`}>Image</button>
                  </div>
                </div>
                 {isImageTemplate && <p className="text-sm text-gray-500 mt-2">Image mode uses only the first shot.</p>}
            </div>

            {isImageTemplate ? (
              <ShotEditor
                key={shots[0].id}
                shot={shots[0]}
                index={0}
                totalShots={1}
                updateShot={updateShot}
                removeShot={removeShot}
                moveShot={moveShot}
              />
            ) : (
              shots.map((shot, index) => (
                <ShotEditor
                  key={shot.id}
                  shot={shot}
                  index={index}
                  totalShots={shots.length}
                  updateShot={updateShot}
                  removeShot={removeShot}
                  moveShot={moveShot}
                />
              ))
            )}

            {!isImageTemplate && (
              <button
                onClick={addShot}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-dashed border-gray-300 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
                Add Another Shot
              </button>
            )}
          </div>

          {/* Right Column: JSON Preview */}
          <div className="w-full">
            <JsonPreview shots={isImageTemplate ? [shots[0]] : shots} templateType={templateType} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
