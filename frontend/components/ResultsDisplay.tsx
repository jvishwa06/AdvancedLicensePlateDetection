import { DetectionResult } from '@/types/detection'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ResultsDisplayProps {
  results: DetectionResult[]
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Detection Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((result, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-blue-600 dark:text-blue-400">
                {result.frame ? `Frame ${result.frame} - Plate ${index + 1}` : `Plate ${index + 1}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p><span className="font-medium text-gray-700 dark:text-gray-300">OCR Text:</span> <span className="text-gray-900 dark:text-white">{result.ocr_text || 'N/A'}</span></p>
              <p><span className="font-medium text-gray-700 dark:text-gray-300">Confidence:</span> <span className="text-gray-900 dark:text-white">{(result.confidence * 100).toFixed(2)}%</span></p>
              <p><span className="font-medium text-gray-700 dark:text-gray-300">Class:</span> <span className="text-gray-900 dark:text-white">{result.class}</span></p>
              <p><span className="font-medium text-gray-700 dark:text-gray-300">Bounding Box:</span> <span className="text-gray-900 dark:text-white">{result.bbox.map((coord) => coord.toFixed(2)).join(', ')}</span></p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

