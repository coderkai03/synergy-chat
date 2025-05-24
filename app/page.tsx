"use client"

import { useState } from "react"
import { LoginModal } from "@/components/login-modal"
import { HeroSection } from "@/components/landing/hero-section"
import { SkillsSection } from "@/components/landing/skills-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"
import { useLogin } from "@/lib/use-login"

export default function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { addUser, error } = useLogin()

  const handleLogin = async (credentials: UserCredentials) => {
    try {
      const success = await addUser(credentials)
      
      if (success) {
        setShowLoginModal(false)
      } else {
        // Handle error case - the error is available in the error state from useLogin
        console.error('Failed to add user:', error)
      }
    } catch (err) {
      console.error('Error during login:', err)
    }
  }  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      <main className="space-y-0">
        <HeroSection 
          onJoinWaitlist={handleLogin}
        />
        
        <SkillsSection />
        
        <FeaturesSection />
        
        <HowItWorksSection />
        
        <CTASection 
          onGetStarted={handleLogin}
        />
      </main>
      
      <Footer />

      <LoginModal 
        isOpen={showLoginModal}
        onLogin={handleLogin}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  )
} 