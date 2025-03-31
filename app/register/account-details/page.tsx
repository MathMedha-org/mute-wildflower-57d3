"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SpaceBackground } from "@/components/space-background"
import { ArrowLeft, ArrowRight, Eye, EyeOff, Check, X } from "lucide-react"

export default function AccountDetailsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "", // Will be set to email from previous page
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [parentData, setParentData] = useState<any>(null)

  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })

  useEffect(() => {
    // Retrieve parent data from localStorage
    const storedData = localStorage.getItem("registrationData")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setParentData(parsedData)

      // Set username to email from previous page
      setFormData((prev) => ({
        ...prev,
        username: parsedData.email,
      }))
    } else {
      // If no data, redirect back to first step
      router.push("/register")
    }
  }, [router])

  useEffect(() => {
    // Check password strength
    const { password } = formData
    if (password) {
      setPasswordStrength({
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
      })
    }
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Username validation is not needed as it's pre-filled and disabled

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter"
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one lowercase letter"
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number"
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one special character"
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Store account details in localStorage
      localStorage.setItem("accountDetails", JSON.stringify(formData))
      setIsLoading(false)
      router.push("/register/student-info")
    }, 1000)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
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
                href="/register"
                className="w-10 h-10 rounded-full bg-[#00509d] flex items-center justify-center text-white hover:bg-[#003f88] transition-colors"
              >
                <ArrowLeft size={20} strokeWidth={3} />
              </Link>
              <h1 className="text-3xl font-bold text-[#00509d] flex-1 text-center mr-10">Create Account</h1>
            </div>
            <p className="text-gray-600 mb-6 text-center w-full">Set up your account credentials</p>

            {/* Progress indicator */}
            <div className="w-full mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-xs">Step 2 of 5</span>
                <span className="text-gray-500 text-xs">Account Details</span>
              </div>
              <div className="w-full bg-gray-200 h-1 rounded-full">
                <div className="bg-[#00509d] h-1 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>

            {/* Account Details Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-1">
                    Username (Your Email)
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    disabled
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
                  />
                  <p className="mt-1 text-gray-500 text-xs">Your email address will be used as your username</p>
                </div>

                <div>
                  <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                    Password*
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password ? (
                    <p className="mt-1 text-red-500 text-xs">{errors.password}</p>
                  ) : (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1">
                        {passwordStrength.length ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <X size={14} className="text-gray-400" />
                        )}
                        <span className={`text-xs ${passwordStrength.length ? "text-green-500" : "text-gray-400"}`}>
                          8+ characters
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {passwordStrength.uppercase ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <X size={14} className="text-gray-400" />
                        )}
                        <span className={`text-xs ${passwordStrength.uppercase ? "text-green-500" : "text-gray-400"}`}>
                          Uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {passwordStrength.lowercase ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <X size={14} className="text-gray-400" />
                        )}
                        <span className={`text-xs ${passwordStrength.lowercase ? "text-green-500" : "text-gray-400"}`}>
                          Lowercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {passwordStrength.number ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <X size={14} className="text-gray-400" />
                        )}
                        <span className={`text-xs ${passwordStrength.number ? "text-green-500" : "text-gray-400"}`}>
                          Number
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {passwordStrength.special ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <X size={14} className="text-gray-400" />
                        )}
                        <span className={`text-xs ${passwordStrength.special ? "text-green-500" : "text-gray-400"}`}>
                          Special character
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-1">
                    Confirm Password*
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white border ${
                        errors.confirmPassword ? "border-red-500" : "border-gray-300"
                      } rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00509d] focus:border-[#00509d]`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-red-500 text-xs">{errors.confirmPassword}</p>}
                </div>
              </div>

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
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

