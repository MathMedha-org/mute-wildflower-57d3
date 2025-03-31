"use client"

import { Brain, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

type PracticeType = "multiplication" | "division" | "together"

export default function MultiplicationDivisionPage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<string>("1min")
  const [selectedType, setSelectedType] = useState<PracticeType>("multiplication")
  const [selectedTables, setSelectedTables] = useState<number[]>([])

  const handleTableToggle = (num: number) => {
    setSelectedTables((prev) => (prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]))
  }

  const handleStart = () => {
    if (selectedTables.length === 0) return
    router.push("/dashboard/play/space-quiz")
  }

  // Helper function to determine text color based on time range
  const getTimeColor = (seconds: number) => {
    if (seconds <= 2) return "#4CAF50" // Green
    if (seconds <= 3) return "#FFC107" // Amber
    if (seconds <= 6) return "#f44336" // Red
    return "#000000" // Black
  }

  // Helper function to render proficiency indicator
  const renderProficiencyIndicator = (num: number) => {
    if (num === 2) {
      return (
        <div className="absolute top-1 right-1">
          <div className="w-3 h-3 rounded-full bg-[#4f8a4c]"></div>
        </div>
      )
    } else if (num === 7) {
      return (
        <div className="absolute top-1 right-1">
          <div className="w-3 h-3 rounded-full bg-[#f6aa54]"></div>
        </div>
      )
    } else if (num === 9) {
      return (
        <div className="absolute top-1 right-1">
          <div className="w-3 h-3 rounded-full bg-[#e8594a]"></div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full sm:max-w-6xl sm:mx-auto pt-3 sm:pt-4 lg:pt-6 pb-8">
      <div className="flex flex-col space-y-8 p-6">
        <div className="relative flex items-start justify-center">
          <Link
            href="/dashboard/practice"
            className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#00509d] flex items-center justify-center text-white hover:bg-[#00509d]/80 transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <div className="text-center mb-4 sm:mb-8 pt-8 sm:pt-0">
            <h1 className="text-3xl font-bold text-[#00509d]">Multiplication & Division</h1>
            <p className="text-gray-700">Learn to multiply and divide with confidence</p>
          </div>
        </div>

        {/* Practice Settings - Full Width Row */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#00509d]">Practice Settings</h2>

            {/* Practice and Choose Type in one row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Practice */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-[#00509d]">Practice:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {/* Time-based options */}
                  {["1min", "2min", "3min"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedOption(option)}
                      className={`p-3 transition-all ${
                        selectedOption === option
                          ? "bg-[#00509d] text-white"
                          : "bg-white text-gray-700 hover:bg-[#00509d]/10"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {/* Divider */}
                <div className="border-t border-[#f6aa54]/20 my-3" />
                {/* Question-based options */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["10 Qns", "20 Qns", "30 Qns", "40 Qns", "50 Qns"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedOption(option)}
                      className={`p-3 transition-all ${
                        selectedOption === option
                          ? "bg-[#00509d] text-white"
                          : "bg-white text-gray-700 hover:bg-[#00509d]/10"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Choose Type */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-[#00509d]">Choose Type:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(["multiplication", "division", "together"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`p-3 min-h-[48px] transition-all flex items-center justify-center ${
                        selectedType === type
                          ? "bg-[#00509d] text-white"
                          : "bg-white text-gray-700 hover:bg-[#00509d]/10"
                      }`}
                    >
                      {type === "multiplication" ? "Multiply" : type === "division" ? "Divide" : "Together"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Selection - Full Width */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#00509d] mb-4">Select Tables</h2>

            {/* Add color indicators */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#4f8a4c]"></div>
                <span className="text-gray-700 text-sm">Fast (≤ 2.0s)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#f6aa54]"></div>
                <span className="text-gray-700 text-sm">Medium (≤ 3.5s)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#e8594a]"></div>
                <span className="text-gray-700 text-sm">Slow (&gt;3.5s)</span>
              </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,108px)] min-[376px]:grid-cols-[repeat(auto-fill,130px)] min-[1025px]:grid-cols-[repeat(auto-fill,174px)] gap-2">
              {Array.from({ length: 19 }, (_, i) => i + 2).map((num) => (
                <button
                  key={num}
                  onClick={() => handleTableToggle(num)}
                  className={`relative h-12 w-full text-2xl font-medium transition-all flex items-center justify-center ${
                    selectedTables.includes(num)
                      ? "bg-[#00509d] text-white"
                      : "bg-white text-gray-700 hover:bg-[#00509d]/10"
                  }`}
                >
                  {num}
                  {renderProficiencyIndicator(num)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleStart}
            disabled={selectedTables.length === 0}
            className={`px-8 py-3 text-lg font-semibold rounded-md transition-all ${
              selectedTables.length > 0
                ? "bg-[#f6aa54] hover:bg-[#e59843] text-white"
                : "bg-[#f6aa54]/50 text-white/50 cursor-not-allowed"
            }`}
          >
            Start Practice
          </button>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-4">
            <Brain className="h-8 w-8 text-[#00509d]" />
            <div>
              <h2 className="text-xl font-semibold text-[#00509d]">Get Ready!</h2>
              <p className="text-gray-700">Select your preferred settings and start practicing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

