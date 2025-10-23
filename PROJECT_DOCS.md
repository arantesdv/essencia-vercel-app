# Essência.me - Sistema SaaS Multi-Tenant para Medicina Integrada

> **Versão**: 2.0.0
> **Autor**: Dr. Daniel Victor Arantes (Psiquiatra + Médico de Família e Comunidade)
> **Data**: Outubro 2025
> **Domínio**: essencia.me

---

## 🏥 Abordagem de Medicina de Família e Comunidade

### Princípios da MFC Integrados ao Sistema

**1. Atenção Centrada na Pessoa**
- Prontuário individualizado que considera história biopsicossocial
- Registro de contexto familiar, ocupacional e comunitário
- Plano de cuidado longitudinal

**2. Enfoque Familiar**
- Genograma digital interativo (3+ gerações)
- Ecomapa de redes de apoio
- Ciclo de vida familiar
- APGAR familiar e dinâmicas relacionais

**3. Orientação Comunitária**
- Registro de determinantes sociais de saúde
- Mapeamento de território (quando aplicável)
- Recursos comunitários disponíveis
- Vulnerabilidades sociais

**4. Abordagem Sistêmica**
- Visão holística da saúde
- Interação entre problemas clínicos e contexto
- Padrões transgeracionais de doença
- Fatores protetores e de risco familiares

### Integração Psiquiatria + MFC

**Casos de Uso Clínicos:**

```
Exemplo 1: Depressão com Contexto Familiar
┌─────────────────────────────────────────────────────┐
│ Paciente: Maria, 28a, depressão recorrente         │
│                                                     │
│ Genograma revela:                                  │
│ - Pai: Transtorno Bipolar I                       │
│ - Avó paterna: Depressão grave + suicídio         │
│ - Tio paterno: TAB II                             │
│                                                     │
│ Sistema alerta:                                    │
│ ⚠️ "Forte carga genética para TAB. Considerar     │
│    diagnóstico diferencial: Depressão Bipolar?"   │
│                                                     │
│ Ações sugeridas:                                   │
│ - Investigar episódios de hipomania               │
│ - Screening com MDQ (Mood Disorder Questionnaire) │
│ - Considerar estabilizador de humor               │
└─────────────────────────────────────────────────────┘

Exemplo 2: Criança com TDAH + Contexto Familiar
┌─────────────────────────────────────────────────────┐
│ Paciente: João, 8a, suspeita TDAH                 │
│                                                     │
│ Genograma + Ecomapa revelam:                      │
│ - Pai: TDAH diagnosticado na infância             │
│ - Mãe: Ansiosa, sobrecarregada (trabalha 2 empregos)│
│ - Pais separados há 1 ano                         │
│ - Suporte social limitado                         │
│ - Escola: professora relatando comportamento      │
│                                                     │
│ Sistema contextualiza:                             │
│ 💡 "Sintomas podem ter componente genético (pai   │
│    TDAH) + fator ambiental (estresse familiar     │
│    pós-separação + mãe sobrecarregada)"          │
│                                                     │
│ Abordagem integrada:                               │
│ - Avaliação TDAH (genética presente)              │
│ - Suporte familiar (terapia familiar?)            │
│ - Rede de apoio (avós, escola, comunidade)       │
│ - Tratamento multimodal                           │
└─────────────────────────────────────────────────────┘

Exemplo 3: Diabetes + Depressão + Contexto Social
┌─────────────────────────────────────────────────────┐
│ Paciente: Carlos, 55a, DM2 descompensado + tristeza│
│                                                     │
│ Contexto familiar/social:                          │
│ - Esposa: DM2 + nefropatia em hemodiálise         │
│ - Filho: usuário de álcool (conflito familiar)    │
│ - Desempregado há 6 meses                         │
│ - Isolamento social                               │
│                                                     │
│ Sistema identifica:                                │
│ 🔍 "Depressão + DM descompensado. Fatores:        │
│    - Sobrecarga de cuidador (esposa)              │
│    - Estresse familiar (filho)                    │
│    - Perda de papel social (desemprego)           │
│    - Múltiplas condições crônicas na família"     │
│                                                     │
│ Plano de cuidado integrado:                       │
│ - Tratar depressão                                │
│ - Otimizar controle glicêmico                     │
│ - Suporte psicossocial (assistência social)       │
│ - Grupo de apoio (cuidadores + diabetes)          │
│ - Abordagem familiar (incluir filho)              │
└─────────────────────────────────────────────────────┘
```

---

## 🌳 Sistema de Relacionamentos Familiares

### Genograma Digital - Estrutura

**Símbolos e Representações:**

```
Símbolos do Genograma (padrão internacional):
□ = Masculino    ○ = Feminino    ◇ = Gênero não-binário
⊠ = Falecido     ? = Desconhecido

Relacionamentos:
━━━━  = Casados/União estável
┈┈┈┈  = Relacionamento (não casados)
╱╲    = Separados/Divorciados
┃     = Descendência (filho/filha)

Qualidade do Relacionamento:
════  = Muito próximo/fusional
────  = Próximo
····  = Distante
╳╳╳╳  = Conflituoso/rompido
```

**Exemplo de Genograma de 3 Gerações:**

```
                    Avô paterno (†)      Avó paterna
                    TAB I, suicídio      Depressão
                          ⊠                  ○
                           \                /
                            \              /
                             ╲            ╱
                              Pai (56a)
                              TAB II
                                 □
                                 ║
                    ═════════════╬═════════════
                    ║                         ║
                    ║                         ║
                 Paciente                   Irmã
                 Maria (28a)              Ana (25a)
              Depressão recorrente      Sem diagnóstico
                    ○                        ○
                    ║
                    ║ (casada há 3a)
                    ║
                 Esposo
               Pedro (30a)
            Ansiedade generalizada
                    □
```

### Dados Capturados no Genograma

```typescript
interface FamilyMemberNode {
  id: string;
  patient_id?: string;  // Se for paciente cadastrado

  // Dados demográficos
  name: string;
  birth_date: Date;
  death_date?: Date;
  gender: 'M' | 'F' | 'NB' | 'U';  // Unknown

  // Dados clínicos
  diagnoses: {
    condition: string;      // Ex: "Transtorno Bipolar I"
    icd_code?: string;      // CID-11
    onset_age?: number;
    status: 'active' | 'remission' | 'historical';
  }[];

  chronic_conditions: string[];
  psychiatric_history: string[];
  substance_use: {
    type: string;
    severity: 'mild' | 'moderate' | 'severe';
    status: 'current' | 'past';
  }[];

  // Eventos significativos
  significant_events: {
    event: string;
    date: Date;
    impact: 'protective' | 'risk_factor';
  }[];

  // Ocupação e educação
  occupation?: string;
  education_level?: string;

  // Observações
  notes?: string;
}

interface FamilyRelationship {
  id: string;
  from_member_id: string;
  to_member_id: string;

  // Tipo de relação
  relationship_type: RelationshipType;

  // Qualidade da relação
  quality: 'very_close' | 'close' | 'normal' | 'distant' | 'conflictual' | 'cutoff';

  // Status
  status: 'current' | 'separated' | 'divorced' | 'widowed';

  // Datas
  start_date?: Date;
  end_date?: Date;

  // Observações
  notes?: string;
}

enum RelationshipType {
  // Conjugal
  MARRIED = 'married',
  DOMESTIC_PARTNERSHIP = 'domestic_partnership',
  DATING = 'dating',

  // Parental
  PARENT_CHILD = 'parent_child',

  // Fraternal
  SIBLING = 'sibling',
  TWIN = 'twin',
  HALF_SIBLING = 'half_sibling',

  // Avós/netos
  GRANDPARENT_GRANDCHILD = 'grandparent_grandchild',

  // Outros
  AUNT_UNCLE_NIECE_NEPHEW = 'aunt_uncle_niece_nephew',
  COUSIN = 'cousin',
  STEPPARENT_STEPCHILD = 'stepparent_stepchild',
  GUARDIAN = 'guardian',
}

interface Genogram {
  id: string;
  patient_id: string;  // Paciente índice
  tenant_id: string;

  // Membros da família
  family_members: FamilyMemberNode[];

  // Relacionamentos
  relationships: FamilyRelationship[];

  // Análise
  identified_patterns: {
    pattern_type: 'hereditary_condition' | 'substance_abuse' | 'trauma' | 'resilience_factor';
    description: string;
    affected_members: string[];
    generations_affected: number;
    risk_level: 'low' | 'moderate' | 'high';
  }[];

  created_at: DateTime;
  updated_at: DateTime;
}
```

### Ecomapa Digital - Estrutura

**O Ecomapa complementa o genograma mapeando recursos externos:**

```typescript
interface Ecomap {
  id: string;
  patient_id: string;
  family_unit_id?: string;  // Pode ser da unidade familiar
  tenant_id: string;

  // Núcleo familiar
  family_unit: {
    member_ids: string[];
    household_type: 'nuclear' | 'extended' | 'single_parent' | 'other';
  };

  // Conexões externas
  external_connections: {
    id: string;
    type: ConnectionType;
    name: string;
    strength: 'strong' | 'moderate' | 'weak';
    flow: 'resources_received' | 'resources_given' | 'reciprocal' | 'stressful';
    description?: string;
  }[];

  created_at: DateTime;
  updated_at: DateTime;
}

enum ConnectionType {
  // Saúde
  HEALTHCARE_PROVIDER = 'healthcare',
  MENTAL_HEALTH_SERVICE = 'mental_health',
  SUBSTANCE_ABUSE_PROGRAM = 'substance_abuse_program',

  // Social
  EXTENDED_FAMILY = 'extended_family',
  FRIENDS = 'friends',
  NEIGHBORS = 'neighbors',
  RELIGIOUS_COMMUNITY = 'religious',
  SUPPORT_GROUP = 'support_group',

  // Educação
  SCHOOL = 'school',
  DAYCARE = 'daycare',

  // Trabalho
  WORKPLACE = 'workplace',

  // Serviços sociais
  SOCIAL_SERVICES = 'social_services',
  LEGAL_SERVICES = 'legal',
  HOUSING_ASSISTANCE = 'housing',

  // Lazer
  SPORTS_RECREATION = 'sports',
  HOBBY_GROUP = 'hobby',

  // Outros
  OTHER = 'other',
}
```

### Visualização Interativa

**Features da Interface do Genograma:**

```typescript
interface GenogramVisualization {
  // Interatividade
  features: {
    zoom_in_out: boolean;
    pan: boolean;
    click_to_details: boolean;
    hover_for_summary: boolean;
    drag_to_rearrange: boolean;
  };

  // Filtros
  filters: {
    show_deceased: boolean;
    show_only_psychiatric: boolean;
    show_only_chronic_conditions: boolean;
    generation_range: [number, number];  // Ex: [0, 2] = 3 gerações
  };

  // Destaque visual
  highlighting: {
    color_by_condition: boolean;         // Cores diferentes por diagnóstico
    size_by_importance: boolean;         // Tamanho do nó = relevância clínica
    animate_patterns: boolean;           // Animar padrões identificados
  };

  // Análise automática
  ai_analysis: {
    identify_hereditary_patterns: boolean;
    suggest_screening: boolean;
    calculate_genetic_risk: boolean;
  };
}
```

**Exemplo de Interface:**

```
┌─────────────────────────────────────────────────────────────┐
│ Genograma - Paciente: Maria Silva                          │
│ [🔍 Zoom] [↔️ Pan] [🎨 Destacar] [📊 Análise]            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│        Avô(†) ━━ Avó              Avô ━━ Avó               │
│         TAB I     Depressão        HAS    DM2              │
│          ⊠         ○                □      ○               │
│           \       /                  \    /                │
│            \     /                    \  /                 │
│             \   /                      \/                  │
│          Pai(56a) ━━━━━━━━━━━━━━━ Mãe(54a)               │
│           TAB II                    Ansiosa                │
│             □                          ○                   │
│              \                        /                    │
│               \                      /                     │
│                \                    /                      │
│              Maria(28a) ════ Pedro(30a)                   │
│              Depressão      TAG                           │
│                  ○            □                           │
│                                                             │
│ ⚠️ ANÁLISE AUTOMÁTICA:                                    │
│ • Padrão hereditário identificado: Transtornos do Humor    │
│ • 3 gerações afetadas (avó, pai, paciente)                │
│ • Risco genético: ALTO para Transtorno Bipolar            │
│                                                             │
│ 💡 SUGESTÕES:                                              │
│ • Considerar diagnóstico diferencial: TAB vs Depressão     │
│ • Aplicar MDQ (Mood Disorder Questionnaire)               │
│ • Investigar episódios hipomaníacos                        │
│ • Considerar estabilizador humor se confirmar TAB          │
│                                                             │
│ [📋 Ver detalhes] [🧬 Análise genética] [💾 Salvar]      │
└─────────────────────────────────────────────────────────────┘
```

### Análise Contextual Familiar com IA

```typescript
interface FamilyContextAnalysis {
  patient_id: string;
  genogram_id: string;

  // Padrões identificados
  hereditary_patterns: {
    condition: string;
    affected_members: string[];
    inheritance_pattern: 'autosomal_dominant' | 'autosomal_recessive' | 'multifactorial' | 'unknown';
    generations_affected: number;
    risk_assessment: {
      patient_risk_level: 'low' | 'moderate' | 'high';
      offspring_risk_percentage?: number;
    };
  }[];

  // Fatores de risco
  family_risk_factors: {
    type: 'psychiatric' | 'substance_abuse' | 'trauma' | 'chronic_disease' | 'social';
    description: string;
    severity: 'mild' | 'moderate' | 'severe';
    impact_on_patient: string;
  }[];

  // Fatores protetores
  protective_factors: {
    type: 'resilience' | 'support_system' | 'resources' | 'coping_skills';
    description: string;
    strength: 'weak' | 'moderate' | 'strong';
  }[];

  // Dinâmicas familiares
  family_dynamics: {
    cohesion_level: 'disengaged' | 'separated' | 'connected' | 'enmeshed';
    flexibility_level: 'rigid' | 'structured' | 'flexible' | 'chaotic';
    communication_pattern: 'open' | 'filtered' | 'closed';
    conflict_resolution: 'constructive' | 'avoidant' | 'destructive';
  };

  // Ciclo de vida familiar
  family_life_cycle: {
    current_stage: 'young_couple' | 'family_with_young_children' | 'family_with_adolescents' | 'launching_children' | 'empty_nest' | 'aging_family';
    developmental_tasks: string[];
    challenges: string[];
  };

  // Recomendações clínicas
  clinical_recommendations: {
    screening_needed: {
      condition: string;
      reason: string;
      urgency: 'routine' | 'soon' | 'urgent';
    }[];

    family_interventions: {
      type: 'family_therapy' | 'psychoeducation' | 'support_group' | 'couples_therapy';
      rationale: string;
      priority: 'low' | 'medium' | 'high';
    }[];

    preventive_measures: {
      target_members: string[];
      intervention: string;
      rationale: string;
    }[];
  };

  generated_at: DateTime;
  reviewed_by_clinician: boolean;
  clinician_notes?: string;
}
```

### Alertas Clínicos Baseados em Contexto Familiar

```typescript
interface FamilyContextAlert {
  id: string;
  patient_id: string;
  alert_type: AlertType;
  severity: 'info' | 'warning' | 'critical';

  title: string;
  message: string;

  // Dados de suporte
  supporting_evidence: {
    family_member_id: string;
    member_name: string;
    relevant_condition: string;
    relationship_to_patient: string;
  }[];

  // Ações sugeridas
  suggested_actions: {
    action: string;
    rationale: string;
  }[];

  // Status
  acknowledged: boolean;
  acknowledged_at?: DateTime;
  dismissed: boolean;

  created_at: DateTime;
}

enum AlertType {
  GENETIC_RISK = 'genetic_risk',
  FAMILY_PATTERN = 'family_pattern',
  DEVELOPMENTAL_CONCERN = 'developmental_concern',
  ENVIRONMENTAL_STRESS = 'environmental_stress',
  SUPPORT_OPPORTUNITY = 'support_opportunity',
}
```

**Exemplos de Alertas:**

```
┌─────────────────────────────────────────────────────────┐
│ ⚠️ ALERTA: Risco Genético Elevado                      │
│                                                         │
│ Paciente: Maria Silva, 28a                             │
│                                                         │
│ Histórico familiar identificado:                        │
│ • Avó paterna: Depressão grave + suicídio              │
│ • Pai: Transtorno Bipolar Tipo I                       │
│ • Tio paterno: Transtorno Bipolar Tipo II              │
│                                                         │
│ Apresentação atual do paciente:                         │
│ • Depressão recorrente                                  │
│ • Início precoce (adolescência)                        │
│ • Resposta parcial a antidepressivos                    │
│                                                         │
│ 💡 CONSIDERAR:                                          │
│ 1. Diagnóstico diferencial: Depressão Bipolar          │
│ 2. Aplicar MDQ (Mood Disorder Questionnaire)           │
│ 3. Investigar cuidadosamente episódios de hipomania    │
│ 4. Cautela com antidepressivos isolados (risco virada) │
│                                                         │
│ [✓ Reconhecer] [📋 Adicionar ao plano] [✕ Dispensar]  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 🔔 ALERTA: Estresse Familiar Significativo             │
│                                                         │
│ Paciente: João, 8a (possível TDAH)                     │
│                                                         │
│ Contexto familiar atual:                                │
│ • Pais separados há 6 meses                            │
│ • Mãe: sobrecarga (2 empregos + cuidado exclusivo)    │
│ • Pai: TDAH, visitas irregulares                       │
│ • Suporte familiar limitado                            │
│                                                         │
│ Impacto potencial:                                      │
│ • Sintomas podem ser exacerbados por estresse familiar  │
│ • Comportamentos podem ter componente reativo           │
│                                                         │
│ 💡 CONSIDERAR:                                          │
│ 1. Avaliação completa TDAH (fator genético presente)   │
│ 2. Suporte psicológico para mãe                        │
│ 3. Terapia familiar (incluir pai se possível)          │
│ 4. Acionar rede de apoio (avós, escola)               │
│ 5. Abordagem multimodal (não apenas medicamentosa)     │
│                                                         │
│ [✓ Reconhecer] [📋 Criar plano familiar] [✕ Dispensar]│
└─────────────────────────────────────────────────────────┘
```

### Compartilhamento de Dados Familiares

**Cenários de Compartilhamento:**

```typescript
interface FamilyDataSharing {
  // Cenário 1: Membros da mesma família atendidos pelo mesmo médico
  same_physician: {
    sharing_mode: 'automatic_with_consent';
    requires_individual_consent: true;
    can_see_genogram: true;
    can_see_other_member_details: 'summary_only';  // Nunca detalhes completos sem consentimento
  };

  // Cenário 2: Membros atendidos por médicos diferentes
  different_physicians: {
    sharing_mode: 'explicit_request';
    requires_consent_from: ['patient', 'family_member'];
    mediated_by_patient: true;
  };

  // Cenário 3: Menor de idade com pais/responsáveis
  minor_with_guardians: {
    guardians_access: 'full';  // Até maioridade ou emancipação
    age_based_privacy: {
      under_12: 'parents_full_access',
      age_12_to_18: 'shared_access_with_privacy_zones',  // Adolescente pode ter áreas privadas
      over_18: 'adult_privacy_rules',
    };
  };
}

interface FamilyMemberConsent {
  id: string;
  patient_id: string;
  family_member_id: string;

  // Tipo de consentimento
  consent_type: 'genogram_inclusion' | 'data_sharing' | 'family_session';

  // Escopo do consentimento
  scope: {
    include_in_genogram: boolean;
    share_diagnoses: boolean;
    share_medications: boolean;
    share_appointments: boolean;
    allow_family_sessions: boolean;
  };

  // Status
  status: 'pending' | 'granted' | 'denied' | 'revoked';
  granted_at?: DateTime;
  revoked_at?: DateTime;

  // Documento
  consent_document_url?: string;
  signed_digitally: boolean;

  created_at: DateTime;
}
```

---

## 📋 Índice

1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Abordagem de Medicina de Família e Comunidade](#abordagem-de-medicina-de-família-e-comunidade)
3. [Sistema de Relacionamentos Familiares](#sistema-de-relacionamentos-familiares)
4. [Arquitetura do Sistema](#arquitetura-do-sistema)
5. [Modelo de Negócio](#modelo-de-negócio)
6. [Stack Tecnológica](#stack-tecnológica)
7. [Estrutura de Dados](#estrutura-de-dados)
8. [Sistema de Pagamentos](#sistema-de-pagamentos)
9. [Compartilhamento de Pacientes](#compartilhamento-de-pacientes)
10. [Segurança e Compliance](#segurança-e-compliance)
11. [Funcionalidades Core](#funcionalidades-core)
12. [Roadmap de Desenvolvimento](#roadmap-de-desenvolvimento)
13. [Comandos e Convenções](#comandos-e-convenções)

---

## 🎯 Visão Geral do Projeto

### Objetivo
Desenvolver uma plataforma SaaS multi-tenant para **médicos de família, psiquiatras e profissionais de saúde mental** com abordagem sistêmica que permita:
- Gestão completa de pacientes e prontuário eletrônico
- **Mapeamento de relacionamentos familiares e comunitários (genograma digital)**
- **Análise contextual familiar para diagnóstico diferencial**
- Agendamento presencial e telemedicina
- Prescrição digital assinada
- Compartilhamento seguro de dados entre profissionais e familiares (com consentimento)
- Monetização através de assinaturas mensais recorrentes

### Diferenciais Únicos
1. **Abordagem Sistêmica Integrada**: Primeira plataforma que une Psiquiatria + Medicina de Família com visão holística da família
2. **Genograma Digital Inteligente**: Visualização interativa de relacionamentos familiares com dados clínicos integrados
3. **Análise Contextual Familiar**: IA identifica padrões hereditários, dinâmicas familiares e fatores de risco
4. **Multi-tenant com compartilhamento inteligente**: Pacientes podem ser atendidos por múltiplos médicos com dados compartilhados mediante consentimento
5. **Compliance total**: LGPD, CFM 2.314/2022, SBIS, rastreabilidade de prescrições controladas
6. **Modelo SaaS escalável**: Arquitetura preparada para crescimento nacional

### Público-Alvo Ampliado
- **Médicos de Família e Comunidade** (principal)
- Psiquiatras em consultório particular
- Psiquiatras da infância e adolescência
- **Médicos com abordagem sistêmica/centrada na família**
- Clínicas de atenção primária
- Equipes de Estratégia Saúde da Família (ESF)

---

## 🏗️ Arquitetura do Sistema

### Padrão Arquitetural
**Multi-tenant com schema compartilhado + Row-Level Security (RLS)**

### Estrutura de Domínios
```
essencia.me                  → Landing page + marketing
app.essencia.me              → Aplicação principal (tenants)
api.essencia.me              → Backend API
admin.essencia.me            → Painel administrativo (Daniel)
paciente.essencia.me         → Portal do paciente

# Subdomínios por médico (white-label)
drdaniel.essencia.me         → Portal personalizado Dr. Daniel
drjoao.essencia.me           → Portal personalizado Dr. João
[username].essencia.me       → Padrão para todos os tenants
```

### Componentes Principais

```
┌─────────────────────────────────────────────────────────────┐
│                        CloudFlare CDN                        │
│                    (DDoS Protection + SSL)                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
   ┌────▼─────┐                         ┌────▼─────┐
   │  Vercel  │                         │ Railway  │
   │ Next.js  │◄────────API Calls──────►│  NestJS  │
   │ Frontend │                         │  Backend │
   └──────────┘                         └────┬─────┘
                                             │
                    ┌────────────────────────┼────────────────┐
                    │                        │                │
              ┌─────▼──────┐         ┌──────▼──────┐   ┌─────▼─────┐
              │ PostgreSQL │         │   Stripe    │   │    S3     │
              │  (Supabase)│         │  Payments   │   │  Storage  │
              │    + RLS   │         └─────────────┘   └───────────┘
              └────────────┘
```

### Fluxo de Dados Multi-Tenant

```typescript
Request → Middleware (Detecta Tenant) → Set Context → RLS → Response
                ↓
      tenant_id extraído do subdomínio
                ↓
      Todas as queries filtradas automaticamente
```

---

## 💰 Modelo de Negócio

### Planos de Assinatura

| Plano | Preço Mensal | Preço Anual | Pacientes | Telemedicina | Recursos |
|-------|-------------|-------------|-----------|--------------|----------|
| **Básico** | R$ 197 | R$ 1.891,20 (20% off) | 50 | 10h/mês | Prontuário, Agendamento |
| **Profissional** | R$ 397 | R$ 3.811,20 (20% off) | 200 | 40h/mês | + Prescrição Digital, WhatsApp, Relatórios |
| **Clínica** | R$ 897 | R$ 8.596,80 (20% off) | Ilimitado | Ilimitada | + Múltiplos profissionais, API, White-label |

### Projeção Financeira

**Break-even**: 20 médicos pagantes (~R$ 4.000 MRR)

**Meta Ano 1** (conservadora):
- Mês 1-3: 10 médicos (trial + early adopters) = R$ 2.000 MRR
- Mês 4-6: 30 médicos = R$ 6.000 MRR
- Mês 7-9: 60 médicos = R$ 12.000 MRR
- Mês 10-12: 100 médicos = R$ 20.000 MRR

**Meta Ano 2**: 500 médicos = R$ 100.000 MRR = R$ 1.200.000 ARR

### Métricas-Chave (KPIs)

```typescript
interface SaaSMetrics {
  // Receita
  mrr: number;                    // Monthly Recurring Revenue
  arr: number;                    // Annual Recurring Revenue
  arpu: number;                   // Average Revenue Per User
  ltv: number;                    // Lifetime Value

  // Aquisição
  new_signups: number;            // Novos cadastros
  trial_to_paid_rate: number;     // Taxa de conversão (meta: >40%)
  cac: number;                    // Customer Acquisition Cost

  // Retenção
  churn_rate: number;             // Taxa de cancelamento (meta: <5%)
  revenue_churn: number;          // Perda de receita
  retention_rate: number;         // Taxa de retenção (meta: >90%)

  // Engajamento
  dau: number;                    // Daily Active Users
  mau: number;                    // Monthly Active Users
  avg_sessions_per_user: number;
  feature_adoption: {             // Adoção de features
    telemedicine: number;
    digital_prescription: number;
    patient_sharing: number;
  };
}
```

---

## 🛠️ Stack Tecnológica

### Frontend
```yaml
Framework: Next.js 14+ (App Router)
Linguagem: TypeScript 5+
Styling: Tailwind CSS 3.4+
Componentes: shadcn/ui
State Management: Zustand
Data Fetching: TanStack Query (React Query)
Forms: React Hook Form + Zod
Charts: Recharts
Rich Text: Tiptap ou Lexical
```

### Backend
```yaml
Framework: NestJS (Node.js) ou FastAPI (Python)
Linguagem: TypeScript ou Python 3.11+
ORM: Prisma (Node) ou SQLAlchemy (Python)
Validação: class-validator (NestJS) ou Pydantic (FastAPI)
Auth: Supabase Auth ou Auth0
API Docs: Swagger/OpenAPI
```

### Banco de Dados
```yaml
Principal: PostgreSQL 15+ (Supabase)
Segurança: Row-Level Security (RLS) nativo
Cache: Redis (Upstash)
Search: PostgreSQL Full-Text Search
```

### Infraestrutura
```yaml
Frontend Hosting: Vercel
Backend Hosting: Railway ou Fly.io
Database: Supabase ou Railway PostgreSQL
File Storage: AWS S3 ou Cloudflare R2
CDN: CloudFlare
Monitoring: Sentry (errors) + PostHog (analytics)
Logs: Better Stack ou Axiom
```

### Pagamentos & Comunicação
```yaml
Pagamentos: Stripe (principal) + Asaas (backup)
Email: Resend ou SendGrid
SMS: Twilio
WhatsApp: WhatsApp Business API (oficial)
Video: Daily.co ou Whereby
```

### DevOps
```yaml
Version Control: Git + GitHub
CI/CD: GitHub Actions
Containerization: Docker
Environment: Docker Compose (local)
Secrets: Doppler ou Infisical
```

---

## 📊 Estrutura de Dados

### Schema Prisma (Simplificado)

```prisma
// ============================================
// MULTI-TENANCY
// ============================================

model Tenant {
  id                    String    @id @default(uuid())

  // Dados do profissional
  professional_name     String
  email                 String    @unique
  phone                 String
  crm_number            String
  crm_state             String
  specialties           String[]
  cpf_cnpj              String    @unique

  // Configurações
  clinic_name           String?
  subdomain             String    @unique  // drdaniel
  custom_domain         String?   @unique  // clinica.com.br
  logo_url              String?
  primary_color         String?   @default("#3B82F6")

  // Subscription
  subscription_tier     SubscriptionTier
  subscription_status   SubscriptionStatus
  stripe_customer_id    String?   @unique

  // Timestamps
  created_at            DateTime  @default(now())
  updated_at            DateTime  @updatedAt

  // Relações
  subscriptions         Subscription[]
  patients              PatientTenantRelation[]
  medical_records       MedicalRecord[]
  appointments          Appointment[]
}

enum SubscriptionTier {
  BASICO
  PROFISSIONAL
  CLINICA
}

enum SubscriptionStatus {
  TRIAL
  ACTIVE
  PAST_DUE
  SUSPENDED
  CANCELLED
}

// ============================================
// PAGAMENTOS
// ============================================

model Subscription {
  id                      String    @id @default(uuid())
  tenant_id               String
  tenant                  Tenant    @relation(fields: [tenant_id], references: [id])

  // Stripe
  stripe_subscription_id  String?   @unique
  stripe_customer_id      String?

  // Plano
  plan                    SubscriptionTier
  status                  SubscriptionStatus
  billing_cycle           BillingCycle

  // Valores
  amount                  Int       // Em centavos
  currency                String    @default("BRL")

  // Datas
  trial_start             DateTime?
  trial_end               DateTime?
  current_period_start    DateTime
  current_period_end      DateTime
  next_billing_date       DateTime
  cancelled_at            DateTime?

  // Limites
  max_patients            Int
  max_telehealth_hours    Int
  max_storage_gb          Int

  // Uso atual
  active_patients         Int       @default(0)
  telehealth_hours_used   Int       @default(0)
  storage_used_gb         Float     @default(0)

  // Controle de inadimplência
  payment_attempts        Int       @default(0)
  last_payment_attempt    DateTime?
  grace_period_ends       DateTime?

  created_at              DateTime  @default(now())
  updated_at              DateTime  @updatedAt
}

enum BillingCycle {
  MONTHLY
  YEARLY
}

// ============================================
// PACIENTES
// ============================================

model Patient {
  id              String    @id @default(uuid())

  // Dados pessoais
  cpf             String    @unique
  name            String
  email           String?
  phone           String
  birth_date      DateTime
  gender          Gender

  // Endereço
  address_line    String?
  city            String?
  state           String?
  zip_code        String?

  // CNS (Cartão Nacional de Saúde)
  cns             String?   @unique

  // Dados clínicos (criptografados)
  allergies_encrypted       String?
  medications_encrypted     String?
  conditions_encrypted      String?
  emergency_contact_encrypted String?

  // Timestamps
  created_at      DateTime  @default(now())
  updated_at      DateTime  @updatedAt

  // Relações
  tenant_relations PatientTenantRelation[]
  medical_records  MedicalRecord[]
  appointments     Appointment[]
}

enum Gender {
  MASCULINO
  FEMININO
  NAO_BINARIO
  NAO_INFORMADO
}

// ============================================
// RELACIONAMENTO PACIENTE-MÉDICO
// ============================================

model PatientTenantRelation {
  id                    String    @id @default(uuid())

  patient_id            String
  patient               Patient   @relation(fields: [patient_id], references: [id])

  tenant_id             String
  tenant                Tenant    @relation(fields: [tenant_id], references: [id])

  // Tipo de relação
  relationship_type     RelationType

  // Compartilhamento
  sharing_consent       Boolean   @default(false)
  sharing_consent_date  DateTime?
  consent_document_id   String?   // ID do documento de consentimento assinado
  shared_by_tenant_id   String?   // Quem compartilhou
  access_level          AccessLevel

  // Status
  is_active             Boolean   @default(true)

  created_at            DateTime  @default(now())
  updated_at            DateTime  @updatedAt

  @@unique([patient_id, tenant_id])
  @@index([tenant_id])
  @@index([patient_id])
}

enum RelationType {
  OWNER        // Médico que cadastrou o paciente
  SHARED_READ  // Acesso apenas leitura
  SHARED_WRITE // Acesso leitura + escrita
}

enum AccessLevel {
  FULL       // Acesso completo ao histórico
  SUMMARY    // Apenas resumos e informações essenciais
  RESTRICTED // Acesso muito limitado
}

// ============================================
// PRONTUÁRIO MÉDICO
// ============================================

model MedicalRecord {
  id                  String    @id @default(uuid())

  patient_id          String
  patient             Patient   @relation(fields: [patient_id], references: [id])

  tenant_id           String
  tenant              Tenant    @relation(fields: [tenant_id], references: [id])

  // Dados da consulta
  consultation_date   DateTime
  record_type         RecordType

  // Conteúdo (criptografado em produção)
  chief_complaint     String?   // Queixa principal
  history_present_illness String? // HDA
  psychiatric_exam    Json?     // Exame psíquico estruturado
  diagnosis_cid       String[]  // CID-11
  treatment_plan      String?
  prescriptions       Json[]    // Array de prescrições
  notes               String?

  // Compartilhamento
  visibility          Visibility
  shared_with_tenants String[]  // Array de tenant_ids autorizados

  // Assinatura digital
  signed              Boolean   @default(false)
  signed_at           DateTime?
  signature_hash      String?

  created_at          DateTime  @default(now())
  updated_at          DateTime  @updatedAt

  @@index([patient_id])
  @@index([tenant_id])
  @@index([consultation_date])
}

enum RecordType {
  CONSULTATION      // Consulta
  PSYCHIATRIC_EVAL  // Avaliação psiquiátrica
  THERAPY_SESSION   // Sessão de terapia
  PRESCRIPTION      // Prescrição
  EXAM              // Exame
  NOTE              // Anotação
  REFERRAL          // Encaminhamento
}

enum Visibility {
  PRIVATE  // Apenas o médico que criou
  SHARED   // Compartilhado com consentimento
  PUBLIC   // Visível para todos que atendem o paciente
}

// ============================================
// AGENDAMENTO
// ============================================

model Appointment {
  id              String    @id @default(uuid())

  patient_id      String
  patient         Patient   @relation(fields: [patient_id], references: [id])

  tenant_id       String
  tenant          Tenant    @relation(fields: [tenant_id], references: [id])

  // Data e hora
  start_time      DateTime
  end_time        DateTime
  duration        Int       // Em minutos

  // Tipo
  type            AppointmentType
  modality        AppointmentModality

  // Status
  status          AppointmentStatus

  // Telemedicina
  video_room_url  String?
  video_recording_url String?

  // Notas
  notes           String?

  // Confirmação
  confirmed       Boolean   @default(false)
  confirmed_at    DateTime?
  reminder_sent   Boolean   @default(false)

  created_at      DateTime  @default(now())
  updated_at      DateTime  @updatedAt

  @@index([tenant_id, start_time])
  @@index([patient_id])
}

enum AppointmentType {
  FIRST_CONSULTATION    // Primeira consulta
  RETURN               // Retorno
  FOLLOW_UP            // Acompanhamento
  EMERGENCY            // Emergência
}

enum AppointmentModality {
  IN_PERSON    // Presencial
  TELEMEDICINE // Telemedicina
}

enum AppointmentStatus {
  SCHEDULED    // Agendado
  CONFIRMED    // Confirmado
  IN_PROGRESS  // Em andamento
  COMPLETED    // Realizado
  CANCELLED    // Cancelado
  NO_SHOW      // Falta
}

// ============================================
// EXAMES E RESULTADOS
// ============================================

model ExamResult {
  id              String    @id @default(uuid())

  patient_id      String
  tenant_id       String

  // Dados do exame
  exam_name       String
  exam_type       ExamType
  provider        String?   // Laboratório/clínica

  // Datas
  exam_date       DateTime
  collection_date DateTime?
  received_date   DateTime?

  // Resultados (em Markdown)
  results_markdown String

  // Arquivos
  pdf_url         String?
  images_urls     String[]

  // Status
  status          ExamStatus
  reviewed        Boolean   @default(false)
  reviewed_by     String?
  reviewed_at     DateTime?

  created_at      DateTime  @default(now())
  updated_at      DateTime  @updatedAt

  @@index([patient_id])
  @@index([tenant_id])
}

enum ExamType {
  LABORATORY    // Laboratorial
  IMAGING       // Imagem (RX, TC, RM)
  CARDIOLOGY    // Cardiológico (ECG, Holter)
  NEUROLOGICAL  // Neurológico (EEG)
  OTHER         // Outros
}

enum ExamStatus {
  SCHEDULED     // Agendado
  COLLECTED     // Coletado
  PROCESSING    // Processando
  COMPLETED     // Concluído
  REVIEWED      // Revisado
}

// ============================================
// PRESCRIÇÕES
// ============================================

model Prescription {
  id              String    @id @default(uuid())

  patient_id      String
  tenant_id       String

  // Medicamento
  medication_name String
  dosage          String
  frequency       String
  route           Route

  // Período
  start_date      DateTime
  duration_days   Int?
  end_date        DateTime?

  // Instruções
  instructions    String?

  // Status
  is_active       Boolean   @default(true)

  // Assinatura digital
  signed          Boolean   @default(false)
  signed_at       DateTime?
  signature_hash  String?

  created_at      DateTime  @default(now())
  updated_at      DateTime  @updatedAt

  @@index([patient_id])
  @@index([tenant_id])
}

enum Route {
  OR  // Oral
  IM  // Intramuscular
  EV  // Endovenoso
  SC  // Subcutâneo
  NS  // Nasal
  OF  // Oftálmico
  OT  // Ótológico
  RE  // Retal
  VG  // Vaginal
}
```

### Row-Level Security (RLS) Policies

```sql
-- Garantir que tenants só acessem dados de seus pacientes
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

-- Pacientes só podem ver seus próprios dados
CREATE POLICY patient_own_data ON medical_records
  FOR SELECT
  USING (
    patient_id = current_setting('app.current_user_id')::uuid
    AND visibility != 'PRIVATE'
  );
```

---

## 💳 Sistema de Pagamentos

### Fluxo Completo

```
Trial 14 dias (sem cartão)
      ↓
Dia 7: Email "Você está aproveitando?"
      ↓
Dia 12: Email "Faltam 2 dias" + WhatsApp
      ↓
Dia 14 manhã: "Último dia!"
      ↓
Adicionar cartão → Criar subscription
      ↓
Cobrança mensal automática
      ↓
Falha? → 3 tentativas → Suspensão
```

### Webhooks Stripe (Críticos)

```typescript
// Eventos que DEVEM ser tratados:
'invoice.payment_succeeded'       → Ativar acesso
'invoice.payment_failed'          → Incrementar tentativas
'customer.subscription.updated'   → Sincronizar mudanças
'customer.subscription.deleted'   → Suspender acesso
'payment_method.attached'         → Atualizar método
'invoice.payment_action_required' → Notificar urgência
```

### Sistema de Suspensão

```
Pagamento falha → Tentativa 1 (email suave)
      ↓
3 dias depois → Tentativa 2 (email urgente)
      ↓
7 dias depois → Tentativa 3 → SUSPENSÃO
      ↓
Acesso bloqueado (somente leitura)
      ↓
30 dias → Agendamento de exclusão de dados
```

---

## 🔐 Segurança e Compliance

### LGPD (Lei Geral de Proteção de Dados)

✅ **Requisitos implementados:**
- Consentimento explícito para compartilhamento
- Direito de acesso aos dados
- Direito ao esquecimento (30 dias após cancelamento)
- Portabilidade de dados (exportação em JSON/PDF)
- Logs de auditoria (quem acessou o quê e quando)
- Criptografia em repouso e em trânsito
- DPO designado (Data Protection Officer)

### CFM 2.314/2022 (Telemedicina)

✅ **Requisitos implementados:**
- Identificação digital segura
- Consentimento informado do paciente
- Assinatura digital de documentos
- Registro de todas as teleconsultas
- Armazenamento seguro de gravações (quando aplicável)
- Garantia de confidencialidade

### SBIS (Sociedade Brasileira de Informática em Saúde)

✅ **Certificação de Prontuário Eletrônico:**
- Integridade: Hash criptográfico de registros
- Autenticidade: Assinatura digital ICP-Brasil
- Confidencialidade: Criptografia AES-256
- Disponibilidade: Backups automáticos
- Auditoria: Logs imutáveis

### Rastreabilidade de Prescrições Controladas

✅ **ANVISA - Sistema Nacional de Gerenciamento de Produtos Controlados:**
- Integração com SNGPC (futuro)
- Notificação de receita digital
- Numeração única de prescrições
- Assinatura digital obrigatória
- Logs de dispensação

### Criptografia

```typescript
// Dados sensíveis sempre criptografados
interface EncryptedFields {
  // Paciente
  allergies: 'AES-256-GCM',
  medications: 'AES-256-GCM',
  emergency_contact: 'AES-256-GCM',

  // Prontuário
  psychiatric_exam: 'AES-256-GCM',
  treatment_plan: 'AES-256-GCM',
  notes: 'AES-256-GCM',

  // Arquivos
  pdf_storage: 'AES-256' (S3 server-side),
  video_recordings: 'AES-256' (at rest),
}

// Chaves gerenciadas por tenant
// Rotação automática a cada 90 dias
```

---

## ⚙️ Funcionalidades Core

### 2. **Genograma e Ecomapa Digital**
- ✅ Genograma interativo de 3+ gerações
- ✅ Símbolos padronizados (McGoldrick & Gerson)
- ✅ Qualidade de relacionamentos visualizada
- ✅ Dados clínicos integrados por membro
- ✅ Ecomapa de redes de apoio e recursos
- ✅ Exportação para PDF/imagem

### 3. **Análise Contextual Familiar (IA)**
- ✅ Identificação automática de padrões hereditários
- ✅ Cálculo de risco genético
- ✅ Alertas clínicos baseados em contexto familiar
- ✅ Sugestões de screening preventivo
- ✅ Análise de dinâmicas familiares (Olson)
- ✅ Recomendações de intervenções familiares

### 4. Gestão de Pacientes
- ✅ Cadastro completo com validação CPF/CNS
- ✅ Histórico médico integrado
- ✅ Upload de documentos/exames
- ✅ Timeline de atendimentos
- ✅ Alertas de alergias/interações
- ✅ Portal do paciente (self-service)
- ✅ **Genograma e relações familiares**

### 5. Prontuário Eletrônico (Psiquiatria + MFC)
- ✅ Templates customizáveis (Psiquiatria + MFC)
- ✅ Exame psíquico estruturado
- ✅ **Abordagem SOAP para MFC**
- ✅ **Método Clínico Centrado na Pessoa (MCCP)**
- ✅ Diagnóstico com CID-11
- ✅ Escalas psiquiátricas (HAM-D, Y-BOCS, etc.)
- ✅ **APGAR familiar, FIRO, Olson**
- ✅ Assinatura digital
- ✅ Versionamento de registros
- ✅ **Registro de determinantes sociais**

### 6. Agendamento
- ✅ Calendário visual
- ✅ Slots configuráveis
- ✅ Confirmação automática (email/SMS/WhatsApp)
- ✅ Lembretes pré-consulta
- ✅ Lista de espera
- ✅ Integração com Google Calendar
- ✅ **Agendamento familiar (múltiplos pacientes)**

### 7. Telemedicina
- ✅ Salas de vídeo privadas (Daily.co/Whereby)
- ✅ Gravação automática (se consentido)
- ✅ Chat durante consulta
- ✅ Compartilhamento de tela
- ✅ Contador de horas por tenant
- ✅ **Suporte a consultas familiares (múltiplos participantes)**

### 8. Prescrição Digital
- ✅ Banco de medicamentos (Anvisa)
- ✅ Alertas de interação medicamentosa
- ✅ Assinatura digital ICP-Brasil
- ✅ Impressão ou envio digital
- ✅ Histórico de prescrições
- ✅ **Alertas de interação considerando medicações de familiares**

### 9. Compartilhamento de Pacientes e Dados Familiares
- ✅ Solicitação de acesso entre médicos
- ✅ Aprovação do paciente (obrigatória)
- ✅ Níveis de acesso configuráveis
- ✅ Revogação a qualquer momento
- ✅ Auditoria completa
- ✅ **Compartilhamento de contexto familiar**
- ✅ **Consentimento para inclusão em genograma**

### 10. Importação de Exames
- ✅ Upload de PDF laboratoriais
- ✅ OCR e extração automática
- ✅ Parsing de labs conhecidos (Fleury, Hermes Pardini, etc.)
- ✅ Formato markdown para visualização
- ✅ Gráficos de tendência
- ✅ **Comparação de exames entre familiares (com consentimento)**

### 11. Relatórios e Análises
- ✅ Dashboard de métricas clínicas
- ✅ Relatórios de faturamento
- ✅ Exportação de dados (LGPD)
- ✅ Análise de diagnósticos mais frequentes
- ✅ Taxa de ocupação da agenda
- ✅ **Análise de padrões familiares agregados**
- ✅ **Indicadores de Medicina de Família (continuidade, integralidade)**

---

## 🗓️ Roadmap de Desenvolvimento

### Fase 1: MVP (Meses 1-3)
**Objetivo**: Sistema funcional para primeiros 10 médicos beta

- [x] Planejamento e arquitetura
- [ ] Setup de infraestrutura (Vercel + Railway + Supabase)
- [ ] Autenticação e multi-tenancy
- [ ] CRUD de pacientes
- [ ] **CRUD de membros familiares e relacionamentos**
- [ ] Prontuário básico (Psiquiatria + MFC)
- [ ] **Genograma digital simples (visualização estática)**
- [ ] Agendamento simples
- [ ] Integração Stripe (trial + pagamento)
- [ ] Deploy e testes beta

**Entregas**:
- Sistema funcional com core features + genograma básico
- 10 médicos em trial usando ativamente
- Feedback coletado e priorizado

### Fase 2: Pagamentos e Escala (Mês 4)
**Objetivo**: Monetização ativa e crescimento para 30 médicos

- [ ] Sistema completo de webhooks Stripe
- [ ] Dashboard de cobrança (tenant)
- [ ] Controle de limites de uso
- [ ] Suspensão automática
- [ ] Emails transacionais
- [ ] Onboarding otimizado
- [ ] Marketing inicial (Instagram/LinkedIn)

**Entregas**:
- Primeiros pagamentos recorrentes
- MRR: R$ 6.000+
- Churn < 10%

### Fase 3: Genograma Avançado (Mês 5)
**Objetivo**: Implementar diferencial competitivo - análise familiar

- [ ] **Genograma interativo (drag & drop, zoom, pan)**
- [ ] **Ecomapa digital**
- [ ] **Sistema de consentimentos para inclusão familiar**
- [ ] **Identificação automática de padrões (IA básica)**
- [ ] **Alertas clínicos baseados em contexto familiar**
- [ ] **Exportação de genograma (PDF/PNG)**
- [ ] **Templates de genograma (TAB, Depressão, etc.)**

**Entregas**:
- Genograma como diferencial validado
- Primeiros casos clínicos beneficiados
- Feedback de médicos de família

### Fase 4: Compartilhamento e IA (Mês 6-7)
**Objetivo**: Rede de médicos + inteligência contextual

- [ ] Sistema de solicitação de compartilhamento
- [ ] Portal do paciente para aprovações
- [ ] Níveis de acesso (full/summary/restricted)
- [ ] Auditoria de acessos
- [ ] **Compartilhamento de contexto familiar entre médicos**
- [ ] **IA: Análise de padrões hereditários**
- [ ] **IA: Cálculo de risco genético**
- [ ] **IA: Sugestões de screening preventivo**

**Entregas**:
- Primeiros casos de compartilhamento ativo
- IA identificando padrões validados clinicamente
- Rede-efeito iniciando

### Fase 5: Features Premium (Meses 8-9)
**Objetivo**: Justificar planos mais caros

- [ ] Telemedicina integrada (Daily.co)
- [ ] **Consultas familiares (múltiplos participantes)**
- [ ] Prescrição digital com ICP-Brasil
- [ ] WhatsApp Business API
- [ ] Importação avançada de exames (OCR)
- [ ] **Escalas de MFC (APGAR, FIRO, Olson)**
- [ ] Escalas psiquiátricas digitais
- [ ] Relatórios avançados e BI
- [ ] **Dashboard de indicadores de MFC**

**Entregas**:
- Upsell para plano Profissional funcionando
- ARPU aumentando
- Funcionalidades "wow" que retêm usuários

### Fase 6: Clínicas e White-Label (Meses 10-11)
**Objetivo**: Entrar no segmento B2B

- [ ] Múltiplos profissionais por tenant
- [ ] Gestão de equipe
- [ ] **Gestão de famílias compartilhadas (equipe)**
- [ ] Faturamento compartilhado
- [ ] White-label (logo + domínio próprio)
- [ ] API pública para integrações
- [ ] SSO para clínicas
- [ ] **Relatórios de equipe/ESF**

**Entregas**:
- Primeiras clínicas e equipes ESF assinando
- Tickets maiores (R$ 897/mês)
- Casos de uso corporativo

### Fase 7: Expansão e IA Avançada (Mês 12)
**Objetivo**: Consolidação e inovação

- [ ] **IA: Sugestão de diagnósticos considerando contexto familiar**
- [ ] **IA: Identificação de dinâmicas familiares disfuncionais**
- [ ] IA para análise de exames
- [ ] Transcrição automática de consultas
- [ ] Chatbot de triagem
- [ ] Integração com wearables
- [ ] App mobile (React Native)
- [ ] **Integração com e-SUS (Atenção Primária)**

**Entregas**:
- 100+ médicos ativos (50% MFC, 50% Psiquiatria)
- R$ 20.000+ MRR
- Features futurísticas
- Posicionamento como líder de inovação em MFC digital

--- Premium (Meses 6-7)
**Objetivo**: Justificar planos mais caros

- [ ] Telemedicina integrada (Daily.co)
- [ ] Prescrição digital com ICP-Brasil
- [ ] WhatsApp Business API
- [ ] Importação avançada de exames (OCR)
- [ ] Escalas psiquiátricas digitais
- [ ] Relatórios avançados e BI

**Entregas**:
- Upsell para plano Profissional funcionando
- ARPU aumentando
- Funcionalidades "wow" que retêm usuários

### Fase 5: Clínicas e White-Label (Meses 8-9)
**Objetivo**: Entrar no segmento B2B

- [ ] Múltiplos profissionais por tenant
- [ ] Gestão de equipe
- [ ] Faturamento compartilhado
- [ ] White-label (logo + domínio próprio)
- [ ] API pública para integrações
- [ ] SSO para clínicas

**Entregas**:
- Primeiras clínicas assinando
- Tickets maiores (R$ 897/mês)
- Casos de uso corporativo

### Fase 6: Expansão e IA (Meses 10-12)
**Objetivo**: Consolidação e inovação

- [ ] IA para sugestão de diagnósticos
- [ ] IA para análise de exames
- [ ] Transcrição automática de consultas
- [ ] Chatbot de triagem
- [ ] Integração com wearables
- [ ] App mobile (React Native)

**Entregas**:
- 100+ médicos ativos
- R$ 20.000+ MRR
- Features futurísticas
- Posicionamento como líder de inovação

---

## 🛠️ Comandos e Convenções

### Convenções de Código

```typescript
// Nomenclatura
- PascalCase: Components, Types, Interfaces, Classes
- camelCase: functions, variables, methods
- UPPER_SNAKE_CASE: constants, env vars
- kebab-case: file names, URLs

// Estrutura de pastas (monorepo)
essencia-saas/
├── apps/
│   ├── web/                 # Next.js - Frontend principal
│   ├── admin/               # Painel admin
│   └── patient-portal/      # Portal do paciente
├── packages/
│   ├── database/            # Prisma schemas
│   ├── ui/                  # Componentes compartilhados
│   ├── auth/                # Lógica de autenticação
│   ├── validators/          # Validações (CPF, CNS, etc)
│   └── types/               # TypeScript types
└── services/
    ├── api/                 # NestJS Backend
    ├── payments/            # Stripe integration
    └── notifications/       # Email, SMS, WhatsApp
```

### Git Workflow

```bash
# Branches
main              # Produção
develop           # Staging
feature/*         # Features
bugfix/*          # Correções
hotfix/*          # Emergências

# Commits (Conventional Commits)
feat: adiciona importação de exames PDF
fix: corrige cálculo de MRR no dashboard
docs: atualiza README com novos endpoints
refactor: melhora performance de queries RLS
test: adiciona testes para compartilhamento
chore: atualiza dependências

# Pull Requests
- Título descritivo
- Descrição do que foi feito e por quê
- Screenshots (quando UI)
- Checklist de testes
- Review obrigatório antes de merge
```

### Comandos Claude Code

```bash
# Setup inicial
claude-code "Configure projeto Next.js com TypeScript, Tailwind, shadcn/ui e estrutura de pastas para monorepo Turborepo"

# Backend
claude-code "Crie API NestJS com autenticação multi-tenant, middleware de detecção de subdomínio e Prisma com PostgreSQL"

# Features específicas
claude-code "Implemente sistema completo de compartilhamento de pacientes com solicitação, aprovação e revogação. Incluir RLS policies e auditoria"

# Pagamentos
claude-code "Integre Stripe Subscriptions com webhooks para payment_succeeded, payment_failed e subscription_deleted. Incluir retry logic e suspensão automática"

# Testes
claude-code "Crie suite de testes e2e com Playwright para fluxo completo: cadastro → trial → conversão → upgrade → cancelamento"

# Deployment
claude-code "Configure CI/CD com GitHub Actions para deploy automático em Vercel (frontend) e Railway (backend) com environments staging e production"
```

### Variáveis de Ambiente

```bash
# .env.example

# Database
DATABASE_URL="postgresql://user:pass@host:5432/essencia"
DIRECT_URL="postgresql://user:pass@host:5432/essencia"

# Auth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://app.essencia.me"

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# AWS S3
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_BUCKET_NAME="essencia-prod"
AWS_REGION="us-east-1"

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="contato@essencia.me"

# SMS
TWILIO_ACCOUNT_SID="..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+5562..."

# WhatsApp
WHATSAPP_API_KEY="..."
WHATSAPP_PHONE_ID="..."

# Daily.co (Video)
DAILY_API_KEY="..."

# Monitoring
SENTRY_DSN="https://..."
POSTHOG_API_KEY="phc_..."

# App
APP_URL="https://app.essencia.me"
ADMIN_URL="https://admin.essencia.me"
API_URL="https://api.essencia.me"
```

---

## 📞 Contato e Suporte

**Desenvolvedor Principal**: Dr. Daniel Victor Arantes
**Email**: arantesdv@me.com
**CRM**: GO 9335 / DF 12132
**Clínica**: Essência Psiquiatria - Anápolis/GO

**Domínio**: essencia.me
**Repositório**: (a definir)
**Documentação**: (a definir)

---

## 📝 Notas Importantes para Claude Code

### Quando gerar código:

1. **SEMPRE use TypeScript** (nunca JavaScript puro)
2. **SEMPRE valide inputs** (Zod, class-validator)
3. **SEMPRE criptografe dados sensíveis** (prontuários, exames)
4. **SEMPRE implemente RLS** quando tocar em queries multi-tenant
5. **SEMPRE adicione logs de auditoria** para acessos a dados de pacientes
6. **SEMPRE trate erros** com try-catch e mensagens claras
7. **SEMPRE escreva testes** para lógica crítica (pagamentos, compartilhamento)

### Nunca faça:

❌ Expor dados de um tenant para outro
❌ Armazenar senhas em plaintext
❌ Fazer queries sem filtrar por tenant_id
❌ Ignorar validações de CPF/CNS/CRM
❌ Commits direto em main
❌ Deploy sem testes
❌ Hardcoded credentials

### Prioridades sempre:

1. **Segurança**: Dados de saúde são críticos
2. **Compliance**: LGPD e CFM não são opcionais
3. **Performance**: Sistema deve ser rápido
4. **UX**: Médicos precisam de eficiência
5. **Testes**: Código sem teste não entra em prod

---

## 🎓 Referências e Recursos

### Documentação Oficial
- [Stripe Subscriptions](https://stripe.com/docs/billing/subscriptions/overview)
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js 14 App Router](https://nextjs.org/docs/app)
- [NestJS Multi-tenancy](https://docs.nestjs.com/)
- [Prisma Multi-schema](https://www.prisma.io/docs/guides/database/multi-schema)

### Compliance
- [LGPD - Lei 13.709/2018](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [CFM 2.314/2022 - Telemedicina](https://www.in.gov.br/en/web/dou/-/resolucao-cfm-n-2.314-de-20-de-abril-de-2022-397602852)
- [SBIS - Certificação PEP](https://sbis.org.br/certificacao/)
- [ANVISA - SNGPC](https://www.gov.br/anvisa/pt-br/assuntos/fiscalizacao-e-monitoramento/sngpc)

### Ferramentas
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Prisma Studio](https://www.prisma.io/studio)
- [Stripe Dashboard](https://dashboard.stripe.com/)
- [Vercel Dashboard](https://vercel.com/dashboard)

---

**Versão do documento**: 1.0.0
**Última atualização**: Outubro 2025
**Status**: 🚧 Em desenvolvimento ativo

---

*Este documento deve ser mantido atualizado conforme o projeto evolui. Sempre consulte a versão mais recente antes de iniciar desenvolvimento.*
