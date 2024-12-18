import { ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, Loader2 } from 'lucide-react'

interface FileUploaderProps {
  onFileChange: (file: File) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
}

export function FileUploader({ onFileChange, onSubmit, isLoading }: FileUploaderProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0])
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 dark:border-blue-700 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-blue-500 dark:text-blue-400" />
                <p className="mb-2 text-sm text-blue-600 dark:text-blue-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Image or Video (MP4, AVI, MOV)</p>
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*,video/*"
                onChange={handleFileChange}
                required
              />
            </label>
          </div>
          <div className="flex justify-center mt-6">
            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Detect Number Plates'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

