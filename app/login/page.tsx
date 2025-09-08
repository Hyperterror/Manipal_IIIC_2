"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Lock, Brain, User, UserCheck, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export default function LoginPage() {
  const [employeeId, setEmployeeId] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!employeeId || !password || !role) return

    if (isSignUp && password !== confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    setIsLoading(true)

    // Mock authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (isSignUp) {
      // Mock sign up logic
      alert("Account created successfully! You can now sign in.")
      setIsSignUp(false)
      setIsLoading(false)
      return
    }

    // Mock authentication logic
    const success = await login(employeeId, password, role as "employee" | "manager" | "admin")

    if (success) {
      router.push("/dashboard")
    }

    setIsLoading(false)
  }

  const demoAccounts = [
    { id: "emp001", password: "password123", role: "employee", name: "John Employee" },
    { id: "mgr001", password: "manager123", role: "manager", name: "Sarah Manager" },
    { id: "admin001", password: "admin123", role: "admin", name: "Mike Admin" },
  ]

  const fillDemoAccount = (account: (typeof demoAccounts)[0]) => {
    setEmployeeId(account.id)
    setPassword(account.password)
    setRole(account.role)
    setFullName(account.name)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <Brain className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">OrgAI Chatbot</h1>
          <p className="text-muted-foreground">AI-Powered Organizational Assistant</p>
          <Badge variant="secondary" className="mt-2">
            100% Offline & Secure
          </Badge>
        </div>

        {/* Demo Accounts Info */}
        <Card className="glass border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5" />
              Demo Accounts Available
            </CardTitle>
            <CardDescription>Click to auto-fill credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {demoAccounts.map((account) => (
              <Button
                key={account.id}
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2 h-auto p-3 bg-transparent"
                onClick={() => fillDemoAccount(account)}
              >
                <div className="flex items-center gap-2">
                  {account.role === "employee" && <User className="w-4 h-4 text-blue-500" />}
                  {account.role === "manager" && <UserCheck className="w-4 h-4 text-green-500" />}
                  {account.role === "admin" && <Users className="w-4 h-4 text-purple-500" />}
                  <div className="text-left">
                    <div className="font-medium">{account.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {account.id} • {account.role}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Auth Toggle */}
        <div className="flex items-center justify-center">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={!isSignUp ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsSignUp(false)}
              className="rounded-md"
            >
              Sign In
            </Button>
            <Button
              variant={isSignUp ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsSignUp(true)}
              className="rounded-md"
            >
              Sign Up
            </Button>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="glass">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">{isSignUp ? "Create Account" : "Welcome Back"}</CardTitle>
            <CardDescription>
              {isSignUp ? "Join your organization's AI assistant" : "Enter your credentials to access the AI assistant"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name (Sign Up Only) */}
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={isSignUp}
                  />
                </div>
              )}

              {/* Employee ID */}
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID / Username</Label>
                <Input
                  id="employeeId"
                  type="text"
                  placeholder="Enter your employee ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Confirm Password (Sign Up Only) */}
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={isSignUp}
                  />
                </div>
              )}

              {/* Role Selector */}
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-500" />
                        Employee
                      </div>
                    </SelectItem>
                    <SelectItem value="manager">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-green-500" />
                        Manager
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        Admin/HR
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Remember Me (Sign In Only) */}
              {!isSignUp && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={
                  isLoading ||
                  !employeeId ||
                  !password ||
                  !role ||
                  (isSignUp && (!fullName || password !== confirmPassword))
                }
              >
                {isLoading
                  ? isSignUp
                    ? "Creating Account..."
                    : "Authenticating..."
                  : isSignUp
                    ? "Create Account"
                    : "Secure Login"}
              </Button>

              {/* Forgot Password (Sign In Only) */}
              {!isSignUp && (
                <div className="text-center">
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-not-allowed opacity-50"
                  >
                    Forgot Password?
                  </Link>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Security Message */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-muted-foreground">
            <Lock className="w-4 h-4 text-primary" />
            All data processed locally. Zero external connections.
          </div>
        </div>

        {/* AI Bot Mascot Corner */}
        <div className="fixed bottom-4 right-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity">
          <Brain className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  )
}
