# Fase 09 — Desafios práticos

## Objetivo dos desafios

Aplicar TypeScript no CRM Comercial 360 de forma gradual e segura.

Nesta fase, o projeto deve ser migrado para TypeScript sem quebrar funcionalidades.

---

## Desafio 1 — Criar configuração TypeScript

### Objetivo

Configurar TypeScript no projeto Vite + React.

### Requisitos

- Criar `tsconfig.json`.
- Criar `tsconfig.app.json`.
- Criar `tsconfig.node.json`, se necessário.
- Garantir que `npx tsc --noEmit` consiga verificar o projeto.

---

## Desafio 2 — Criar tipos principais do CRM

### Objetivo

Criar tipos centrais do domínio.

### Arquivo esperado

```txt
src/types/crm.ts
```

### Tipos esperados

```txt
Customer
CustomerStatus
CustomerFormData
Product
Opportunity
Activity
Sale
User
```

---

## Desafio 3 — Migrar dados mockados

### Objetivo

Tipar os dados iniciais do projeto.

### Arquivo esperado

```txt
src/data/mockData.ts
```

### Requisitos

- Tipar clientes como `Customer[]`.
- Tipar produtos como `Product[]`.
- Ajustar imports nos arquivos que usam `mockData`.

---

## Desafio 4 — Migrar utils para TypeScript

### Objetivo

Tipar funções auxiliares.

### Arquivo esperado

```txt
src/utils/customerUtils.ts
```

### Funções a tipar

```txt
getActiveCustomers
filterCustomers
createCustomerPayload
validateCustomerForm
```

---

## Desafio 5 — Migrar services para TypeScript

### Objetivo

Tipar a API fake.

### Arquivo esperado

```txt
src/services/clientesFakeApi.ts
src/utils/localStorage.ts
```

### Requisitos

- Tipar parâmetros.
- Tipar retorno com `Promise<Customer[]>`.
- Evitar `any`.

---

## Desafio 6 — Migrar hooks customizados

### Objetivo

Tipar hooks da Fase 08.

### Arquivos esperados

```txt
src/hooks/useToggle.ts
src/hooks/useLocalStorage.ts
src/hooks/useCustomers.ts
src/hooks/useCustomerForm.ts
src/hooks/useCustomerFilters.ts
```

### Requisitos

- Tipar estados.
- Tipar retornos.
- Tipar eventos.
- Usar generics no `useLocalStorage`.
- Evitar `any`.

---

## Desafio 7 — Migrar componentes de CRM

### Objetivo

Tipar componentes principais.

### Arquivos esperados

```txt
src/components/crm/CardIndicador.tsx
src/components/crm/ClienteCard.tsx
src/components/crm/ClienteFilters.tsx
src/components/crm/ClienteForm.tsx
src/components/crm/ClienteModal.tsx
src/components/crm/ProdutoCard.tsx
```

### Requisitos

- Tipar props.
- Tipar funções recebidas.
- Tipar objetos recebidos.
- Evitar `any`.

---

## Desafio 8 — Migrar componentes de layout e UI

### Objetivo

Tipar layout e componentes compartilhados.

### Arquivos esperados

```txt
src/components/layout/Header.tsx
src/components/layout/MainLayout.tsx
src/components/layout/PageTitle.tsx
src/components/layout/Sidebar.tsx
src/components/ui/Card.tsx
src/components/ui/Section.tsx
```

---

## Desafio 9 — Migrar contextos e rotas

### Objetivo

Tipar autenticação e rotas privadas.

### Arquivos esperados

```txt
src/contexts/AuthContext.tsx
src/routes/PrivateRoute.tsx
```

### Requisitos

- Tipar `User`.
- Tipar retorno do `login`.
- Tipar props do provider.
- Garantir que `useAuth` não retorne contexto indefinido sem tratamento.

---

## Desafio 10 — Migrar páginas

### Objetivo

Migrar páginas principais para `.tsx`.

### Arquivos esperados

```txt
src/pages/LoginPage.tsx
src/pages/DashboardPage.tsx
src/pages/ClientesPage.tsx
src/pages/ProdutosPage.tsx
src/pages/AtividadesPage.tsx
src/pages/VendasPage.tsx
src/pages/NotFoundPage.tsx
```

---

## Desafio 11 — Migrar App e main

### Objetivo

Finalizar migração dos arquivos principais.

### Arquivos esperados

```txt
src/App.tsx
src/main.tsx
```

### Requisitos

- Atualizar imports.
- Garantir que Vite encontre o `main.tsx`.
- Garantir que o projeto rode sem erro.

---

## Desafio 12 — Rodar verificação TypeScript

### Objetivo

Garantir que o projeto compile com TypeScript.

### Comando

```bash
npx tsc --noEmit
```

### Requisitos

- Corrigir erros encontrados.
- Evitar usar `any` como atalho.
- Manter projeto rodando no navegador.

---

## Critério de conclusão dos desafios

A fase estará pronta quando:

- o projeto estiver migrado para TypeScript;
- os tipos principais estiverem criados;
- componentes principais estiverem tipados;
- hooks estiverem tipados;
- services estiverem tipados;
- utils estiverem tipadas;
- contexto de autenticação estiver tipado;
- `npx tsc --noEmit` rodar sem erro;
- `npm run dev` rodar sem erro;
- o projeto continuar funcionando visualmente.