import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { features } from "@/lib/landing-page-data"

export function FeaturesSection() {
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold">How Synergy Works</h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered platform makes finding the right teammates as easy as having a conversation
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <CardHeader className="space-y-6">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 