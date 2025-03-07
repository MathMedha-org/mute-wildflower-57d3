import type React from "react"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  )
}

