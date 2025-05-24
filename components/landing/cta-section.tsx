"use client"

import { CTAButton } from "@/components/ui/cta-button"
import { Sparkles } from "lucide-react"

interface CTASectionProps {
  onGetStarted: (credentials: UserCredentials) => void
}

export function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="container mx-auto px-6 py-24 text-center">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold">Ready to Find Your Dream Team?</h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of developers who are already using Synergy to build amazing projects together.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <CTAButton onClick={onGetStarted} icon={Sparkles}>
            Join Waitlist
          </CTAButton>
        </div>
      </div>
    </section>
  )
} 