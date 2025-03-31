"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function ScrollToTop() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)

  // Change the page check to include both dashboard and progress pages
  // Replaced:
  // const isProgressPage = pathname === "/dashboard/progress"
  // With:
  const shouldShowButton = pathname === "/dashboard/progress" || pathname === "/dashboard"

  useEffect(() => {
    // This needs to run on every pathname change
    window.scrollTo(0, 0)

    // Also try to scroll the document element and body
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // If there's a main element, scroll it too
    const mainElement = document.querySelector("main")
    if (mainElement) {
      mainElement.scrollTop = 0
    }

    // Add scroll event listener to show/hide the button
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, []) // Removed pathname as a dependency

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Only render on the dashboard and progress pages
  // Replaced:
  // Only render on the progress page
  // if (!isProgressPage) return null
  // With:
  if (!shouldShowButton) return null

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 right-4 w-14 h-14 flex items-center justify-center z-[60] hover:scale-110 transition-transform duration-200"
          aria-label="Scroll to top"
          style={{
            animation: "float 2s ease-in-out infinite",
          }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/astronaut-new-2-Z9x9M5EccqWTqSNwH02535f45A2WRS.png"
            alt="Astronaut - Scroll to top"
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </button>
      )}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </>
  )
}

