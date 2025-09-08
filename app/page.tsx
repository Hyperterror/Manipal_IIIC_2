import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Database, Users, Lock, Brain, Search, FileText, BarChart3, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-6xl mx-auto">
          {/* Logo Placeholder */}
          <div className="w-20 h-20 mx-auto bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <Brain className="w-10 h-10 text-primary-foreground" />
          </div>

          {/* Hero Headlines */}
          <div className="space-y-6">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              🚀 AI-Powered Offline Organizational Assistant
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
              Ask Anything. Get Answers Instantly. <span className="text-primary">Offline.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-4xl mx-auto">
              Transform your organization's HR, policy, and employee data into an intelligent AI assistant. Powered by
              local LLM, vector database, and role-based security — all running offline.
            </p>
          </div>

          {/* Core Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="glass group hover:scale-105 transition-all duration-300 cursor-pointer border-primary/20">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Database className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Vector Database</h3>
                <p className="text-muted-foreground">
                  Advanced semantic search through your organizational data using state-of-the-art vector embeddings.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline" className="text-xs">
                    Chroma DB
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Semantic Search
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass group hover:scale-105 transition-all duration-300 cursor-pointer border-secondary/20">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-xl flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Brain className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Local LLM</h3>
                <p className="text-muted-foreground">
                  Llama 3 8B model running entirely on your infrastructure. No cloud dependencies.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline" className="text-xs">
                    Llama 3 8B
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    On-Premises
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass group hover:scale-105 transition-all duration-300 cursor-pointer border-accent/20">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Role-Based Access</h3>
                <p className="text-muted-foreground">
                  Secure permissions for Employee, Manager, and Admin roles. See only what you're authorized to access.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline" className="text-xs">
                    RBAC
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Secure
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technical Capabilities */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-12">Complete AI-Powered Solution</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass p-6 text-center space-y-3">
                <FileText className="w-8 h-8 text-primary mx-auto" />
                <h4 className="font-semibold">Data Ingestion</h4>
                <p className="text-sm text-muted-foreground">JSON to vector conversion pipeline</p>
              </Card>

              <Card className="glass p-6 text-center space-y-3">
                <Search className="w-8 h-8 text-secondary mx-auto" />
                <h4 className="font-semibold">Query Processing</h4>
                <p className="text-sm text-muted-foreground">Natural language understanding</p>
              </Card>

              <Card className="glass p-6 text-center space-y-3">
                <Lock className="w-8 h-8 text-accent mx-auto" />
                <h4 className="font-semibold">Zero Trust Security</h4>
                <p className="text-sm text-muted-foreground">End-to-end data protection</p>
              </Card>

              <Card className="glass p-6 text-center space-y-3">
                <BarChart3 className="w-8 h-8 text-primary mx-auto" />
                <h4 className="font-semibold">Analytics Dashboard</h4>
                <p className="text-sm text-muted-foreground">Query insights and usage metrics</p>
              </Card>
            </div>
          </div>

          {/* Use Cases */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-12">What You Can Ask</h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  For Employees
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    "How many vacation days do I have left?"
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    "What's the remote work policy?"
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    "How do I submit expense reports?"
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    "What are the health insurance options?"
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  For Managers & HR
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    "Show team performance metrics"
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    "Who's on leave next week?"
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    "Generate compliance reports"
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    "Review salary benchmarks"
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Ready to Transform Your Organization?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the power of AI-driven organizational intelligence. Secure, private, and completely offline.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="text-lg px-8 py-6 hover:scale-105 transition-transform">
                  Try Demo Account
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 hover:scale-105 transition-transform bg-transparent"
              >
                View Documentation
              </Button>
            </div>

            {/* Security Banner */}
            <div className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" />
              100% Offline — No data leaves your machine — Enterprise Security
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-semibold">OrgAI Chatbot</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered organizational intelligence platform built for security and privacy.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Vector Database</li>
                <li>Local LLM</li>
                <li>Role-Based Access</li>
                <li>Offline Processing</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Technology</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Llama 3 8B Model</li>
                <li>Chroma Vector DB</li>
                <li>On-Premises Deploy</li>
                <li>Zero Cloud Dependency</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Security</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>100% Offline</li>
                <li>RBAC Controls</li>
                <li>Data Encryption</li>
                <li>Audit Logging</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 OrgAI Chatbot | Built for Security & Simplicity</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              Enterprise-Grade Security
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
