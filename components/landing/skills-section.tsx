import { Badge } from "@/components/ui/badge"
import { skillCategories } from "@/lib/landing-page-data"

export function SkillsSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">Find Teammates with Any Skill</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From frontend to AI/ML, connect with experts in every domain
            </p>
          </div>
          
          {/* Skills Grid */}
          <div className="flex flex-wrap gap-4 justify-center">
            {skillCategories.map((skill) => (
              <Badge 
                key={skill.name} 
                className={`${skill.color} px-6 py-3 text-base font-medium hover:scale-105 transition-transform cursor-pointer`}
              >
                {skill.icon}
                <span className="ml-2">{skill.name}</span>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 