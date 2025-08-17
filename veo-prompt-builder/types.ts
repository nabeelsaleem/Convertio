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


/*
  NOTE: The types below are for unused PDF signing components and can be considered for cleanup.
  They are included here to resolve compilation errors.
*/

/**
 * A signature created by the user (drawn, typed, or uploaded)
 */
export interface Signature {
  id: string;
  type: 'draw' | 'type' | 'upload';
  dataUrl: string;
}

/**
 * A signature that has been placed on a PDF page
 */
export interface RenderedSignature extends Signature {
  pageIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Represents an uploaded PDF file with its thumbnail and rotation state
 */
export interface PdfFile {
  id: string;
  file: File;
  thumbnailUrl: string;
  rotation: number;
}

/**
 * Represents a PDF document loaded by pdf.js
 */
export interface PdfDocument {
  getPage: (pageNumber: number) => Promise<{
    getViewport: (options: { scale: number }) => { width: number, height: number };
    render: (options: { canvasContext: CanvasRenderingContext2D, viewport: any }) => { promise: Promise<void> };
  }>;
  numPages: number;
}
