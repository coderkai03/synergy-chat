import { 
  Brain, 
  MessageSquare, 
  Users, 
  Zap,
  Code,
  Palette,
  Shield
} from "lucide-react"

export const features = [
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI-Powered Matching",
    description: "Our intelligent system analyzes skills, interests, and experience to find your perfect hackathon teammates."
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Natural Conversations", 
    description: "Simply tell us what you're looking for in natural language, and we'll find the right people for your team."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Diverse Community",
    description: "Connect with developers, designers, product managers, and domain experts from around the world."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Fast & Efficient", 
    description: "Get matched with potential teammates in seconds, not hours. Focus on building, not searching."
  }
]

export const skillCategories = [
  { name: "Frontend", icon: <Code className="h-4 w-4" />, color: "bg-blue-100 text-blue-800" },
  { name: "Backend", icon: <Shield className="h-4 w-4" />, color: "bg-green-100 text-green-800" },
  { name: "UI/UX", icon: <Palette className="h-4 w-4" />, color: "bg-purple-100 text-purple-800" },
  { name: "AI/ML", icon: <Brain className="h-4 w-4" />, color: "bg-orange-100 text-orange-800" },
  { name: "Mobile", icon: <Code className="h-4 w-4" />, color: "bg-pink-100 text-pink-800" },
  { name: "DevOps", icon: <Shield className="h-4 w-4" />, color: "bg-gray-100 text-gray-800" }
]

export const stats = [
  { value: "1000+", label: "Active Developers" },
  { value: "50+", label: "Skills Covered" },
  { value: "24/7", label: "AI Matching" }
] 