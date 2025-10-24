"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  FileText,
  Network,
  Calendar,
  CreditCard,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Pacientes", href: "/dashboard/pacientes", icon: Users, badge: "142" },
  { name: "Prontuários", href: "/prontuarios", icon: FileText },
  { name: "Genograma", href: "/genograma", icon: Network, badge: "Beta" },
  { name: "Agendamentos", href: "/agendamentos", icon: Calendar, badge: "5" },
  { name: "Financeiro", href: "/financeiro", icon: CreditCard },
  { name: "Relatórios", href: "/relatorios", icon: BarChart3 },
]

const secondaryNavigation = [
  { name: "Configurações", href: "/configuracoes", icon: Settings },
  { name: "Ajuda", href: "/ajuda", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 border-r bg-background">
      <div className="flex-1 overflow-y-auto">
        {/* Navegação Principal */}
        <nav className="flex flex-col gap-1 p-4">
          <div className="mb-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
              Principal
            </p>
          </div>
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <Badge
                    variant={isActive ? "secondary" : "outline"}
                    className="ml-auto"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Separador */}
        <div className="my-4 border-t" />

        {/* Navegação Secundária */}
        <nav className="flex flex-col gap-1 p-4">
          {secondaryNavigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer com Plano */}
      <div className="border-t p-4">
        <div className="rounded-lg bg-primary/10 p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold">Plano Profissional</p>
            <Badge variant="secondary" className="text-xs">
              Ativo
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            142 de 200 pacientes
          </p>
          <div className="h-2 bg-background rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: "71%" }} />
          </div>
          <Link
            href="/planos"
            className="text-xs text-primary hover:underline mt-2 block"
          >
            Gerenciar plano
          </Link>
        </div>
      </div>
    </aside>
  )
}
