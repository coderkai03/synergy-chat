import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Linkedin } from "lucide-react"

// Function to get skill color based on category
function getSkillColor(skill: string): string {
  const skillLower = skill.toLowerCase()
  
  // Frontend technologies
  if (skillLower.includes('react') || skillLower.includes('vue') || skillLower.includes('angular') || 
      skillLower.includes('javascript') || skillLower.includes('typescript') || skillLower.includes('html') || 
      skillLower.includes('css') || skillLower.includes('frontend') || skillLower.includes('tailwind') ||
      skillLower.includes('next.js') || skillLower.includes('nuxt')) {
    return 'bg-blue-100 text-blue-800 hover:bg-blue-200'
  }
  
  // Backend technologies
  if (skillLower.includes('node') || skillLower.includes('python') || skillLower.includes('java') || 
      skillLower.includes('backend') || skillLower.includes('api') || skillLower.includes('server') ||
      skillLower.includes('express') || skillLower.includes('django') || skillLower.includes('flask') ||
      skillLower.includes('spring') || skillLower.includes('golang') || skillLower.includes('rust') ||
      skillLower.includes('php') || skillLower.includes('ruby')) {
    return 'bg-green-100 text-green-800 hover:bg-green-200'
  }
  
  // Database technologies
  if (skillLower.includes('database') || skillLower.includes('sql') || skillLower.includes('mongodb') ||
      skillLower.includes('postgresql') || skillLower.includes('mysql') || skillLower.includes('redis') ||
      skillLower.includes('firebase') || skillLower.includes('supabase')) {
    return 'bg-purple-100 text-purple-800 hover:bg-purple-200'
  }
  
  // AI/ML technologies
  if (skillLower.includes('ai') || skillLower.includes('ml') || skillLower.includes('machine learning') ||
      skillLower.includes('tensorflow') || skillLower.includes('pytorch') || skillLower.includes('opencv') ||
      skillLower.includes('nlp') || skillLower.includes('deep learning') || skillLower.includes('data science')) {
    return 'bg-orange-100 text-orange-800 hover:bg-orange-200'
  }
  
  // Mobile technologies
  if (skillLower.includes('mobile') || skillLower.includes('ios') || skillLower.includes('android') ||
      skillLower.includes('react native') || skillLower.includes('flutter') || skillLower.includes('swift') ||
      skillLower.includes('kotlin')) {
    return 'bg-pink-100 text-pink-800 hover:bg-pink-200'
  }
  
  // Design and UI/UX
  if (skillLower.includes('design') || skillLower.includes('ui') || skillLower.includes('ux') ||
      skillLower.includes('figma') || skillLower.includes('sketch') || skillLower.includes('adobe') ||
      skillLower.includes('photoshop') || skillLower.includes('illustrator')) {
    return 'bg-rose-100 text-rose-800 hover:bg-rose-200'
  }
  
  // DevOps and Infrastructure
  if (skillLower.includes('devops') || skillLower.includes('docker') || skillLower.includes('kubernetes') ||
      skillLower.includes('aws') || skillLower.includes('azure') || skillLower.includes('gcp') ||
      skillLower.includes('terraform') || skillLower.includes('jenkins') || skillLower.includes('ci/cd')) {
    return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
  }
  
  // Blockchain and Crypto
  if (skillLower.includes('blockchain') || skillLower.includes('solidity') || skillLower.includes('web3') ||
      skillLower.includes('smart contracts') || skillLower.includes('ethereum') || skillLower.includes('crypto')) {
    return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
  }
  
  // Default color for uncategorized skills
  return 'bg-slate-100 text-slate-800 hover:bg-slate-200'
}

export function HackerCard({ hacker }: { hacker: Hacker }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border">
            <AvatarFallback>{hacker.name.charAt(0)}</AvatarFallback>
            <AvatarImage src={hacker.avatar || `/placeholder.svg?height=48&width=48`} />
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{hacker.name}</h3>
            <p className="text-sm text-muted-foreground">{hacker.role}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-3">
          <p className="text-sm">{hacker.bio}</p>
        </div>

        {hacker.experience && (
          <div className="mb-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">Experience</p>
            <p className="text-sm">{hacker.experience}</p>
          </div>
        )}

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Skills</p>
          <div className="flex flex-wrap gap-1">
            {hacker.skills.map((skill, index) => (
              <Badge 
                key={index} 
                className={`text-xs border-0 ${getSkillColor(skill)}`}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        {hacker.contact.github && (
          <Button variant="outline" size="icon" asChild>
            <a href={hacker.contact.github} target="_blank" rel="noopener noreferrer" title="GitHub">
              <Github className="h-4 w-4" />
            </a>
          </Button>
        )}
        {hacker.contact.linkedin && (
          <Button variant="outline" size="icon" asChild>
            <a href={hacker.contact.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
        )}
        {hacker.contact.discord && (
          <Button variant="outline" asChild>
            <span title="Discord" className="inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-discord" viewBox="0 0 16 16">
                <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
              </svg>
              {hacker.contact.discord}
            </span>
          </Button>
        )}
        <Button className="ml-auto">Connect</Button>
      </CardFooter>
    </Card>
  )
}
