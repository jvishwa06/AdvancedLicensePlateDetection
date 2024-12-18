import { Card, CardContent } from '@/components/ui/card'

interface VideoPreviewProps {
  url: string
}

export function VideoPreview({ url }: VideoPreviewProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
      <CardContent className="p-2">
        <video 
          src={url} 
          controls 
          className="w-full h-auto rounded-lg"
        >
          Your browser does not support the video tag.
        </video>
      </CardContent>
    </Card>
  )
}

