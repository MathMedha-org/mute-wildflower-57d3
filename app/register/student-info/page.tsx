"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SpaceBackground } from "@/components/space-background"
import { ArrowLeft, ArrowRight, Plus, Trash2, AlertCircle } from "lucide-react"

// Define student type
type Student = {
  firstName: string
  lastName: string
  grade: string
  section: string
  school: string
  city: string
  state: string
  country: string
}

// Define grade options
const gradeOptions = [
  "Kindergarten",
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
  "4th Grade",
  "5th Grade",
  "6th Grade",
  "7th Grade",
  "8th Grade",
  "9th Grade",
  "10th Grade",
  "11th Grade",
  "12th Grade",
]

// Define country options
const countryOptions = ["India", "Bangladesh", "United Kingdom", "United States", "Nigeria", "Other"]

export default function StudentInfoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    school: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  })

  // Student form for parent/guardian
  const [studentForm, setStudentForm] = useState<Student>({
    firstName: "",
    lastName: "",
    grade: gradeOptions[0],
    section: "",
    school: "",
    city: "",
    state: "",
    country: "India",
  })

  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [studentErrors, setStudentErrors] = useState<Record<string, string>>({})
  const [parentData, setParentData] = useState<any>(null)
  const [accountData, setAccountData] = useState<any>(null)
  const [userRole, setUserRole] = useState<string>("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [generalError, setGeneralError] = useState("")

  useEffect(() => {
    // Retrieve parent and account data from localStorage
    const storedParentData = localStorage.getItem("registrationData")
    const storedAccountData = localStorage.getItem("accountDetails")

    if (storedParentData && storedAccountData) {
      const parsedParentData = JSON.parse(storedParentData)
      setParentData(parsedParentData)
      setUserRole(parsedParentData.role || "")
      setAccountData(JSON.parse(storedAccountData))
    } else {
      // If no data, redirect back to appropriate step
      if (!storedParentData) {
        router.push("/register")
      } else if (!storedAccountData) {
        router.push("/register/account-details")
      }
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setStudentForm((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (studentErrors[name]) {
      setStudentErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }

    // Clear general error when any field is edited
    if (generalError) {
      setGeneralError("")
    }
  }

  const validateStudentForm = () => {
    const newErrors: Record<string, string> = {}

    if (!studentForm.firstName.trim()) newErrors.firstName = "First name is required"
    if (!studentForm.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!studentForm.grade) newErrors.grade = "Grade is required"
    if (!studentForm.section.trim()) newErrors.section = "Section/Class is required"
    if (!studentForm.school.trim()) newErrors.school = "School name is required"
    if (!studentForm.city.trim()) newErrors.city = "City is required"
    if (!studentForm.state.trim()) newErrors.state = "State/Province is required"

    setStudentErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const addStudent = () => {
    if (!validateStudentForm()) return

    setStudents([...students, { ...studentForm }])

    // Reset student form
    setStudentForm({
      firstName: "",
      lastName: "",
      grade: gradeOptions[0],
      section: "",
      school: studentForm.school, // Keep the school info for convenience
      city: studentForm.city,
      state: studentForm.state,
      country: studentForm.country,
    })

    // Clear any general error
    setGeneralError("")
  }

  const removeStudent = (index: number) => {
    const newStudents = [...students]
    newStudents.splice(index, 1)
    setStudents(newStudents)
  }

  const hasUnsavedStudentData = () => {
    // Only consider it unsaved data if there are some meaningful fields filled but not all required fields
    const hasPartialData =
      studentForm.firstName.trim() !== "" ||
      studentForm.lastName.trim() !== "" ||
      studentForm.section.trim() !== "" ||
      studentForm.school.trim() !== "" ||
      studentForm.city.trim() !== "" ||
      studentForm.state.trim() !== ""

    // If all required fields are filled, it's a complete student ready to be added
    const isCompleteStudent =
      studentForm.firstName.trim() !== "" &&
      studentForm.lastName.trim() !== "" &&
      studentForm.grade !== "" &&
      studentForm.section.trim() !== "" &&
      studentForm.school.trim() !== "" &&
      studentForm.city.trim() !== "" &&
      studentForm.state.trim() !== ""

    // Only return true if there's partial data but not a complete student
    return hasPartialData && studentForm.grade !== ""

    // Only return true if there's partial data but not a complete student
    return hasPartialData && !isCompleteStudent
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // For non-parent users
    if (userRole !== "parent") {
      if (!formData.school.trim()) newErrors.school = "School name is required"
      if (!formData.city.trim()) newErrors.city = "City is required"
      if (!formData.state.trim()) newErrors.state = "State/Province is required"
      if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP/Postal/Post/PIN Code is required"
    }
    // For parent users
    else {
      // Check if there are no students and the current form is invalid
      if (students.length === 0) {
        if (!validateStudentForm()) {
          setGeneralError("Please add at least one student to continue")
          return false
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // For parent users
    if (userRole === "parent") {
      // If no students added yet
      if (students.length === 0) {
        // Check if current form is valid
        if (validateStudentForm()) {
          // Add the current student and continue
          const newStudent = { ...studentForm }
          const updatedStudents = [...students, newStudent]
          setStudents(updatedStudents)

          // Store the updated students array directly
          const finalData = {
            students: updatedStudents,
          }

          localStorage.setItem("studentInfo", JSON.stringify(finalData))
          setIsLoading(true)

          // Simulate API call
          setTimeout(() => {
            setIsLoading(false)
            router.push("/register/select-plan")
          }, 1000)

          return
        } else {
          // Show error message
          setGeneralError("Please add at least one student to continue")
          return
        }
      }

      // If there are students but also all required fields are filled for another student
      if (
        studentForm.firstName.trim() !== "" &&
        studentForm.lastName.trim() !== "" &&
        studentForm.grade !== "" &&
        studentForm.section.trim() !== "" &&
        studentForm.school.trim() !== "" &&
        studentForm.city.trim() !== "" &&
        studentForm.state.trim() !== ""
      ) {
        // Add the current student and continue
        const newStudent = { ...studentForm }
        const updatedStudents = [...students, newStudent]
        setStudents(updatedStudents)

        // Store the updated students array directly
        const finalData = {
          students: updatedStudents,
        }

        localStorage.setItem("studentInfo", JSON.stringify(finalData))
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
          setIsLoading(false)
          router.push("/register/select-plan")
        }, 1000)

        return
      }

      // If there are students but also partial unsaved data in the form
      if (hasUnsavedStudentData()) {
        setShowConfirmation(true)
        return
      }
    }

    // For non-parent users or parent users with students and no unsaved data
    if (!validateForm()) return

    proceedToNextStep()
  }

  const proceedToNextStep = () => {
    setIsLoading(true)

    // Prepare final data
    let finalData = { ...formData }

    if (userRole === "parent") {
      finalData = {
        students: [...students],
      }
    }

    // Simulate API call
    setTimeout(() => {
      // Store student info in localStorage
      localStorage.setItem("studentInfo", JSON.stringify(finalData))
      setIsLoading(false)
      router.push("/register/select-plan")
    }, 1000)
  }

  const handleConfirmation = (confirmed: boolean) => {
    setShowConfirmation(false)

    if (confirmed) {
      // User wants to continue without adding the current student
      proceedToNextStep()
    }
    // If not confirmed, user can continue editing the form
  }

  return (
    <div className="relative min-h-screen w-full bg-gray-50">
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-white via-blue-50 to-blue-100 opacity-70" />
      <SpaceBackground />

      <div className="relative z-10 flex flex-col items-center p-4 sm:p-8 max-w-2xl w-full mx-auto">
        {/* Content container with background */}
        <div className="w-full mt-8 bg-white backdrop-blur-md border border-blue-100 shadow-lg rounded-lg">
          {/* Content wrapper with padding */}
          <div className="flex flex-col items-center px-6 sm:px-8 py-8 w-full">
            {/* Header with back button and title */}
            <div className="flex items-center justify-between w-full mb-4">
              <Link
                href="/register/account-details"
                className="w-10 h-10 rounded-full bg-[#00509d] flex items-center justify-center text-white hover:bg-[#003f88] transition-colors"
              >
                <ArrowLeft size={20} strokeWidth={3} />
              </Link>
              <h1 className="text-3xl font-bold text-[#00509d] flex-1 text-center mr-10">
                {userRole === "parent" ? "Student Information" : "School Information"}
              </h1>
            </div>
            <p className="text-gray-600 mb-6 text-center w-full">
              {userRole === "parent" ? "Add your student details" : "Tell us about your school"}
            </p>

            {/* Progress indicator */}
            <div className="w-full mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-xs">Step 3 of 5</span>
                <span className="text-gray-500 text-xs">
                  {userRole === "parent" ? "Student Details" : "School Details"}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-1 rounded-full">
                <div className="bg-[#00509d] h-1 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>

            {generalError && (
              <div className="w-full mb-4 p-3 bg-red-50 border border-red-300 rounded-md flex items-center gap-2">
                <AlertCircle size={16} className="text-red-500" />
                <p className="text-red-500 text-sm">{generalError}</p>
              </div>
            )}

            {/* Confirmation Dialog */}
            {showConfirmation && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-sm w-full border border-blue-200 shadow-xl">
                  <h3 className="text-xl font-bold text-[#00509d] mb-4">Unsaved Student Data</h3>
                  <p className="text-gray-700 mb-6">
                    You have unsaved student information. Do you want to continue without adding this student?
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleConfirmation(false)}
                      className="px-4 py-2 bg-transparent border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Go Back
                    </button>
                    <button
                      onClick={() => handleConfirmation(true)}
                      className="px-4 py-2 bg-[#00509d] rounded-md text-white hover:bg-[#003f88] transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* School Info Form for Teachers/Tutors */}
            {userRole !== "parent" && (
              <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="school" className="block text-gray-700 text-sm font-medium mb-1">
                      School Name*
                    </label>
                    <input
                      id="school"
                      name="school"
                      type="text"
                      value={formData.school}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white border ${
                        errors.school ? "border-red-500" : "border-gray-300"
                      } rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]`}
                      placeholder="Enter school name"
                    />
                    {errors.school && <p className="mt-1 text-red-500 text-xs">{errors.school}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-gray-700 text-sm font-medium mb-1">
                        City*
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white border ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        } rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]`}
                        placeholder="City"
                      />
                      {errors.city && <p className="mt-1 text-red-500 text-xs">{errors.city}</p>}
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-gray-700 text-sm font-medium mb-1">
                        State/Province*
                      </label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white border ${
                          errors.state ? "border-red-500" : "border-gray-300"
                        } rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]`}
                        placeholder="State/Province"
                      />
                      {errors.state && <p className="mt-1 text-red-500 text-xs">{errors.state}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="zipCode" className="block text-gray-700 text-sm font-medium mb-1">
                        ZIP/Postal/Post/PIN Code*
                      </label>
                      <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white border ${
                          errors.zipCode ? "border-red-500" : "border-gray-300"
                        } rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]`}
                        placeholder="Enter postal code"
                      />
                      {errors.zipCode && <p className="mt-1 text-red-500 text-xs">{errors.zipCode}</p>}
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-gray-700 text-sm font-medium mb-1">
                        Country*
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#00509d] border border-[#00509d] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]"
                      >
                        {countryOptions.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <div className="w-full mt-8">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 rounded-md text-white font-semibold transition-colors flex items-center justify-center gap-2 ${
                      isLoading ? "bg-[#00509d]/70 cursor-not-allowed" : "bg-[#00509d] hover:bg-[#003f88]"
                    }`}
                  >
                    {isLoading ? "Processing..." : "Continue"}
                    {!isLoading && <ArrowRight size={18} />}
                  </button>
                </div>
              </form>
            )}

            {/* Student Info Form for Parents/Guardians */}
            {userRole === "parent" && (
              <form onSubmit={handleSubmit} className="w-full space-y-6">
                {/* Display added students */}
                {students.length > 0 && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-md">
                    <h3 className="text-gray-700 text-sm font-medium mb-3">Added Students:</h3>
                    <ul className="space-y-3">
                      {students.map((student, index) => (
                        <li key={index} className="p-3 bg-white rounded-md shadow-sm border border-blue-100">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-gray-700 text-sm font-medium">
                                {student.firstName} {student.lastName}
                              </p>
                              <p className="text-gray-500 text-xs mt-1">
                                Grade: {student.grade}, Section: {student.section}
                              </p>
                              <p className="text-gray-500 text-xs mt-1">School: {student.school}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeStudent(index)}
                              className="text-red-500 hover:text-red-700 transition-colors p-1"
                              aria-label="Remove student"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-4 p-4 bg-blue-50 rounded-md">
                  <h3 className="text-gray-700 font-medium">
                    {students.length > 0 ? "Add Another Student" : "Add Student"}
                  </h3>

                  {/* Student Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-1">
                        First Name*
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={studentForm.firstName}
                        onChange={handleStudentChange}
                        className={`w-full px-4 py-3 bg-white border ${
                          studentErrors.firstName ? "border-red-500" : "border-gray-300"
                        } rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]`}
                        placeholder="First name"
                      />
                      {studentErrors.firstName && (
                        <p className="mt-1 text-red-500 text-xs">{studentErrors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium mb-1">
                        Last Name*
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={studentForm.lastName}
                        onChange={handleStudentChange}
                        className={`w-full px-4 py-3 bg-white border ${
                          studentErrors.lastName ? "border-red-500" : "border-gray-300"
                        } rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]`}
                        placeholder="Last name"
                      />
                      {studentErrors.lastName && <p className="mt-1 text-red-500 text-xs">{studentErrors.lastName}</p>}
                    </div>
                  </div>

                  {/* Grade and Section */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="grade" className="block text-gray-700 text-sm font-medium mb-1">
                        Grade/Year*
                      </label>
                      <select
                        id="grade"
                        name="grade"
                        value={studentForm.grade}
                        onChange={handleStudentChange}
                        className="w-full px-4 py-3 bg-[#00509d] border border-[#00509d] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]"
                      >
                        {gradeOptions.map((grade) => (
                          <option key={grade} value={grade}>
                            {grade}
                          </option>
                        ))}
                      </select>
                      {studentErrors.grade && <p className="mt-1 text-red-500 text-xs">{studentErrors.grade}</p>}
                    </div>

                    <div>
                      <label htmlFor="section" className="block text-gray-700 text-sm font-medium mb-1">
                        Section/Class*
                      </label>
                      <input
                        id="section"
                        name="section"
                        type="text"
                        value={studentForm.section}
                        onChange={handleStudentChange}
                        className={`w-full px-4 py-3 bg-white border ${
                          studentErrors.section ? "border-red-500" : "border-gray-300"
                        } rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]`}
                        placeholder="e.g. A, B, C"
                      />
                      {studentErrors.section && <p className="mt-1 text-red-500 text-xs">{studentErrors.section}</p>}
                    </div>
                  </div>

                  {/* School */}
                  <div>
                    <label htmlFor="school" className="block text-gray-700 text-sm font-medium mb-1">
                      School*
                    </label>
                    <input
                      id="school"
                      name="school"
                      type="text"
                      value={studentForm.school}
                      onChange={handleStudentChange}
                      className={`w-full px-4 py-3 bg-white border ${
                        studentErrors.school ? "border-red-500" : "border-gray-300"
                      } rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]`}
                      placeholder="Enter school name"
                    />
                    {studentErrors.school && <p className="mt-1 text-red-500 text-xs">{studentErrors.school}</p>}
                  </div>

                  {/* City and State */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-gray-700 text-sm font-medium mb-1">
                        City*
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={studentForm.city}
                        onChange={handleStudentChange}
                        className={`w-full px-4 py-3 bg-white border ${
                          studentErrors.city ? "border-red-500" : "border-gray-300"
                        } rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]`}
                        placeholder="City"
                      />
                      {studentErrors.city && <p className="mt-1 text-red-500 text-xs">{studentErrors.city}</p>}
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-gray-700 text-sm font-medium mb-1">
                        State/Province*
                      </label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        value={studentForm.state}
                        onChange={handleStudentChange}
                        className={`w-full px-4 py-3 bg-white border ${
                          studentErrors.state ? "border-red-500" : "border-gray-300"
                        } rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]`}
                        placeholder="State/Province"
                      />
                      {studentErrors.state && <p className="mt-1 text-red-500 text-xs">{studentErrors.state}</p>}
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label htmlFor="country" className="block text-gray-700 text-sm font-medium mb-1">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={studentForm.country}
                      onChange={handleStudentChange}
                      className="w-full px-4 py-3 bg-[#00509d] border border-[#00509d] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]"
                    >
                      {countryOptions.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Add Student Button */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={addStudent}
                      className="px-4 py-2 bg-white border border-[#00509d] rounded-md text-[#00509d] hover:bg-blue-50 transition-colors flex items-center gap-2"
                    >
                      <Plus size={16} />
                      <span>Add Student</span>
                    </button>
                  </div>
                </div>

                {/* Continue Button */}
                <div className="w-full mt-8">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 rounded-md text-white font-semibold transition-colors flex items-center justify-center gap-2 ${
                      isLoading ? "bg-[#00509d]/70 cursor-not-allowed" : "bg-[#00509d] hover:bg-[#003f88]"
                    }`}
                  >
                    {isLoading ? "Processing..." : "Continue"}
                    {!isLoading && <ArrowRight size={18} />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

