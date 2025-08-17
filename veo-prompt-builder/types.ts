export interface Shot {
  id: number;
  scene: string;
  negativePrompt: string;
  // Shot Configuration
  cameraAngle: 'wide' | 'pov' | 'drone' | 'close-up' | 'eye-level';
  cameraMovement: 'static' | 'pan' | 'dolly' | 'tilt' | 'zoom';
  lighting: 'natural' | 'cinematic' | 'neon' | 'softbox' | 'dramatic';
  aspectRatio: '16:9' | '9:16' | '1:1' | '4:3';
  resolution: '720p' | '1080p' | '4K';
  // Sliders
  duration: number; // in seconds
  frameRate: number; // fps
  contrast: number; // 0-100
  saturation: number; // 0-100
  colorGrading: number; // -100 (cool) to 100 (warm)
  // Notes
  notes: string;
}

// Types for PDF signing functionality

export interface PdfPage {
  getViewport: (options: { scale: number }) => { width: number; height: number };
  render: (options: { canvasContext: CanvasRenderingContext2D; viewport: any }) => { promise: Promise<void> };
}

export interface PdfDocument {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfPage>;
}

export interface Signature {
  id: string;
  type: 'draw' | 'type' | 'upload';
  dataUrl: string;
}

export interface RenderedSignature extends Signature {
  x: number;
  y: number;
  width: number;
  height: number;
  pageIndex: number;
}

export interface PdfFile {
  id: string;
  file: File;
  thumbnailUrl: string;
  rotation: number;
}
