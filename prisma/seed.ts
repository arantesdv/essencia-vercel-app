import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Criar Tenant (Médico)
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Dr. Daniel Victor Arantes',
      email: 'arantesdv@me.com',
      crm: 'GO 9335',
      specialty: 'Psiquiatria / Medicina de Família',
      subdomain: 'drdaniel',
    },
  })

  console.log('✅ Tenant criado:', tenant.name)

  // Criar User (Usuário do sistema)
  const user = await prisma.user.create({
    data: {
      name: 'Dr. Daniel Arantes',
      email: 'arantesdv@me.com',
      password: 'hashed_password_here', // Depois vamos usar bcrypt
      role: 'ADMIN',
      tenantId: tenant.id,
    },
  })

  console.log('✅ User criado:', user.name)

  // Criar Pacientes de exemplo
  const patients = await prisma.patient.createMany({
    data: [
      {
        name: 'Maria Silva Santos',
        cpf: '123.456.789-00',
        birthDate: new Date('1990-05-15'),
        gender: 'Feminino',
        phone: '(62) 98765-4321',
        email: 'maria.silva@example.com',
        city: 'Goiânia',
        state: 'GO',
        tenantId: tenant.id,
      },
      {
        name: 'João Pedro Oliveira',
        cpf: '987.654.321-00',
        birthDate: new Date('1985-10-20'),
        gender: 'Masculino',
        phone: '(62) 99876-5432',
        email: 'joao.oliveira@example.com',
        city: 'Brasília',
        state: 'DF',
        tenantId: tenant.id,
      },
      {
        name: 'Ana Costa Ferreira',
        cpf: '456.789.123-00',
        birthDate: new Date('1992-03-08'),
        gender: 'Feminino',
        phone: '(62) 97654-3210',
        email: 'ana.costa@example.com',
        city: 'Anápolis',
        state: 'GO',
        tenantId: tenant.id,
      },
    ],
  })

  console.log(`✅ ${patients.count} pacientes criados`)

  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Erro no seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
