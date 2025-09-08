"use client"

import { AuthGuard } from "@/components/auth-guard"
import { QueryHistory } from "@/components/query-history"

export default function HistoryPage() {
  return (
    <AuthGuard>
      <QueryHistory />
    </AuthGuard>
  )
}
