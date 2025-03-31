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
  colorScheme = "blue",
}: {
  selectedDate: Date
  onChange: (date: Date) => void
  onClose: () => void
  colorScheme?: "blue" | "amber" | "red"
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

  const bgColor = colorScheme === "amber" ? "#f6aa54" : colorScheme === "red" ? "#e8594a" : "#00509d"
  const hoverColor = colorScheme === "amber" ? "#e59843" : colorScheme === "red" ? "#d04b3e" : "#003f88"

  return (
    <div className={`p-4 bg-[${bgColor}] rounded-lg w-[280px]`}>
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
                year === selectedDate.getFullYear()
                  ? `bg-[${hoverColor}] text-white`
                  : `text-white/70 hover:bg-[${hoverColor}]/20`,
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
                index === selectedDate.getMonth()
                  ? `bg-[${hoverColor}] text-white`
                  : `text-white/70 hover:bg-[${hoverColor}]/20`,
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
          className={`px-4 py-2 bg-[${hoverColor}] text-white rounded-md hover:bg-[${hoverColor}]/80 transition-colors`}
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
      className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all hover:bg-[#00509d]/10 hover:scale-105`}
    >
      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white mb-1`}>{icon}</div>
      <span className="text-xs text-gray-600 text-center">{label}</span>
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
    <div className="w-full sm:max-w-6xl sm:mx-auto pt-3 sm:pt-4 lg:pt-6 pb-8">
      <ScrollToTop />
      <div className="flex flex-col space-y-6 sm:space-y-8 p-6">
        {/* Header with back button and centered title */}
        <div className="relative flex items-start justify-center">
          <Link
            href="/dashboard"
            className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#00509d] flex items-center justify-center text-white hover:bg-[#003f88] transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <div className="text-center mb-4 sm:mb-8 pt-8 sm:pt-0">
            <h1 className="text-3xl font-bold text-[#00509d]">Progress</h1>
            <p className="text-[#00509d]/80">Track your learning journey and performance</p>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-lg p-4 border border-[#00509d]/30 shadow-sm">
          <h2 className="text-lg font-semibold text-[#00509d] mb-3 text-center">Quick Navigation</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1 sm:gap-2">
            <NavLink icon={<BarChart2 size={20} />} label="Summary" color="bg-[#00509d]" targetId="summary-section" />
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
              color="bg-[#00509d]"
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
              color="bg-[#00509d]"
              targetId="learning-path-section"
            />
          </div>
        </div>

        {/* Summary Section */}
        <div id="summary-section" className="bg-white border border-[#00509d]/30 rounded-lg p-6 scroll-mt-8 shadow-sm">
          <h2 className="text-xl font-semibold text-[#00509d] mb-4">Summary</h2>

          <Tabs defaultValue="total" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#00509d]/10">
              <TabsTrigger value="total" className="data-[state=active]:bg-[#00509d] data-[state=active]:text-white">
                Total
              </TabsTrigger>
              <TabsTrigger value="today" className="data-[state=active]:bg-[#00509d] data-[state=active]:text-white">
                Today
              </TabsTrigger>
              <TabsTrigger value="lastWeek" className="data-[state=active]:bg-[#00509d] data-[state=active]:text-white">
                Last Week
              </TabsTrigger>
            </TabsList>

            {/* Total Stats */}
            <TabsContent value="total" className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 sm:gap-4">
                <div className="bg-white border border-[#00509d]/30 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={18} className="text-[#00509d]" />
                    <h3 className="text-sm text-[#00509d]">Time Spent</h3>
                  </div>
                  <div className="text-2xl font-bold text-[#00509d]">{summaryData.total.timeSpent}</div>
                </div>

                <div className="bg-white border border-[#00509d]/30 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={18} className="text-[#f6aa54]" />
                    <h3 className="text-sm text-[#f6aa54]">Stars Earned</h3>
                  </div>
                  <div className="text-2xl font-bold text-[#f6aa54]">{summaryData.total.starsEarned}</div>
                </div>

                <div className="bg-white border border-[#00509d]/30 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={18} className="text-[#e8594a]" />
                    <h3 className="text-sm text-[#e8594a]">Badges Earned</h3>
                  </div>
                  <div className="text-2xl font-bold text-[#e8594a]">{summaryData.total.badgesEarned}</div>
                </div>

                <div className="bg-white border border-[#00509d]/30 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle size={18} className="text-[#4CAF50]" />
                    <h3 className="text-sm text-[#4CAF50]">Correct Answers</h3>
                  </div>
                  <div className="text-2xl font-bold text-[#4CAF50]">{summaryData.total.correctAnswers}</div>
                </div>

                <div className="bg-white border border-[#00509d]/30 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle size={18} className="text-[#e8594a]" />
                    <h3 className="text-sm text-[#e8594a]">Wrong Answers</h3>
                  </div>
                  <div className="text-2xl font-bold text-[#e8594a]">{summaryData.total.wrongAnswers}</div>
                </div>
              </div>
            </TabsContent>

            {/* Today Stats */}
            <TabsContent value="today" className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 sm:gap-4">
                <div className="bg-white border border-[#00509d]/30 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={18} className="text-[#00509d]" />
                    <h3 className="text-sm text-[#00509d]">Time Spent</h3>
                  </div>
                  <div className="text-2xl font-bold text-[#00509d]">{summaryData.today.timeSpent}</div>
                </div>

                <div className="bg-white border border-[#00509d]/30 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={18} className="text-[#f6aa54]" />
                    <h3 className="text-sm text-[#f6aa54]">Stars Earned</h3>
                  </div>
                  <div className="text-2xl font-bold text-[#f6aa54]">{summaryData.today.starsEarned}</div>
                </div>

                <div className="bg-white border border-[#00509d]/30 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={18} className="text-[#e8594a]" />
                    <h3 className="text-sm text-[#e8594a]">Badges Earned</h3>
                  </div>
                  <div className="text-2xl font-bold text-[#e8594a]">{summaryData.today.badgesEarned}</div>
                </div>

                <div className="bg-white border border-[#00509d]/30 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle size={18} className="text-[#4CAF50]" />
                    <h3 className="text-sm text-[#4CAF50]">Correct Answers</h3>
                  </div>
                  <div className="text-2xl font-bold text-[#4CAF50]">{summaryData.today.correctAnswers}</div>
                </div>

                <div className="bg-white border border-[#00509d]/30 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle size={18} className="text-[#e8594a]" />
                    <h3 className="text-sm text-[#e8594a]">Wrong Answers</h3>
                  </div>
                  <div className="text-2xl font-bold text-[#e8594a]">{summaryData.today.wrongAnswers}</div>
                </div>
              </div>
            </TabsContent>

            {/* Last Week Stats */}
            <TabsContent value="lastWeek" className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 sm:gap-4">
                <div className="bg-white border border-[#00509d]/30 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={18} className="text-[#00509d]" />
                    <h3 className="text-sm text-[#00509d]">Time Spent</h3>
                  </div>
                  <div className="text-2xl font-bold text-[#00509d]">{summaryData.lastWeek.timeSpent}</div>
                </div>

                <div className="bg-white border border-[#00509d]/30 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={18} className="text-[#f6aa54]" />
                    <h3 className="text-sm text-[#f6aa54]">Stars Earned</h3>
                  </div>
                  <div className="text-2xl font-bold text-[#f6aa54]">{summaryData.lastWeek.starsEarned}</div>
                </div>

                <div className="bg-white border border-[#00509d]/30 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={18} className="text-[#e8594a]" />
                    <h3 className="text-sm text-[#e8594a]">Badges Earned</h3>
                  </div>
                  <div className="text-2xl font-bold text-[#e8594a]">{summaryData.lastWeek.badgesEarned}</div>
                </div>

                <div className="bg-white border border-[#00509d]/30 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle size={18} className="text-[#4CAF50]" />
                    <h3 className="text-sm text-[#4CAF50]">Correct Answers</h3>
                  </div>
                  <div className="text-2xl font-bold text-[#4CAF50]">{summaryData.lastWeek.correctAnswers}</div>
                </div>

                <div className="bg-white border border-[#00509d]/30 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle size={18} className="text-[#e8594a]" />
                    <h3 className="text-sm text-[#e8594a]">Wrong Answers</h3>
                  </div>
                  <div className="text-2xl font-bold text-[#e8594a]">{summaryData.lastWeek.wrongAnswers}</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Math Operations Progress Section */}
        <div
          id="math-operations-section"
          className="bg-white border border-[#4CAF50]/30 rounded-lg p-6 scroll-mt-8 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-[#4CAF50] mb-4">Math Operations Progress</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Addition & Subtraction */}
            <div className="space-y-6">
              {/* Addition Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#4CAF50] font-medium">Addition</span>
                  <span className="text-[#4CAF50] font-medium">75%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-[#4CAF50]"
                    style={{ width: "75%" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-[#4CAF50]/80">
                  <span>Total problems: 500</span>
                  <span>Avg. time: 1.8s</span>
                </div>
              </div>

              {/* Subtraction Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#f6aa54] font-medium">Subtraction</span>
                  <span className="text-[#f6aa54] font-medium">45%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-[#f6aa54]"
                    style={{ width: "45%" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-[#f6aa54]/80">
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
                  <span className="text-[#00509d] font-medium">Multiplication</span>
                  <span className="text-[#00509d] font-medium">60%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-[#00509d]"
                    style={{ width: "60%" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-[#00509d]/80">
                  <span>Total problems: 450</span>
                  <span>Avg. time: 2.5s</span>
                </div>
              </div>

              {/* Division Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#e8594a] font-medium">Division</span>
                  <span className="text-[#e8594a] font-medium">30%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-[#e8594a]"
                    style={{ width: "30%" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-[#e8594a]/80">
                  <span>Total problems: 200</span>
                  <span>Avg. time: 5.2s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Math Progress */}
          <div className="mt-6 pt-6 border-t border-[#4CAF50]/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#4CAF50] text-sm">Overall Math Progress</span>
              <span className="text-[#4CAF50] font-medium text-sm">52%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-[#4CAF50] via-[#00509d] to-[#e8594a]"
                style={{ width: "52%" }}
              />
            </div>
          </div>
        </div>

        {/* Full Reports Section */}
        <div id="reports-section" className="bg-white border border-[#00509d]/30 rounded-lg p-6 scroll-mt-8 shadow-sm">
          <h2 className="text-xl font-semibold text-[#00509d] mb-4">Full Reports</h2>
          {/* Month selector with navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                setReportsDate(navigateMonth(reportsDate, "prev"))
              }}
              className="w-10 h-10 rounded-full bg-[#00509d]/20 flex items-center justify-center text-[#00509d] hover:bg-[#00509d]/30 transition-colors"
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
                className="flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-center font-medium bg-[#00509d] border-[#00509d]/30 text-white hover:bg-[#003f88] hover:border-[#00509d] cursor-pointer"
              >
                <Calendar className="h-4 w-4 text-white" />
                {format(reportsDate, "MMMM yyyy")}
              </button>

              {isReportsCalendarOpen && (
                <div className="absolute z-50 mt-1 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#00509d] rounded-lg shadow-lg border border-[#00509d]/30">
                    <MonthPicker
                      selectedDate={reportsDate}
                      onChange={(newDate) => {
                        setReportsDate(newDate)
                        setIsReportsCalendarOpen(false)
                      }}
                      onClose={() => setIsReportsCalendarOpen(false)}
                      colorScheme="blue"
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
              className="w-10 h-10 rounded-full bg-[#00509d]/20 flex items-center justify-center text-[#00509d] hover:bg-[#00509d]/30 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          {/* Monthly summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-[#00509d]/20 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={18} className="text-[#00509d]" />
                <h3 className="text-sm text-[#00509d]">Time Spent</h3>
              </div>
              <div className="text-2xl font-bold text-[#00509d]">
                {Math.floor(monthlySummary.timeSpent / 60)} hrs {monthlySummary.timeSpent % 60} min
              </div>
            </div>

            <div className="bg-white border border-[#00509d]/20 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Star size={18} className="text-[#00509d]" />
                <h3 className="text-sm text-[#00509d]">Stars Earned</h3>
              </div>
              <div className="text-2xl font-bold text-[#00509d]">{monthlySummary.starsEarned}</div>
            </div>

            <div className="bg-white border border-[#00509d]/20 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={18} className="text-[#4CAF50]" />
                <h3 className="text-sm text-[#4CAF50]">Correct Answers</h3>
              </div>
              <div className="text-2xl font-bold text-[#4CAF50]">{monthlySummary.correctAnswers}</div>
            </div>

            <div className="bg-white border border-[#00509d]/20 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <XCircle size={18} className="text-[#e8594a]" />
                <h3 className="text-sm text-[#e8594a]">Wrong Answers</h3>
              </div>
              <div className="text-2xl font-bold text-[#e8594a]">{monthlySummary.wrongAnswers}</div>
            </div>
          </div>
          {/* Reports table */}
          <div className="relative overflow-hidden rounded-lg border border-[#00509d]/30">
            {/* Fixed header */}
            <div className="bg-gray-50 border-b border-[#00509d]/30">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-[#00509d] w-[180px] p-3 text-left font-medium">Date/Time</th>
                      <th className="text-[#00509d] w-[120px] p-3 text-left font-medium">Time Spent</th>
                      <th className="text-[#00509d] p-3 text-left font-medium">Game Type</th>
                      <th className="text-[#00509d] p-3 text-right font-medium">Score</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="max-h-[400px] overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-[#00509d] scrollbar-track-transparent">
              <table className="w-full">
                <tbody>
                  {reportData.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 border-b border-[#00509d]/10 last:border-0">
                      <td className="text-[#00509d]/90 font-medium p-3 w-[180px]">
                        {format(report.date, "MMM d, yyyy h:mm a")}
                      </td>
                      <td className="text-[#00509d]/90 p-3 w-[120px]">{report.timeSpent}</td>
                      <td className="text-[#00509d]/90 p-3">{report.gameType}</td>
                      <td className="text-[#00509d]/90 text-right p-3">{report.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Export button */}
          <div className="flex justify-end mt-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#00509d] text-white rounded-md hover:bg-[#003f88] transition-colors">
              <Download size={16} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Performance Graph Section */}
        <div
          id="performance-section"
          className="bg-white border border-[#e8594a]/30 rounded-lg p-6 scroll-mt-8 shadow-sm"
        >
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
                className="flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-center font-medium bg-[#e8594a] border-[#e8594a]/30 text-white hover:bg-[#d04b3e] hover:border-[#e8594a] cursor-pointer"
              >
                <Calendar className="h-4 w-4 text-white" />
                {format(graphDate, "MMMM yyyy")}
              </button>

              {isGraphCalendarOpen && (
                <div className="absolute z-50 mt-1 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#e8594a] rounded-lg shadow-lg border border-[#e8594a]/30">
                    <MonthPicker
                      selectedDate={graphDate}
                      onChange={(newDate) => {
                        setGraphDate(newDate)
                        setIsGraphCalendarOpen(false)
                      }}
                      onClose={() => setIsGraphCalendarOpen(false)}
                      colorScheme="red"
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
          <div className="bg-white border border-[#e8594a]/20 rounded-lg p-4 relative shadow-sm overflow-hidden">
            {/* Graph header with legend */}
            <div className="flex flex-wrap justify-between mb-4">
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#00509d]"></div>
                  <span className="text-[#00509d] text-xs sm:text-sm">Addition</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#f6aa54]"></div>
                  <span className="text-[#f6aa54] text-xs sm:text-sm">Subtraction</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#e8594a]"></div>
                  <span className="text-[#e8594a] text-xs sm:text-sm">Multiplication</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#4CAF50]"></div>
                  <span className="text-[#4CAF50] text-xs sm:text-sm">Division</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <span className="text-[#e8594a] text-xs sm:text-sm">Showing: Accuracy (%)</span>
              </div>
            </div>

            {/* SVG Graph - Responsive version */}
            <div className="w-full" style={{ aspectRatio: "16/9" }}>
              <svg className="w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet">
                {/* Background */}
                <rect x="0" y="0" width="800" height="450" fill="white" />

                {/* X and Y axes */}
                <line x1="80" y1="350" x2="80" y2="50" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
                <line x1="80" y1="350" x2="750" y2="350" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />

                {/* Y-axis labels */}
                <text x="75" y="50" textAnchor="end" fill="rgba(0,0,0,0.6)" fontSize="12">
                  100%
                </text>
                <text x="75" y="125" textAnchor="end" fill="rgba(0,0,0,0.6)" fontSize="12">
                  80%
                </text>
                <text x="75" y="200" textAnchor="end" fill="rgba(0,0,0,0.6)" fontSize="12">
                  60%
                </text>
                <text x="75" y="275" textAnchor="end" fill="rgba(0,0,0,0.6)" fontSize="12">
                  40%
                </text>
                <text x="75" y="350" textAnchor="end" fill="rgba(0,0,0,0.6)" fontSize="12">
                  20%
                </text>

                {/* X-axis labels (days) */}
                {[5, 10, 15, 20, 25, 30].map((day) => (
                  <text key={day} x={80 + day * 22} y="370" textAnchor="middle" fill="rgba(0,0,0,0.6)" fontSize="12">
                    {day}
                  </text>
                ))}

                {/* Axis titles */}
                <text x="400" y="400" textAnchor="middle" fill="#e8594a" fontSize="14">
                  Day of Month
                </text>
                <text x="30" y="200" textAnchor="middle" fill="#e8594a" fontSize="14" transform="rotate(-90, 30, 200)">
                  Accuracy (%)
                </text>

                {/* Grid lines */}
                {[50, 125, 200, 275, 350].map((y, i) => (
                  <line
                    key={`grid-y-${i}`}
                    x1="80"
                    y1={y}
                    x2="750"
                    y2={y}
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                ))}

                {/* Addition line */}
                {performanceData.byGameType.Addition.length > 0 && (
                  <>
                    <polyline
                      points={performanceData.byGameType.Addition.map(
                        (data) => `${80 + data.day * 22},${350 - data.accuracy * 3}`,
                      ).join(" ")}
                      fill="none"
                      stroke="#00509d"
                      strokeWidth="2"
                    />

                    {/* Data points for Addition */}
                    {performanceData.byGameType.Addition.map((data) => (
                      <circle
                        key={`add-${data.day}`}
                        cx={80 + data.day * 22}
                        cy={350 - data.accuracy * 3}
                        r="4"
                        fill="#00509d"
                      />
                    ))}
                  </>
                )}

                {/* Subtraction line */}
                {performanceData.byGameType.Subtraction.length > 0 && (
                  <>
                    <polyline
                      points={performanceData.byGameType.Subtraction.map(
                        (data) => `${80 + data.day * 22},${350 - data.accuracy * 3}`,
                      ).join(" ")}
                      fill="none"
                      stroke="#f6aa54"
                      strokeWidth="2"
                    />

                    {/* Data points for Subtraction */}
                    {performanceData.byGameType.Subtraction.map((data) => (
                      <circle
                        key={`sub-${data.day}`}
                        cx={80 + data.day * 22}
                        cy={350 - data.accuracy * 3}
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
                        (data) => `${80 + data.day * 22},${350 - data.accuracy * 3}`,
                      ).join(" ")}
                      fill="none"
                      stroke="#e8594a"
                      strokeWidth="2"
                    />

                    {/* Data points for Multiplication */}
                    {performanceData.byGameType.Multiplication.map((data) => (
                      <circle
                        key={`mul-${data.day}`}
                        cx={80 + data.day * 22}
                        cy={350 - data.accuracy * 3}
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
                        (data) => `${80 + data.day * 22},${350 - data.accuracy * 3}`,
                      ).join(" ")}
                      fill="none"
                      stroke="#4CAF50"
                      strokeWidth="2"
                    />

                    {/* Data points for Division */}
                    {performanceData.byGameType.Division.map((data) => (
                      <circle
                        key={`div-${data.day}`}
                        cx={80 + data.day * 22}
                        cy={350 - data.accuracy * 3}
                        r="4"
                        fill="#4CAF50"
                      />
                    ))}
                  </>
                )}
              </svg>
            </div>
          </div>

          {/* Performance metrics by game type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-6">
            <div className="bg-white border border-[#00509d]/30 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={18} className="text-[#00509d]" />
                <h3 className="text-sm text-[#00509d]">Addition</h3>
              </div>
              <div className="text-2xl font-bold text-[#00509d]">
                {performanceData.byGameType.Addition.length > 0
                  ? Math.round(
                      performanceData.byGameType.Addition.reduce((sum, data) => sum + data.accuracy, 0) /
                        performanceData.byGameType.Addition.length,
                    )
                  : 0}
                %
              </div>
              <p className="text-sm text-[#00509d]/80 mt-1">
                {performanceData.byGameType.Addition.reduce((sum, data) => sum + data.questionsAnswered, 0)} questions
              </p>
            </div>

            <div className="bg-white border border-[#f6aa54]/30 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={18} className="text-[#f6aa54]" />
                <h3 className="text-sm text-[#f6aa54]">Subtraction</h3>
              </div>
              <div className="text-2xl font-bold text-[#f6aa54]">
                {performanceData.byGameType.Subtraction.length > 0
                  ? Math.round(
                      performanceData.byGameType.Subtraction.reduce((sum, data) => sum + data.accuracy, 0) /
                        performanceData.byGameType.Subtraction.length,
                    )
                  : 0}
                %
              </div>
              <p className="text-sm text-[#f6aa54]/80 mt-1">
                {performanceData.byGameType.Subtraction.reduce((sum, data) => sum + data.questionsAnswered, 0)}{" "}
                questions
              </p>
            </div>

            <div className="bg-white border border-[#e8594a]/30 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={18} className="text-[#e8594a]" />
                <h3 className="text-sm text-[#e8594a]">Multiplication</h3>
              </div>
              <div className="text-2xl font-bold text-[#e8594a]">
                {performanceData.byGameType.Multiplication.length > 0
                  ? Math.round(
                      performanceData.byGameType.Multiplication.reduce((sum, data) => sum + data.accuracy, 0) /
                        performanceData.byGameType.Multiplication.length,
                    )
                  : 0}
                %
              </div>
              <p className="text-sm text-[#e8594a]/80 mt-1">
                {performanceData.byGameType.Multiplication.reduce((sum, data) => sum + data.questionsAnswered, 0)}{" "}
                questions
              </p>
            </div>

            <div className="bg-white border border-[#4CAF50]/30 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={18} className="text-[#4CAF50]" />
                <h3 className="text-sm text-[#4CAF50]">Division</h3>
              </div>
              <div className="text-2xl font-bold text-[#4CAF50]">
                {performanceData.byGameType.Division.length > 0
                  ? Math.round(
                      performanceData.byGameType.Division.reduce((sum, data) => sum + data.accuracy, 0) /
                        performanceData.byGameType.Division.length,
                    )
                  : 0}
                %
              </div>
              <p className="text-sm text-[#4CAF50]/80 mt-1">
                {performanceData.byGameType.Division.reduce((sum, data) => sum + data.questionsAnswered, 0)} questions
              </p>
            </div>
          </div>
        </div>

        {/* Time Tables Performance Section */}
        <div
          id="times-tables-section"
          className="bg-white border border-[#00509d]/30 rounded-lg p-6 scroll-mt-8 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-[#00509d] mb-4">Time Tables Performance</h2>
          <p className="text-[#00509d]/80 mb-6">Average response time (seconds) for multiplication facts</p>

          {/* Time Tables Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[900px] max-w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 bg-gray-50 border border-[#00509d]/30 text-[#00509d] font-bold sticky left-0 z-10">
                      ×
                    </th>
                    {Array.from({ length: 19 }, (_, i) => i + 2).map((num) => (
                      <th
                        key={`header-${num}`}
                        className="p-2 bg-gray-50 border border-[#00509d]/30 text-[#00509d] font-bold"
                      >
                        {num}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 19 }, (_, i) => i + 2).map((rowNum) => (
                    <tr key={`row-${rowNum}`}>
                      <th className="p-2 bg-gray-50 border border-[#00509d]/30 text-[#00509d] font-bold sticky left-0 z-10">
                        {rowNum}
                      </th>
                      {Array.from({ length: 19 }, (_, j) => j + 2).map((colNum) => {
                        const speed = timeTablesData[rowNum - 2][colNum - 2]
                        return (
                          <td
                            key={`cell-${rowNum}-${colNum}`}
                            className="p-2 border border-[#00509d]/20 text-center"
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
              <span className="text-[#4CAF50] text-sm">Fast (≤ 2.0s)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#f6aa54]"></div>
              <span className="text-[#f6aa54] text-sm">Medium (≤ 3.5s)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#e8594a]"></div>
              <span className="text-[#e8594a] text-sm">Slow ({">"}3.5s)</span>
            </div>
          </div>
        </div>

        {/* Space Journey Progress Section */}
        <div
          id="space-journey-section"
          className="bg-white border border-[#e8594a]/30 rounded-lg p-6 scroll-mt-8 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-[#e8594a] mb-4">Space Journey Progress</h2>
          <p className="text-[#e8594a]/80 mb-6">Track your progress through the solar system</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-6">
            {/* Planets with progress status */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 mb-2">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PlanetMercury-new-5gfvNnpxPKapf4pRLEmCvJOV98IRgS.png"
                  alt="Mercury"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm text-[#e8594a]">Mercury</span>
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
              <span className="text-sm text-[#e8594a]">Venus</span>
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
              <span className="text-sm text-[#e8594a]">Earth</span>
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
              <span className="text-sm text-[#e8594a]">Mars</span>
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
              <span className="text-sm text-gray-600">Jupiter</span>
              <span className="text-xs text-gray-600">Locked</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 mb-2 opacity-40 grayscale">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/planetSaturn-new-nK9Xh7eiUhr0EjlW0pfxmAhlEJO3da.png"
                  alt="Saturn"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm text-gray-600">Saturn</span>
              <span className="text-xs text-gray-600">Locked</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#e8594a]/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#e8594a] text-sm">Space Journey Progress</span>
              <span className="text-[#e8594a] font-medium text-sm">40%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
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
        <div
          id="learning-path-section"
          className="bg-white border border-[#00509d]/30 rounded-lg p-6 scroll-mt-8 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-[#00509d] mb-4">Learning Path</h2>
          <p className="text-[#00509d]/80 mb-6">Your personalized math learning journey</p>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#00509d]/30"></div>

            {/* Timeline items */}
            <div className="space-y-8">
              <div className="relative pl-14">
                <div className="absolute left-0 w-12 h-12 rounded-full bg-[#00509d] flex items-center justify-center text-white">
                  <CheckCircle size={24} />
                </div>
                <div className="bg-white border border-[#00509d]/20 rounded-lg p-4 shadow-sm">
                  <h4 className="text-[#00509d] font-medium">Addition & Subtraction</h4>
                  <p className="text-[#00509d]/80 text-sm mt-1">Completed on January 15, 2024</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden flex-1">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: "100%",
                          backgroundColor: "#00509d",
                        }}
                      />
                    </div>
                    <span className="text-[#00509d] text-sm">100%</span>
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
                <div className="bg-white border border-[#f6aa54]/20 rounded-lg p-4 shadow-sm">
                  <h4 className="text-[#f6aa54] font-medium">Multiplication & Division</h4>
                  <p className="text-[#f6aa54]/80 text-sm mt-1">In progress</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden flex-1">
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
                <div className="absolute left-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
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
                <div className="bg-white border border-gray-100 rounded-lg p-4">
                  <h4 className="text-gray-600 font-medium">Fractions & Decimals</h4>
                  <p className="text-gray-400 text-sm mt-1">Locked - Complete previous modules first</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden flex-1">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: "0%",
                          backgroundColor: "#e8594a",
                        }}
                      />
                    </div>
                    <span className="text-gray-400 text-sm">0%</span>
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

