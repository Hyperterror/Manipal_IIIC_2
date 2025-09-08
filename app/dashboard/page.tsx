"use client"

import { AuthGuard } from "@/components/auth-guard"
import { ChatDashboard } from "@/components/chat-dashboard"

export default function DashboardPage() {
  return (
    <AuthGuard>
      <ChatDashboard />
    </AuthGuard>
  )
}
