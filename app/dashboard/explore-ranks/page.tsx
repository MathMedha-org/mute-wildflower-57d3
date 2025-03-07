"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, ArrowLeft, X, Play } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Mock data with monthly results
const mockData = {
  "2024-01": {
    classRanks: [
      { rank: 1, name: "John Doe", totalScore: 980, avgCorrect: 95, section: "A" },
      { rank: 2, name: "Jane Smith", totalScore: 950, avgCorrect: 92, section: "B" },
      { rank: 3, name: "Alex Johnson", totalScore: 920, avgCorrect: 89, section: "A" },
    ],
    schoolRanks: [
      {
        rank: 1,
        name: "John Doe",
        totalScore: 980,
        avgCorrect: 95,
        grade: "5th",
        schoolName: "Springfield Elementary",
      },
      {
        rank: 2,
        name: "Sarah Wilson",
        totalScore: 960,
        avgCorrect: 93,
        grade: "5th",
        schoolName: "Springfield Elementary",
      },
    ],
    worldRanks: [
      {
        rank: 1,
        name: "Maria Garcia",
        totalScore: 1000,
        avgScore: 98,
        schoolName: "International School",
        grade: "5th",
        country: "Spain",
      },
      {
        rank: 2,
        name: "John Doe",
        totalScore: 980,
        avgScore: 95,
        schoolName: "Springfield Elementary",
        grade: "5th",
        country: "USA",
      },
      {
        rank: 3,
        name: "Yuki Tanaka",
        totalScore: 975,
        avgScore: 94,
        schoolName: "Tokyo Academy",
        grade: "5th",
        country: "Japan",
      },
      {
        rank: 4,
        name: "Sophie Martin",
        totalScore: 970,
        avgScore: 93,
        schoolName: "Paris International",
        grade: "5th",
        country: "France",
      },
    ],
  },
  "2024-02": {
    classRanks: [
      { rank: 1, name: "Alex Johnson", totalScore: 995, avgCorrect: 97, section: "A" },
      { rank: 2, name: "Sarah Wilson", totalScore: 985, avgCorrect: 96, section: "B" },
    ],
    schoolRanks: [
      {
        rank: 1,
        name: "Alex Johnson",
        totalScore: 995,
        avgCorrect: 97,
        grade: "5th",
        schoolName: "Springfield Elementary",
      },
    ],
    worldRanks: [
      {
        rank: 1,
        name: "Alex Johnson",
        totalScore: 995,
        avgScore: 97,
        schoolName: "Springfield Elementary",
        grade: "5th",
      },
    ],
  },
  "2024-03": {
    classRanks: [
      { rank: 1, name: "Emily Brown", totalScore: 1000, avgCorrect: 98, section: "A" },
      { rank: 2, name: "Michael Lee", totalScore: 990, avgCorrect: 97, section: "B" },
    ],
    schoolRanks: [
      {
        rank: 1,
        name: "Emily Brown",
        totalScore: 1000,
        avgCorrect: 98,
        grade: "5th",
        schoolName: "Springfield Elementary",
      },
    ],
    worldRanks: [
      {
        rank: 1,
        name: "Emily Brown",
        totalScore: 1000,
        avgScore: 98,
        schoolName: "Springfield Elementary",
        grade: "5th",
      },
    ],
  },
}

// MonthPicker component
const MonthPicker = ({
  selectedDate,
  onChange,
  onClose,
}: {
  selectedDate: Date
  onChange: (date: Date) => void
  onClose: () => void
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
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i)

  return (
    <div className="p-4 bg-[#163c5a] rounded-lg w-[280px]">
      {/* Close button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-[#50adb6] flex items-center justify-center text-white hover:bg-[#3d8a91] transition-colors"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* Years */}
      <div className="mb-4">
        <div className="text-sm font-medium text-white/70 mb-2">Year</div>
        <div className="grid grid-cols-3 gap-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => onChange(new Date(year, selectedDate.getMonth()))}
              className={cn(
                "px-2 py-1.5 text-sm rounded-md transition-colors",
                year === selectedDate.getFullYear() ? "bg-[#50adb6] text-white" : "text-white/70 hover:bg-[#50adb6]/20",
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
              onClick={() => onChange(new Date(selectedDate.getFullYear(), index))}
              className={cn(
                "px-2 py-1.5 text-sm rounded-md transition-colors",
                index === selectedDate.getMonth() ? "bg-[#50adb6] text-white" : "text-white/70 hover:bg-[#50adb6]/20",
              )}
            >
              {month}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Get unique schools and countries from world ranks data
const getUniqueValues = (data: any, key: string) => {
  const allValues = data.flatMap((month: any) => month.worldRanks.map((rank: any) => rank[key]))
  return Array.from(new Set(allValues))
}

const allMonthsData = Object.values(mockData)
const schools = getUniqueValues(allMonthsData, "schoolName")
const countries = getUniqueValues(allMonthsData, "country")

export default function ExplorePage() {
  // Separate state for each accordion's date and calendar open state
  const [rankingDate, setRankingDate] = useState<Date>(new Date())
  const [compareDate, setCompareDate] = useState<Date>(new Date())
  const [isRankingCalendarOpen, setIsRankingCalendarOpen] = useState(false)
  const [isCompareCalendarOpen, setIsCompareCalendarOpen] = useState(false)

  const [selectedTab, setSelectedTab] = useState("class")
  const [selectedSchool1, setSelectedSchool1] = useState<string>("")
  const [selectedSchool2, setSelectedSchool2] = useState<string>("")
  const [selectedState, setSelectedState] = useState<string>("")

  // Get the current month's data for ranking accordion
  const rankingMonthKey = format(rankingDate, "yyyy-MM")
  const rankingMonthData = mockData[rankingMonthKey as keyof typeof mockData] || {
    classRanks: [],
    schoolRanks: [],
    worldRanks: [],
  }

  // Get the current month's data for compare accordion
  const compareMonthKey = format(compareDate, "yyyy-MM")
  const compareMonthData = mockData[compareMonthKey as keyof typeof mockData] || {
    classRanks: [],
    schoolRanks: [],
    worldRanks: [],
  }

  // Filter world ranks based on selected filters
  const filteredWorldRanks = rankingMonthData.worldRanks.filter((rank) => {
    if (
      selectedSchool1 &&
      selectedSchool2 &&
      rank.schoolName !== selectedSchool1 &&
      rank.schoolName !== selectedSchool2
    ) {
      return false
    }
    if (selectedSchool1 && !selectedSchool2 && rank.schoolName !== selectedSchool1) {
      return false
    }
    if (selectedState && rank.country !== selectedState) {
      return false
    }
    return true
  })

  return (
    <div className="w-full sm:max-w-6xl sm:mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col space-y-8 bg-[#0F283D] p-8 rounded-xl border border-[#50adb6]/20">
        {/* Header with back button and centered title */}
        <div className="sm:flex sm:items-center sm:relative">
          {/* Mobile view: buttons in a row, title below */}
          <div className="flex justify-between items-center mb-4 sm:hidden">
            <Link
              href="/dashboard/progress"
              className="w-10 h-10 rounded-full bg-[#50adb6] flex items-center justify-center text-white hover:bg-[#3d8a91] transition-colors"
            >
              <ArrowLeft size={20} strokeWidth={3} />
            </Link>
            <Link
              href="/dashboard/play/space-quiz"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8594a] text-white hover:bg-[#d64a3d] transition-colors"
            >
              <Play size={20} strokeWidth={3} fill="currentColor" />
              <span>Play</span>
            </Link>
          </div>

          {/* Title for mobile */}
          <h1 className="text-3xl font-bold text-[#50adb6] text-center sm:flex-1 sm:text-center">Explore Ranks</h1>

          {/* Desktop/tablet view: back button on left, title centered, play button on right */}
          <Link
            href="/dashboard/progress"
            className="hidden sm:flex w-10 h-10 rounded-full bg-[#50adb6] items-center justify-center text-white hover:bg-[#3d8a91] transition-colors absolute left-0"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <Link
            href="/dashboard/play/space-quiz"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8594a] text-white hover:bg-[#d64a3d] transition-colors absolute right-0"
          >
            <Play size={20} strokeWidth={3} fill="currentColor" />
            <span>Play</span>
          </Link>
        </div>

        {/* First Accordion - Calendar and Tabs */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="calendar-tabs" className="border-[#50adb6]/30">
            <AccordionTrigger className="text-[#50adb6] text-lg font-semibold hover:text-[#50adb6]/80 hover:no-underline">
              Check Your Ranking and Class Rank
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6 pt-2">
                {/* Date Selector for Ranking Accordion */}
                <div className="flex justify-center">
                  <Popover open={isRankingCalendarOpen} onOpenChange={setIsRankingCalendarOpen}>
                    <PopoverTrigger>
                      <div
                        className={cn(
                          "flex w-[280px] items-center justify-start rounded-md border px-4 py-2 text-left font-normal",
                          "bg-[#163c5a] border-[#50adb6]/30 text-white",
                          "hover:bg-[#0F283D] hover:border-[#50adb6] cursor-pointer",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(rankingDate, "MMMM yyyy")}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-auto z-[100]" align="center">
                      <MonthPicker
                        selectedDate={rankingDate}
                        onChange={(newDate) => {
                          setRankingDate(newDate)
                        }}
                        onClose={() => setIsRankingCalendarOpen(false)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Ranking Tabs */}
                <Tabs defaultValue="class" className="w-full" onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="class">Class Ranks</TabsTrigger>
                    <TabsTrigger value="school">School Ranks</TabsTrigger>
                    <TabsTrigger value="world">World Ranks</TabsTrigger>
                  </TabsList>

                  {/* Class Ranks Content */}
                  <TabsContent value="class">
                    <div className="mb-4 p-4 bg-[#0F283D] border border-[#50adb6]/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-white/70">Your rank in class:</span>
                        <span className="text-[#50adb6] font-bold text-lg">25</span>
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border border-[#50adb6]/30">
                      {rankingMonthData.classRanks.length > 0 ? (
                        <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#50adb6] scrollbar-track-transparent">
                          <Table>
                            <TableHeader className="bg-[#0F283D]/50">
                              <TableRow>
                                <TableHead className="text-[#50adb6] w-[50px] text-base">Rank</TableHead>
                                <TableHead className="text-[#50adb6] text-base">Name</TableHead>
                                <TableHead className="text-[#50adb6] text-base">Total Score</TableHead>
                                <TableHead className="text-[#50adb6] text-base">Avg. Correct</TableHead>
                                <TableHead className="text-[#50adb6] text-base">Section</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {rankingMonthData.classRanks.map((result, index) => (
                                <TableRow key={index} className="hover:bg-[#0F283D]/30">
                                  <TableCell className="text-white font-medium text-base">{result.rank}</TableCell>
                                  <TableCell className="text-white text-base">{result.name}</TableCell>
                                  <TableCell className="text-white text-base">{result.totalScore}</TableCell>
                                  <TableCell className="text-[#50adb6] text-base">{result.avgCorrect}%</TableCell>
                                  <TableCell className="text-white text-base">{result.section}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-white/60">
                          No results available for {format(rankingDate, "MMMM yyyy")}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* School Ranks Content */}
                  <TabsContent value="school">
                    <Tabs defaultValue="class" className="w-full">
                      <TabsList className="w-full grid grid-cols-2 mb-4">
                        <TabsTrigger value="class">Class Ranks</TabsTrigger>
                        <TabsTrigger value="all">All Ranks</TabsTrigger>
                      </TabsList>

                      <TabsContent value="class">
                        <div className="mb-4 p-4 bg-[#0F283D] border border-[#f6aa54]/30 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-white/70">Your class rank in school:</span>
                            <span className="text-[#f6aa54] font-bold text-lg">3</span>
                          </div>
                        </div>
                        <div className="relative overflow-hidden rounded-lg border border-[#f6aa54]/30">
                          {rankingMonthData.schoolRanks.length > 0 ? (
                            <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#f6aa54] scrollbar-track-transparent">
                              <Table>
                                <TableHeader className="bg-[#0F283D]/50">
                                  <TableRow>
                                    <TableHead className="text-[#f6aa54] w-[50px] text-base">Rank</TableHead>
                                    <TableHead className="text-[#f6aa54] text-base">Class</TableHead>
                                    <TableHead className="text-[#f6aa54] text-base">Total Score</TableHead>
                                    <TableHead className="text-[#f6aa54] text-base">Avg. Correct</TableHead>
                                    <TableHead className="text-[#f6aa54] text-base">Grade</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow className="hover:bg-[#0F283D]/30">
                                    <TableCell className="text-white font-medium text-base">1</TableCell>
                                    <TableCell className="text-white text-base">Class 5A</TableCell>
                                    <TableCell className="text-white text-base">2450</TableCell>
                                    <TableCell className="text-[#f6aa54] text-base">95%</TableCell>
                                    <TableCell className="text-white text-base">5th</TableCell>
                                  </TableRow>
                                  <TableRow className="hover:bg-[#0F283D]/30">
                                    <TableCell className="text-white font-medium text-base">2</TableCell>
                                    <TableCell className="text-white text-base">Class 5C</TableCell>
                                    <TableCell className="text-white text-base">2380</TableCell>
                                    <TableCell className="text-[#f6aa54] text-base">92%</TableCell>
                                    <TableCell className="text-white text-base">5th</TableCell>
                                  </TableRow>
                                  <TableRow className="hover:bg-[#0F283D]/30">
                                    <TableCell className="text-white font-medium text-base">3</TableCell>
                                    <TableCell className="text-white text-base">Class 5B</TableCell>
                                    <TableCell className="text-white text-base">2340</TableCell>
                                    <TableCell className="text-[#f6aa54] text-base">90%</TableCell>
                                    <TableCell className="text-white text-base">5th</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          ) : (
                            <div className="text-center py-8 text-white/60">
                              No results available for {format(rankingDate, "MMMM yyyy")}
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="all">
                        <div className="mb-4 p-4 bg-[#0F283D] border border-[#f6aa54]/30 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-white/70">Your rank in school:</span>
                            <span className="text-[#f6aa54] font-bold text-lg">42</span>
                          </div>
                        </div>
                        <div className="relative overflow-hidden rounded-lg border border-[#f6aa54]/30">
                          {rankingMonthData.schoolRanks.length > 0 ? (
                            <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#f6aa54] scrollbar-track-transparent">
                              <Table>
                                <TableHeader className="bg-[#0F283D]/50">
                                  <TableRow>
                                    <TableHead className="text-[#f6aa54] w-[50px] text-base">Rank</TableHead>
                                    <TableHead className="text-[#f6aa54] text-base">Name</TableHead>
                                    <TableHead className="text-[#f6aa54] text-base">Total Score</TableHead>
                                    <TableHead className="text-[#f6aa54] text-base">Avg. Correct</TableHead>
                                    <TableHead className="text-[#f6aa54] text-base">Grade</TableHead>
                                    <TableHead className="text-[#f6aa54] text-base">School</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {rankingMonthData.schoolRanks.map((result, index) => (
                                    <TableRow key={index} className="hover:bg-[#0F283D]/30">
                                      <TableCell className="text-white font-medium text-base">{result.rank}</TableCell>
                                      <TableCell className="text-white text-base">{result.name}</TableCell>
                                      <TableCell className="text-white text-base">{result.totalScore}</TableCell>
                                      <TableCell className="text-[#f6aa54] text-base">{result.avgCorrect}%</TableCell>
                                      <TableCell className="text-white text-base">{result.grade}</TableCell>
                                      <TableCell className="text-white text-base">{result.schoolName}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          ) : (
                            <div className="text-center py-8 text-white/60">
                              No results available for {format(rankingDate, "MMMM yyyy")}
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </TabsContent>

                  {/* World Ranks Content */}
                  <TabsContent value="world">
                    <div className="mb-4 p-4 bg-[#0F283D] border border-[#e8594a]/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-white/70">Your rank in world:</span>
                        <span className="text-[#e8594a] font-bold text-lg">156</span>
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-lg border border-[#e8594a]/30">
                      {filteredWorldRanks.length > 0 ? (
                        <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#e8594a] scrollbar-track-transparent">
                          <Table>
                            <TableHeader className="bg-[#0F283D]/50">
                              <TableRow>
                                <TableHead className="text-[#e8594a] w-[50px] text-base">Rank</TableHead>
                                <TableHead className="text-[#e8594a] text-base">Name</TableHead>
                                <TableHead className="text-[#e8594a] text-base">Total Score</TableHead>
                                <TableHead className="text-[#e8594a] text-base">Avg. Score</TableHead>
                                <TableHead className="text-[#e8594a] text-base">School</TableHead>
                                <TableHead className="text-[#e8594a] text-base">Grade</TableHead>
                                <TableHead className="text-[#e8594a] text-base">Country</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredWorldRanks.map((result, index) => (
                                <TableRow key={index} className="hover:bg-[#0F283D]/30">
                                  <TableCell className="text-white font-medium text-base">{result.rank}</TableCell>
                                  <TableCell className="text-white text-base">{result.name}</TableCell>
                                  <TableCell className="text-white text-base">{result.totalScore}</TableCell>
                                  <TableCell className="text-[#e8594a] text-base">{result.avgScore}%</TableCell>
                                  <TableCell className="text-white text-base">{result.schoolName}</TableCell>
                                  <TableCell className="text-white text-base">{result.grade}</TableCell>
                                  <TableCell className="text-white text-base">{result.country}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-white/60">
                          {rankingMonthData.worldRanks.length === 0
                            ? `No results available for ${format(rankingDate, "MMMM yyyy")}`
                            : "No results match the selected filters"}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Second Accordion - Filters */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="filters" className="border-[#50adb6]/30">
            <AccordionTrigger className="text-[#50adb6] text-lg font-semibold hover:text-[#50adb6]/80 hover:no-underline">
              Compare School Ranks
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                {/* Date Selector for Compare Accordion */}
                <div className="flex justify-center mb-4">
                  <Popover open={isCompareCalendarOpen} onOpenChange={setIsCompareCalendarOpen}>
                    <PopoverTrigger>
                      <div
                        className={cn(
                          "flex w-[280px] items-center justify-start rounded-md border px-4 py-2 text-left font-normal",
                          "bg-[#163c5a] border-[#50adb6]/30 text-white",
                          "hover:bg-[#0F283D] hover:border-[#50adb6] cursor-pointer",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(compareDate, "MMMM yyyy")}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-auto z-[100]" align="center">
                      <MonthPicker
                        selectedDate={compareDate}
                        onChange={(newDate) => {
                          setCompareDate(newDate)
                        }}
                        onClose={() => setIsCompareCalendarOpen(false)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <Select value={selectedSchool1} onValueChange={setSelectedSchool1}>
                    <SelectTrigger className="bg-[#163c5a] border-[#50adb6]/30 text-white">
                      <SelectValue placeholder="Select School 1" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#163c5a] border-[#50adb6]/30">
                      <SelectItem value="All Schools">All Schools</SelectItem>
                      {schools.map((school) => (
                        <SelectItem key={school} value={school} className="text-white">
                          {school}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedSchool2} onValueChange={setSelectedSchool2}>
                    <SelectTrigger className="bg-[#163c5a] border-[#50adb6]/30 text-white">
                      <SelectValue placeholder="Select School 2" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#163c5a] border-[#50adb6]/30">
                      <SelectItem value="All Schools">All Schools</SelectItem>
                      {schools.map((school) => (
                        <SelectItem key={school} value={school} className="text-white">
                          {school}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="bg-[#163c5a] border-[#50adb6]/30 text-white">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#163c5a] border-[#50adb6]/30">
                      <SelectItem value="All States">All States</SelectItem>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country} className="text-white">
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <button
                    className="w-full h-10 bg-[#e8594a] hover:bg-[#d64a3d] text-white rounded-md transition-colors flex items-center justify-center gap-2"
                    onClick={() => console.log("Search clicked", { selectedSchool1, selectedSchool2, selectedState })}
                  >
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
                      className="lucide lucide-search"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    Search
                  </button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

