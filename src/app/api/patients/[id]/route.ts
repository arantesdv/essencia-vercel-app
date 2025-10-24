import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

// GET /api/patients/:id - Buscar paciente por ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: params.id,
      },
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

    if (!patient) {
      return NextResponse.json(
        {
          success: false,
          error: 'Patient not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: patient,
    })
  } catch (error) {
    console.error('Error fetching patient:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch patient',
      },
      { status: 500 }
    )
  }
}

// PUT /api/patients/:id - Atualizar paciente
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const patient = await prisma.patient.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email,
        address: body.address,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        allergies: body.allergies,
        medications: body.medications,
        medicalHistory: body.medicalHistory,
      },
    })

    return NextResponse.json({
      success: true,
      data: patient,
      message: 'Patient updated successfully',
    })
  } catch (error: any) {
    console.error('Error updating patient:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        {
          success: false,
          error: 'Patient not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update patient',
      },
      { status: 500 }
    )
  }
}

// DELETE /api/patients/:id - Deletar paciente
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.patient.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Patient deleted successfully',
    })
  } catch (error: any) {
    console.error('Error deleting patient:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        {
          success: false,
          error: 'Patient not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete patient',
      },
      { status: 500 }
    )
  }
}
