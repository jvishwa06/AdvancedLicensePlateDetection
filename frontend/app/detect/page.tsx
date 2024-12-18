import NumberPlateDetection from '@/components/NumberPlateDetection'

export default function DetectPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
        Number Plate Detection
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Upload an image containing vehicle number plates, and our AI will detect and recognize them for you.
      </p>
      <NumberPlateDetection />
    </div>
  )
}

