"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface QuizContextType {
  isKeypadVisible: boolean
  setIsKeypadVisible: (value: boolean) => void
  isMuted: boolean
  setIsMuted: (value: boolean) => void
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [isKeypadVisible, setIsKeypadVisible] = useState(true)
  const [isMuted, setIsMuted] = useState(false)

  return (
    <QuizContext.Provider value={{ isKeypadVisible, setIsKeypadVisible, isMuted, setIsMuted }}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider")
  }
  return context
}

