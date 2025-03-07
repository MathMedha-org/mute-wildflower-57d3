"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, CheckCircle, Lock, FileText, Award, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function DownloadsPage() {
  const [activeTab, setActiveTab] = useState("certificates")
  const [selectedOperation, setSelectedOperation] = useState("Multiplication")
  const [selectedTables, setSelectedTables] = useState<number[]>([])
  const [selectedComplexity, setSelectedComplexity] = useState<string[]>([])
  const [problemCount, setProblemCount] = useState(20)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  const handleTableToggle = (num: number) => {
    setSelectedTables((prev) => (prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]))
  }

  const handleComplexityToggle = (option: string) => {
    setSelectedComplexity((prev) => (prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]))
  }

  const isGenerateEnabled = () => {
    if (selectedOperation === "Multiplication" || selectedOperation === "Division") {
      return selectedTables.length > 0
    } else {
      return selectedComplexity.length > 0
    }
  }

  const handleGenerateWorksheet = () => {
    if (!isGenerateEnabled()) return

    setIsGenerating(true)

    // Simulate worksheet generation
    setTimeout(() => {
      // Create a new worksheet entry
      const newWorksheet = {
        id: Date.now(),
        name: `${selectedOperation} ${
          selectedOperation === "Multiplication" || selectedOperation === "Division"
            ? `Tables ${selectedTables.join(", ")}`
            : `(${selectedComplexity.join(", ")})`
        }`,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        type: "PDF",
        fileSize: `${(Math.random() * 1.5 + 0.5).toFixed(1)} MB`,
      }

      // Add to worksheets
      downloadData.worksheets.unshift(newWorksheet)

      // Reset selections
      if (selectedOperation === "Multiplication" || selectedOperation === "Division") {
        setSelectedTables([])
      } else {
        setSelectedComplexity([])
      }

      setIsGenerating(false)
    }, 1500)
  }

  const handleGenerateReport = () => {
    setIsGeneratingReport(true)

    // Simulate report generation
    setTimeout(() => {
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

      // Create a new report entry
      const newReport = {
        id: Date.now(),
        name: `${months[selectedMonth]} ${selectedYear} Progress Report`,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        type: "PDF",
        fileSize: `${(Math.random() * 1.5 + 0.5).toFixed(1)} MB`,
      }

      // Add to reports
      downloadData.progressReports.unshift(newReport)
      setIsGeneratingReport(false)
    }, 1500)
  }

  // Mock data for certificates and other downloadable content
  const downloadData = {
    certificates: [
      {
        id: 1,
        name: "Addition Master",
        date: "January 15, 2024",
        type: "Certificate",
        fileSize: "1.2 MB",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/certificate-1-new-Yx9Yd9Yd9Yx9Yd9Yd9.png",
      },
      {
        id: 2,
        name: "Subtraction Expert",
        date: "February 10, 2024",
        type: "Certificate",
        fileSize: "1.1 MB",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/certificate-2-new-Yx9Yd9Yd9Yx9Yd9Yd9.png",
      },
    ],
    upcomingCertificates: [
      {
        id: 1,
        name: "Multiplication Master",
        progress: 75,
        requirements: "Complete all multiplication exercises",
        color: "#e8594a",
      },
      {
        id: 2,
        name: "Division Expert",
        progress: 45,
        requirements: "Complete all division exercises",
        color: "#e8594a",
      },
      {
        id: 3,
        name: "Math Champion",
        progress: 30,
        requirements: "Achieve 90% accuracy across all operations",
        color: "#50adb6",
      },
    ],
    worksheets: [
      {
        id: 1,
        name: "Addition Practice Sheet",
        date: "March 1, 2024",
        type: "PDF",
        fileSize: "0.8 MB",
      },
      {
        id: 2,
        name: "Multiplication Tables",
        date: "March 5, 2024",
        type: "PDF",
        fileSize: "1.5 MB",
      },
      {
        id: 3,
        name: "Division Exercises",
        date: "March 10, 2024",
        type: "PDF",
        fileSize: "0.9 MB",
      },
    ],
    progressReports: [
      {
        id: 1,
        name: "February 2024 Progress Report",
        date: "March 1, 2024",
        type: "PDF",
        fileSize: "1.2 MB",
      },
      {
        id: 2,
        name: "January 2024 Progress Report",
        date: "February 1, 2024",
        type: "PDF",
        fileSize: "1.1 MB",
      },
    ],
  }

  return (
    <div className="w-full sm:max-w-6xl sm:mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ScrollToTop />
      <div className="flex flex-col space-y-8 bg-[#0F283D] p-8 rounded-xl border border-[#50adb6]/20">
        {/* Header with back button and centered title */}
        <div className="relative flex items-start justify-center">
          <Link
            href="/dashboard"
            className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#50adb6] flex items-center justify-center text-white hover:bg-[#3d8a91] transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={3} />
          </Link>
          <div className="text-center mb-4 sm:mb-8 pt-8 sm:pt-0">
            <h1 className="text-3xl font-bold text-[#50adb6]">Downloads</h1>
            <p className="text-white/80">Access and download your certificates and learning materials</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="certificates" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="worksheets">Worksheets</TabsTrigger>
            <TabsTrigger value="reports">Progress Reports</TabsTrigger>
          </TabsList>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6 pt-6">
            {/* Your Certificates Section */}
            <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#50adb6] mb-6">Your Certificates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {downloadData.certificates.map((certificate) => (
                  <div
                    key={certificate.id}
                    className="bg-[#0F283D] border border-[#f6aa54]/20 rounded-lg p-4 hover:border-[#f6aa54] transition-colors"
                  >
                    <div className="aspect-[1.414/1] w-full bg-[#0F283D] rounded-lg overflow-hidden mb-4">
                      <img
                        src="/placeholder.svg?height=300&width=424"
                        alt={certificate.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-medium">{certificate.name}</h4>
                        <p className="text-white/60 text-sm mt-1">Issued on {certificate.date}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <FileText size={14} className="text-[#50adb6]" />
                          <span className="text-white/60 text-xs">{certificate.fileSize}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#f6aa54] text-white rounded-md hover:bg-[#e59843] transition-colors">
                          <Download size={16} />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {downloadData.certificates.length === 0 && (
                <div className="text-center py-8">
                  <Award className="w-12 h-12 text-[#50adb6]/30 mx-auto mb-4" />
                  <p className="text-white/60">You haven't earned any certificates yet.</p>
                  <p className="text-white/40 text-sm mt-2">Complete learning modules to earn certificates.</p>
                </div>
              )}
            </div>

            {/* Upcoming Certificates Section */}
            <div className="bg-[#0F283D] border border-[#e8594a]/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#e8594a] mb-6">Upcoming Certificates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {downloadData.upcomingCertificates.map((certificate) => (
                  <div key={certificate.id} className="bg-[#0F283D] border border-white/10 rounded-lg p-4 opacity-70">
                    <div className="aspect-[1.414/1] w-full bg-[#0F283D] rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                      <Lock className="w-16 h-16 text-white/20" />
                    </div>
                    <h4 className="text-white/60 font-medium">{certificate.name}</h4>
                    <p className="text-white/40 text-sm mt-1">{certificate.requirements}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden flex-1">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${certificate.progress}%`,
                              backgroundColor: certificate.color,
                            }}
                          />
                        </div>
                        <span className="text-white/60 text-sm">{certificate.progress}%</span>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#50adb6]/30 text-white/50 rounded-md cursor-not-allowed ml-4">
                        <Lock size={14} />
                        <span>Locked</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Worksheets Tab */}
          <TabsContent value="worksheets" className="space-y-6 pt-6">
            <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#50adb6] mb-6">Generate Custom Worksheets</h3>

              {/* Worksheet Generator */}
              <div className="bg-[#163c5a] border border-[#50adb6]/20 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-medium text-white mb-4">Worksheet Generator</h4>

                {/* Operation Type Selection */}
                <div className="mb-4">
                  <label className="block text-white/80 text-sm font-medium mb-2">Select Operation</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["Multiplication", "Division", "Addition", "Subtraction"].map((operation) => (
                      <button
                        key={operation}
                        onClick={() => setSelectedOperation(operation)}
                        className={`p-3 transition-all ${
                          selectedOperation === operation
                            ? "bg-[#50adb6] text-white shadow-lg"
                            : "bg-[#0F283D] text-white hover:bg-[#3d8a91]"
                        }`}
                      >
                        {operation}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conditional Options Based on Operation Type */}
                {(selectedOperation === "Multiplication" || selectedOperation === "Division") && (
                  <div className="mb-4">
                    <label className="block text-white/80 text-sm font-medium mb-2">Select Tables</label>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-2">
                      {Array.from({ length: 19 }, (_, i) => i + 2).map((num) => (
                        <button
                          key={num}
                          onClick={() => handleTableToggle(num)}
                          className={`h-10 w-full text-lg font-medium transition-all flex items-center justify-center ${
                            selectedTables.includes(num)
                              ? "bg-[#50adb6] text-white shadow-lg"
                              : "bg-[#0F283D] text-white hover:bg-[#3d8a91]"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {(selectedOperation === "Addition" || selectedOperation === "Subtraction") && (
                  <div className="mb-4">
                    <label className="block text-white/80 text-sm font-medium mb-2">Select Complexity</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {[
                        "Single & two-digit",
                        "Two & three-digit",
                        "Three & four-digit",
                        "Four & five-digit",
                        "Five & six-digit",
                        "Include decimal & fraction",
                        "Include multi-step",
                        "Include word problems",
                      ].map((option) => (
                        <button
                          key={option}
                          onClick={() => handleComplexityToggle(option)}
                          className={`p-3 transition-all text-sm ${
                            selectedComplexity.includes(option)
                              ? "bg-[#50adb6] text-white shadow-lg"
                              : "bg-[#0F283D] text-white hover:bg-[#3d8a91]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Options */}
                <div className="mb-4">
                  <label className="block text-white/80 text-sm font-medium mb-2">Number of Problems</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 20, 30, 50].map((count) => (
                      <button
                        key={count}
                        onClick={() => setProblemCount(count)}
                        className={`p-3 transition-all ${
                          problemCount === count
                            ? "bg-[#f6aa54] text-white shadow-lg"
                            : "bg-[#0F283D] text-white hover:bg-[#e59843]"
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleGenerateWorksheet}
                    className="flex items-center gap-2 px-6 py-3 bg-[#e8594a] text-white rounded-md hover:bg-[#d64a3d] transition-colors"
                    disabled={!isGenerateEnabled()}
                  >
                    <FileText size={18} />
                    <span>Generate Worksheet</span>
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-[#50adb6] mb-6">Your Worksheets</h3>
              <div className="space-y-4">
                {downloadData.worksheets.map((worksheet) => (
                  <div
                    key={worksheet.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-[#50adb6]/20 rounded-lg hover:border-[#50adb6]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3 sm:mb-0">
                      <div className="w-10 h-10 rounded-full bg-[#50adb6]/20 flex items-center justify-center text-[#50adb6]">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{worksheet.name}</h4>
                        <div className="flex items-center gap-4 text-white/60 text-sm mt-1">
                          <span>{worksheet.date}</span>
                          <span>•</span>
                          <span>{worksheet.type}</span>
                          <span>•</span>
                          <span>{worksheet.fileSize}</span>
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#50adb6] text-white rounded-md hover:bg-[#3d8a91] transition-colors w-full sm:w-auto justify-center">
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>

              {downloadData.worksheets.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-[#50adb6]/30 mx-auto mb-4" />
                  <p className="text-white/60">No worksheets available.</p>
                  <p className="text-white/40 text-sm mt-2">Generate a worksheet using the options above.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Progress Reports Tab */}
          <TabsContent value="reports" className="space-y-6 pt-6">
            <div className="bg-[#0F283D] border border-[#50adb6]/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[#50adb6] mb-6">Generate Progress Report</h3>

              {/* Report Generator */}
              <div className="bg-[#163c5a] border border-[#50adb6]/20 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-medium text-white mb-4">Report Generator</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Month Selection */}
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Select Month</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                        (month, index) => (
                          <button
                            key={month}
                            onClick={() => setSelectedMonth(index)}
                            className={`p-2 transition-all ${
                              selectedMonth === index
                                ? "bg-[#50adb6] text-white shadow-lg"
                                : "bg-[#0F283D] text-white hover:bg-[#3d8a91]"
                            }`}
                          >
                            {month}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Year Selection */}
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Select Year</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {[
                        new Date().getFullYear(),
                        new Date().getFullYear() - 1,
                        new Date().getFullYear() - 2,
                        new Date().getFullYear() - 3,
                      ].map((year) => (
                        <button
                          key={year}
                          onClick={() => setSelectedYear(year)}
                          className={`p-2 transition-all ${
                            selectedYear === year
                              ? "bg-[#f6aa54] text-white shadow-lg"
                              : "bg-[#0F283D] text-white hover:bg-[#e59843]"
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleGenerateReport}
                    disabled={isGeneratingReport}
                    className={`flex items-center gap-2 px-6 py-3 rounded-md transition-colors ${
                      isGeneratingReport
                        ? "bg-[#f6aa54]/50 text-white/70 cursor-not-allowed"
                        : "bg-[#f6aa54] text-white hover:bg-[#e59843]"
                    }`}
                  >
                    <Calendar size={18} />
                    <span>{isGeneratingReport ? "Generating..." : "Generate Report"}</span>
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-[#50adb6] mb-6">Monthly Progress Reports</h3>
              <div className="space-y-4">
                {downloadData.progressReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-[#50adb6]/20 rounded-lg hover:border-[#50adb6]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3 sm:mb-0">
                      <div className="w-10 h-10 rounded-full bg-[#f6aa54]/20 flex items-center justify-center text-[#f6aa54]">
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{report.name}</h4>
                        <div className="flex items-center gap-4 text-white/60 text-sm mt-1">
                          <span>{report.date}</span>
                          <span>•</span>
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>{report.fileSize}</span>
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#f6aa54] text-white rounded-md hover:bg-[#e59843] transition-colors w-full sm:w-auto justify-center">
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>

              {downloadData.progressReports.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-[#50adb6]/30 mx-auto mb-4" />
                  <p className="text-white/60">No progress reports available yet.</p>
                  <p className="text-white/40 text-sm mt-2">Generate a report using the options above.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

