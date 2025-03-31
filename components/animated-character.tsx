"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface AnimatedCharacterProps {
  currentPosition: { x: number; y: number }
  targetPosition: { x: number; y: number }
  isMoving: boolean
  onArrival?: () => void
}

export function AnimatedCharacter({ currentPosition, targetPosition, isMoving, onArrival }: AnimatedCharacterProps) {
  const characterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMoving && onArrival) {
      const timer = setTimeout(onArrival, 1000) // Trigger arrival after animation
      return () => clearTimeout(timer)
    }
  }, [isMoving, onArrival])

  return (
    <motion.div
      ref={characterRef}
      className="absolute z-30 w-16 h-16"
      animate={{
        x: targetPosition.x,
        y: targetPosition.y,
        scale: isMoving ? 1.1 : 1,
      }}
      initial={{
        x: currentPosition.x,
        y: currentPosition.y,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
      }}
    >
      <div className="relative w-full h-full">
        {/* Character */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/astronaut-new-2-Z9x9M5EccqWTqSNwH02535f45A2WRS.png"
          alt="Student Avatar"
          className="w-full h-full object-contain"
        />

        {/* Movement effect */}
        {isMoving && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-8 animate-ping rounded-full bg-[#50adb6]/30"></div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

