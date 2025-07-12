// From pdf.js
export type PdfDocument = any;

export interface PdfFile {
  id: string;
  file: File;
  thumbnailUrl: string;
  rotation: number;
}

export interface Signature {
  id: string;
  type: 'draw' | 'type' | 'upload';
  dataUrl: string; // base64 data URL
}

export interface PlacedSignature {
  id: string;
  signatureId: string;
  pageIndex: number; // 0-based
  x: number; // position on canvas
  y: number;
  width: number;
  height: number;
}

// Combined for rendering
export interface RenderedSignature extends PlacedSignature {
  dataUrl: string;
}