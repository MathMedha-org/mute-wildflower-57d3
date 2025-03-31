"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Edit, Award, Trophy, Star, Calendar, Clock, CheckCircle, BookOpen, Zap, Medal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollToTop } from "@/components/scroll-to-top"
import { AvatarSelector } from "@/components/avatar-selector"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [avatarSelectorOpen, setAvatarSelectorOpen] = useState(false)
  const [currentAvatar, setCurrentAvatar] = useState<string>(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar1-wMHzrNtYtrgzNTcTsxTNtHGW3U4KgG.png",
  ) // Default avatar
  const [tempAvatar, setTempAvatar] = useState<string>(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar1-wMHzrNtYtrgzNTcTsxTNtHGW3U4KgG.png",
  )
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  // Mock data for student profile
  const studentData = {
    name: "John Doe",
    username: "LightSpeed Legend",
    grade: "5th Grade",
    section: "Section A",
    school: "Springfield Elementary",
    joinDate: "September 2023",
    email: "jdoe",
    parentEmail: "parent.doe@example.com",
    stats: {
      totalScore: 2450,
      questionsAnswered: 1284,
      correctAnswers: 1117,
      accuracy: 87,
      averageTime: 4.2,
      practiceTime: 12.5,
      streak: 7,
      bestStreak: 15,
    },
    achievements: [
      {
        id: 1,
        name: "Speed Demon",
        description: "Answer a question correctly in under 1 second",
        progress: 100,
        icon: Zap,
        color: "#e8594a",
      },
      {
        id: 2,
        name: "Math Warrior",
        description: "Complete quizzes daily for a whole month",
        progress: 80,
        icon: Trophy,
        color: "#50adb6",
      },
      {
        id: 3,
        name: "Quiz Champ",
        description: "Win 10 quizzes against other players",
        progress: 60,
        icon: Medal,
        color: "#f6aa54",
      },
      {
        id: 4,
        name: "Perfect Score",
        description: "Complete a quiz with 100% accuracy",
        progress: 100,
        icon: CheckCircle,
        color: "#4CAF50",
      },
    ],
    badges: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/badge2-8jkXxrzEVJETguvAkpuUcMAIrJljV6.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/badge3-RdVBodJdETf3uqtkKAB2BB39op1s8Q.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/badge4-Mkvhtzz7EUrgnJJPWG0jnvHPmrXZjZ.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/badge5-22zsYUJ5nzs96l0JWFZyxS8O7l2boL.png",
    ],
    planets: [
      {
        name: "Mercury",
        unlocked: true,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PlanetMercury-new-5gfvNnpxPKapf4pRLEmCvJOV98IRgS.png",
      },
      {
        name: "Venus",
        unlocked: true,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PlanetVenus-new-n782DfV26Qc4GVxQzkfVH202MsKr6Q.png",
      },
      {
        name: "Earth",
        unlocked: true,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PlanetEarth-new-aG11YKqAnLBL4DT4JVm6tsW3wIgsn6.png",
      },
      {
        name: "Mars",
        unlocked: true,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/planetMars-new-15bGgKhmvPMI0nkv67okVy8CPZ7zLS.png",
      },
      {
        name: "Jupiter",
        unlocked: false,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PlanetJupiter-new-k59GAemqTd30XTyQWnnh9ctpSn9X22.png",
      },
      {
        name: "Saturn",
        unlocked: false,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/planetSaturn-new-nK9Xh7eiUhr0EjlW0pfxmAhlEJO3da.png",
      },
    ],
    progress: {
      addition: 75,
      subtraction: 45,
      multiplication: 75,
      division: 45,
    },
    recentActivity: [
      { date: "Today", activity: "Completed 'Addition & Subtraction' practice", score: "9/10", time: "5 mins ago" },
      { date: "Today", activity: "Earned 'Speed Demon' achievement", score: "", time: "2 hours ago" },
      { date: "Yesterday", activity: "Completed 'Multiplication Tables' homework", score: "8/10", time: "1 day ago" },
      { date: "Mar 3, 2024", activity: "Participated in class competition", score: "2nd place", time: "2 days ago" },
      { date: "Mar 2, 2024", activity: "Unlocked Mars planet", score: "", time: "3 days ago" },
    ],
    certificates: [
      {
        name: "Addition Master",
        date: "January 15, 2024",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/certificate-1-new-Yx9Yd9Yd9Yx9Yd9Yd9.png",
      },
      {
        name: "Subtraction Expert",
        date: "February 10, 2024",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/certificate-2-new-Yx9Yd9Yd9Yx9Yd9Yd9.png",
      },
    ],
  }

  return (
    <div className="w-full sm:max-w-6xl sm:mx-auto pt-3 sm:pt-4 lg:pt-6 pb-8">
      <ScrollToTop />
      <div className="flex flex-col space-y-8 bg-[#ffffff] p-6 rounded-xl">
        {/* Header with back button and centered title */}
        <div className="relative flex items-start justify-center">
          <Link
            href="/dashboard"
            className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#00509d] flex items-center justify-center text-white hover:bg-[#003f88] transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <div className="text-center mb-4 sm:mb-8 pt-8 sm:pt-0">
            <h1 className="text-3xl font-bold text-[#00509d]">Student Profile</h1>
            <p className="text-gray-500">View and manage your profile information</p>
          </div>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-[#00509d] flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
              <img src={currentAvatar || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button
              onClick={() => setAvatarSelectorOpen(true)}
              className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#ffc145] flex items-center justify-center text-white hover:bg-[#e5a935] transition-colors"
            >
              <Edit size={16} strokeWidth={2} />
            </button>
          </div>

          <AvatarSelector
            open={avatarSelectorOpen}
            onOpenChange={setAvatarSelectorOpen}
            onSelect={setTempAvatar}
            onSave={(avatar) => {
              setCurrentAvatar(avatar)
              setShowSuccessToast(true)
              setTimeout(() => setShowSuccessToast(false), 3000)
            }}
            currentAvatar={currentAvatar}
          />

          {/* Success Toast */}
          {showSuccessToast && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2 z-50 animate-in fade-in slide-in-from-bottom-5">
              <CheckCircle size={18} />
              <span>Avatar updated successfully!</span>
            </div>
          )}

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-[#00509d]">{studentData.name}</h2>
            <p className="text-[#00509d] mb-2">{studentData.username}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-[#00509d]" />
                <span>
                  {studentData.grade}, {studentData.section}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#00509d]"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                  <path d="M13 13h4" />
                  <path d="M13 17h4" />
                  <path d="M9 13h.01" />
                  <path d="M9 17h.01" />
                </svg>
                <span>{studentData.school}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#00509d]" />
                <span>Joined: {studentData.joinDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#00509d]"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>Login ID: {studentData.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-3 text-center min-w-[100px] shadow-sm">
              <div className="text-2xl font-bold text-[#00509d]">{studentData.stats.totalScore}</div>
              <div className="text-xs text-gray-500">Total Score</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3 text-center min-w-[100px] shadow-sm">
              <div className="text-2xl font-bold text-[#ffc145]">{studentData.stats.accuracy}%</div>
              <div className="text-xs text-gray-500">Accuracy</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3 text-center min-w-[100px] shadow-sm">
              <div className="text-2xl font-bold text-[#e8594a]">{studentData.stats.averageTime}s</div>
              <div className="text-xs text-gray-500">Average Time</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 pt-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={18} className="text-[#00509d]" />
                  <h3 className="text-sm text-gray-600">Questions Answered</h3>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-[#00509d]">{studentData.stats.questionsAnswered}</span>
                  <span className="text-sm text-[#4CAF50]">+168 this week</span>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={18} className="text-[#00509d]" />
                  <h3 className="text-sm text-gray-600">Average Time</h3>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-[#00509d]">{studentData.stats.averageTime}s</span>
                  <span className="text-sm text-[#4CAF50]">-0.3s from last week</span>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#00509d]"
                  >
                    <path d="M12 2v20" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  <h3 className="text-sm text-gray-600">Practice Time</h3>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-[#00509d]">{studentData.stats.practiceTime} hrs</span>
                  <span className="text-sm text-[#4CAF50]">+2.3 hrs this week</span>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy size={18} className="text-[#00509d]" />
                  <h3 className="text-sm text-gray-600">Best Streak</h3>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-[#00509d]">{studentData.stats.bestStreak} days</span>
                  <span className="text-sm text-gray-500">Current: {studentData.stats.streak} days</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#00509d] mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {studentData.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#00509d]/20 flex items-center justify-center text-[#00509d] shrink-0">
                      {activity.activity.includes("achievement") ? (
                        <Award size={20} />
                      ) : activity.activity.includes("planet") ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                          <path d="M2 12h20" />
                        </svg>
                      ) : activity.activity.includes("competition") ? (
                        <Trophy size={20} />
                      ) : (
                        <CheckCircle size={20} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <h4 className="text-gray-800 font-medium">{activity.activity}</h4>
                        {activity.score && <span className="text-[#ffc145] text-sm font-medium">{activity.score}</span>}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                        <span>{activity.date}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges and Planets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Badges */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#00509d]">Badges Earned</h3>
                  <span className="text-gray-500 text-sm">{studentData.badges.length} of 12</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {studentData.badges.map((badge, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-16 h-16 mb-2">
                        <img
                          src={badge || "/placeholder.svg"}
                          alt={`Badge ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Planets */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#00509d]">Planets Unlocked</h3>
                  <span className="text-gray-500 text-sm">
                    {studentData.planets.filter((p) => p.unlocked).length} of 10
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                  {studentData.planets.map((planet, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`w-12 h-12 mb-1 ${!planet.unlocked ? "opacity-40 grayscale" : ""}`}>
                        <img
                          src={planet.image || "/placeholder.svg"}
                          alt={planet.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className={`text-xs ${planet.unlocked ? "text-gray-800" : "text-gray-400"}`}>
                        {planet.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6 pt-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#00509d] mb-6">Your Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studentData.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 relative overflow-hidden group hover:border-[#50adb6]/30 transition-colors shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${achievement.color}20` }}
                      >
                        <achievement.icon className="w-6 h-6" style={{ color: achievement.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{achievement.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${achievement.progress}%`,
                                backgroundColor: achievement.color,
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium" style={{ color: achievement.color }}>
                            {achievement.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                    {achievement.progress === 100 && (
                      <div className="absolute top-2 right-2">
                        <Star className="w-4 h-4 text-[#FFD700]" fill="#FFD700" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Badges Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#00509d]">Badges Collection</h3>
                <span className="text-gray-500 text-sm">{studentData.badges.length} of 12</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
                {studentData.badges.map((badge, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-20 h-20 mb-2">
                      <img
                        src={badge || "/placeholder.svg"}
                        alt={`Badge ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-gray-800 text-sm text-center">Badge {index + 1}</span>
                    <span className="text-gray-500 text-xs">Earned Mar 2024</span>
                  </div>
                ))}
                {/* Placeholder for locked badges */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={`locked-${index}`} className="flex flex-col items-center opacity-40">
                    <div className="w-20 h-20 mb-2 bg-gray-200 rounded-full flex items-center justify-center">
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
                        className="text-gray-400"
                      >
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <span className="text-gray-400 text-sm text-center">Locked</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => setAvatarSelectorOpen(true)}
            className="px-6 py-3 bg-[#00509d] text-white rounded-lg hover:bg-[#003f88] transition-colors"
          >
            Change Avatar
          </button>
          <Link
            href="/dashboard/play/space-quiz"
            className="px-6 py-3 bg-[#ffc145] text-white rounded-lg hover:bg-[#e5a935] transition-colors"
          >
            Continue Learning
          </Link>
        </div>
      </div>
    </div>
  )
}

