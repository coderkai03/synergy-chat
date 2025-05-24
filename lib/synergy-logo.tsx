import { Zap } from "lucide-react"

export interface SynergyLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6", 
  lg: "h-8 w-8",
  xl: "h-12 w-12"
}

export function SynergyLogo({ size = "md" }: SynergyLogoProps) {
  return (
    <Zap
      className={`${sizeMap[size]} rotate-[15deg] scale-x-[0.7]`}
      style={{ color: "#FFAD08" }}
    />
  )
}

// Export as default as well for convenience
export default SynergyLogo

// Also export just the logo configuration for use in other contexts
export const synergyLogoConfig = {
  color: "#FFAD08",
  rotation: "rotate-[15deg]",
  scale: "scale-x-[0.7]",
  margin: "-mr-1"
} 