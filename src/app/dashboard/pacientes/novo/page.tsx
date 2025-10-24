"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import Link from "next/link"

// Schema de validação com Zod
const patientSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().min(11, "CPF inválido").max(14, "CPF inválido"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  gender: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  medicalHistory: z.string().optional(),
})

type PatientFormData = z.infer<typeof patientSchema>

export default function NovoPacientePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  })

  const onSubmit = async (data: PatientFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Erro ao cadastrar paciente")
      }

      // Redirecionar para a página de detalhes do paciente
      router.push(`/dashboard/pacientes/${result.data.id}`)
    } catch (err: any) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/pacientes">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Novo Paciente</h1>
          <p className="text-muted-foreground mt-2">
            Preencha os dados para cadastrar um novo paciente
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Dados Pessoais */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
              <CardDescription>
                Informações básicas do paciente
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label htmlFor="name">
                  Nome Completo <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="João Silva Santos"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="cpf">
                  CPF <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  {...register("cpf")}
                />
                {errors.cpf && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.cpf.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="birthDate">
                  Data de Nascimento <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  {...register("birthDate")}
                />
                {errors.birthDate && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.birthDate.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="gender">Gênero</Label>
                <Input
                  id="gender"
                  placeholder="Masculino, Feminino, etc"
                  {...register("gender")}
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  {...register("phone")}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Endereço</CardTitle>
              <CardDescription>
                Informações de localização
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-3">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  placeholder="Rua, número, complemento"
                  {...register("address")}
                />
              </div>

              <div>
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  placeholder="Goiânia"
                  {...register("city")}
                />
              </div>

              <div>
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  placeholder="GO"
                  maxLength={2}
                  {...register("state")}
                />
              </div>

              <div>
                <Label htmlFor="zipCode">CEP</Label>
                <Input
                  id="zipCode"
                  placeholder="00000-000"
                  {...register("zipCode")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Dados Clínicos */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Dados Clínicos</CardTitle>
              <CardDescription>
                Informações médicas importantes (serão criptografadas)
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                <Label htmlFor="allergies">Alergias</Label>
                <Textarea
                  id="allergies"
                  placeholder="Liste alergias medicamentosas ou alimentares..."
                  {...register("allergies")}
                />
              </div>

              <div>
                <Label htmlFor="medications">Medicações em Uso</Label>
                <Textarea
                  id="medications"
                  placeholder="Liste medicações que o paciente usa atualmente..."
                  {...register("medications")}
                />
              </div>

              <div>
                <Label htmlFor="medicalHistory">Histórico Médico</Label>
                <Textarea
                  id="medicalHistory"
                  placeholder="Doenças prévias, cirurgias, internações..."
                  {...register("medicalHistory")}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 mt-6">
          <Button variant="outline" asChild type="button">
            <Link href="/dashboard/pacientes">Cancelar</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Paciente
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
