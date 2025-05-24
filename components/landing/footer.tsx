import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <Zap className="h-8 w-8" />
          <span className="text-2xl font-bold">⚡ynergy</span>
        </div>
        <p className="text-gray-400 text-lg">
          Connecting innovators, one hackathon at a time.
        </p>
      </div>
    </footer>
  )
} 