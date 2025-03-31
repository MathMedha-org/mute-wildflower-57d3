"use client"

import { useState, useEffect } from "react"
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
  Clock,
  CheckCircle,
  Brain,
  ZapIcon,
  BarChart2,
  ActivityIcon,
  ArrowRight,
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
  <div className="bg-[#ffffff] border border-gray-200 rounded-lg p-6 relative overflow-hidden group hover:border-[#fdc500]/30 transition-colors">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
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
        <p className="text-xs text-gray-500 mt-2">{date}</p>
      </div>
    </div>
    {progress === 100 && (
      <div className="absolute top-2 right-2">
        <Star className="w-4 h-4 text-[#FFD700]" fill="#FFD700" />
      </div>
    )}
  </div>
)

// Circular Stat Card Component
const CircularStatCard = ({
  title,
  value,
  change,
  icon: Icon,
  bgColor,
  hoverBgColor,
  iconColor,
}: {
  title: string
  value: string
  change: string
  icon: any
  bgColor: string
  hoverBgColor: string
  iconColor: string
}) => (
  <div className="flex flex-col items-center justify-center">
    <div
      className={`w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 cursor-pointer group relative`}
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="absolute inset-0 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{ backgroundColor: hoverBgColor }}
      ></div>
      <div className="relative z-10 flex flex-col items-center">
        <Icon className="w-12 h-12 mb-3" style={{ color: iconColor }} />
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className="text-sm text-white/80 mt-1">{title}</span>
      </div>
    </div>
    <span className="mt-3 text-sm text-[#4CAF50] font-medium">{change}</span>
  </div>
)

// Previous components remain unchanged
const ProgressBar = ({
  data,
  color = "#fdc500", // Add color prop with default value
}: {
  data: { avgSeconds: number; completed: number; total: number }
  color?: string
}) => (
  <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6 w-full pl-8 sm:pl-0">
    {/* Progress bar container with proper mobile padding */}
    <div className="relative flex justify-center sm:justify-start w-full sm:w-auto sm:pl-8">
      <div className="h-36 w-8 bg-gray-200 rounded-full relative overflow-visible">
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
          <span className="text-white">
            Total score: <span style={{ color }}>{data.total}</span>
          </span>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-white">
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
      <span className="text-gray-600 text-sm">{title}</span>
      <span className="text-gray-800 font-medium text-sm">{data.completed}%</span>
    </div>
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
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
  const [animationStarted, setAnimationStarted] = useState(false)

  useEffect(() => {
    // Start animations after component mounts
    setAnimationStarted(true)
  }, [])

  return (
    <div className="w-full">
      <style jsx global>{`
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes zoomInDown {
          from {
            opacity: 0;
            transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
            animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
          }
          60% {
            opacity: 1;
            transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
            animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
          }
          to {
            opacity: 1;
            transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
          }
        }
        
        @keyframes bounceIn {
          from,
          20%,
          40%,
          60%,
          80%,
          to {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          }
          
          0% {
            opacity: 0;
            transform: scale3d(0.3, 0.3, 0.3);
          }
          
          20% {
            transform: scale3d(1.1, 1.1, 1.1);
          }
          
          40% {
            transform: scale3d(0.9, 0.9, 0.9);
          }
          
          60% {
            opacity: 1;
            transform: scale3d(1.03, 1.03, 1.03);
          }
          
          80% {
            transform: scale3d(0.97, 0.97, 0.97);
          }
          
          to {
            opacity: 1;
            transform: scale3d(1, 1, 1);
          }
        }
        
        .fade-in-right {
          opacity: 0;
          animation-name: fadeInRight;
          animation-duration: 1s;
          animation-delay: 0.8s;
          animation-fill-mode: forwards;
        }
        
        .zoom-in-down {
          opacity: 0;
          animation-name: zoomInDown;
          animation-duration: 1s;
          animation-delay: 1.8s;
          animation-fill-mode: forwards;
        }
        
        .bounce-in {
          opacity: 0;
          animation-name: bounceIn;
          animation-duration: 1s;
          animation-delay: 0.5s;
          animation-fill-mode: forwards;
        }
      `}</style>
      <div className="w-full max-w-6xl mx-auto pt-3 sm:pt-4 lg:pt-6 pb-8">
        <div className="flex flex-col items-center text-center space-y-8 bg-[#ffffff] p-6 rounded-xl">
          {/* Welcome Message with bounceIn animation */}
          <div className="mb-2 flex flex-col items-center">
            <h2 className={`text-3xl font-bold text-[#00509d] ${animationStarted ? "bounce-in" : ""}`}>
              Welcome, John Doe <span className="text-[#3d7a3a]">(LightSpeed Legend)</span>
            </h2>
            <div className={`h-1 w-20 bg-[#fdc500] mt-2 mb-1 ${animationStarted ? "bounce-in" : ""}`}></div>
          </div>

          {/* Cards Section - With centered icons */}
          <div className="w-full mt-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Practice Card */}
              <Link href="/dashboard/practice" className="block h-full">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                  <div className="h-3 bg-[#00509d]"></div>
                  <div className="p-4 pb-5 flex flex-col items-center justify-between h-full">
                    {/* Icon centered vertically */}
                    <div className="flex-1 flex items-center justify-center py-3">
                      <div className="w-20 h-20 rounded-full bg-[#00509d]/10 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Dumbbell className="h-10 w-10 text-[#00509d]" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Text content at the bottom */}
                    <div className="text-center mt-2">
                      <h3 className="text-xl font-bold text-[#00509d] mb-2">Practice</h3>
                      <h4 className="text-base font-medium text-gray-700 mb-2">Master your math skills</h4>
                      <p className="text-gray-600 mb-4">
                        Practice various math concepts at your own pace with interactive exercises and feedback.
                      </p>
                      <div className="inline-flex items-center text-[#00509d] font-medium hover:text-[#003f88] transition-colors">
                        Start practicing <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Games Card */}
              <Link href="/dashboard/games" className="block h-full">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                  <div className="h-3 bg-[#fdc500]"></div>
                  <div className="p-4 pb-5 flex flex-col items-center justify-between h-full">
                    {/* Icon centered vertically */}
                    <div className="flex-1 flex items-center justify-center py-3">
                      <div className="w-20 h-20 rounded-full bg-[#fdc500]/10 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <GamepadIcon className="h-10 w-10 text-[#fdc500]" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Text content at the bottom */}
                    <div className="text-center mt-2">
                      <h3 className="text-xl font-bold text-[#00509d] mb-2">Games</h3>
                      <h4 className="text-base font-medium text-gray-700 mb-2">Learn through play</h4>
                      <p className="text-gray-600 mb-4">
                        Explore our collection of educational math games, including the Space Math Quiz adventure.
                      </p>
                      <div className="inline-flex items-center text-[#fdc500] font-medium hover:text-[#e3b200] transition-colors">
                        Play now <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Homework Card */}
              <Link href="/dashboard/homework" className="block h-full">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                  <div className="h-3 bg-[#e8594a]"></div>
                  <div className="p-4 pb-5 flex flex-col items-center justify-between h-full">
                    {/* Icon centered vertically */}
                    <div className="flex-1 flex items-center justify-center py-3 relative">
                      <div className="w-20 h-20 rounded-full bg-[#e8594a]/10 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <BookOpen className="h-10 w-10 text-[#e8594a]" strokeWidth={1.5} />
                        {/* Notification badge */}
                        <div className="absolute top-0 right-0 bg-[#00509d] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white">
                          2
                        </div>
                      </div>
                    </div>

                    {/* Text content at the bottom */}
                    <div className="text-center mt-2">
                      <h3 className="text-xl font-bold text-[#00509d] mb-2">Homework</h3>
                      <h4 className="text-base font-medium text-gray-700 mb-2">Complete assignments</h4>
                      <p className="text-gray-600 mb-4">
                        View and complete your assigned math practice tasks and track your progress.
                      </p>
                      <div className="inline-flex items-center text-[#e8594a] font-medium hover:text-[#d64a3d] transition-colors">
                        Complete assignments <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview - Updated to larger circular design with full-width gray background */}
      <div className="w-screen bg-[#f8f8f8] py-8 -mx-[50vw] left-[50%] right-[50%] relative">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8">
          <CircularStatCard
            title="Practice Time"
            value="12.5 hrs"
            change="+2.3 hrs this week"
            icon={Clock}
            bgColor="#00509d"
            hoverBgColor="#003f88"
            iconColor="white"
          />

          <CircularStatCard
            title="Accuracy"
            value="87%"
            change="+5% from last week"
            icon={CheckCircle}
            bgColor="#fdc500"
            hoverBgColor="#ffd500"
            iconColor="white"
          />

          <CircularStatCard
            title="Problems Solved"
            value="1,284"
            change="+168 this week"
            icon={Brain}
            bgColor="#e8594a"
            hoverBgColor="#d64a3d"
            iconColor="white"
          />

          <CircularStatCard
            title="Average Time"
            value="3.2s"
            change="0.5s faster this week"
            icon={ZapIcon}
            bgColor="#4f8a4c"
            hoverBgColor="#3d7a3a"
            iconColor="white"
          />
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto py-8">
        <div className="flex flex-col items-center text-center space-y-12 bg-[#ffffff] p-6 rounded-xl">
          {/* Operations Progress Overview */}
          <div className="w-full space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#00509d] text-center mb-8">
              Operations Progress Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <OperationProgress
                  title="Addition"
                  data={{ completed: progressData.addition.completed, total: progressData.addition.total }}
                  color="#fdc500"
                />
                <OperationProgress
                  title="Subtraction"
                  data={{ completed: progressData.subtraction.completed, total: progressData.subtraction.total }}
                  color="#fdc500"
                />
              </div>
              <div className="space-y-4">
                <OperationProgress
                  title="Multiplication"
                  data={{ completed: progressData.multiplication.completed, total: progressData.multiplication.total }}
                  color="#fdc500"
                />
                <OperationProgress
                  title="Division"
                  data={{ completed: progressData.division.completed, total: progressData.division.total }}
                  color="#fdc500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section with full-width background */}
      <div className="w-screen bg-[#00509d] py-8 -mx-[50vw] left-[50%] right-[50%] relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <div className="flex items-center justify-center mb-8">
            <ActivityIcon className="w-7 h-7 text-[#fdc500] mr-3" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">Math Operations Performance</h2>
          </div>

          {/* Mobile view: individual boxes with gaps */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5 w-full px-4">
            {/* Addition Progress */}
            <div className="p-6 bg-[#00509d] border border-[#3b7fc9]">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">Addition</h3>
              <ProgressBar data={progressData.addition} color="#fdc500" />
            </div>

            {/* Subtraction Progress */}
            <div className="p-6 bg-[#00509d] border border-[#3b7fc9]">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">Subtraction</h3>
              <ProgressBar data={progressData.subtraction} color="#fdc500" />
            </div>

            {/* Multiplication Progress */}
            <div className="p-6 bg-[#00509d] border border-[#3b7fc9]">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">Multiplication</h3>
              <ProgressBar data={progressData.multiplication} color="#fdc500" />
            </div>

            {/* Division Progress */}
            <div className="p-6 bg-[#00509d] border border-[#3b7fc9]">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">Division</h3>
              <ProgressBar data={progressData.division} color="#fdc500" />
            </div>
          </div>

          {/* Desktop view: connected boxes with dividers */}
          <div className="hidden lg:grid grid-cols-4 w-full px-4">
            {/* Addition Progress */}
            <div className="p-6 bg-[#00509d] border border-[#3b7fc9]">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">Addition</h3>
              <ProgressBar data={progressData.addition} color="#fdc500" />
            </div>

            {/* Subtraction Progress */}
            <div className="p-6 bg-[#00509d] border-l-0 border border-[#3b7fc9]">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">Subtraction</h3>
              <ProgressBar data={progressData.subtraction} color="#fdc500" />
            </div>

            {/* Multiplication Progress */}
            <div className="p-6 bg-[#00509d] border-l-0 border border-[#3b7fc9]">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">Multiplication</h3>
              <ProgressBar data={progressData.multiplication} color="#fdc500" />
            </div>

            {/* Division Progress */}
            <div className="p-6 bg-[#00509d] border-l-0 border border-[#3b7fc9]">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">Division</h3>
              <ProgressBar data={progressData.division} color="#fdc500" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto py-8">
        <div className="flex flex-col items-center text-center space-y-12 bg-[#ffffff] p-6 rounded-xl">
          {/* Recent Achievements */}
          <div className="w-full space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#00509d] text-left">Recent Achievements</h2>
              <Link
                href="/dashboard/achievements"
                className="text-sm font-bold text-[#00509d] hover:text-[#003f88] transition-colors"
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
          <div className="w-full flex justify-center mt-8">
            <Link href="/dashboard/progress">
              <div className="flex items-center gap-2 bg-[#00509d] hover:bg-[#003f88] text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg">
                <BarChart2 className="w-5 h-5" />
                <span>View Full Progress</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

