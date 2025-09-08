"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserRole = "employee" | "manager" | "admin"

export interface User {
  id: string
  name: string
  employeeId: string
  role: UserRole
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (employeeId: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
}

// Mock user database
const mockUsers: Record<string, { password: string; name: string; role: UserRole }> = {
  emp001: { password: "password123", name: "John Doe", role: "employee" },
  mgr001: { password: "manager123", name: "Jane Smith", role: "manager" },
  admin001: { password: "admin123", name: "Alex Johnson", role: "admin" },
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (employeeId: string, password: string, role: UserRole) => {
        // Mock authentication logic
        const mockUser = mockUsers[employeeId]

        if (mockUser && mockUser.password === password && mockUser.role === role) {
          const user: User = {
            id: employeeId,
            name: mockUser.name,
            employeeId,
            role: mockUser.role,
          }

          set({ user, isAuthenticated: true })
          return true
        }

        return false
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
