import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { QuizProvider } from "@/contexts/quiz-context"
import { CookieConsent } from "@/components/cookie-consent"
import { ScrollToTop } from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Space Math Quiz",
  description: "An interactive space-themed math learning platform",
    generator: 'v0.dev'
}

// Force scroll restoration to work in App Router
export const dynamic = "force-dynamic"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: "auto" }}>
      <body className={`${inter.className} bg-black min-h-screen`} style={{ scrollBehavior: "auto" }}>
        <QuizProvider>
          <ScrollToTop />
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <CookieConsent />
          </div>
        </QuizProvider>
      </body>
    </html>
  )
}



import './globals.css'