import type React from "react"

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  // Removed default background color to allow custom styling
  return <div className={`rounded-lg ${className}`}>{children}</div>
}

export const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`p-4 ${className || ""}`}>{children}</div>
}

export const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <h2 className={`text-lg font-semibold ${className || ""}`}>{children}</h2>
}

export const CardDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <p className={`text-sm ${className || ""}`}>{children}</p>
}

export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`p-4 ${className || ""}`}>{children}</div>
}

