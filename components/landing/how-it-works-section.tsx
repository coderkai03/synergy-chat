export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Sign Up",
      description: "Connect with your GitHub account to get started instantly"
    },
    {
      number: 2,
      title: "Describe Your Needs", 
      description: "Tell our AI what skills and experience you're looking for"
    },
    {
      number: 3,
      title: "Connect & Build",
      description: "Get matched with perfect teammates and start building together"
    }
  ]

  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold">Three Simple Steps</h2>
          </div>
          
          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step) => (
              <div key={step.number} className="text-center space-y-6">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-lg">
                  {step.number}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl lg:text-2xl font-semibold">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 