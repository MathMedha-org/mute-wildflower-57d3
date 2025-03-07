import type React from "react"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function SettingsLayout({
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

