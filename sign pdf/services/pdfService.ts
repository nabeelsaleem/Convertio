
import { PdfDocument, RenderedSignature } from '../types';

// Access libraries from the global window object loaded via CDN
const { pdfjsLib } = (window as any);
const { PDFDocument, rgb } = (window as any).PDFLib;

/**
 * Loads a PDF file using pdf.js.
 * @param file The PDF file.
 * @returns A promise that resolves to the pdf.js document object.
 */
export const loadPdf = async (file: File): Promise<PdfDocument> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  return pdf;
};

/**
 * Renders a specific page of a PDF to a canvas.
 * @param pdfDoc The pdf.js document object.
 * @param pageNum The 1-based page number to render.
 * @param canvas The canvas element to render on.
 * @returns The scale used for rendering.
 */
export const renderPage = async (pdfDoc: PdfDocument, pageNum: number, canvas: HTMLCanvasElement): Promise<number> => {
    const page = await pdfDoc.getPage(pageNum);
    const desiredWidth = canvas.parentElement?.clientWidth || 800;
    const viewport = page.getViewport({ scale: 1 });
    const scale = desiredWidth / viewport.width;
    const scaledViewport = page.getViewport({ scale });

    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get canvas context');
    }

    canvas.height = scaledViewport.height;
    canvas.width = scaledViewport.width;

    await page.render({ canvasContext: context, viewport: scaledViewport }).promise;
    return scale;
};


/**
 * Saves a new PDF with embedded signatures.
 * @param originalPdfFile The original PDF file.
 * @param pdfDoc The pdf.js document object (for page dimensions).
 * @param signatures The signatures to embed.
 * @returns A promise that resolves to a Uint8Array of the new PDF.
 */
export const savePdf = async (originalPdfFile: File, pdfDoc: PdfDocument, signatures: RenderedSignature[]): Promise<Uint8Array> => {
    const existingPdfBytes = await originalPdfFile.arrayBuffer();
    const pdf = await PDFDocument.load(existingPdfBytes);
    const pages = pdf.getPages();

    for (const sig of signatures) {
        if (sig.pageIndex < pages.length) {
            const page = pages[sig.pageIndex];
            const { width: pageWidth, height: pageHeight } = page.getSize();
            const pageFromJs = await pdfDoc.getPage(sig.pageIndex + 1);
            const viewport = pageFromJs.getViewport({ scale: 1 });
            const scale = pageWidth / viewport.width;

            let image;
            try {
                if(sig.dataUrl.startsWith('data:image/png')) {
                    image = await pdf.embedPng(sig.dataUrl);
                } else {
                    image = await pdf.embedJpg(sig.dataUrl);
                }
            } catch (e) {
                console.error("Failed to embed image", e);
                continue;
            }

            page.drawImage(image, {
                x: sig.x / scale,
                y: pageHeight - (sig.y / scale) - (sig.height / scale),
                width: sig.width / scale,
                height: sig.height / scale,
            });
        }
    }

    return pdf.save();
};
