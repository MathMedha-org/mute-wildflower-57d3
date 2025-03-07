import type React from "react"
import { SpaceBackground } from "@/components/space-background"
import { MainNav } from "@/components/main-nav"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen w-full">
      <ScrollToTop />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0F283D]/80 via-[#0F283D]/60 to-transparent backdrop-blur-sm" />
      <SpaceBackground />
      <div className="relative flex min-h-screen flex-col">
        <header className="sticky top-0 z-[80] w-full border-b border-[#50adb6] bg-[#0F283D]">
          <div className="w-full sm:max-w-7xl sm:mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <MainNav />
          </div>
        </header>
        <main className="flex-1">
          <div className="relative z-10">{children}</div>
        </main>
      </div>
    </div>
  )
}

