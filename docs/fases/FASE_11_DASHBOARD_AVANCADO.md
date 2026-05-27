# Fase 11 — Dashboard avançado com painel e relatórios

## 1. Identificação da fase

**Projeto:** CRM Comercial 360  
**Fase:** Fase 11  
**Nome:** Dashboard avançado com painel e relatórios  
**Branch:** `feature/fase-11-dashboard-avancado`  
**Tag final prevista:** `v1.2.0`  
**Status:** Em preparação para implementação  

---

## 2. Objetivo da fase

Transformar o Dashboard atual em uma área estratégica de acompanhamento comercial, com visão mensal, evolução de vendas, metas, carteira de clientes, positivação, curva ABC e relatórios.

A Fase 11 deve melhorar o Dashboard sem quebrar as rotas, sem alterar profundamente outros módulos e sem iniciar ainda a migração completa para a arquitetura final por `/app`.

---

## 3. Escopo da fase

Nesta fase serão implementados:

- Abas `Painel` e `Relatórios`
- Filtro por mês
- Filtro por ano
- Gráfico `Evolução de venda`
- Indicador `Vendido no mês`
- Indicador `Objetivo do mês`
- Indicador `Necessário vender por dia útil`
- Card `Carteira de clientes`
- Card `Positivação`
- Card `Curva ABC de clientes`
- Aba `Relatórios` com categorias:
  - Vendas
  - Clientes
  - Produtos
  - Faturamento e títulos
  - Comissões
  - Outros
- Dados mockados suficientes para simular o funcionamento do painel
- Organização mínima da feature Dashboard para preparar evolução futura

---

## 4. Fora do escopo

Não faz parte desta fase:

- Cadastro completo de clientes
- Detalhe do cliente
- Tarefas dentro do cliente
- Pedidos e orçamentos
- Funis/Kanban
- Produtos profissional
- Importação de produtos
- Backend real
- Integração OMIE
- Autenticação JWT real
- Migração completa das rotas para `/app`
- Redesign premium final
- Refatoração geral do projeto inteiro

---

## 5. Estado atual encontrado no projeto

Com base na leitura real dos arquivos nesta etapa:

- Dashboard atual está em `src/pages/DashboardPage.tsx`
- Rotas estão centralizadas em `src/App.tsx`
- Layout principal está em `src/components/layout/MainLayout.tsx`
- Sidebar está em `src/components/layout/Sidebar.tsx`
- Dados mockados base estão em `src/data/mockData.ts`
- Dashboard atual ainda consome `mockData` diretamente
- Dashboard atual renderiza indicadores de clientes, produtos e total comprado
- Dashboard atual usa os componentes `ClientesStatusChart`, `ProdutosEstoqueChart` e `TotalCompradoChart`
- Clientes já está mais avançado e usa hooks/services/React Query/fake API/localStorage
- Produtos ainda usa mock direto
- Atividades e Vendas ainda são páginas simples ou placeholders
- A rota `/` renderiza o Dashboard dentro de `MainLayout`
- A rota `/login` renderiza `LoginPage`
- As rotas protegidas atuais são `/`, `/clientes`, `/produtos`, `/atividades`, `/vendas` e `*`
- A sidebar navega para Dashboard, Clientes, Produtos, Atividades e Vendas
- O layout usa `Header`, `Sidebar` e um estado de abertura da sidebar via `useToggle`
- `mockData.ts` contém arrays `clientes` e `produtos`
- Dependências importantes já existem no projeto, como Recharts, TanStack Query, Zustand, React Hook Form, Zod, Axios e TanStack Table

---

## 6. Estratégia segura de implementação

Como o projeto já existe, a implementação deve ser feita em blocos pequenos.

A Fase 11 não deve tentar refatorar o projeto inteiro. O foco será evoluir o Dashboard atual com o mínimo de risco.

Estratégia:

1. Criar estrutura isolada para a feature Dashboard.
2. Criar dados e utilitários do Dashboard sem quebrar `mockData`.
3. Criar componentes novos aos poucos.
4. Integrar os componentes na página atual de Dashboard.
5. Testar a cada bloco.
6. Validar TypeScript antes de fechar.
7. Atualizar README apenas no fechamento da fase.
8. Criar commit e tag somente no final.

---

## 7. Arquivos que provavelmente serão lidos

- `src/pages/DashboardPage.tsx`
- `src/App.tsx`
- `src/components/layout/MainLayout.tsx`
- `src/components/layout/Sidebar.tsx`
- `src/data/mockData.ts`
- `package.json`

---

## 8. Arquivos que provavelmente serão criados

A implementação poderá criar:

- `src/features/dashboard/components/DashboardTabs.tsx`
- `src/features/dashboard/components/DashboardFilters.tsx`
- `src/features/dashboard/components/SalesEvolutionChart.tsx`
- `src/features/dashboard/components/SalesMetricCard.tsx`
- `src/features/dashboard/components/CustomerPortfolioCard.tsx`
- `src/features/dashboard/components/CustomerPositivationCard.tsx`
- `src/features/dashboard/components/CustomerABCChart.tsx`
- `src/features/dashboard/components/ReportsTab.tsx`
- `src/features/dashboard/data/dashboardMockData.ts`
- `src/features/dashboard/hooks/useDashboardData.ts`
- `src/features/dashboard/services/dashboardService.ts`
- `src/features/dashboard/types/dashboard.types.ts`
- `src/features/dashboard/utils/dashboardUtils.ts`

---

## 9. Arquivos que provavelmente serão alterados

A implementação poderá alterar:

- `src/pages/DashboardPage.tsx`

Somente se necessário, poderá alterar:

- `src/App.tsx`
- `src/components/layout/Sidebar.tsx`

Atenção: alteração de rotas deve ser evitada nesta fase, salvo se for indispensável e aprovada antes.

---

## 10. Ordem de implementação planejada

### Bloco 1 — Criar estrutura da feature Dashboard

Objetivo:
Criar a estrutura de pastas e arquivos base da feature Dashboard.

Tarefas:
- Criar `src/features/dashboard`
- Criar subpastas:
  - `components`
  - `data`
  - `hooks`
  - `services`
  - `types`
  - `utils`
- Criar arquivos base vazios ou mínimos, sem integrar ainda na página

Critério:
- Projeto continua rodando
- Nenhuma tela muda visualmente ainda
- TypeScript não quebra

---

### Bloco 2 — Criar tipos, dados mockados e utilitários do Dashboard

Objetivo:
Criar a base de dados da Fase 11.

Tarefas:
- Criar tipos de:
  - venda diária
  - indicador comercial
  - carteira de clientes
  - positivação
  - curva ABC
  - relatório
- Criar dados mockados para mês/ano
- Criar funções utilitárias de:
  - formatar moeda
  - calcular vendido no mês
  - calcular necessário vender por dia útil
  - gerar dias do mês
  - calcular percentuais

Critério:
- Dados isolados em `features/dashboard`
- Nenhum impacto visual ainda
- TypeScript sem erro

---

### Bloco 3 — Criar filtros mês/ano e abas Painel/Relatórios

Objetivo:
Criar a navegação superior do Dashboard.

Tarefas:
- Criar componente `DashboardTabs`
- Criar componente `DashboardFilters`
- Permitir selecionar mês
- Permitir selecionar ano
- Alternar entre `Painel` e `Relatórios`

Critério:
- Estado de mês/ano funciona
- Aba ativa muda corretamente
- Ainda sem mexer em outros módulos

---

### Bloco 4 — Criar cards de indicadores laterais

Objetivo:
Criar os indicadores principais do Dashboard.

Tarefas:
- Criar `SalesMetricCard`
- Exibir:
  - Vendido no mês
  - Objetivo do mês
  - Necessário vender por dia útil
- Exibir estado de "Nenhuma meta definida" quando aplicável

Critério:
- Cards aparecem corretamente
- Valores formatados em moeda brasileira
- Componentes reutilizáveis

---

### Bloco 5 — Criar gráfico Evolução de venda

Objetivo:
Criar o gráfico principal do painel.

Tarefas:
- Criar `SalesEvolutionChart`
- Usar Recharts
- Exibir todos os dias do mês
- Exibir vendas acumuladas ou vendas no mês
- Exibir previsão de vendas, se os dados existirem
- Exibir tooltip legível

Critério:
- Gráfico renderiza sem erro
- Recharts funciona
- Dados aparecem corretamente

---

### Bloco 6 — Criar cards Carteira, Positivação e Curva ABC

Objetivo:
Criar os cards analíticos do Dashboard.

Tarefas:
- Criar `CustomerPortfolioCard`
- Criar `CustomerPositivationCard`
- Criar `CustomerABCChart`
- Usar gráficos de rosca/pizza com Recharts
- Exibir totais e percentuais

Critério:
- Os 3 cards aparecem
- Percentuais fazem sentido
- Layout responsivo básico

---

### Bloco 7 — Criar aba Relatórios

Objetivo:
Criar a área de relatórios do Dashboard.

Tarefas:
- Criar `ReportsTab`
- Separar relatórios por categorias:
  - Vendas
  - Clientes
  - Produtos
  - Faturamento e títulos
  - Comissões
  - Outros
- Cada item pode ser link/botão sem ação real por enquanto

Critério:
- Aba Relatórios aparece
- Categorias organizadas
- Sem navegação real obrigatória nesta fase

---

### Bloco 8 — Integrar componentes na DashboardPage

Objetivo:
Substituir ou reorganizar a Dashboard atual usando os novos componentes.

Tarefas:
- Atualizar `src/pages/DashboardPage.tsx`
- Manter compatibilidade com layout atual
- Não quebrar navegação
- Não alterar login
- Não alterar Clientes
- Não alterar Produtos
- Não alterar Atividades
- Não alterar Vendas

Critério:
- Dashboard novo aparece
- Demais páginas continuam funcionando

---

### Bloco 9 — Ajustes finais de responsividade e limpeza

Objetivo:
Melhorar organização visual e remover sobras.

Tarefas:
- Ajustar grid dos cards
- Ajustar espaçamentos
- Ajustar visual básico
- Remover imports não usados
- Conferir console do navegador
- Conferir TypeScript

Critério:
- Dashboard visualmente organizado
- Sem erro no console
- Sem erro de TypeScript

---

### Bloco 10 — Testar, documentar e versionar

Objetivo:
Fechar a Fase 11.

Tarefas:
- Rodar `npm run dev`
- Testar Dashboard no navegador
- Testar troca de abas
- Testar filtro mês/ano
- Rodar `npx tsc --noEmit`
- Atualizar README
- Criar commit
- Criar tag `v1.2.0`

Critério:
- Fase concluída
- README atualizado
- Commit criado
- Tag criada

---

## 11. Checklist técnico da Fase 11

### Preparação

- [ ] Branch `feature/fase-11-dashboard-avancado` criada
- [ ] Git limpo antes da implementação
- [ ] Documento da fase criado
- [ ] Estado atual do Dashboard analisado

### Implementação

- [ ] Bloco 1 — Estrutura da feature Dashboard criada
- [ ] Bloco 2 — Tipos, dados mockados e utils criados
- [ ] Bloco 3 — Filtros mês/ano e abas criados
- [ ] Bloco 4 — Cards de indicadores criados
- [ ] Bloco 5 — Gráfico Evolução de venda criado
- [ ] Bloco 6 — Cards Carteira, Positivação e Curva ABC criados
- [ ] Bloco 7 — Aba Relatórios criada
- [ ] Bloco 8 — DashboardPage integrada
- [ ] Bloco 9 — Responsividade e limpeza realizadas
- [ ] Bloco 10 — Testes e versionamento realizados

### Validação

- [ ] Dashboard abre sem erro
- [ ] Aba Painel funciona
- [ ] Aba Relatórios funciona
- [ ] Filtro de mês funciona
- [ ] Filtro de ano funciona
- [ ] Gráfico renderiza corretamente
- [ ] Indicadores renderizam corretamente
- [ ] Cards analíticos renderizam corretamente
- [ ] Demais páginas continuam funcionando
- [ ] `npm run dev` funciona
- [ ] `npx tsc --noEmit` passa sem erro

### Fechamento

- [ ] README atualizado
- [ ] Commit criado
- [ ] Tag `v1.2.0` criada
- [ ] Branch enviada para o GitHub
- [ ] Tag enviada para o GitHub

---

## 12. Critérios de conclusão da fase

A Fase 11 só será considerada concluída quando:

- O Dashboard avançado estiver funcionando
- O painel tiver abas `Painel` e `Relatórios`
- Os filtros de mês e ano funcionarem
- O gráfico de evolução de venda estiver renderizando
- Os indicadores principais estiverem corretos
- Os cards de carteira, positivação e curva ABC estiverem visíveis
- A aba Relatórios estiver estruturada
- Nenhum outro módulo tiver sido quebrado
- O projeto rodar sem erro
- `npx tsc --noEmit` passar sem erro
- README estiver atualizado
- Commit da fase estiver criado
- Tag `v1.2.0` estiver criada

---

## 13. Comandos de validação

Durante a fase:

```bash
npm run dev
```

Antes do fechamento:

```bash
npx tsc --noEmit
npm run build
git status --short --branch
```

---

## 14. Decisão visual temporária

Durante a validação visual da Fase 11, foi identificado que alguns botões do Dashboard ainda recebem influência de estilos globais antigos do projeto.

A equipe decidiu não alterar o CSS global nesta fase para evitar impactos em outras telas já existentes, como Clientes, Produtos, Atividades, Vendas, Header, Sidebar, formulários e botões antigos.

A correção visual definitiva ficará planejada para a Fase 18 — Design moderno e futurista, quando será feita a padronização visual completa do sistema.

Para a Fase 11, o critério de aceite visual é:

- Dashboard renderizando corretamente
- Abas Painel e Relatórios funcionando
- Filtros mês/ano funcionando
- Gráfico renderizando
- Cards de indicadores renderizando
- Cards analíticos renderizando
- Aba Relatórios renderizando
- Sem erro de TypeScript
- Sem erro de inicialização no Vite
