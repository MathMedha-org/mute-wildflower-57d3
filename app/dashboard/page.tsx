"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Dumbbell,
  GamepadIcon,
  Zap,
  Sword,
  Crown,
  Target,
  FlameIcon as Fire,
  Calendar,
  Star,
  BookOpen,
  Bell,
  BarChart2,
} from "lucide-react"

// Mock data for progress - in a real app this would come from your backend
const progressData = {
  addition: {
    completed: 75,
    avgSeconds: 1.8, // Will show green
    total: 500,
  },
  subtraction: {
    completed: 45,
    avgSeconds: 4.8, // Will show red
    total: 300,
  },
  multiplication: {
    completed: 75,
    avgSeconds: 1.8, // Will show green
    total: 500,
  },
  division: {
    completed: 45,
    avgSeconds: 4.8, // Will show red
    total: 300,
  },
}

// Achievement data
const achievements = [
  {
    title: "Speed Demon",
    description: "Answer a question correctly in under 1 second",
    icon: Zap,
    color: "#e8594a",
    progress: 100, // Completed
    date: "2 hours ago",
  },
  {
    title: "Math Warrior",
    description: "Complete quizzes daily for a whole month",
    icon: Sword,
    color: "#50adb6",
    progress: 80, // 24/30 days
    date: "In progress",
  },
  {
    title: "Quiz Champ",
    description: "Win 10 quizzes against other players",
    icon: Crown,
    color: "#f6aa54",
    progress: 60, // 6/10 wins
    date: "In progress",
  },
  {
    title: "Perfect Score",
    description: "Complete a quiz with 100% accuracy",
    icon: Target,
    color: "#4CAF50",
    progress: 100, // Completed
    date: "1 day ago",
  },
  {
    title: "Hot Streak",
    description: "Answer 20 questions correctly in a row",
    icon: Fire,
    color: "#FF5722",
    progress: 75, // 15/20 correct
    date: "In progress",
  },
  {
    title: "Dedicated Learner",
    description: "Practice every day for a week",
    icon: Calendar,
    color: "#9C27B0",
    progress: 100, // Completed
    date: "3 days ago",
  },
]

// Achievement Card Component
const AchievementCard = ({
  title,
  description,
  icon: Icon,
  color,
  progress,
  date,
}: {
  title: string
  description: string
  icon: any
  color: string
  progress: number
  date: string
}) => (
  <div className="bg-[#0F283D] border border-white/10 rounded-lg p-4 relative overflow-hidden group hover:border-[#50adb6]/30 transition-colors">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-white/70 mb-2">{description}</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                backgroundColor: color,
              }}
            />
          </div>
          <span className="text-sm font-medium" style={{ color }}>
            {progress}%
          </span>
        </div>
        <p className="text-xs text-white/50 mt-2">{date}</p>
      </div>
    </div>
    {progress === 100 && (
      <div className="absolute top-2 right-2">
        <Star className="w-4 h-4 text-[#FFD700]" fill="#FFD700" />
      </div>
    )}
  </div>
)

// Previous components remain unchanged
const ProgressBar = ({
  data,
  color = "#50adb6", // Add color prop with default value
}: {
  data: { avgSeconds: number; completed: number; total: number }
  color?: string
}) => (
  <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6 w-full pl-8 sm:pl-0">
    {/* Progress bar container with proper mobile padding */}
    <div className="relative flex justify-center sm:justify-start w-full sm:w-auto sm:pl-8">
      <div className="h-36 w-8 bg-white/10 rounded-full relative overflow-visible">
        {/* Color segments */}
        <div className="absolute inset-0 w-full rounded-full overflow-hidden">
          <div
            className="absolute inset-0 w-full"
            style={{
              background:
                "linear-gradient(to top, black 40%, #f44336 30%, #f44336 50%, #FFC107 70%, #4CAF50 80%, #4CAF50 100%)",
            }}
          />
        </div>
        {/* Time range markers - adjusted for mobile */}
        <div className="absolute -left-6 top-[20%] text-xs text-[#4CAF50] font-medium whitespace-nowrap">2s</div>
        <div className="absolute -left-6 top-[30%] text-xs text-[#FFC107] font-medium whitespace-nowrap">3s</div>
        <div className="absolute -left-6 top-[50%] text-xs text-[#f44336] font-medium whitespace-nowrap">6s</div>
        <div className="absolute -left-6 top-[80%] text-xs text-white/60 font-medium whitespace-nowrap">10s</div>
        {/* Marker lines */}
        <div className="absolute left-0 top-[20%] w-3 h-0.5 bg-[#4CAF50]" />
        <div className="absolute left-0 top-[30%] w-3 h-0.5 bg-[#FFC107]" />
        <div className="absolute left-0 top-[50%] w-3 h-0.5 bg-[#f44336]" />
        <div className="absolute left-0 top-[80%] w-3 h-0.5 bg-[#000000]" />
        {/* Current time indicator line */}
        <div
          className="absolute w-full h-0.5 bg-white shadow-[0_0_4px_rgba(255,255,255,0.7)]"
          style={{
            bottom: `${Math.min(Math.max((10 - data.avgSeconds) * 10, 0), 100)}%`,
          }}
        />
      </div>
    </div>

    {/* Stats container - update text colors */}
    <div className="flex-1 w-full sm:w-auto">
      <div className="space-y-2 max-w-[300px] mx-auto text-center">
        <div className="flex items-center justify-center">
          <span className="text-white/80">
            Total score: <span style={{ color }}>{data.total}</span>
          </span>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-white/80">
            Avg. time: <span style={{ color }}>{data.avgSeconds}s</span>
          </span>
        </div>
      </div>
    </div>
  </div>
)

const OperationProgress = ({
  title,
  data,
  color,
}: {
  title: string
  data: { completed: number; total: number }
  color: string
}) => (
  <div className="space-y-2 w-full">
    <div className="flex justify-between items-center">
      <span className="text-white/80 text-sm">{title}</span>
      <span className="text-white font-medium text-sm">{data.completed}%</span>
    </div>
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${data.completed}%`,
          backgroundColor: color,
        }}
      />
    </div>
  </div>
)

// Helper function to determine text color based on time range
const getTimeColor = (seconds: number) => {
  if (seconds <= 2) return "#4CAF50" // Green
  if (seconds <= 3) return "#FFC107" // Amber
  if (seconds <= 6) return "#f44336" // Red
  return "#000000" // Black
}

export default function DashboardPage() {
  const [showWelcome, setShowWelcome] = useState(true)

  return (
    <div className="w-full sm:max-w-6xl sm:mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center text-center space-y-12 bg-[#0F283D] p-8 rounded-xl border border-[#50adb6]/20">
        {/* Welcome Message - only show if showWelcome is true */}
        {showWelcome && (
          <div className="w-full max-w-5xl mx-auto mb-0">
            {" "}
            {/* Updated line */}
            <div className="bg-[#0F283D] rounded-lg p-0 relative">
              {" "}
              {/* Updated div */}
              <div className="flex items-center justify-center">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  Welcome, John Doe <span className="text-[#50adb6]">(LightSpeed Legend)</span>
                </h2>
              </div>
              {/* Dismiss button */}
              <button
                onClick={() => setShowWelcome(false)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        )}
        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-5xl px-4">
          <Link href="/dashboard/practice" className="group block transform transition-transform hover:scale-105">
            <div className="bg-[#50adb6] hover:bg-[#3d8a91] rounded-lg p-6 h-full transition-colors duration-500">
              <div className="flex flex-col items-center gap-6">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <Dumbbell className="h-12 w-12 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-2xl font-semibold text-white">Practice</h3>
                  <p className="text-lg text-white/80">Master your math skills</p>
                </div>
                <p className="text-sm text-white/90 leading-relaxed">
                  Practice various math concepts at your own pace with interactive exercises and immediate feedback.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/dashboard/games" className="group block transform transition-transform hover:scale-105">
            <div className="bg-[#f6aa54] hover:bg-[#e59843] rounded-lg p-6 h-full transition-colors duration-500">
              <div className="flex flex-col items-center gap-6">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <GamepadIcon className="h-12 w-12 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-2xl font-semibold text-white">Games</h3>
                  <p className="text-lg text-white/80">Learn through play</p>
                </div>
                <p className="text-sm text-white/90 leading-relaxed">
                  Explore our collection of educational math games, including the Space Math Quiz adventure.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/dashboard/homework" className="group block transform transition-transform hover:scale-105">
            <div className="bg-[#e8594a] hover:bg-[#d64a3d] rounded-lg p-6 h-full transition-colors duration-500">
              <div className="flex flex-col items-center gap-6">
                <div className="flex justify-center relative">
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-12 w-12 text-white" strokeWidth={1.5} />
                  </div>
                  {/* Notification icon with count */}
                  <div className="absolute -top-2 -right-4" aria-label="2 pending assignments">
                    <div className="relative">
                      <Bell className="h-8 w-8 text-white" />
                      <div className="absolute -top-2 -right-2 bg-[#f6aa54] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white">
                        2
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-2xl font-semibold text-white">Homework</h3>
                  <p className="text-lg text-white/80">Complete assignments</p>
                </div>
                <p className="text-sm text-white/90 leading-relaxed">
                  View and complete your assigned math practice tasks and track your progress.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-6">
            <h3 className="text-sm text-white/80 mb-2">Total Practice Time</h3>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">12.5 hrs</span>
              <span className="text-sm text-[#4CAF50]">+2.3 hrs this week</span>
            </div>
          </div>

          <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-6">
            <h3 className="text-sm text-white/80 mb-2">Average Accuracy</h3>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">87%</span>
              <span className="text-sm text-[#4CAF50]">+5% from last week</span>
            </div>
          </div>

          <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-6">
            <h3 className="text-sm text-white/80 mb-2">Problems Solved</h3>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">1,284</span>
              <span className="text-sm text-[#4CAF50]">+168 this week</span>
            </div>
          </div>

          <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-6">
            <h3 className="text-sm text-white/80 mb-2">Average Time</h3>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">3.2s</span>
              <span className="text-sm text-[#4CAF50]">0.5s faster this week</span>
            </div>
          </div>
        </div>

        {/* Operations Progress Overview */}
        <div className="w-full max-w-5xl space-y-6 px-4">
          <h2 className="text-xl font-semibold text-[#50adb6] text-left">Operations Progress Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <OperationProgress
                title="Addition"
                data={{ completed: progressData.addition.completed, total: progressData.addition.total }}
                color="#50adb6"
              />
              <OperationProgress
                title="Subtraction"
                data={{ completed: progressData.subtraction.completed, total: progressData.subtraction.total }}
                color="#50adb6"
              />
            </div>
            <div className="space-y-4">
              <OperationProgress
                title="Multiplication"
                data={{ completed: progressData.multiplication.completed, total: progressData.multiplication.total }}
                color="#f6aa54"
              />
              <OperationProgress
                title="Division"
                data={{ completed: progressData.division.completed, total: progressData.division.total }}
                color="#f6aa54"
              />
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          {/* Addition Progress */}
          <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#50adb6] mb-4 text-center">Addition</h3>
            <ProgressBar data={progressData.addition} color="#50adb6" />
          </div>

          {/* Subtraction Progress */}
          <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#50adb6] mb-4 text-center">Subtraction</h3>
            <ProgressBar data={progressData.subtraction} color="#50adb6" />
          </div>

          {/* Multiplication Progress */}
          <div className="bg-[#0F283D] border border-[#f6aa54]/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#f6aa54] mb-4 text-center">Multiplication</h3>
            <ProgressBar data={progressData.multiplication} color="#f6aa54" />
          </div>

          {/* Division Progress */}
          <div className="bg-[#0F283D] border border-[#f6aa54]/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#f6aa54] mb-4 text-center">Division</h3>
            <ProgressBar data={progressData.division} color="#f6aa54" />
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="w-full max-w-5xl space-y-6 px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#50adb6] text-left">Recent Achievements</h2>
            <Link
              href="/dashboard/achievements"
              className="text-sm text-[#50adb6] hover:text-[#3d8a91] transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.title} {...achievement} />
            ))}
          </div>
        </div>

        {/* View Full Progress Button */}
        <div className="w-full max-w-5xl flex justify-center mt-8">
          <Link href="/dashboard/progress">
            <div className="flex items-center gap-2 bg-[#50adb6] hover:bg-[#3d8a91] text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg">
              <BarChart2 className="w-5 h-5" />
              <span>View Full Progress</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

