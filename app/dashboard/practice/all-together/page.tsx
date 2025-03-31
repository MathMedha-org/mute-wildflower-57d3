"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AllTogetherPage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<string>("1min")

  const handleStart = () => {
    router.push("/dashboard/play/space-quiz")
  }

  return (
    <div className="w-full sm:max-w-6xl sm:mx-auto pt-3 sm:pt-4 lg:pt-6 pb-8">
      <div className="flex flex-col space-y-8 p-6 rounded-xl">
        <div className="relative flex items-start justify-center">
          <Link
            href="/dashboard/practice"
            className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#00509d] flex items-center justify-center text-white hover:bg-[#00509d]/90 transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <div className="text-center mb-4 sm:mb-8 pt-8 sm:pt-0">
            <h1 className="text-3xl font-bold text-[#00509d]">All Together</h1>
            <p className="text-[#00509d]/80">Challenge yourself with mixed operations</p>
          </div>
        </div>

        {/* Practice Settings - Full Width Row */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 shadow-sm">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#00509d]">Practice Settings</h2>

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
                        ? "bg-[#00509d] text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-[#00509d]/10"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {/* Divider */}
              <div className="border-t border-gray-200 my-3" />
              {/* Question-based options */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {["40 Qns", "50 Qns", "60 Qns"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedOption(option)}
                    className={`p-3 transition-all ${
                      selectedOption === option
                        ? "bg-[#00509d] text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-[#00509d]/10"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleStart}
            className="px-8 py-3 text-lg font-semibold transition-all bg-[#00509d] hover:bg-[#00509d]/90 text-white shadow-md rounded-md"
          >
            Start Practice
          </button>
        </div>
      </div>
    </div>
  )
}

