'use client'

import { useState } from 'react'
import { FileUploader } from './FileUploader'
import { ImagePreview } from './ImagePreview'
import { VideoPreview } from './VideoPreview'
import { ResultsDisplay } from './ResultsDisplay'
import { BoundingBoxImage } from './BoundingBoxImage'
import { DetectionResult } from '@/types/detection'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'

export default function NumberPlateDetection() {
  const [file, setFile] = useState<File | null>(null)
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [results, setResults] = useState<DetectionResult[] | null>(null)
  const [annotatedUrl, setAnnotatedUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile)
    setPreviewUrl(URL.createObjectURL(selectedFile))
    setResults(null)
    setAnnotatedUrl(null)
    setError(null)
    setFileType(selectedFile.type.startsWith('image/') ? 'image' : 'video')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to process the file')
      }

      const data = await response.json()
      setResults(data.results)
      setAnnotatedUrl(data.annotated_file_path)
    } catch (err) {
      setError('An error occurred while processing the file. Please try again.')
      console.error('Error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <FileUploader onFileChange={handleFileChange} onSubmit={handleSubmit} isLoading={isLoading} />
      {previewUrl && fileType === 'image' && <ImagePreview url={previewUrl} alt="Preview" />}
      {previewUrl && fileType === 'video' && <VideoPreview url={previewUrl} />}
      {isLoading && (
        <Alert className="bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800">
          <Loader2 className="h-4 w-4 animate-spin text-blue-500 dark:text-blue-400" />
          <AlertTitle className="text-blue-800 dark:text-blue-200">Processing</AlertTitle>
          <AlertDescription className="text-blue-600 dark:text-blue-300">
            Please wait while we analyze the file...
          </AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {results && fileType === 'image' && previewUrl && (
        <BoundingBoxImage imageUrl={previewUrl} results={results} />
      )}
      {annotatedUrl && fileType === 'video' && <VideoPreview url={annotatedUrl} />}
      {results && <ResultsDisplay results={results} />}
    </div>
  )
}

