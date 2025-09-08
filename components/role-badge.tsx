import { Badge } from "@/components/ui/badge"
import type { UserRole } from "@/hooks/use-auth"

interface RoleBadgeProps {
  role: UserRole
  className?: string
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const roleConfig = {
    employee: { label: "Employee", variant: "secondary" as const, color: "bg-blue-500" },
    manager: { label: "Manager", variant: "default" as const, color: "bg-green-500" },
    admin: { label: "Admin/HR", variant: "destructive" as const, color: "bg-red-500" },
  }

  const config = roleConfig[role]

  return (
    <Badge variant={config.variant} className={className}>
      <div className={`w-2 h-2 rounded-full ${config.color} mr-1`} />
      {config.label}
    </Badge>
  )
}
