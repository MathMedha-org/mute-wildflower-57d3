"use client"

import { TableHeader } from "@/components/ui/table"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Award, Trophy, Timer, Check, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"

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
    <div className="w-full sm:max-w-6xl sm:mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col space-y-8 bg-[#0F283D] p-8 rounded-xl border border-[#50adb6]/20">
        {/* Header with back button and centered title */}
        <div className="flex items-center relative">
          <Link
            href="/dashboard/games"
            className="w-10 h-10 rounded-full bg-[#50adb6] flex items-center justify-center text-white hover:bg-[#3d8a91] transition-colors absolute left-0"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <h1 className="text-3xl font-bold text-[#50adb6] flex-1 text-center">Quiz Results</h1>
        </div>

        <div className="space-y-8">
          {/* First Row - Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Stars, Badges, and Planets */}
            <div className="bg-[#163c5a] rounded-xl p-6">
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
                  <div className="text-3xl font-bold text-[#50adb6]">{results.badges.length}</div>
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
            <div className="bg-[#163c5a] rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[#50adb6] mb-4">Performance Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#50adb6]/20 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-[#50adb6]" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60">Accuracy</div>
                    <div className="text-lg font-semibold text-white">
                      {Math.round((results.correctAnswers / results.totalQuestions) * 100)}%
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f6aa54]/20 flex items-center justify-center">
                    <Timer className="w-5 h-5 text-[#f6aa54]" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60">Avg. Time</div>
                    <div className="text-lg font-semibold text-white">{results.averageTime}s</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e8594a]/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#e8594a]" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60">Longest Streak</div>
                    <div className="text-lg font-semibold text-white">{results.longestStreak}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#50adb6]/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-[#50adb6]" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60">Correct</div>
                    <div className="text-lg font-semibold text-white">
                      {results.correctAnswers}/{results.totalQuestions}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Questions Table */}
          <div className="relative overflow-hidden rounded-lg border border-[#50adb6]/30">
            <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#50adb6] scrollbar-track-transparent">
              <Table>
                <TableHeader className="bg-[#0F283D]/50">
                  <TableRow>
                    <TableHead className="text-[#50adb6] w-[50px] text-base">No.</TableHead>
                    <TableHead className="text-[#50adb6] text-base">Question</TableHead>
                    <TableHead className="text-[#50adb6] text-base">Your Answer</TableHead>
                    <TableHead className="text-[#50adb6] hidden sm:table-cell text-base">Correct Answer</TableHead>
                    <TableHead className="text-[#50adb6] hidden sm:table-cell text-base">Time</TableHead>
                    <TableHead className="text-[#50adb6] w-[50px] text-base">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.questions.map((q, index) => (
                    <TableRow key={index} className="hover:bg-[#0F283D]/30">
                      <TableCell className="text-white font-medium text-base">{index + 1}</TableCell>
                      <TableCell className="text-white text-base">{q.question}</TableCell>
                      <TableCell className={`${q.isCorrect ? "text-[#50adb6]" : "text-[#e8594a]"} text-base`}>
                        {q.userAnswer}
                      </TableCell>
                      <TableCell className="text-[#50adb6] hidden sm:table-cell text-base">{q.correctAnswer}</TableCell>
                      <TableCell className="text-white/60 hidden sm:table-cell text-base">{q.timeSpent}s</TableCell>
                      <TableCell>
                        <div
                          className={`w-8 h-8 rounded-full ${
                            q.isCorrect ? "bg-[#50adb6]" : "bg-[#e8594a]"
                          } flex items-center justify-center`}
                        >
                          {q.isCorrect ? (
                            <Check className="w-5 h-5 text-white" />
                          ) : (
                            <X className="w-5 h-5 text-white" />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard/play/space-quiz"
            className="px-6 py-3 bg-[#50adb6] text-white rounded-lg hover:bg-[#3d8a91] transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-[#f6aa54] text-white rounded-lg hover:bg-[#e59843] transition-colors"
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

