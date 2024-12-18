import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Camera, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-xl">
        <h1 className="text-5xl font-bold mb-4">Automatic Number Plate Detection System</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Harness the power of AI to detect and recognize vehicle number plates with unparalleled accuracy and speed.</p>
        <Link href="/detect">
          <Button size="lg" variant="secondary">
            Try It Now
          </Button>
        </Link>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span>Advanced Detection</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="dark:text-gray-300">
              Our system uses state-of-the-art computer vision algorithms to accurately detect number plates in various conditions.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span>Real-time Processing</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="dark:text-gray-300">
              Get results in seconds with our high-performance backend, capable of processing images quickly and efficiently.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span>Secure & Private</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="dark:text-gray-300">
              Your data security is our priority. All uploaded images and detection results are handled with strict privacy measures.
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      <section className="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg shadow-inner">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">How It Works</h2>
        <ol className="list-decimal list-inside text-left max-w-2xl mx-auto space-y-4 text-gray-700 dark:text-gray-300">
          <li>Upload an image containing vehicle number plates.</li>
          <li>Our AI model analyzes the image to detect number plate locations.</li>
          <li>Optical Character Recognition (OCR) is applied to extract the plate numbers.</li>
          <li>Results are displayed, showing detected plates and their corresponding text.</li>
        </ol>
      </section>
    </div>
  )
}

