"use client"

import { CTAButton } from "@/components/ui/cta-button"
import { Sparkles } from "lucide-react"
import { stats } from "@/lib/landing-page-data"

interface HeroSectionProps {
  onJoinWaitlist: (credentials: UserCredentials) => void
}

export function HeroSection({ onJoinWaitlist }: HeroSectionProps) {
  return (
    <section className="container mx-auto px-6 py-24 text-center">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Main Hero Content */}
        <div className="space-y-8">
          <h1 className="text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Find Your Perfect <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Hackathon Teammates
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Skip the tedious searching. Use AI to instantly connect with developers, designers, 
            and innovators who complement your skills and share your vision.
          </p>
        </div>
        
        {/* CTA Button */}
        <div className="flex justify-center">
          <CTAButton
            onClick={() => onJoinWaitlist({
              github: "",
              linkedin: "",
              discord: ""
            })}
            icon={Sparkles}>
            Join Waitlist
          </CTAButton>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto pt-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 