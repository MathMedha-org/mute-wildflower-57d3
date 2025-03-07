"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import {
  ArrowLeft,
  Clock,
  Star,
  Award,
  CheckCircle,
  XCircle,
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight,
  BarChart2,
  Calculator,
  FileText,
  LineChart,
  Rocket,
  GraduationCap,
  Hash,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { ScrollToTop } from "@/components/scroll-to-top"

// Mock data for reports
const summaryData = {
  total: {
    timeSpent: "45.5 hrs",
    starsEarned: 120,
    badgesEarned: 8,
    correctAnswers: 1450,
    wrongAnswers: 320,
  },
  today: {
    timeSpent: "1.5 hrs",
    starsEarned: 5,
    badgesEarned: 1,
    correctAnswers: 42,
    wrongAnswers: 8,
  },
  lastWeek: {
    timeSpent: "8.2 hrs",
    starsEarned: 25,
    badgesEarned: 2,
    correctAnswers: 210,
    wrongAnswers: 45,
  },
}

// Generate mock data for reports table
const generateReportData = (month: number, year: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const reports = []

  for (let i = 1; i <= 20; i++) {
    const day = Math.floor(Math.random() * daysInMonth) + 1
    const hour = Math.floor(Math.random() * 12) + 8 // Between 8 AM and 8 PM
    const minute = Math.floor(Math.random() * 60)
    const date = new Date(year, month, day, hour, minute)

    const gameTypes = ["Addition", "Subtraction", "Multiplication", "Division", "Mixed"]
    const gameType = gameTypes[Math.floor(Math.random() * gameTypes.length)]

    const timeSpent = Math.floor(Math.random() * 30) + 5 // 5-35 minutes
    const correctAnswers = Math.floor(Math.random() * 20) + 5 // 5-25 correct answers
    const wrongAnswers = Math.floor(Math.random() * 10) // 0-10 wrong answers
    const totalQuestions = correctAnswers + wrongAnswers
    const score = Math.round((correctAnswers / totalQuestions) * 100)

    reports.push({
      id: i,
      date: date,
      timeSpent: `${timeSpent} min`,
      gameType: gameType,
      score: `${score}% (${correctAnswers}/${totalQuestions})`,
      correctAnswers,
      wrongAnswers,
    })
  }

  // Sort by date, most recent first
  return reports.sort((a, b) => b.date.getTime() - a.date.getTime())
}

// Generate mock data for performance graph
const generatePerformanceData = (month: number, year: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const gameTypes = ["Addition", "Subtraction", "Multiplication", "Division"]

  // Create an object to store data by game type
  const dataByGameType: Record<string, any[]> = {}

  // Initialize empty arrays for each game type
  gameTypes.forEach((type) => {
    dataByGameType[type] = []
  })

  // Generate data for each day and game type
  for (let day = 1; day <= daysInMonth; day++) {
    // Not every day has data for every game type
    gameTypes.forEach((gameType) => {
      if (Math.random() > 0.3) {
        const accuracy = Math.floor(Math.random() * 40) + 60 // 60-100% accuracy
        const timePerQuestion = Math.random() * 5 + 1 // 1-6 seconds per question

        dataByGameType[gameType].push({
          day,
          date: new Date(year, month, day),
          gameType,
          accuracy,
          timePerQuestion,
          questionsAnswered: Math.floor(Math.random() * 50) + 10, // 10-60 questions
        })
      }
    })
  }

  // Flatten the data for easier processing
  const flatData = Object.values(dataByGameType).flat()

  return {
    byDay: flatData.sort((a, b) => a.day - b.day),
    byGameType: dataByGameType,
  }
}

// Generate mock data for time tables performance
const generateTimeTablesData = () => {
  // Create a 19x19 grid (for numbers 2-20)
  const data: number[][] = []

  for (let i = 0; i < 19; i++) {
    data[i] = []
    for (let j = 0; j < 19; j++) {
      // Generate random speed between 1.0 and 6.0 seconds
      // Make it more likely to be faster for smaller numbers
      const baseSpeed = 1.0
      const complexity = ((i + 2) * (j + 2)) / 100 // Higher for larger numbers
      const randomVariation = Math.random() * 2

      // Calculate speed with some randomness but influenced by the complexity
      let speed = baseSpeed + complexity * randomVariation

      // Round to 1 decimal place
      speed = Math.round(speed * 10) / 10

      // Cap at 6.0 seconds
      speed = Math.min(speed, 6.0)

      data[i][j] = speed
    }
  }

  return data
}

// MonthPicker component
const MonthPicker = ({
  selectedDate,
  onChange,
  onClose,
}: {
  selectedDate: Date
  onChange: (date: Date) => void
  onClose: () => void
}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 3 }, (_, i) => currentYear - i)

  // Handler to prevent default behavior and scrolling
  const handleButtonClick = (e: React.MouseEvent, callback: () => void) => {
    e.preventDefault()
    e.stopPropagation()
    callback()
  }

  return (
    <div className="p-4 bg-[#163c5a] rounded-lg w-[280px]">
      {/* Years */}
      <div className="mb-4">
        <div className="text-sm font-medium text-white/70 mb-2">Year</div>
        <div className="grid grid-cols-3 gap-2">
          {years.map((year) => (
            <button
              key={year}
              type="button"
              onClick={(e) => handleButtonClick(e, () => onChange(new Date(year, selectedDate.getMonth())))}
              className={cn(
                "px-2 py-1.5 text-sm rounded-md transition-colors",
                year === selectedDate.getFullYear() ? "bg-[#50adb6] text-white" : "text-white/70 hover:bg-[#50adb6]/20",
              )}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Months */}
      <div>
        <div className="text-sm font-medium text-white/70 mb-2">Month</div>
        <div className="grid grid-cols-3 gap-2">
          {months.map((month, index) => (
            <button
              key={month}
              type="button"
              onClick={(e) => handleButtonClick(e, () => onChange(new Date(selectedDate.getFullYear(), index)))}
              className={cn(
                "px-2 py-1.5 text-sm rounded-md transition-colors",
                index === selectedDate.getMonth() ? "bg-[#50adb6] text-white" : "text-white/70 hover:bg-[#50adb6]/20",
              )}
            >
              {month}
            </button>
          ))}
        </div>
      </div>

      {/* Close button */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={(e) => handleButtonClick(e, onClose)}
          className="px-4 py-2 bg-[#50adb6] text-white rounded-md hover:bg-[#3d8a91] transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  )
}

// Navigation link component
const NavLink = ({
  icon,
  label,
  color,
  targetId,
}: { icon: React.ReactNode; label: string; color: string; targetId: string }) => {
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80 // Increase this value to account for header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <button
      onClick={(e) => scrollToSection(e, targetId)}
      className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all hover:bg-[#0F283D]/80 hover:scale-105`}
    >
      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white mb-1`}>{icon}</div>
      <span className="text-xs text-white/80 text-center">{label}</span>
    </button>
  )
}

export default function ReportsPage() {
  const [reportsDate, setReportsDate] = useState<Date>(new Date())
  const [graphDate, setGraphDate] = useState<Date>(new Date())
  const [isReportsCalendarOpen, setIsReportsCalendarOpen] = useState(false)
  const [isGraphCalendarOpen, setIsGraphCalendarOpen] = useState(false)

  const timeTablesData = generateTimeTablesData()

  // Generate data based on selected dates
  const reportData = generateReportData(reportsDate.getMonth(), reportsDate.getFullYear())
  const performanceData = generatePerformanceData(graphDate.getMonth(), graphDate.getFullYear())

  // Calculate monthly summary from report data
  const monthlySummary = {
    timeSpent: reportData.reduce((total, report) => {
      const minutes = Number.parseInt(report.timeSpent.split(" ")[0])
      return total + minutes
    }, 0),
    starsEarned: Math.floor(
      reportData.reduce((total, report) => {
        return total + report.correctAnswers / 5 // Assume 1 star per 5 correct answers
      }, 0),
    ),
    correctAnswers: reportData.reduce((total, report) => total + report.correctAnswers, 0),
    wrongAnswers: reportData.reduce((total, report) => total + report.wrongAnswers, 0),
  }

  // Function to navigate months
  const navigateMonth = (date: Date, direction: "prev" | "next") => {
    const newDate = new Date(date)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    return newDate
  }

  // Helper function to get color based on speed
  const getSpeedColor = (speed: number) => {
    if (speed <= 2.0) return "#4CAF50" // Fast - Green
    if (speed <= 3.5) return "#f6aa54" // Medium - Amber
    return "#e8594a" // Slow - Red
  }

  return (
    <div className="w-full sm:max-w-6xl sm:mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ScrollToTop />
      <div className="flex flex-col space-y-8 bg-[#0F283D] p-8 rounded-xl border border-[#50adb6]/20">
        {/* Header with back button and centered title */}
        <div className="relative flex items-start justify-center">
          <Link
            href="/dashboard"
            className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#50adb6] flex items-center justify-center text-white hover:bg-[#3d8a91] transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <div className="text-center mb-4 sm:mb-8 pt-8 sm:pt-0">
            <h1 className="text-3xl font-bold text-[#50adb6]">Progress</h1>
            <p className="text-white/80">Track your learning journey and performance</p>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="bg-[#163c5a] rounded-lg p-4 border border-[#50adb6]/30">
          <h2 className="text-lg font-semibold text-[#50adb6] mb-3 text-center">Quick Navigation</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
            <NavLink icon={<BarChart2 size={20} />} label="Summary" color="bg-[#50adb6]" targetId="summary-section" />
            <NavLink
              icon={<Calculator size={20} />}
              label="Math Operations"
              color="bg-[#4CAF50]"
              targetId="math-operations-section"
            />
            <NavLink icon={<FileText size={20} />} label="Reports" color="bg-[#f6aa54]" targetId="reports-section" />
            <NavLink
              icon={<LineChart size={20} />}
              label="Performance"
              color="bg-[#e8594a]"
              targetId="performance-section"
            />
            <NavLink
              icon={<Hash size={20} />}
              label="Times Tables"
              color="bg-[#50adb6]"
              targetId="times-tables-section"
            />
            <NavLink
              icon={<Rocket size={20} />}
              label="Space Journey"
              color="bg-[#e8594a]"
              targetId="space-journey-section"
            />
            <NavLink
              icon={<GraduationCap size={20} />}
              label="Learning Path"
              color="bg-[#50adb6]"
              targetId="learning-path-section"
            />
          </div>
        </div>

        {/* Summary Section */}
        <div id="summary-section" className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-6 scroll-mt-8">
          <h2 className="text-xl font-semibold text-[#50adb6] mb-4">Summary</h2>

          <Tabs defaultValue="total" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="total">Total</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="lastWeek">Last Week</TabsTrigger>
            </TabsList>

            {/* Total Stats */}
            <TabsContent value="total" className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={18} className="text-[#50adb6]" />
                    <h3 className="text-sm text-white/80">Time Spent</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{summaryData.total.timeSpent}</div>
                </div>

                <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={18} className="text-[#f6aa54]" />
                    <h3 className="text-sm text-white/80">Stars Earned</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{summaryData.total.starsEarned}</div>
                </div>

                <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={18} className="text-[#e8594a]" />
                    <h3 className="text-sm text-white/80">Badges Earned</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{summaryData.total.badgesEarned}</div>
                </div>

                <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle size={18} className="text-[#4CAF50]" />
                    <h3 className="text-sm text-white/80">Correct Answers</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{summaryData.total.correctAnswers}</div>
                </div>

                <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle size={18} className="text-[#e8594a]" />
                    <h3 className="text-sm text-white/80">Wrong Answers</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{summaryData.total.wrongAnswers}</div>
                </div>
              </div>
            </TabsContent>

            {/* Today Stats */}
            <TabsContent value="today" className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={18} className="text-[#50adb6]" />
                    <h3 className="text-sm text-white/80">Time Spent</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{summaryData.today.timeSpent}</div>
                </div>

                <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={18} className="text-[#f6aa54]" />
                    <h3 className="text-sm text-white/80">Stars Earned</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{summaryData.today.starsEarned}</div>
                </div>

                <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={18} className="text-[#e8594a]" />
                    <h3 className="text-sm text-white/80">Badges Earned</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{summaryData.today.badgesEarned}</div>
                </div>

                <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle size={18} className="text-[#4CAF50]" />
                    <h3 className="text-sm text-white/80">Correct Answers</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{summaryData.today.correctAnswers}</div>
                </div>

                <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle size={18} className="text-[#e8594a]" />
                    <h3 className="text-sm text-white/80">Wrong Answers</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{summaryData.today.wrongAnswers}</div>
                </div>
              </div>
            </TabsContent>

            {/* Last Week Stats */}
            <TabsContent value="lastWeek" className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={18} className="text-[#50adb6]" />
                    <h3 className="text-sm text-white/80">Time Spent</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{summaryData.lastWeek.timeSpent}</div>
                </div>

                <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={18} className="text-[#f6aa54]" />
                    <h3 className="text-sm text-white/80">Stars Earned</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{summaryData.lastWeek.starsEarned}</div>
                </div>

                <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={18} className="text-[#e8594a]" />
                    <h3 className="text-sm text-white/80">Badges Earned</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{summaryData.lastWeek.badgesEarned}</div>
                </div>

                <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle size={18} className="text-[#4CAF50]" />
                    <h3 className="text-sm text-white/80">Correct Answers</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{summaryData.lastWeek.correctAnswers}</div>
                </div>

                <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle size={18} className="text-[#e8594a]" />
                    <h3 className="text-sm text-white/80">Wrong Answers</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{summaryData.lastWeek.wrongAnswers}</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Math Operations Progress Section */}
        <div
          id="math-operations-section"
          className="bg-[#0F283D] border border-[#4CAF50]/30 rounded-lg p-6 scroll-mt-8"
        >
          <h2 className="text-xl font-semibold text-[#4CAF50] mb-4">Math Operations Progress</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Addition & Subtraction */}
            <div className="space-y-6">
              {/* Addition Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Addition</span>
                  <span className="text-[#4CAF50] font-medium">75%</span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-[#4CAF50]"
                    style={{ width: "75%" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-white/60">
                  <span>Total problems: 500</span>
                  <span>Avg. time: 1.8s</span>
                </div>
              </div>

              {/* Subtraction Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Subtraction</span>
                  <span className="text-[#f6aa54] font-medium">45%</span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-[#f6aa54]"
                    style={{ width: "45%" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-white/60">
                  <span>Total problems: 300</span>
                  <span>Avg. time: 4.8s</span>
                </div>
              </div>
            </div>

            {/* Right Column - Multiplication & Division */}
            <div className="space-y-6">
              {/* Multiplication Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Multiplication</span>
                  <span className="text-[#50adb6] font-medium">60%</span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-[#50adb6]"
                    style={{ width: "60%" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-white/60">
                  <span>Total problems: 450</span>
                  <span>Avg. time: 2.5s</span>
                </div>
              </div>

              {/* Division Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">Division</span>
                  <span className="text-[#e8594a] font-medium">30%</span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-[#e8594a]"
                    style={{ width: "30%" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-white/60">
                  <span>Total problems: 200</span>
                  <span>Avg. time: 5.2s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Math Progress */}
          <div className="mt-6 pt-6 border-t border-[#4CAF50]/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Overall Math Progress</span>
              <span className="text-white font-medium">52%</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-[#4CAF50] via-[#50adb6] to-[#e8594a]"
                style={{ width: "52%" }}
              />
            </div>
          </div>
        </div>

        {/* Full Reports Section */}
        <div id="reports-section" className="bg-[#0F283D] border border-[#f6aa54]/30 rounded-lg p-6 scroll-mt-8">
          <h2 className="text-xl font-semibold text-[#f6aa54] mb-4">Full Reports</h2>
          {/* Month selector with navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                setReportsDate(navigateMonth(reportsDate, "prev"))
              }}
              className="w-10 h-10 rounded-full bg-[#f6aa54]/20 flex items-center justify-center text-[#f6aa54] hover:bg-[#f6aa54]/30 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsReportsCalendarOpen(!isReportsCalendarOpen)
                }}
                className="flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-center font-medium bg-[#163c5a] border-[#f6aa54]/30 text-white hover:bg-[#0F283D] hover:border-[#f6aa54] cursor-pointer"
              >
                <Calendar className="h-4 w-4 text-[#f6aa54]" />
                {format(reportsDate, "MMMM yyyy")}
              </button>

              {isReportsCalendarOpen && (
                <div className="absolute z-50 mt-1 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#163c5a] rounded-lg shadow-lg border border-[#f6aa54]/30">
                    <MonthPicker
                      selectedDate={reportsDate}
                      onChange={(newDate) => {
                        setReportsDate(newDate)
                        setIsReportsCalendarOpen(false)
                      }}
                      onClose={() => setIsReportsCalendarOpen(false)}
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                setReportsDate(navigateMonth(reportsDate, "next"))
              }}
              className="w-10 h-10 rounded-full bg-[#f6aa54]/20 flex items-center justify-center text-[#f6aa54] hover:bg-[#f6aa54]/30 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          {/* Monthly summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#0F283D] border border-[#f6aa54]/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={18} className="text-[#f6aa54]" />
                <h3 className="text-sm text-white/80">Time Spent</h3>
              </div>
              <div className="text-2xl font-bold text-white">
                {Math.floor(monthlySummary.timeSpent / 60)} hrs {monthlySummary.timeSpent % 60} min
              </div>
            </div>

            <div className="bg-[#0F283D] border border-[#f6aa54]/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star size={18} className="text-[#f6aa54]" />
                <h3 className="text-sm text-white/80">Stars Earned</h3>
              </div>
              <div className="text-2xl font-bold text-white">{monthlySummary.starsEarned}</div>
            </div>

            <div className="bg-[#0F283D] border border-[#f6aa54]/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={18} className="text-[#4CAF50]" />
                <h3 className="text-sm text-white/80">Correct Answers</h3>
              </div>
              <div className="text-2xl font-bold text-white">{monthlySummary.correctAnswers}</div>
            </div>

            <div className="bg-[#0F283D] border border-[#f6aa54]/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle size={18} className="text-[#e8594a]" />
                <h3 className="text-sm text-white/80">Wrong Answers</h3>
              </div>
              <div className="text-2xl font-bold text-white">{monthlySummary.wrongAnswers}</div>
            </div>
          </div>
          {/* Reports table */}
          <div className="relative overflow-hidden rounded-lg border border-[#f6aa54]/30">
            <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#f6aa54] scrollbar-track-transparent">
              <Table>
                <TableHeader className="bg-[#0F283D]/50 sticky top-0">
                  <TableRow>
                    <TableHead className="text-[#f6aa54] w-[180px]">Date/Time</TableHead>
                    <TableHead className="text-[#f6aa54] w-[120px]">Time Spent</TableHead>
                    <TableHead className="text-[#f6aa54]">Game Type</TableHead>
                    <TableHead className="text-[#f6aa54] text-right">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.map((report) => (
                    <TableRow key={report.id} className="hover:bg-[#0F283D]/30">
                      <TableCell className="text-white font-medium">
                        {format(report.date, "MMM d, yyyy h:mm a")}
                      </TableCell>
                      <TableCell className="text-white">{report.timeSpent}</TableCell>
                      <TableCell className="text-white">{report.gameType}</TableCell>
                      <TableCell className="text-white text-right">{report.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          {/* Export button */}
          <div className="flex justify-end mt-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#f6aa54] text-white rounded-md hover:bg-[#e59843] transition-colors">
              <Download size={16} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Performance Graph Section */}
        <div id="performance-section" className="bg-[#0F283D] border border-[#e8594a]/30 rounded-lg p-6 scroll-mt-8">
          <h2 className="text-xl font-semibold text-[#e8594a] mb-4">Performance Graph</h2>

          {/* Month selector with navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                setGraphDate(navigateMonth(graphDate, "prev"))
              }}
              className="w-10 h-10 rounded-full bg-[#e8594a]/20 flex items-center justify-center text-[#e8594a] hover:bg-[#e8594a]/30 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsGraphCalendarOpen(!isGraphCalendarOpen)
                }}
                className="flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-center font-medium bg-[#163c5a] border-[#e8594a]/30 text-white hover:bg-[#0F283D] hover:border-[#e8594a] cursor-pointer"
              >
                <Calendar className="h-4 w-4 text-[#e8594a]" />
                {format(graphDate, "MMMM yyyy")}
              </button>

              {isGraphCalendarOpen && (
                <div className="absolute z-50 mt-1 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#163c5a] rounded-lg shadow-lg border border-[#e8594a]/30">
                    <MonthPicker
                      selectedDate={graphDate}
                      onChange={(newDate) => {
                        setGraphDate(newDate)
                        setIsGraphCalendarOpen(false)
                      }}
                      onClose={() => setIsGraphCalendarOpen(false)}
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                setGraphDate(navigateMonth(graphDate, "next"))
              }}
              className="w-10 h-10 rounded-full bg-[#e8594a]/20 flex items-center justify-center text-[#e8594a] hover:bg-[#e8594a]/30 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Graph */}
          <div className="bg-[#0F283D] border border-[#e8594a]/20 rounded-lg p-4 h-[400px] relative">
            {/* Graph header with legend */}
            <div className="flex flex-wrap justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#50adb6]"></div>
                  <span className="text-white/80 text-sm">Addition</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#f6aa54]"></div>
                  <span className="text-white/80 text-sm">Subtraction</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#e8594a]"></div>
                  <span className="text-white/80 text-sm">Multiplication</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4CAF50]"></div>
                  <span className="text-white/80 text-sm">Division</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <span className="text-white/80 text-sm">Showing: Accuracy (%)</span>
              </div>
            </div>

            {/* SVG Graph */}
            <svg width={"100%"} height={320} className="mt-2">
              {/* X and Y axes */}
              <line x1="40" y1="280" x2="40" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <line x1="40" y1="280" x2="900" y2="280" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

              {/* Y-axis labels */}
              <text x="35" y="40" textAnchor="end" fill="rgba(255,255,255,0.6)" fontSize="10">
                100%
              </text>
              <text x="35" y="100" textAnchor="end" fill="rgba(255,255,255,0.6)" fontSize="10">
                80%
              </text>
              <text x="35" y="160" textAnchor="end" fill="rgba(255,255,255,0.6)" fontSize="10">
                60%
              </text>
              <text x="35" y="220" textAnchor="end" fill="rgba(255,255,255,0.6)" fontSize="10">
                40%
              </text>
              <text x="35" y="280" textAnchor="end" fill="rgba(255,255,255,0.6)" fontSize="10">
                20%
              </text>

              {/* X-axis labels (days) */}
              {[5, 10, 15, 20, 25, 30].map((day) => (
                <text
                  key={day}
                  x={40 + day * 28}
                  y="295"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="10"
                >
                  {day}
                </text>
              ))}

              {/* Grid lines */}
              {[40, 100, 160, 220, 280].map((y, i) => (
                <line
                  key={`grid-y-${i}`}
                  x1="40"
                  y1={y}
                  x2="900"
                  y2={y}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              ))}

              {/* Addition line */}
              {performanceData.byGameType.Addition.length > 0 && (
                <>
                  <polyline
                    points={performanceData.byGameType.Addition.map(
                      (data) => `${40 + data.day * 28},${280 - data.accuracy * 2.4}`,
                    ).join(" ")}
                    fill="none"
                    stroke="#50adb6"
                    strokeWidth="2"
                  />

                  {/* Data points for Addition */}
                  {performanceData.byGameType.Addition.map((data) => (
                    <circle
                      key={`add-${data.day}`}
                      cx={40 + data.day * 28}
                      cy={280 - data.accuracy * 2.4}
                      r="4"
                      fill="#50adb6"
                    />
                  ))}
                </>
              )}

              {/* Subtraction line */}
              {performanceData.byGameType.Subtraction.length > 0 && (
                <>
                  <polyline
                    points={performanceData.byGameType.Subtraction.map(
                      (data) => `${40 + data.day * 28},${280 - data.accuracy * 2.4}`,
                    ).join(" ")}
                    fill="none"
                    stroke="#f6aa54"
                    strokeWidth="2"
                  />

                  {/* Data points for Subtraction */}
                  {performanceData.byGameType.Subtraction.map((data) => (
                    <circle
                      key={`sub-${data.day}`}
                      cx={40 + data.day * 28}
                      cy={280 - data.accuracy * 2.4}
                      r="4"
                      fill="#f6aa54"
                    />
                  ))}
                </>
              )}

              {/* Multiplication line */}
              {performanceData.byGameType.Multiplication.length > 0 && (
                <>
                  <polyline
                    points={performanceData.byGameType.Multiplication.map(
                      (data) => `${40 + data.day * 28},${280 - data.accuracy * 2.4}`,
                    ).join(" ")}
                    fill="none"
                    stroke="#e8594a"
                    strokeWidth="2"
                  />

                  {/* Data points for Multiplication */}
                  {performanceData.byGameType.Multiplication.map((data) => (
                    <circle
                      key={`mul-${data.day}`}
                      cx={40 + data.day * 28}
                      cy={280 - data.accuracy * 2.4}
                      r="4"
                      fill="#e8594a"
                    />
                  ))}
                </>
              )}

              {/* Division line */}
              {performanceData.byGameType.Division.length > 0 && (
                <>
                  <polyline
                    points={performanceData.byGameType.Division.map(
                      (data) => `${40 + data.day * 28},${280 - data.accuracy * 2.4}`,
                    ).join(" ")}
                    fill="none"
                    stroke="#4CAF50"
                    strokeWidth="2"
                  />

                  {/* Data points for Division */}
                  {performanceData.byGameType.Division.map((data) => (
                    <circle
                      key={`div-${data.day}`}
                      cx={40 + data.day * 28}
                      cy={280 - data.accuracy * 2.4}
                      r="4"
                      fill="#4CAF50"
                    />
                  ))}
                </>
              )}
            </svg>

            {/* X and Y axis labels */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-xs">
              Day of Month
            </div>
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 -rotate-90 text-white/60 text-xs whitespace-nowrap">
              Accuracy (%)
            </div>
          </div>

          {/* Performance metrics by game type */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={18} className="text-[#50adb6]" />
                <h3 className="text-sm text-white/80">Addition</h3>
              </div>
              <div className="text-2xl font-bold text-white">
                {performanceData.byGameType.Addition.length > 0
                  ? Math.round(
                      performanceData.byGameType.Addition.reduce((sum, data) => sum + data.accuracy, 0) /
                        performanceData.byGameType.Addition.length,
                    )
                  : 0}
                %
              </div>
              <p className="text-sm text-white/60 mt-1">
                {performanceData.byGameType.Addition.reduce((sum, data) => sum + data.questionsAnswered, 0)} questions
              </p>
            </div>

            <div className="bg-[#0F283D] border border-[#f6aa54]/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={18} className="text-[#f6aa54]" />
                <h3 className="text-sm text-white/80">Subtraction</h3>
              </div>
              <div className="text-2xl font-bold text-white">
                {performanceData.byGameType.Subtraction.length > 0
                  ? Math.round(
                      performanceData.byGameType.Subtraction.reduce((sum, data) => sum + data.accuracy, 0) /
                        performanceData.byGameType.Subtraction.length,
                    )
                  : 0}
                %
              </div>
              <p className="text-sm text-white/60 mt-1">
                {performanceData.byGameType.Subtraction.reduce((sum, data) => sum + data.questionsAnswered, 0)}{" "}
                questions
              </p>
            </div>

            <div className="bg-[#0F283D] border border-[#e8594a]/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={18} className="text-[#e8594a]" />
                <h3 className="text-sm text-white/80">Multiplication</h3>
              </div>
              <div className="text-2xl font-bold text-white">
                {performanceData.byGameType.Multiplication.length > 0
                  ? Math.round(
                      performanceData.byGameType.Multiplication.reduce((sum, data) => sum + data.accuracy, 0) /
                        performanceData.byGameType.Multiplication.length,
                    )
                  : 0}
                %
              </div>
              <p className="text-sm text-white/60 mt-1">
                {performanceData.byGameType.Multiplication.reduce((sum, data) => sum + data.questionsAnswered, 0)}{" "}
                questions
              </p>
            </div>

            <div className="bg-[#0F283D] border border-[#4CAF50]/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={18} className="text-[#4CAF50]" />
                <h3 className="text-sm text-white/80">Division</h3>
              </div>
              <div className="text-2xl font-bold text-white">
                {performanceData.byGameType.Division.length > 0
                  ? Math.round(
                      performanceData.byGameType.Division.reduce((sum, data) => sum + data.accuracy, 0) /
                        performanceData.byGameType.Division.length,
                    )
                  : 0}
                %
              </div>
              <p className="text-sm text-white/60 mt-1">
                {performanceData.byGameType.Division.reduce((sum, data) => sum + data.questionsAnswered, 0)} questions
              </p>
            </div>
          </div>
        </div>

        {/* Time Tables Performance Section */}
        <div id="times-tables-section" className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-6 scroll-mt-8">
          <h2 className="text-xl font-semibold text-[#50adb6] mb-4">Time Tables Performance</h2>
          <p className="text-white/80 mb-6">Average response time (seconds) for multiplication facts</p>

          {/* Time Tables Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 bg-[#0F283D] border border-[#50adb6]/30 text-[#50adb6] font-bold sticky left-0 z-10">
                      ×
                    </th>
                    {Array.from({ length: 19 }, (_, i) => i + 2).map((num) => (
                      <th
                        key={`header-${num}`}
                        className="p-2 bg-[#0F283D] border border-[#50adb6]/30 text-[#50adb6] font-bold"
                      >
                        {num}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 19 }, (_, i) => i + 2).map((rowNum) => (
                    <tr key={`row-${rowNum}`}>
                      <th className="p-2 bg-[#0F283D] border border-[#50adb6]/30 text-[#50adb6] font-bold sticky left-0 z-10">
                        {rowNum}
                      </th>
                      {Array.from({ length: 19 }, (_, j) => j + 2).map((colNum) => {
                        const speed = timeTablesData[rowNum - 2][colNum - 2]
                        return (
                          <td
                            key={`cell-${rowNum}-${colNum}`}
                            className="p-2 border border-[#50adb6]/20 text-center"
                            style={{
                              backgroundColor: `${getSpeedColor(speed)}20`,
                              color: getSpeedColor(speed),
                            }}
                          >
                            {speed.toFixed(1)}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#4CAF50]"></div>
              <span className="text-white/80 text-sm">Fast (≤ 2.0s)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#f6aa54]"></div>
              <span className="text-white/80 text-sm">Medium (≤ 3.5s)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#e8594a]"></div>
              <span className="text-white/80 text-sm">Slow ({">"}3.5s)</span>
            </div>
          </div>
        </div>

        {/* Space Journey Progress Section */}
        <div id="space-journey-section" className="bg-[#0F283D] border border-[#e8594a]/30 rounded-lg p-6 scroll-mt-8">
          <h2 className="text-xl font-semibold text-[#e8594a] mb-4">Space Journey Progress</h2>
          <p className="text-white/80 mb-6">Track your progress through the solar system</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {/* Planets with progress status */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 mb-2">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PlanetMercury-new-5gfvNnpxPKapf4pRLEmCvJOV98IRgS.png"
                  alt="Mercury"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm text-white">Mercury</span>
              <span className="text-xs text-[#4CAF50]">Unlocked</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 mb-2">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PlanetVenus-new-n782DfV26Qc4GVxQzkfVH202MsKr6Q.png"
                  alt="Venus"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm text-white">Venus</span>
              <span className="text-xs text-[#4CAF50]">Unlocked</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 mb-2">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PlanetEarth-new-aG11YKqAnLBL4DT4JVm6tsW3wIgsn6.png"
                  alt="Earth"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm text-white">Earth</span>
              <span className="text-xs text-[#4CAF50]">Unlocked</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 mb-2">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/planetMars-new-15bGgKhmvPMI0nkv67okVy8CPZ7zLS.png"
                  alt="Mars"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm text-white">Mars</span>
              <span className="text-xs text-[#4CAF50]">Unlocked</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 mb-2 opacity-40 grayscale">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PlanetJupiter-new-k59GAemqTd30XTyQWnnh9ctpSn9X22.png"
                  alt="Jupiter"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm text-white/40">Jupiter</span>
              <span className="text-xs text-white/40">Locked</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 mb-2 opacity-40 grayscale">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/planetSaturn-new-nK9Xh7eiUhr0EjlW0pfxmAhlEJO3da.png"
                  alt="Saturn"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm text-white/40">Saturn</span>
              <span className="text-xs text-white/40">Locked</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#e8594a]/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm">Space Journey Progress</span>
              <span className="text-white font-medium text-sm">40%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: "40%",
                  backgroundColor: "#e8594a",
                }}
              />
            </div>
          </div>
        </div>

        {/* Learning Path Section */}
        <div id="learning-path-section" className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-6 scroll-mt-8">
          <h2 className="text-xl font-semibold text-[#50adb6] mb-4">Learning Path</h2>
          <p className="text-white/80 mb-6">Your personalized math learning journey</p>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#50adb6]/30"></div>

            {/* Timeline items */}
            <div className="space-y-8">
              <div className="relative pl-14">
                <div className="absolute left-0 w-12 h-12 rounded-full bg-[#50adb6] flex items-center justify-center text-white">
                  <CheckCircle size={24} />
                </div>
                <div className="bg-[#0F283D] border border-[#50adb6]/20 rounded-lg p-4">
                  <h4 className="text-white font-medium">Addition & Subtraction</h4>
                  <p className="text-white/60 text-sm mt-1">Completed on January 15, 2024</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden flex-1">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: "100%",
                          backgroundColor: "#50adb6",
                        }}
                      />
                    </div>
                    <span className="text-[#50adb6] text-sm">100%</span>
                  </div>
                </div>
              </div>

              <div className="relative pl-14">
                <div className="absolute left-0 w-12 h-12 rounded-full bg-[#f6aa54] flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 21h10" />
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M12 17v4" />
                  </svg>
                </div>
                <div className="bg-[#0F283D] border border-[#f6aa54]/20 rounded-lg p-4">
                  <h4 className="text-white font-medium">Multiplication & Division</h4>
                  <p className="text-white/60 text-sm mt-1">In progress</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden flex-1">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: "60%",
                          backgroundColor: "#f6aa54",
                        }}
                      />
                    </div>
                    <span className="text-[#f6aa54] text-sm">60%</span>
                  </div>
                </div>
              </div>

              <div className="relative pl-14">
                <div className="absolute left-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/40">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div className="bg-[#0F283D] border border-white/10 rounded-lg p-4">
                  <h4 className="text-white/60 font-medium">Fractions & Decimals</h4>
                  <p className="text-white/40 text-sm mt-1">Locked - Complete previous modules first</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden flex-1">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: "0%",
                          backgroundColor: "#e8594a",
                        }}
                      />
                    </div>
                    <span className="text-white/40 text-sm">0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

