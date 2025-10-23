import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Users, Network, FileText, Calendar } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-6">
            <span className="text-3xl font-bold">E</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Essência.me
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Sistema SaaS para Médicos de Família e Psiquiatras
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Primeira plataforma que integra <strong>Psiquiatria + Medicina de Família</strong> com genograma digital inteligente e análise contextual familiar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Acessar Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/sobre">
                Saiba mais
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Gestão de Pacientes</CardTitle>
              <CardDescription>
                Cadastro completo com dados criptografados e conformidade LGPD
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Network className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Genograma Digital</CardTitle>
              <CardDescription>
                Visualização interativa de padrões familiares e hereditários
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Prontuário Eletrônico</CardTitle>
              <CardDescription>
                PEP certificado com assinatura digital e auditoria completa
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Calendar className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Agendamento Online</CardTitle>
              <CardDescription>
                Sistema integrado com notificações automáticas
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Status Section */}
      <div className="container mx-auto px-4 pb-20">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Status do Projeto</CardTitle>
            <CardDescription>Fase 1 - MVP em desenvolvimento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <span className="text-sm">Next.js 15 + TypeScript + Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <span className="text-sm">Componentes UI (shadcn/ui)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <span className="text-sm">Layout Dashboard + Header + Sidebar</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900">
                <span className="text-blue-600 text-sm">◐</span>
              </div>
              <span className="text-sm">Próximo: Prisma + PostgreSQL + Autenticação</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Desenvolvido por Dr. Daniel Victor Arantes • CRM GO 9335 / DF 12132</p>
          <p className="mt-2">🚧 MVP em desenvolvimento - Fase 1</p>
        </div>
      </footer>
    </div>
  )
}
