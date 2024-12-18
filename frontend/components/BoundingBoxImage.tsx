import { useRef, useEffect } from 'react';
import { DetectionResult } from '@/types/detection';

interface BoundingBoxImageProps {
  imageUrl: string;
  results: DetectionResult[];
}

export function BoundingBoxImage({ imageUrl, results }: BoundingBoxImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = imageUrl; // Use the raw image URL from the frontend
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // Set canvas size to the image's intrinsic dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // Draw bounding boxes and OCR text from the backend results
      results.forEach(({ bbox, ocr_text }) => {
        const [x1, y1, x2, y2] = bbox.map(Math.round); // Round coordinates to integers

        // Draw bounding box
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

        // Draw OCR text above the bounding box
        ctx.fillStyle = 'red';
        ctx.font = '16px Arial';
        ctx.fillText(ocr_text, x1, y1 - 5);
      });
    };
  }, [imageUrl, results]);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Canvas for displaying the image and bounding boxes */}
      <canvas ref={canvasRef} className="w-full h-auto" />
    </div>
  );
}
