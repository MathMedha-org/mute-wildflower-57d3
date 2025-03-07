"use client"

import { useEffect } from "react"

export function ScrollManager() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Force scroll to top
      window.scrollTo(0, 0)

      // Also try to scroll the document element and body
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0

      // If there's a main element, scroll it too
      const mainElement = document.querySelector("main")
      if (mainElement) {
        mainElement.scrollTop = 0
      }
    }
  }, [])

  return null
}

