import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Pencil, Trash2, FileText, Network } from "lucide-react"
import prisma from "@/lib/db"

async function getPatient(id: string) {
  const patient = await prisma.patient.findUnique({
    where: { id },
    include: {
      tenant: {
        select: {
          name: true,
          crm: true,
          specialty: true,
        },
      },
    },
  })
  return patient
}

function calculateAge(birthDate: Date): number {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

export default async function PacienteDetalhesPage({
  params,
}: {
  params: { id: string }
}) {
  const patient = await getPatient(params.id)

  if (!patient) {
    notFound()
  }

  const age = calculateAge(patient.birthDate)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/pacientes">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {patient.name}
            </h1>
            <p className="text-muted-foreground mt-2">
              CPF: {patient.cpf} • {age} anos •{' '}
              <Badge variant="secondary" className="ml-2">
                Ativo
              </Badge>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/pacientes/${patient.id}/editar`}>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Dados Pessoais */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Dados Pessoais</CardTitle>
            <CardDescription>
              Informações básicas do paciente
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Nome Completo
                </p>
                <p className="text-sm">{patient.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">CPF</p>
                <p className="text-sm">{patient.cpf}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Data de Nascimento
                </p>
                <p className="text-sm">
                  {new Date(patient.birthDate).toLocaleDateString('pt-BR')} ({age}{' '}
                  anos)
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Gênero
                </p>
                <p className="text-sm">{patient.gender || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Telefone
                </p>
                <p className="text-sm">{patient.phone || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Email
                </p>
                <p className="text-sm">{patient.email || '-'}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Endereço</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Endereço
                  </p>
                  <p className="text-sm">{patient.address || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Cidade/Estado
                  </p>
                  <p className="text-sm">
                    {patient.city && patient.state
                      ? `${patient.city}, ${patient.state}`
                      : patient.city || patient.state || '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    CEP
                  </p>
                  <p className="text-sm">{patient.zipCode || '-'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Prontuário
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Network className="mr-2 h-4 w-4" />
              Genograma
            </Button>
            <Button variant="outline" className="w-full justify-start" disabled>
              <FileText className="mr-2 h-4 w-4" />
              Nova Consulta
            </Button>
          </CardContent>
        </Card>

        {/* Dados Clínicos */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Dados Clínicos</CardTitle>
            <CardDescription>
              Informações médicas importantes
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <h3 className="font-medium mb-2">Alergias</h3>
              <p className="text-sm text-muted-foreground">
                {patient.allergies || 'Nenhuma alergia registrada'}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Medicações em Uso</h3>
              <p className="text-sm text-muted-foreground">
                {patient.medications || 'Nenhuma medicação registrada'}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Histórico Médico</h3>
              <p className="text-sm text-muted-foreground">
                {patient.medicalHistory || 'Nenhum histórico registrado'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Informações do Médico */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Médico Responsável</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-lg font-semibold">
                  {patient.tenant.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium">{patient.tenant.name}</p>
                <p className="text-sm text-muted-foreground">
                  {patient.tenant.crm} • {patient.tenant.specialty}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
