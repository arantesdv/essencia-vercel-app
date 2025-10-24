# 📊 Database + Prisma - Guia Completo

## 🎯 O que foi configurado:

✅ Prisma ORM instalado e configurado
✅ Schema com 3 modelos: Tenant, User, Patient
✅ Scripts npm prontos
✅ Seed com dados de exemplo
✅ SQLite configurado (desenvolvimento local)

---

## 📚 Estrutura:

```
essencia-vercel-app/
├── prisma/
│   ├── schema.prisma     ← Definição dos modelos (tipo models.py do Django)
│   └── seed.ts           ← Dados iniciais para popular o DB
├── src/lib/
│   └── db.ts             ← Cliente Prisma (singleton)
└── .env                  ← Variáveis de ambiente
```

---

## 🚀 Como usar (no seu Mac):

### 1️⃣ **Gerar Prisma Client**

Sempre que mudar o `schema.prisma`, rode:

```bash
pnpm db:generate
```

**O que faz:** Gera código TypeScript tipado baseado no schema.

**Equivalente Python:**
```python
# Tipo quando você altera models.py e roda makemigrations
python manage.py makemigrations
```

---

### 2️⃣ **Criar Database e Tabelas**

```bash
pnpm db:push
```

**O que faz:**
- Cria o arquivo `dev.db` (SQLite)
- Cria todas as tabelas baseadas no schema

**Equivalente Python:**
```python
python manage.py migrate
```

---

### 3️⃣ **Popular com Dados Iniciais (Seed)**

```bash
pnpm db:seed
```

**O que faz:**
- Cria 1 médico (tenant)
- Cria 1 usuário (você)
- Cria 3 pacientes de exemplo

**Saída esperada:**
```
🌱 Seeding database...
✅ Tenant criado: Dr. Daniel Victor Arantes
✅ User criado: Dr. Daniel Arantes
✅ 3 pacientes criados
🎉 Seed concluído com sucesso!
```

---

### 4️⃣ **Explorar Database Visualmente**

```bash
pnpm db:studio
```

**O que faz:**
- Abre interface web em `http://localhost:5555`
- Você pode ver, editar, deletar dados
- Tipo phpMyAdmin, mas melhor!

**Visual:**
```
┌─────────────────────────────────┐
│ Prisma Studio                   │
├─────────────────────────────────┤
│ □ Tenant      (1 registro)      │
│ □ User        (1 registro)      │
│ □ Patient     (3 registros)     │
└─────────────────────────────────┘
```

---

## 📝 Como usar no código:

### **1. Importar Prisma Client:**

```typescript
import prisma from '@/lib/db'
```

### **2. Buscar dados:**

```typescript
// Buscar todos os pacientes
const patients = await prisma.patient.findMany({
  where: {
    tenantId: currentUser.tenantId  // Multi-tenancy!
  },
  orderBy: {
    name: 'asc'
  }
})

// Buscar paciente por CPF
const patient = await prisma.patient.findUnique({
  where: {
    cpf: '123.456.789-00'
  }
})

// Buscar com filtro
const results = await prisma.patient.findMany({
  where: {
    tenantId: currentUser.tenantId,
    name: {
      contains: 'Maria'  // LIKE %Maria%
    }
  }
})
```

### **3. Criar dados:**

```typescript
// Criar paciente
const newPatient = await prisma.patient.create({
  data: {
    name: 'João Silva',
    cpf: '111.222.333-44',
    birthDate: new Date('1990-01-01'),
    gender: 'Masculino',
    phone: '(62) 99999-8888',
    email: 'joao@example.com',
    tenantId: currentUser.tenantId
  }
})
```

### **4. Atualizar dados:**

```typescript
// Atualizar paciente
const updated = await prisma.patient.update({
  where: {
    id: patientId
  },
  data: {
    phone: '(62) 91111-2222',
    email: 'novo@email.com'
  }
})
```

### **5. Deletar dados:**

```typescript
// Deletar paciente
await prisma.patient.delete({
  where: {
    id: patientId
  }
})
```

---

## 🔍 Comparação com Python (SQLAlchemy):

| Python (SQLAlchemy) | Prisma |
|---------------------|--------|
| `session.query(Patient).all()` | `prisma.patient.findMany()` |
| `session.query(Patient).filter_by(cpf=...)` | `prisma.patient.findUnique({ where: { cpf } })` |
| `session.add(patient)` | `prisma.patient.create({ data })` |
| `session.commit()` | **Automático!** |
| `session.delete(patient)` | `prisma.patient.delete({ where })` |

**Vantagem do Prisma:** Não precisa de `commit()`, tudo é automático!

---

## 📋 Scripts disponíveis:

```bash
# Gerar cliente Prisma
pnpm db:generate

# Criar/atualizar database
pnpm db:push

# Criar migration (produção)
pnpm db:migrate

# Abrir Prisma Studio (GUI)
pnpm db:studio

# Popular com dados iniciais
pnpm db:seed
```

---

## 🔄 Workflow completo (primeira vez):

```bash
# 1. Atualizar código do GitHub
git pull origin claude/start-component-011CUQh6yfW9B5EiYn1TSLNS

# 2. Instalar dependências
pnpm install

# 3. Gerar Prisma Client
pnpm db:generate

# 4. Criar database e tabelas
pnpm db:push

# 5. Popular com dados
pnpm db:seed

# 6. Abrir Prisma Studio (opcional)
pnpm db:studio

# 7. Rodar aplicação
pnpm dev
```

---

## 🗄️ Modelos Criados:

### **1. Tenant (Médico/Clínica)**
```typescript
model Tenant {
  id        String   // UUID
  name      String   // "Dr. Daniel Arantes"
  email     String   // Único
  crm       String   // "GO 9335"
  specialty String   // "Psiquiatria"
  subdomain String?  // "drdaniel"

  // Relações
  users    User[]
  patients Patient[]
}
```

### **2. User (Usuário do Sistema)**
```typescript
model User {
  id        String
  name      String
  email     String  // Único
  password  String  // Depois vamos usar bcrypt
  role      String  // "USER" ou "ADMIN"
  tenantId  String  // FK para Tenant

  tenant Tenant @relation(...)
}
```

### **3. Patient (Paciente)**
```typescript
model Patient {
  id            String
  name          String
  cpf           String   // Único
  birthDate     DateTime
  gender        String?
  phone         String?
  email         String?
  address       String?

  // Multi-tenancy
  tenantId      String   // FK para Tenant

  tenant Tenant @relation(...)
}
```

---

## 🛠️ Troubleshooting:

### **Erro: "Can't reach database server"**

Verifique se o `.env` está correto:
```bash
DATABASE_URL="file:./dev.db"
```

### **Erro: "Prisma Client not generated"**

```bash
pnpm db:generate
```

### **Erro: "Table doesn't exist"**

```bash
pnpm db:push
```

### **Quero resetar tudo:**

```bash
# Deletar database
rm prisma/dev.db

# Recriar tudo
pnpm db:push
pnpm db:seed
```

---

## 🎯 Próximos Passos:

1. ✅ Criar API Routes para CRUD de pacientes
2. ✅ Criar formulários de cadastro
3. ✅ Implementar autenticação
4. ✅ Migrar de SQLite para PostgreSQL (Supabase)

---

## 📖 Links Úteis:

- [Prisma Docs](https://www.prisma.io/docs)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

---

**Está tudo pronto!** 🚀 Quando você rodar no seu Mac, vai funcionar perfeitamente!
