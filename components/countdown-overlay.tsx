"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface CountdownOverlayProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  subtitle?: string
  studentsCount?: number
  redirectPath: string
  color?: string
}

export function CountdownOverlay({
  isOpen,
  onOpenChange,
  title = "Joining the adventure...",
  subtitle = "Please wait for your classmates to come on an epic adventure with you!",
  studentsCount = 20,
  redirectPath,
  color = "#00509d",
}: CountdownOverlayProps) {
  const [countdown, setCountdown] = useState(15)
  const router = useRouter()

  useEffect(() => {
    if (!isOpen) {
      setCountdown(15)
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push(redirectPath)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen, router, redirectPath])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md bg-white border-none shadow-md"
        style={{ "--close-button-color": color } as React.CSSProperties}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 w-8 h-8 rounded-full flex items-center justify-center opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          style={{ backgroundColor: color }}
        >
          <X className="h-5 w-5 text-white" strokeWidth={2.5} />
          <span className="sr-only">Close</span>
        </button>
        <div className="flex flex-col items-center justify-center p-6">
          <div
            className={`w-32 h-32 rounded-full flex items-center justify-center mb-6`}
            style={{ backgroundColor: color }}
          >
            <span className="text-4xl font-bold text-white">{countdown}</span>
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: color }}>
            {title}
          </h2>
          <p className="text-gray-500 text-center mb-2">{subtitle}</p>
          <p className="font-semibold mt-4" style={{ color: color }}>
            Students joined: {studentsCount}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

