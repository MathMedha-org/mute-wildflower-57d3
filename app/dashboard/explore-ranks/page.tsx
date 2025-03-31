"use client"

import { TableHeader } from "@/components/ui/table"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, ArrowLeft, X, Play } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
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
    <div className="p-4 bg-white rounded-lg w-[280px] border border-gray-200">
      {/* Close button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-[#00509d] flex items-center justify-center text-white hover:bg-[#003f88] transition-colors"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* Years */}
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-600 mb-2">Year</div>
        <div className="grid grid-cols-3 gap-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => onChange(new Date(year, selectedDate.getMonth()))}
              className={cn(
                "px-2 py-1.5 text-sm rounded-md transition-colors",
                year === selectedDate.getFullYear() ? "bg-[#00509d] text-white" : "text-gray-700 hover:bg-[#00509d]/10",
              )}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Months */}
      <div>
        <div className="text-sm font-medium text-gray-600 mb-2">Month</div>
        <div className="grid grid-cols-3 gap-2">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => onChange(new Date(selectedDate.getFullYear(), index))}
              className={cn(
                "px-2 py-1.5 text-sm rounded-md transition-colors",
                index === selectedDate.getMonth() ? "bg-[#00509d] text-white" : "text-gray-700 hover:bg-[#00509d]/10",
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
    <div className="w-full sm:max-w-6xl sm:mx-auto pt-3 sm:pt-4 lg:pt-6 pb-8">
      <div className="flex flex-col space-y-8 bg-white p-6 rounded-xl">
        {/* Header with back button and centered title */}
        <div className="relative flex items-start justify-center">
          <Link
            href="/dashboard/progress"
            className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#00509d] flex items-center justify-center text-white hover:bg-[#003f88] transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <div className="text-center mb-4 sm:mb-8 pt-8 sm:pt-0">
            <h1 className="text-3xl font-bold text-[#00509d]">Explore Ranks</h1>
            <p className="text-gray-600">View your progress and compare ranks.</p>
          </div>
          <Link
            href="/dashboard/play/space-quiz"
            className="absolute right-0 top-0 flex items-center gap-2 px-4 py-2 rounded-full bg-[#e63946] text-white hover:bg-[#c1121f] transition-colors"
          >
            <Play size={20} strokeWidth={3} fill="currentColor" />
            <span>Play</span>
          </Link>
        </div>

        {/* First Accordion - Calendar and Tabs */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="calendar-tabs" className="border-gray-200">
            <AccordionTrigger className="text-[#00509d] text-lg font-semibold hover:text-[#003f88] hover:no-underline">
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
                          "bg-[#00509d] border-[#00509d] text-white",
                          "hover:bg-[#003f88] hover:border-[#003f88] cursor-pointer",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-white" />
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
                    <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Your rank in class:</span>
                        <span className="text-[#00509d] font-bold text-lg">25</span>
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border border-gray-200">
                      {rankingMonthData.classRanks.length > 0 ? (
                        <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#00509d] scrollbar-track-transparent">
                          <Table>
                            <TableHeader className="bg-gray-50">
                              <TableRow>
                                <TableHead className="text-[#00509d] w-[50px] text-base">Rank</TableHead>
                                <TableHead className="text-[#00509d] text-base">Name</TableHead>
                                <TableHead className="text-[#00509d] text-base">Total Score</TableHead>
                                <TableHead className="text-[#00509d] text-base">Avg. Correct</TableHead>
                                <TableHead className="text-[#00509d] text-base">Section</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {rankingMonthData.classRanks.map((result, index) => (
                                <TableRow key={index} className="hover:bg-gray-50">
                                  <TableCell className="text-gray-800 font-medium text-base">{result.rank}</TableCell>
                                  <TableCell className="text-gray-800 text-base">{result.name}</TableCell>
                                  <TableCell className="text-gray-800 text-base">{result.totalScore}</TableCell>
                                  <TableCell className="text-[#00509d] text-base">{result.avgCorrect}%</TableCell>
                                  <TableCell className="text-gray-800 text-base">{result.section}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
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
                        <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">Your class rank in school:</span>
                            <span className="text-[#00509d] font-bold text-lg">3</span>
                          </div>
                        </div>
                        <div className="relative overflow-hidden rounded-lg border border-gray-200">
                          {rankingMonthData.schoolRanks.length > 0 ? (
                            <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#00509d] scrollbar-track-transparent">
                              <Table>
                                <TableHeader className="bg-gray-50">
                                  <TableRow>
                                    <TableHead className="text-[#00509d] w-[50px] text-base">Rank</TableHead>
                                    <TableHead className="text-[#00509d] text-base">Class</TableHead>
                                    <TableHead className="text-[#00509d] text-base">Total Score</TableHead>
                                    <TableHead className="text-[#00509d] text-base">Avg. Correct</TableHead>
                                    <TableHead className="text-[#00509d] text-base">Grade</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow className="hover:bg-gray-50">
                                    <TableCell className="text-gray-800 font-medium text-base">1</TableCell>
                                    <TableCell className="text-gray-800 text-base">Class 5A</TableCell>
                                    <TableCell className="text-gray-800 text-base">2450</TableCell>
                                    <TableCell className="text-[#00509d] text-base">95%</TableCell>
                                    <TableCell className="text-gray-800 text-base">5th</TableCell>
                                  </TableRow>
                                  <TableRow className="hover:bg-gray-50">
                                    <TableCell className="text-gray-800 font-medium text-base">2</TableCell>
                                    <TableCell className="text-gray-800 text-base">Class 5C</TableCell>
                                    <TableCell className="text-gray-800 text-base">2380</TableCell>
                                    <TableCell className="text-[#00509d] text-base">92%</TableCell>
                                    <TableCell className="text-gray-800 text-base">5th</TableCell>
                                  </TableRow>
                                  <TableRow className="hover:bg-gray-50">
                                    <TableCell className="text-gray-800 font-medium text-base">3</TableCell>
                                    <TableCell className="text-gray-800 text-base">Class 5B</TableCell>
                                    <TableCell className="text-gray-800 text-base">2340</TableCell>
                                    <TableCell className="text-[#00509d] text-base">90%</TableCell>
                                    <TableCell className="text-gray-800 text-base">5th</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              No results available for {format(rankingDate, "MMMM yyyy")}
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="all">
                        <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">Your rank in school:</span>
                            <span className="text-[#00509d] font-bold text-lg">42</span>
                          </div>
                        </div>
                        <div className="relative overflow-hidden rounded-lg border border-gray-200">
                          {rankingMonthData.schoolRanks.length > 0 ? (
                            <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#00509d] scrollbar-track-transparent">
                              <Table>
                                <TableHeader className="bg-gray-50">
                                  <TableRow>
                                    <TableHead className="text-[#00509d] w-[50px] text-base">Rank</TableHead>
                                    <TableHead className="text-[#00509d] text-base">Name</TableHead>
                                    <TableHead className="text-[#00509d]  text-base">Name</TableHead>
                                    <TableHead className="text-[#00509d] text-base">Total Score</TableHead>
                                    <TableHead className="text-[#00509d] text-base">Avg. Correct</TableHead>
                                    <TableHead className="text-[#00509d] text-base">Grade</TableHead>
                                    <TableHead className="text-[#00509d] text-base">School</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {rankingMonthData.schoolRanks.map((result, index) => (
                                    <TableRow key={index} className="hover:bg-gray-50">
                                      <TableCell className="text-gray-800 font-medium text-base">
                                        {result.rank}
                                      </TableCell>
                                      <TableCell className="text-gray-800 text-base">{result.name}</TableCell>
                                      <TableCell className="text-gray-800 text-base">{result.totalScore}</TableCell>
                                      <TableCell className="text-[#00509d] text-base">{result.avgCorrect}%</TableCell>
                                      <TableCell className="text-gray-800 text-base">{result.grade}</TableCell>
                                      <TableCell className="text-gray-800 text-base">{result.schoolName}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              No results available for {format(rankingDate, "MMMM yyyy")}
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </TabsContent>

                  {/* World Ranks Content */}
                  <TabsContent value="world">
                    <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Your rank in world:</span>
                        <span className="text-[#00509d] font-bold text-lg">156</span>
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-lg border border-gray-200">
                      {filteredWorldRanks.length > 0 ? (
                        <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#00509d] scrollbar-track-transparent">
                          <Table>
                            <TableHeader className="bg-gray-50">
                              <TableRow>
                                <TableHead className="text-[#00509d] w-[50px] text-base">Rank</TableHead>
                                <TableHead className="text-[#00509d] text-base">Name</TableHead>
                                <TableHead className="text-[#00509d] text-base">Total Score</TableHead>
                                <TableHead className="text-[#00509d] text-base">Avg. Score</TableHead>
                                <TableHead className="text-[#00509d] text-base">School</TableHead>
                                <TableHead className="text-[#00509d] text-base">Grade</TableHead>
                                <TableHead className="text-[#00509d] text-base">Country</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredWorldRanks.map((result, index) => (
                                <TableRow key={index} className="hover:bg-gray-50">
                                  <TableCell className="text-gray-800 font-medium text-base">{result.rank}</TableCell>
                                  <TableCell className="text-gray-800 text-base">{result.name}</TableCell>
                                  <TableCell className="text-gray-800 text-base">{result.totalScore}</TableCell>
                                  <TableCell className="text-[#00509d] text-base">{result.avgScore}%</TableCell>
                                  <TableCell className="text-gray-800 text-base">{result.schoolName}</TableCell>
                                  <TableCell className="text-gray-800 text-base">{result.grade}</TableCell>
                                  <TableCell className="text-gray-800 text-base">{result.country}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
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
          <AccordionItem value="filters" className="border-gray-200">
            <AccordionTrigger className="text-[#00509d] text-lg font-semibold hover:text-[#003f88] hover:no-underline">
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
                          "bg-[#00509d] border-[#00509d] text-white",
                          "hover:bg-[#003f88] hover:border-[#003f88] cursor-pointer",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-white" />
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
                    <SelectTrigger className="bg-[#00509d] border-[#00509d] text-white focus:ring-[#003f88] focus:border-[#003f88]">
                      <SelectValue placeholder="Select School 1" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="All Schools">All Schools</SelectItem>
                      {schools.map((school) => (
                        <SelectItem key={school} value={school} className="text-gray-800">
                          {school}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedSchool2} onValueChange={setSelectedSchool2}>
                    <SelectTrigger className="bg-[#00509d] border-[#00509d] text-white focus:ring-[#003f88] focus:border-[#003f88]">
                      <SelectValue placeholder="Select School 2" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="All Schools">All Schools</SelectItem>
                      {schools.map((school) => (
                        <SelectItem key={school} value={school} className="text-gray-800">
                          {school}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="bg-[#00509d] border-[#00509d] text-white focus:ring-[#003f88] focus:border-[#003f88]">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="All States">All States</SelectItem>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country} className="text-gray-800">
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <button
                    className="w-full h-10 bg-[#fdc500] hover:bg-[#e3b300] text-white rounded-md transition-colors flex items-center justify-center gap-2"
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

