"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, User, Shield, Brain, LogOut, Eye, Lock, Database, Cpu, Calendar, AlertTriangle } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { RoleBadge } from "@/components/role-badge"
import { useRouter } from "next/navigation"

export function SettingsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleChangePassword = () => {
    // Disabled for demo
    console.log("Change password functionality would be implemented here")
  }

  const handleToggle2FA = (enabled: boolean) => {
    // Disabled for demo
    console.log("2FA toggle functionality would be implemented here")
    setTwoFactorEnabled(enabled)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto p-6 space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Chat
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your account and system preferences</p>
            </div>
          </div>
          <RoleBadge role={user?.role || "employee"} />
        </div>

        <div className="grid gap-6">
          {/* Profile Section */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Your account details and role information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="flex items-center gap-2">
                    <Input id="name" value={user?.name || ""} disabled className="bg-muted" />
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <div className="flex items-center gap-2">
                    <Input id="employeeId" value={user?.employeeId || ""} disabled className="bg-muted" />
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <div className="flex items-center gap-2">
                  <RoleBadge role={user?.role || "employee"} />
                  <span className="text-sm text-muted-foreground">
                    Your role determines access permissions within the system
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">Change Password</Label>
                    <p className="text-sm text-muted-foreground">Update your account password</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleChangePassword}
                    disabled
                    className="opacity-50 bg-transparent"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={handleToggle2FA}
                    disabled
                    className="opacity-50"
                  />
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Security Features Coming Soon</p>
                    <p className="text-xs text-muted-foreground">
                      Advanced security features including password changes and 2FA will be available in future updates.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Model Information */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Model Information
              </CardTitle>
              <CardDescription>Details about the local AI system powering your assistant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-primary" />
                      <span className="font-medium">AI Model</span>
                    </div>
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">Llama 3 8B (Local)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-secondary" />
                      <span className="font-medium">Vector Database</span>
                    </div>
                    <span className="text-sm bg-secondary/10 text-secondary px-2 py-1 rounded">Chroma</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-accent" />
                      <span className="font-medium">Last Indexed</span>
                    </div>
                    <span className="text-sm bg-accent/10 text-accent px-2 py-1 rounded">Today</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-green-800">System Status: Online</p>
                        <p className="text-xs text-green-600 mt-1">
                          All AI services are running optimally on your local machine
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">100% Offline Processing</p>
                        <p className="text-xs text-blue-600 mt-1">No data is transmitted to external servers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logout Section */}
          <Card className="glass border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <LogOut className="h-5 w-5" />
                Account Actions
              </CardTitle>
              <CardDescription>Sign out of your account or manage session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Sign Out</p>
                  <p className="text-sm text-muted-foreground">End your current session and return to the login page</p>
                </div>
                <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="lg" className="px-8">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Confirm Sign Out
                      </DialogTitle>
                      <DialogDescription>
                        Are you sure you want to sign out? You'll need to log in again to access the AI assistant.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
