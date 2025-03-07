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
    <div className="w-full sm:max-w-6xl sm:mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col space-y-8 bg-[#0F283D] p-8 rounded-xl border border-[#50adb6]/20">
        <div className="relative flex items-start justify-center">
          <Link
            href="/dashboard/practice"
            className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#e8594a] flex items-center justify-center text-white hover:bg-[#d64a3d] transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <div className="text-center mb-4 sm:mb-8 pt-8 sm:pt-0">
            <h1 className="text-3xl font-bold text-[#e8594a]">All Together</h1>
            <p className="text-white/80">Challenge yourself with mixed operations</p>
          </div>
        </div>

        {/* Practice Settings - Full Width Row */}
        <div className="bg-[#0F283D] border border-[#e8594a]/30 rounded-lg p-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#e8594a]">Practice Settings</h2>

            {/* Practice and Choose Type in one row */}
            <div className="w-full">
              {/* Practice */}
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-[#e8594a]">Practice:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {/* Time-based options */}
                  {["1min", "2min", "3min"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedOption(option)}
                      className={`p-3 transition-all ${
                        selectedOption === option
                          ? "bg-[#f6aa54] text-white shadow-lg"
                          : "bg-[#e8594a] text-white hover:bg-[#d64a3d]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {/* Divider */}
                <div className="border-t border-[#e8594a]/20 my-3" />
                {/* Question-based options */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["10 Qns", "20 Qns", "30 Qns", "40 Qns", "50 Qns"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedOption(option)}
                      className={`p-3 transition-all ${
                        selectedOption === option
                          ? "bg-[#f6aa54] text-white shadow-lg"
                          : "bg-[#e8594a] text-white hover:bg-[#d64a3d]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleStart}
            className="px-8 py-4 text-xl font-bold transition-all bg-[#e8594a] hover:bg-[#d64a3d] text-white shadow-lg"
          >
            Start Practice
          </button>
        </div>
      </div>
    </div>
  )
}

