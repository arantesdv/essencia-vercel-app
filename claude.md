# Claude.md - Essência.me SaaS

> Contexto e instruções para desenvolvimento do projeto Essência.me

## Visão Geral do Projeto

Sistema SaaS multi-tenant para médicos de família e psiquiatras com abordagem sistêmica.

**Diferencial**: Primeira plataforma que integra Psiquiatria + Medicina de Família com genograma digital inteligente e análise contextual familiar.

**Stack Principal**:
- Frontend: Next.js 14+ (App Router) + TypeScript + Tailwind + shadcn/ui
- Backend: NestJS + TypeScript + Prisma
- Database: PostgreSQL (Supabase) com Row-Level Security (RLS)
- Hosting: Vercel (frontend) + Railway (backend)
- Payments: Stripe
- Storage: AWS S3 ou Cloudflare R2

**Arquitetura**: Multi-tenant com schema compartilhado + RLS

## Domínios

```
essencia.me                  → Landing page
app.essencia.me              → Aplicação principal
api.essencia.me              → Backend API
admin.essencia.me            → Painel administrativo
paciente.essencia.me         → Portal do paciente
[username].essencia.me       → Subdomínios personalizados por médico
```

## Estrutura de Dados Core

### Entidades Principais

1. **Tenant** (Médico/Clínica)
   - Dados profissionais (CRM, especialidades)
   - Configurações (subdomain, logo, cores)
   - Subscription (tier, status, limites)

2. **Patient** (Paciente)
   - Dados pessoais (CPF único global)
   - Dados clínicos criptografados
   - Pode ser atendido por múltiplos médicos

3. **PatientTenantRelation**
   - Relacionamento N:N entre pacientes e médicos
   - Controle de compartilhamento com consentimento
   - Níveis de acesso (FULL, SUMMARY, RESTRICTED)

4. **MedicalRecord** (Prontuário)
   - Sempre associado a patient_id + tenant_id
   - Conteúdo criptografado
   - Assinatura digital
   - Visibilidade controlada (PRIVATE, SHARED, PUBLIC)

5. **FamilyMemberNode** (Genograma)
   - Membros da família do paciente
   - Dados clínicos e hereditários
   - Relacionamentos familiares (qualidade, tipo)

6. **Ecomap** (Rede de Apoio)
   - Conexões externas da família
   - Recursos comunitários
   - Fluxo de suporte

## Regras de Ouro

### SEMPRE Faça

✅ Use TypeScript (nunca JavaScript puro)
✅ Valide inputs (Zod, class-validator)
✅ Criptografe dados sensíveis de pacientes
✅ Implemente RLS em queries multi-tenant
✅ Adicione logs de auditoria para acessos a dados clínicos
✅ Trate erros com try-catch e mensagens claras
✅ Escreva testes para lógica crítica (pagamentos, compartilhamento)
✅ Filtre TODAS as queries por tenant_id
✅ Valide CPF, CNS, CRM
✅ Use Conventional Commits

### NUNCA Faça

❌ Expor dados de um tenant para outro
❌ Armazenar senhas em plaintext
❌ Fazer queries sem filtrar por tenant_id
❌ Ignorar validações de documentos
❌ Commits direto em main
❌ Deploy sem testes
❌ Hardcoded credentials
❌ Ignorar LGPD e compliance

## Segurança e Compliance

### LGPD (Obrigatório)
- Consentimento explícito para compartilhamento
- Direito ao esquecimento (30 dias)
- Portabilidade de dados
- Logs de auditoria
- Criptografia AES-256-GCM

### CFM 2.314/2022 (Telemedicina)
- Identificação digital segura
- Consentimento informado
- Assinatura digital de documentos
- Registro de teleconsultas

### SBIS (Certificação PEP)
- Integridade: Hash criptográfico
- Autenticidade: Assinatura digital
- Confidencialidade: Criptografia
- Disponibilidade: Backups
- Auditoria: Logs imutáveis

### Dados Criptografados

```typescript
// Sempre criptografar:
- allergies
- medications
- emergency_contact
- psychiatric_exam
- treatment_plan
- notes
- Arquivos PDF/vídeos
```

## Row-Level Security (RLS)

**Política Fundamental**: Tenants só acessam dados de seus pacientes OU pacientes compartilhados com consentimento.

```sql
-- Exemplo de policy
CREATE POLICY tenant_isolation ON medical_records
  USING (
    tenant_id = current_setting('app.current_tenant_id')::uuid
    OR
    patient_id IN (
      SELECT patient_id
      FROM patient_tenant_relations
      WHERE tenant_id = current_setting('app.current_tenant_id')::uuid
        AND is_active = true
        AND sharing_consent = true
    )
  );
```

## Modelo de Negócio

### Planos

| Plano | Preço/mês | Pacientes | Telemedicina |
|-------|-----------|-----------|--------------|
| Básico | R$ 197 | 50 | 10h/mês |
| Profissional | R$ 397 | 200 | 40h/mês |
| Clínica | R$ 897 | Ilimitado | Ilimitada |

### Métricas-Chave
- MRR (Monthly Recurring Revenue)
- Churn rate (meta: <5%)
- Trial to paid (meta: >40%)
- Retention rate (meta: >90%)

### Fluxo de Pagamento

```
Trial 14 dias (sem cartão)
↓
Dia 7: Email "Aproveitando?"
↓
Dia 12: Email + WhatsApp
↓
Dia 14: "Último dia!"
↓
Adicionar cartão → Subscription ativa
↓
Cobrança mensal automática (Stripe)
↓
Falha? → 3 tentativas → Suspensão → 30 dias → Exclusão
```

## Funcionalidades Principais

### Fase 1 - MVP (Em desenvolvimento)
- Autenticação e multi-tenancy
- CRUD de pacientes
- CRUD de membros familiares
- Prontuário básico (Psiquiatria + MFC)
- Genograma digital simples (estático)
- Agendamento simples
- Integração Stripe (trial + pagamento)

### Fase 2 - Pagamentos
- Webhooks Stripe completos
- Dashboard de cobrança
- Controle de limites
- Suspensão automática

### Fase 3 - Genograma Avançado
- Genograma interativo (drag & drop, zoom)
- Ecomapa digital
- Sistema de consentimentos
- IA: Identificação de padrões hereditários
- Alertas clínicos familiares

### Fase 4 - Compartilhamento + IA
- Compartilhamento entre médicos
- Portal do paciente (aprovações)
- IA: Análise de padrões
- IA: Cálculo de risco genético
- IA: Sugestões de screening

### Fase 5 - Features Premium
- Telemedicina (Daily.co)
- Prescrição digital ICP-Brasil
- WhatsApp Business API
- OCR de exames
- Escalas digitais (APGAR, HAM-D, Y-BOCS)

## Convenções de Código

### Nomenclatura

```typescript
// PascalCase
- Components: PatientCard, GenogramViewer
- Types/Interfaces: Patient, MedicalRecord
- Classes: UserService, PaymentController

// camelCase
- functions: createPatient(), calculateMRR()
- variables: patientData, subscriptionStatus
- methods: getUserById(), processPayment()

// UPPER_SNAKE_CASE
- constants: MAX_PATIENTS, DEFAULT_TRIAL_DAYS
- env vars: DATABASE_URL, STRIPE_SECRET_KEY

// kebab-case
- file names: patient-card.tsx, use-patients.ts
- URLs: /api/medical-records, /pacientes/novo
```

### Estrutura de Pastas (Monorepo)

```
essencia-saas/
├── apps/
│   ├── web/                 # Next.js - Frontend
│   ├── admin/               # Painel admin
│   └── patient-portal/      # Portal paciente
├── packages/
│   ├── database/            # Prisma schemas
│   ├── ui/                  # Componentes compartilhados
│   ├── auth/                # Autenticação
│   ├── validators/          # CPF, CNS, CRM
│   └── types/               # TypeScript types
└── services/
    ├── api/                 # NestJS Backend
    ├── payments/            # Stripe
    └── notifications/       # Email, SMS, WhatsApp
```

## Git Workflow

```bash
# Branches
main              # Produção
develop           # Staging
feature/*         # Features novas
bugfix/*          # Correções
hotfix/*          # Emergências

# Commits (Conventional Commits)
feat: adiciona genograma interativo com drag and drop
fix: corrige cálculo de MRR no dashboard admin
docs: atualiza documentação de compartilhamento de pacientes
refactor: melhora performance de queries RLS no prontuário
test: adiciona testes e2e para fluxo de pagamento
chore: atualiza dependências do Next.js para v15
```

## Comandos Úteis

### Setup

```bash
# Clone e instale
git clone <repo>
cd essencia-saas
pnpm install

# Setup database
pnpm db:push
pnpm db:seed

# Dev
pnpm dev         # Todos os apps
pnpm dev:web     # Só frontend
pnpm dev:api     # Só backend

# Build
pnpm build
pnpm test
```

### Prisma

```bash
pnpm db:push           # Sync schema
pnpm db:migrate        # Create migration
pnpm db:studio         # GUI
pnpm db:seed           # Seed data
pnpm db:generate       # Generate client
```

## Variáveis de Ambiente Essenciais

```bash
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Auth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://app.essencia.me"

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Storage
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_BUCKET_NAME="essencia-prod"

# Email
RESEND_API_KEY="re_..."

# Monitoring
SENTRY_DSN="https://..."
```

## Webhooks Stripe (Críticos)

```typescript
// Eventos obrigatórios:
'invoice.payment_succeeded'       → Ativar acesso
'invoice.payment_failed'          → Incrementar tentativas
'customer.subscription.updated'   → Sincronizar mudanças
'customer.subscription.deleted'   → Suspender acesso
'payment_method.attached'         → Atualizar método
'invoice.payment_action_required' → Notificar urgência
```

## Contexto Clínico Importante

### Medicina de Família e Comunidade

**Princípios a implementar**:
1. Atenção Centrada na Pessoa
2. Enfoque Familiar (genograma)
3. Orientação Comunitária (ecomapa)
4. Abordagem Sistêmica

**Casos de Uso**:
- Genograma identifica padrões hereditários (ex: TAB em 3 gerações)
- Sistema alerta sobre risco genético elevado
- Sugere diagnósticos diferenciais
- Considera contexto familiar no tratamento

### Genograma Digital

**Símbolos**:
- □ = Masculino
- ○ = Feminino
- ◇ = Não-binário
- ⊠ = Falecido

**Relacionamentos**:
- ═══ = Muito próximo/fusional
- ─── = Próximo
- ··· = Distante
- ╳╳╳ = Conflituoso/rompido

**Dados Capturados**:
- Diagnósticos (CID)
- Histórico psiquiátrico
- Uso de substâncias
- Eventos significativos
- Ocupação e educação

### Alertas Inteligentes

Sistema deve gerar alertas como:
- "Forte carga genética para TAB. Considerar diagnóstico diferencial?"
- "Estresse familiar significativo. Sintomas podem ter componente reativo."
- "Múltiplas condições crônicas na família. Avaliar sobrecarga de cuidador."

## Prioridades no Desenvolvimento

1. **Segurança**: Dados de saúde são críticos
2. **Compliance**: LGPD e CFM não são opcionais
3. **Performance**: Sistema deve ser rápido
4. **UX**: Médicos precisam de eficiência
5. **Testes**: Código sem teste não entra em produção

## Links Úteis

- [Documentação Completa](./PROJECT_DOCS.md)
- [Stripe Docs](https://stripe.com/docs/billing/subscriptions)
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [LGPD](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [CFM 2.314/2022](https://www.in.gov.br/en/web/dou/-/resolucao-cfm-n-2.314-de-20-de-abril-de-2022-397602852)

## Contato

**Dev**: Dr. Daniel Victor Arantes (arantesdv@me.com)
**CRM**: GO 9335 / DF 12132

---

**Versão**: 1.0.0
**Última atualização**: Outubro 2025
**Status**: 🚧 MVP em desenvolvimento (Fase 1)
