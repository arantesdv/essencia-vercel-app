import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  FileText,
  Calendar,
  TrendingUp,
  Activity,
  Clock,
  AlertCircle,
  CheckCircle2
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Visão geral da sua prática médica
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Pacientes
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12</span> desde o mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Atendimentos Hoje
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              5 concluídos, 3 pendentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Prontuários
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">326</div>
            <p className="text-xs text-muted-foreground">
              Todos digitalizados e criptografados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Adesão
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+4.2%</span> vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grid com Cards de Conteúdo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Próximos Atendimentos */}
        <Card className="col-span-full lg:col-span-4">
          <CardHeader>
            <CardTitle>Próximos Atendimentos</CardTitle>
            <CardDescription>
              Você tem 8 atendimentos agendados para hoje
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Maria Silva", time: "09:00", type: "Consulta", status: "confirmed" },
                { name: "João Santos", time: "10:30", type: "Retorno", status: "confirmed" },
                { name: "Ana Costa", time: "14:00", type: "Primeira Consulta", status: "pending" },
                { name: "Pedro Oliveira", time: "15:30", type: "Consulta", status: "confirmed" },
                { name: "Lucia Ferreira", time: "16:30", type: "Retorno", status: "pending" },
              ].map((appointment, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {appointment.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.type}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{appointment.time}</Badge>
                    {appointment.status === "confirmed" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver todos os agendamentos
            </Button>
          </CardContent>
        </Card>

        {/* Atividade Recente */}
        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Últimas ações no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Prontuário atualizado", patient: "Maria Silva", time: "5 min atrás" },
                { action: "Novo paciente cadastrado", patient: "Carlos Souza", time: "1 hora atrás" },
                { action: "Genograma criado", patient: "Ana Costa", time: "2 horas atrás" },
                { action: "Prescrição emitida", patient: "João Santos", time: "3 horas atrás" },
                { action: "Exame anexado", patient: "Lucia Ferreira", time: "5 horas atrás" },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.patient} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas e Lembretes */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas e Lembretes</CardTitle>
          <CardDescription>
            Itens que precisam da sua atenção
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">3 pacientes sem retorno há mais de 6 meses</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Considere entrar em contato para agendar consulta de acompanhamento
                </p>
              </div>
              <Button size="sm" variant="outline">
                Ver lista
              </Button>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Backup automático concluído</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Último backup realizado há 24 horas
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
