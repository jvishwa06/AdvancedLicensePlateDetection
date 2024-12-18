import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

interface ImagePreviewProps {
  url: string
  alt: string
}

export function ImagePreview({ url, alt }: ImagePreviewProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
      <CardContent className="p-2">
        <div className="relative w-full aspect-video">
          <Image
            src={url}
            alt={alt}
            fill
            className="rounded-lg object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardContent>
    </Card>
  )
}

