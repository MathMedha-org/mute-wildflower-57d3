"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Award, Trophy, Timer, Check, X } from "lucide-react"

interface Question {
  question: string
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
  timeSpent: number
}

export default function ResultsPage() {
  // This would come from URL state or context in a real implementation
  const [results] = useState({
    stars: 3,
    badges: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/badge2-8jkXxrzEVJETguvAkpuUcMAIrJljV6.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/badge3-RdVBodJdETf3uqtkKAB2BB39op1s8Q.png",
    ],
    planetsUnlocked: 4,
    totalQuestions: 10,
    correctAnswers: 7,
    averageTime: 4.2,
    longestStreak: 5,
    questions: [
      { question: "2 × 3", userAnswer: "6", correctAnswer: "6", isCorrect: true, timeSpent: 3.2 },
      { question: "4 × 5", userAnswer: "20", correctAnswer: "20", isCorrect: true, timeSpent: 4.1 },
      { question: "7 × 6", userAnswer: "40", correctAnswer: "42", isCorrect: false, timeSpent: 5.5 },
      { question: "3 × 8", userAnswer: "24", correctAnswer: "24", isCorrect: true, timeSpent: 3.8 },
      { question: "9 × 4", userAnswer: "36", correctAnswer: "36", isCorrect: true, timeSpent: 4.3 },
      { question: "5 × 7", userAnswer: "35", correctAnswer: "35", isCorrect: true, timeSpent: 3.9 },
      { question: "8 × 6", userAnswer: "48", correctAnswer: "48", isCorrect: true, timeSpent: 4.7 },
      { question: "4 × 9", userAnswer: "32", correctAnswer: "36", isCorrect: false, timeSpent: 5.2 },
      { question: "7 × 7", userAnswer: "49", correctAnswer: "49", isCorrect: true, timeSpent: 3.6 },
      { question: "6 × 8", userAnswer: "48", correctAnswer: "48", isCorrect: true, timeSpent: 4.0 },
    ] as Question[],
  })

  return (
    <div className="w-full sm:max-w-6xl sm:mx-auto pt-3 sm:pt-4 lg:pt-6 pb-8">
      <div className="flex flex-col space-y-8 bg-white p-6 rounded-xl">
        {/* Header with back button and centered title */}
        <div className="flex items-center relative">
          <Link
            href="/dashboard/games"
            className="w-10 h-10 rounded-full bg-[#00509d] flex items-center justify-center text-white hover:bg-[#003f88] transition-colors absolute left-0"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <h1 className="text-3xl font-bold text-[#00509d] flex-1 text-center">Quiz Results</h1>
        </div>

        <div className="space-y-8">
          {/* First Row - Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Stars, Badges, and Planets */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/star-new-1-UTkmXOtgZhPppw2A2ZVb6GnwrycAWU.png"
                      alt="Star"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-3xl font-bold text-[#f6aa54]">{results.stars}</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/badge-new-1-Sbjj0z0hHhRzv0tXCFDuiC0sLp0xgY.png"
                      alt="Badge"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-3xl font-bold text-[#00509d]">{results.badges.length}</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PlanetEarth-new-aG11YKqAnLBL4DT4JVm6tsW3wIgsn6.png"
                      alt="Planet"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-3xl font-bold text-[#e8594a]">{results.planetsUnlocked}</div>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-[#00509d] mb-4">Performance Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00509d]/10 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-[#00509d]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Accuracy</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {Math.round((results.correctAnswers / results.totalQuestions) * 100)}%
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f6aa54]/10 flex items-center justify-center">
                    <Timer className="w-5 h-5 text-[#f6aa54]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Avg. Time</div>
                    <div className="text-lg font-semibold text-gray-800">{results.averageTime}s</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e8594a]/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#e8594a]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Longest Streak</div>
                    <div className="text-lg font-semibold text-gray-800">{results.longestStreak}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00509d]/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-[#00509d]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Correct</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {results.correctAnswers}/{results.totalQuestions}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Questions Table */}
          <div className="relative overflow-hidden rounded-lg border border-gray-200">
            <div className="max-h-[600px] overflow-y-auto relative">
              <table className="w-full">
                <thead className="bg-[#00509d] sticky top-0 z-20">
                  <tr>
                    <th className="text-white w-[50px] text-base text-left p-4">No.</th>
                    <th className="text-white text-base text-left p-4">Question</th>
                    <th className="text-white text-base text-left p-4">Your Answer</th>
                    <th className="text-white hidden sm:table-cell text-base text-left p-4">Correct Answer</th>
                    <th className="text-white hidden sm:table-cell text-base text-left p-4">Time</th>
                    <th className="text-white w-[50px] text-base text-left p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.questions.map((q, index) => (
                    <tr key={index} className="hover:bg-gray-50 border-b border-gray-200">
                      <td className="text-gray-800 font-medium text-base p-4">{index + 1}</td>
                      <td className="text-gray-800 text-base p-4">{q.question}</td>
                      <td className={`${q.isCorrect ? "text-[#00509d]" : "text-[#e8594a]"} text-base p-4`}>
                        {q.userAnswer}
                      </td>
                      <td className="text-[#00509d] hidden sm:table-cell text-base p-4">{q.correctAnswer}</td>
                      <td className="text-gray-500 hidden sm:table-cell text-base p-4">{q.timeSpent}s</td>
                      <td className="p-4">
                        <div
                          className={`w-8 h-8 rounded-full ${
                            q.isCorrect ? "bg-[#00509d]" : "bg-[#e8594a]"
                          } flex items-center justify-center`}
                        >
                          {q.isCorrect ? (
                            <Check className="w-5 h-5 text-white" />
                          ) : (
                            <X className="w-5 h-5 text-white" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard/play/space-quiz"
            className="px-6 py-3 bg-[#00509d] text-white rounded-lg hover:bg-[#003f88] transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-[#e8594a] text-white rounded-lg hover:bg-[#d04a3e] transition-colors"
          >
            Unlock Adventure
          </Link>
          <Link
            href="/dashboard/explore-ranks"
            className="px-6 py-3 bg-[#4CAF50] text-white rounded-lg hover:bg-[#3e8e41] transition-colors"
          >
            Explore Ranks
          </Link>
        </div>
      </div>
    </div>
  )
}

