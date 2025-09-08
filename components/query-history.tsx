"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Search, Filter, Download, Trash2, CheckCircle, XCircle, Calendar } from "lucide-react"
import { useAuth, type UserRole } from "@/hooks/use-auth"
import { RoleBadge } from "@/components/role-badge"
import { useRouter } from "next/navigation"

interface QueryRecord {
  id: string
  query: string
  responseSummary: string
  date: Date
  role: UserRole
  status: "success" | "denied"
}

const mockQueryHistory: QueryRecord[] = [
  {
    id: "1",
    query: "How many vacation days do I have left?",
    responseSummary: "7 vacation days remaining as of today",
    date: new Date(Date.now() - 86400000), // 1 day ago
    role: "employee",
    status: "success",
  },
  {
    id: "2",
    query: "What's the company policy on remote work?",
    responseSummary: "Remote work up to 3 days per week with manager approval",
    date: new Date(Date.now() - 172800000), // 2 days ago
    role: "employee",
    status: "success",
  },
  {
    id: "3",
    query: "Show me team salaries",
    responseSummary: "Access denied - insufficient permissions",
    date: new Date(Date.now() - 259200000), // 3 days ago
    role: "employee",
    status: "denied",
  },
  {
    id: "4",
    query: "Who's on leave next week?",
    responseSummary: "3 team members scheduled for leave",
    date: new Date(Date.now() - 345600000), // 4 days ago
    role: "manager",
    status: "success",
  },
  {
    id: "5",
    query: "What are the health insurance options?",
    responseSummary: "3 health insurance plans available with different coverage",
    date: new Date(Date.now() - 432000000), // 5 days ago
    role: "employee",
    status: "success",
  },
  {
    id: "6",
    query: "Export employee directory",
    responseSummary: "Access denied - admin role required",
    date: new Date(Date.now() - 518400000), // 6 days ago
    role: "manager",
    status: "denied",
  },
]

export function QueryHistory() {
  const { user } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [showClearDialog, setShowClearDialog] = useState(false)

  const filteredHistory = useMemo(() => {
    return mockQueryHistory.filter((record) => {
      const matchesSearch =
        record.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.responseSummary.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || record.status === statusFilter
      const matchesRole = roleFilter === "all" || record.role === roleFilter

      let matchesDate = true
      if (dateFilter !== "all") {
        const now = new Date()
        const recordDate = record.date
        switch (dateFilter) {
          case "today":
            matchesDate = recordDate.toDateString() === now.toDateString()
            break
          case "week":
            matchesDate = now.getTime() - recordDate.getTime() <= 7 * 24 * 60 * 60 * 1000
            break
          case "month":
            matchesDate = now.getTime() - recordDate.getTime() <= 30 * 24 * 60 * 60 * 1000
            break
        }
      }

      return matchesSearch && matchesStatus && matchesRole && matchesDate
    })
  }, [searchQuery, statusFilter, roleFilter, dateFilter])

  const handleClearHistory = () => {
    // In a real app, this would clear the history from the backend
    console.log("Clearing query history...")
    setShowClearDialog(false)
  }

  const handleExportCSV = () => {
    // Mock export functionality - disabled for demo
    console.log("Export CSV functionality would be implemented here")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Chat
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Query History</h1>
              <p className="text-muted-foreground">View and manage your past AI interactions</p>
            </div>
          </div>
          <RoleBadge role={user?.role || "employee"} />
        </div>

        {/* Filters and Search */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search queries or responses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="denied">Denied</SelectItem>
                </SelectContent>
              </Select>

              {/* Role Filter */}
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="admin">Admin/HR</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Filter */}
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              Showing {filteredHistory.length} of {mockQueryHistory.length} queries
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleExportCSV} disabled className="opacity-50 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear History
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Clear Query History</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to clear all query history? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowClearDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleClearHistory}>
                    Clear History
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* History Table */}
        <Card className="glass">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Query</TableHead>
                  <TableHead>Response Summary</TableHead>
                  <TableHead className="w-[120px]">Date</TableHead>
                  <TableHead className="w-[100px]">Role</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No queries found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredHistory.map((record) => (
                    <TableRow key={record.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="max-w-[280px] truncate" title={record.query}>
                          {record.query}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[300px] truncate text-muted-foreground" title={record.responseSummary}>
                          {record.responseSummary}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {record.date.toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <RoleBadge role={record.role} className="text-xs" />
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={record.status === "success" ? "default" : "destructive"}
                          className="flex items-center gap-1 w-fit"
                        >
                          {record.status === "success" ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <XCircle className="h-3 w-3" />
                          )}
                          {record.status === "success" ? "Success" : "Denied"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Mobile Card View (hidden on desktop) */}
        <div className="md:hidden space-y-4">
          {filteredHistory.map((record) => (
            <Card key={record.id} className="glass">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-sm leading-tight">{record.query}</h3>
                  <Badge
                    variant={record.status === "success" ? "default" : "destructive"}
                    className="flex items-center gap-1 text-xs"
                  >
                    {record.status === "success" ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <XCircle className="h-3 w-3" />
                    )}
                    {record.status === "success" ? "Success" : "Denied"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{record.responseSummary}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {record.date.toLocaleDateString()}
                  </div>
                  <RoleBadge role={record.role} className="text-xs" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
