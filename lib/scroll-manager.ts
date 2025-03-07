"use client"

export const scrollToTop = () => {
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
}

export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({
      behavior: "instant",
      block: "start",
    })
  }
}

