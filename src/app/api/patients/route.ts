import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

// GET /api/patients - Listar todos os pacientes
export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        tenant: {
          select: {
            name: true,
            crm: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json({
      success: true,
      data: patients,
      count: patients.length,
    })
  } catch (error) {
    console.error('Error fetching patients:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch patients',
      },
      { status: 500 }
    )
  }
}

// POST /api/patients - Criar novo paciente
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação básica (depois vamos usar Zod)
    if (!body.name || !body.cpf || !body.birthDate || !body.tenantId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name, cpf, birthDate, tenantId',
        },
        { status: 400 }
      )
    }

    const patient = await prisma.patient.create({
      data: {
        name: body.name,
        cpf: body.cpf,
        birthDate: new Date(body.birthDate),
        gender: body.gender,
        phone: body.phone,
        email: body.email,
        address: body.address,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        tenantId: body.tenantId,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: patient,
        message: 'Patient created successfully',
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating patient:', error)

    // Erro de CPF duplicado
    if (error.code === 'P2002') {
      return NextResponse.json(
        {
          success: false,
          error: 'Patient with this CPF already exists',
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create patient',
      },
      { status: 500 }
    )
  }
}
