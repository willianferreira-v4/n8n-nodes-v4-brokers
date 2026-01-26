# n8n Custom Node

### Objetivo

Node customizado para n8n que simplifica a integração com a API de leilão de leads da V4 Company 

### Autenticação (Credencial)

Campos armazenados na credencial:

- `x-client-id`
- `x-client-secret`
- `categoryId`, `segmentId`, `campaignId`, `createdBy` (IDs fixos para criação)
- `tenantBrandId` (para re-leilão)

### Operações

| Operação | Método | Endpoint | Inputs Dinâmicos |
| --- | --- | --- | --- |
| **Criar Lead** | POST | `/auctionable-product` | `externalId`, `value`, `fields[]` |
| **Atualizar Lead** | PUT | `/auctionable-product` | `externalId`, `fields[]` (fieldId + value) |
| **Re-leiloar** | POST | `/auctionable-product/relist` | `externalId`, `initialValue?` (opcional) |

### Comportamento Esperado

- IDs fixos (category, segment, campaign, etc.) vêm da credencial, não precisam ser informados no node
- Campo `initialValue` no re-leilão só é enviado se preenchido
- `fields[]` aceita input dinâmico (JSON ou expressão n8n)

### Stack

- TypeScript
- n8n Node SDK
