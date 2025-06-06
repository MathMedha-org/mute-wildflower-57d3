"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Moon, Sun, Bell, Volume2, Lock, Mail } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function SettingsPage() {
  // State for all settings
  const [theme, setTheme] = useState("dark")
  const [language, setLanguage] = useState("english")
  const [dailyReminder, setDailyReminder] = useState(true)
  const [achievementAlerts, setAchievementAlerts] = useState(true)
  const [soundEffects, setSoundEffects] = useState(true)
  const [voiceFeedback, setVoiceFeedback] = useState(true)
  const [shareProgress, setShareProgress] = useState(false)
  const [weeklyReport, setWeeklyReport] = useState(true)

  return (
    <div className="w-full sm:max-w-6xl sm:mx-auto pt-3 sm:pt-4 lg:pt-6 pb-8">
      <ScrollToTop />
      <div className="flex flex-col space-y-8 p-6">
        {/* Header with back button and centered title */}
        <div className="relative flex items-start justify-center">
          <Link
            href="/dashboard"
            className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#00509d] flex items-center justify-center text-white hover:bg-[#003f7d] transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <div className="text-center mb-4 sm:mb-8 pt-8 sm:pt-0">
            <h1 className="text-3xl font-bold text-[#00509d]">Settings</h1>
            <p className="text-[#00509d]/80">Customize your Math Medha experience</p>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Appearance Section */}
          <div className="border border-[#00509d]/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#00509d]/20 flex items-center justify-center">
                {theme === "dark" || theme === "purple" ? (
                  <Moon className="w-5 h-5 text-[#00509d]" />
                ) : (
                  <Sun className="w-5 h-5 text-[#00509d]" />
                )}
              </div>
              <h2 className="text-xl font-semibold text-[#00509d]">Appearance</h2>
            </div>
            <p className="text-gray-600 mb-6">Customize how Math Practice looks on your device</p>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme" className="text-gray-800">
                  Theme
                </Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme" className="bg-[#00509d] border-[#00509d]/30 text-white">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#00509d] border-[#00509d]/30">
                    <SelectItem value="dark" className="text-white">
                      Dark Theme
                    </SelectItem>
                    <SelectItem value="light" className="text-white">
                      Light Theme
                    </SelectItem>
                    <SelectItem value="purple" className="text-white">
                      Purple Theme
                    </SelectItem>
                    <SelectItem value="blue" className="text-white">
                      Blue Theme
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language" className="text-gray-800">
                  Language
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language" className="bg-[#00509d] border-[#00509d]/30 text-white">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#00509d] border-[#00509d]/30">
                    <SelectItem value="english" className="text-white">
                      English
                    </SelectItem>
                    <SelectItem value="spanish" className="text-white">
                      Spanish
                    </SelectItem>
                    <SelectItem value="japanese" className="text-white">
                      Japanese
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="border border-[#00509d]/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#00509d]/20 flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#00509d]" />
              </div>
              <h2 className="text-xl font-semibold text-[#00509d]">Notifications</h2>
            </div>
            <p className="text-gray-600 mb-6">Configure how you want to be notified</p>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="daily-reminder" className="text-gray-800">
                    Daily Reminder
                  </Label>
                  <p className="text-sm text-gray-600">Get reminded to practice daily</p>
                </div>
                <Switch
                  id="daily-reminder"
                  checked={dailyReminder}
                  onCheckedChange={setDailyReminder}
                  className="data-[state=checked]:bg-[#00509d]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="achievement-alerts" className="text-gray-800">
                    Achievement Alerts
                  </Label>
                  <p className="text-sm text-gray-600">Get notified when you earn achievements</p>
                </div>
                <Switch
                  id="achievement-alerts"
                  checked={achievementAlerts}
                  onCheckedChange={setAchievementAlerts}
                  className="data-[state=checked]:bg-[#00509d]"
                />
              </div>
            </div>
          </div>

          {/* Sound Section */}
          <div className="border border-[#00509d]/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#00509d]/20 flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-[#00509d]" />
              </div>
              <h2 className="text-xl font-semibold text-[#00509d]">Sound</h2>
            </div>
            <p className="text-gray-600 mb-6">Manage sound effects and audio feedback</p>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sound-effects" className="text-gray-800">
                    Sound Effects
                  </Label>
                  <p className="text-sm text-gray-600">Play sounds for correct/incorrect answers</p>
                </div>
                <Switch
                  id="sound-effects"
                  checked={soundEffects}
                  onCheckedChange={setSoundEffects}
                  className="data-[state=checked]:bg-[#00509d]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="voice-feedback" className="text-gray-800">
                    Voice Feedback
                  </Label>
                  <p className="text-sm text-gray-600">Read questions and answers aloud</p>
                </div>
                <Switch
                  id="voice-feedback"
                  checked={voiceFeedback}
                  onCheckedChange={setVoiceFeedback}
                  className="data-[state=checked]:bg-[#00509d]"
                />
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="border border-[#00509d]/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#00509d]/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#00509d]" />
              </div>
              <h2 className="text-xl font-semibold text-[#00509d]">Privacy</h2>
            </div>
            <p className="text-gray-600 mb-6">Manage your privacy settings</p>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="share-progress" className="text-gray-800">
                    Share Progress
                  </Label>
                  <p className="text-sm text-gray-600">Allow sharing your progress with teachers</p>
                </div>
                <Switch
                  id="share-progress"
                  checked={shareProgress}
                  onCheckedChange={setShareProgress}
                  className="data-[state=checked]:bg-[#00509d]"
                />
              </div>
            </div>
          </div>

          {/* Email Preferences Section */}
          <div className="border border-[#00509d]/30 rounded-lg p-6 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#00509d]/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#00509d]" />
              </div>
              <h2 className="text-xl font-semibold text-[#00509d]">Email Preferences</h2>
            </div>
            <p className="text-gray-600 mb-6">Manage email notifications and updates</p>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weekly-report" className="text-gray-800">
                    Weekly Progress Report
                  </Label>
                  <p className="text-sm text-gray-600">Receive weekly summary of your progress</p>
                </div>
                <Switch
                  id="weekly-report"
                  checked={weeklyReport}
                  onCheckedChange={setWeeklyReport}
                  className="data-[state=checked]:bg-[#00509d]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center pt-4">
          <button className="px-8 py-3 text-lg font-bold transition-all bg-[#00509d] hover:bg-[#003f7d] text-white rounded-lg">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

