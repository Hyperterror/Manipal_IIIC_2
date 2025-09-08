"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  MessageSquare,
  History,
  Database,
  Settings,
  LogOut,
  Send,
  Mic,
  Menu,
  X,
  CheckCircle,
  Info,
} from "lucide-react"
import { useAuth, type UserRole } from "@/hooks/use-auth"
import { RoleBadge } from "@/components/role-badge"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface ChatMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  source?: string
  role?: UserRole
}

const mockInitialMessages: ChatMessage[] = [
  {
    id: "1",
    type: "user",
    content: "How many vacation days do I have left?",
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: "2",
    type: "bot",
    content: "You have 7 vacation days remaining as of today.",
    timestamp: new Date(Date.now() - 240000),
    source: "HR Policy v3.2",
  },
  {
    id: "3",
    type: "user",
    content: "What's the company policy on remote work?",
    timestamp: new Date(Date.now() - 180000),
  },
  {
    id: "4",
    type: "bot",
    content:
      "According to the current policy, employees can work remotely up to 3 days per week with manager approval. Full remote work requires HR approval and is evaluated case-by-case.",
    timestamp: new Date(Date.now() - 120000),
    source: "Remote Work Policy v2.1",
  },
]

export function ChatDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>(mockInitialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const checkRolePermission = (query: string): boolean => {
    const restrictedQueries = {
      employee: ["team salaries", "employee directory", "payroll", "salary"],
      manager: [],
      admin: [],
    }

    if (!user) return false

    const userRestrictions = restrictedQueries[user.role] || []
    return !userRestrictions.some((restriction) => query.toLowerCase().includes(restriction))
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !user) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
      role: user.role,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Check role permissions
    if (!checkRolePermission(inputValue)) {
      setTimeout(() => {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: `Access Denied — Your role (${user.role}) does not permit this query. Please contact your administrator for access to this information.`,
          timestamp: new Date(),
          source: "Access Control System",
        }
        setMessages((prev) => [...prev, errorMessage])
        setIsTyping(false)
      }, 1500)
      return
    }

    // Mock AI response
    setTimeout(() => {
      const responses = [
        "Based on your query, I found the following information in our knowledge base...",
        "According to the latest policy documents, here's what I can tell you...",
        "I've searched through the employee handbook and found this relevant information...",
        "From the HR database, I can provide you with the following details...",
      ]

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        source: "Local AI Knowledge Base",
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <div
        className={cn(
          "transition-all duration-300 border-r border-border bg-sidebar",
          sidebarOpen ? "w-64" : "w-0 overflow-hidden",
        )}
      >
        <div className="p-4 space-y-6">
          {/* User Profile */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user?.name}</p>
                <p className="text-sm text-muted-foreground truncate">ID: {user?.employeeId}</p>
              </div>
            </div>
            <RoleBadge role={user?.role || "employee"} />
          </div>

          <Separator />

          {/* Navigation */}
          <nav className="space-y-2">
            <Button variant="default" className="w-full justify-start gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => router.push("/history")}>
              <History className="h-4 w-4" />
              Query History
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 opacity-50 cursor-not-allowed">
              <Database className="h-4 w-4" />
              Data Sources
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => router.push("/settings")}>
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </nav>

          <Separator />

          {/* Logout */}
          <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border p-4 bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
                {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold">OrgAI Assistant</h1>
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  <CheckCircle className="h-3 w-3" />
                  Offline Mode Active
                </div>
              </div>
            </div>
            <RoleBadge role={user?.role || "employee"} />
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex gap-3", message.type === "user" ? "justify-end" : "justify-start")}
            >
              {message.type === "bot" && (
                <Avatar className="h-8 w-8 bg-primary">
                  <AvatarFallback className="text-primary-foreground">
                    <Shield className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <Card
                className={cn("max-w-[70%]", message.type === "user" ? "bg-primary text-primary-foreground" : "glass")}
              >
                <CardContent className="p-3">
                  <p className="text-sm">{message.content}</p>
                  {message.source && (
                    <div className="flex items-center gap-1 mt-2 pt-2 border-t border-border/50">
                      <Info className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Source: {message.source}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                    {message.type === "bot" && (
                      <Badge variant="outline" className="text-xs">
                        Verified by Local AI
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {message.type === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <Avatar className="h-8 w-8 bg-primary">
                <AvatarFallback className="text-primary-foreground">
                  <Shield className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <Card className="glass">
                <CardContent className="p-3">
                  <div className="flex items-center gap-1">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">AI is thinking...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="border-t border-border p-4 bg-card">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Textarea
                placeholder="Ask about policies, payroll, team info, leaves..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="min-h-[44px] max-h-32 resize-none pr-20"
                rows={1}
              />
              <div className="absolute right-2 top-2 flex gap-1">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 opacity-50 cursor-not-allowed">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Offline Banner */}
        <div className="bg-primary/10 border-t border-primary/20 px-4 py-2">
          <div className="flex items-center justify-center gap-2 text-sm text-primary">
            <Shield className="h-4 w-4" />
            100% Offline — No data leaves your machine
          </div>
        </div>
      </div>
    </div>
  )
}
