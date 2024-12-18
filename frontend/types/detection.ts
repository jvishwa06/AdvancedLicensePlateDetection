export interface DetectionResult {
  bbox: [number, number, number, number] // [x, y, width, height]
  confidence: number
  class: string
  ocr_text: string
  frame?: number
}

