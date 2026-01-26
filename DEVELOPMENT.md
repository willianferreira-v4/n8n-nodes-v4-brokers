# V4 Brokers Node - Documentação de Desenvolvimento

## Visão Geral

Node customizado para n8n que integra com a API do V4 Brokers, permitindo gerenciamento de leads leiloáveis.

## Arquitetura

```
nodes/V4Brokers/
├── V4Brokers.node.ts    # Classe principal do node
├── description.ts       # Metadados e configuração do node
├── properties.ts        # Definição de campos da UI
├── fields.ts            # Mapeamento de campos dinâmicos
├── operations.ts        # Implementação das operações
├── types.ts             # Interfaces TypeScript
├── errorHandler.ts      # Tratamento centralizado de erros
├── debug.ts             # Utilitários de debug e validação
└── icon-leadbroker.svg  # Ícone do node
```

## Operações

### 1. Create Lead

Cria um novo lead leiloável na plataforma.

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| External ID | string | Sim | Identificador externo único |
| Value | number | Sim | Valor inicial para leilão |
| Campos dinâmicos | string | Não | Campos configurados via credentials |

**Endpoint:** `POST /auctionable-product`

### 2. Update Lead

Atualiza campos de um lead existente.

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| External ID | string | Sim | Identificador do lead |
| Campos dinâmicos | string | Não | Apenas campos preenchidos são enviados |

**Endpoint:** `PUT /auctionable-product`

### 3. Relist Lead

Recoloca um lead para leilão.

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| External ID | string | Sim | Identificador do lead |
| Initial Value | number | Não | Novo valor inicial (0 = não enviar) |

**Endpoint:** `POST /auctionable-product/relist`

## Campos Dinâmicos

Os campos de lead são mapeados via Field IDs configurados nas credentials:

- Nome da Empresa
- Nome do Responsável
- Documento da Empresa
- Faturamento / Faturamento Real
- Canal / Segmento
- Cidade / Estado / País / ZIP Code
- E-mail / Telefone
- Cargo / Descrição
- Latitude / Longitude
- Nível de Urgência
- Data de Cadastro
- Tipo de Produto

## Convenções de Código

### Nomenclatura

- **DisplayName:** Title Case (`Nome Da Empresa`, `External ID`)
- **name (interno):** camelCase (`nomeEmpresa`, `externalId`)
- **Opções de operação:** Ordem alfabética no enum e na UI

### Estrutura de Options

```typescript
options: [
  { name: 'Create Lead', value: 'createLead', ... },
  { name: 'Relist Lead', value: 'relistLead', ... },
  { name: 'Update Lead', value: 'updateLead', ... },
]
```

### Tratamento de Erros

Erros são centralizados em `errorHandler.ts` com mensagens específicas para:

- URL inválida
- JSON malformado
- Erros de rede (ECONNREFUSED, ENOTFOUND)
- Autenticação (401, 403)
- Validação (400)
- Recurso não encontrado (404)
- Erros de servidor (5xx)

### Validação de Credentials

Antes de cada operação, `validateCredentials()` verifica:

- Base URL configurada e válida (http/https)
- Client ID e Secret presentes
- IDs obrigatórios (Category, Segment, Campaign, CreatedBy, TenantBrand)

## Desenvolvimento

### Requisitos

- Node.js 18+
- n8n instalado localmente ou via Docker

### Comandos

```bash
npm run build        # Compila TypeScript
npm run lint         # Executa linter
npm run lint:fix     # Corrige erros automáticos
npm run dev          # Modo desenvolvimento
```

### Regras do Linter

O projeto usa `n8n-node lint` com regras específicas:

1. **icon-validation:** Node e Credential devem ter ícone
2. **node-param-default-missing:** Todos os campos precisam de `default`
3. **node-filename-against-convention:** Arquivo principal deve ser `*.node.ts`
4. **no-explicit-any:** Usar tipos específicos ou `unknown`
5. **no-unused-vars:** Prefixar com `_` ou remover

### Adicionando Novos Campos

1. Adicionar em `fields.ts` no array `LEAD_FIELDS`
2. Adicionar Field ID correspondente em `V4BrokersApi.credentials.ts`
3. Manter ordem alfabética onde aplicável

### Adicionando Nova Operação

1. Adicionar valor no enum `V4BrokersOperation` em `types.ts`
2. Criar interface de request em `types.ts`
3. Adicionar option em `operationProperty` (ordem alfabética)
4. Criar properties específicas em `properties.ts`
5. Implementar função em `operations.ts`
6. Adicionar case no switch de `V4Brokers.node.ts`

## Notas Importantes

- Campos vazios não são enviados à API
- `initialValue = 0` no Relist é tratado como "não enviar"
- Headers de autenticação: `x-client-id` e `x-client-secret`
- User-Agent fixo para compatibilidade com a API
