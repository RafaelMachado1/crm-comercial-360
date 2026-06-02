# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# CRM Comercial 360

Projeto desenvolvido como parte do meu roadmap de estudos em React.

## Objetivo do projeto

Criar uma aplicação para representantes comerciais acompanharem clientes, produtos, atividades, oportunidades, pedidos, vendas e indicadores comerciais.

O projeto será desenvolvido fase por fase, unindo estudo teórico, prática guiada, documentação e versionamento com Git/GitHub.

---

## Projeto central

**CRM Comercial 360 — Sistema de Gestão Comercial para Representantes**

Este projeto foi escolhido porque conecta minha experiência real na área comercial com o estudo de React, criando uma aplicação mais próxima de um problema real de negócio.

---

## Tecnologias previstas no roadmap

- JavaScript
- React
- Vite
- TypeScript
- React Router
- Tailwind CSS
- React Hook Form
- Zod
- Axios
- TanStack Query
- Zustand
- Recharts
- Vitest
- React Testing Library

---

## Tecnologias usadas até o momento

- React
- Vite
- JavaScript
- HTML
- CSS
- Git
- GitHub

---

## Como rodar o projeto

Instale as dependências:

```bash
npm install
````
---

## Fase 01 — JavaScript moderno para React

**Status:** concluída  
**Versão:** v0.2.0

### Objetivo da fase

Revisar os recursos de JavaScript moderno que mais aparecem no desenvolvimento com React.

Antes de aprofundar em JSX, componentes, props, state, hooks, formulários e consumo de API, esta fase teve como foco fortalecer a base de JavaScript usada diariamente em aplicações React.

### O que foi estudado

- `map`
- `filter`
- `find`
- `reduce`
- destructuring
- spread operator
- rest operator
- template strings
- optional chaining
- import/export
- Promises
- async/await
- imutabilidade

### O que foi praticado

Os exercícios e desafios foram feitos dentro da pasta `estudos/`, separados do código real da aplicação React.

Foram usados dados comerciais simulados para praticar:

- listagem de clientes e produtos;
- filtro por status;
- busca por ID;
- cálculo de totais;
- atualização de objetos sem mutação direta;
- adição de novos itens em arrays;
- uso de optional chaining para dados incompletos;
- simulação de operações assíncronas com Promise;
- uso de async/await.

### Arquivos criados nesta fase

```txt
estudos/fase-01-javascript-moderno/
├── teoria.md
├── anotacoes.md
├── exercicios.js
├── desafios.js
├── checklist.md
└── comandos.md
```

---

## Fase 02 — JSX, componentes, props e children

**Status:** concluída  
**Versão:** v0.3.0

### Objetivo da fase

Construir a primeira interface componentizada do CRM Comercial 360 usando JSX, componentes reutilizáveis, props e children.

### O que foi estudado

- JSX
- Componentes funcionais
- Import/export
- Props
- Children
- Componentização inteligente
- Separação entre componente pai e componente filho

### O que foi construído

Nesta fase, a tela inicial do CRM foi reorganizada em componentes reutilizáveis.

Foram criados os seguintes componentes:

- `Header`
- `Sidebar`
- `PageTitle`
- `Card`
- `Section`
- `CardIndicador`
- `ClienteCard`
- `ProdutoCard`

### Estrutura criada

```txt
src/components/
├── crm/
│   ├── CardIndicador.jsx
│   ├── ClienteCard.jsx
│   └── ProdutoCard.jsx
├── layout/
│   ├── Header.jsx
│   ├── PageTitle.jsx
│   └── Sidebar.jsx
└── ui/
    ├── Card.jsx
    └── Section.jsx
```

---

## Fase 03 — State, eventos e renderização condicional

**Status:** concluída  
**Versão:** v0.4.0

### Objetivo da fase

Adicionar interatividade ao CRM Comercial 360 usando `useState`, eventos e renderização condicional.

Nesta fase, a tela deixou de ser apenas visual e passou a responder às ações do usuário.

### O que foi estudado

- `useState`
- Eventos no React
- `onClick`
- `onChange`
- Renderização condicional
- Operador ternário
- Operador `&&`
- Estado boolean
- Estado string
- Estado objeto
- Estado de loading
- Estado de erro
- Imutabilidade

### O que foi construído

Nesta fase, foram adicionadas interações reais ao dashboard inicial do CRM.

Funcionalidades implementadas:

- botão para abrir e fechar a sidebar;
- filtro de clientes por status;
- mensagem de lista vazia;
- marcação de cliente prioritário;
- modal simples de detalhes do cliente;
- loading simulado;
- erro simulado;
- botão para limpar erro.

### Componentes alterados ou criados

```txt
src/App.jsx
src/App.css
src/components/layout/Header.jsx
src/components/crm/ClienteCard.jsx
src/components/crm/ClienteModal.jsx
```

---

## Fase 04 — Listas, filtros e formulários controlados

**Status:** concluída  
**Versão:** v0.5.0

### Objetivo da fase

Aprofundar o trabalho com listas, filtros e formulários controlados no React.

Nesta fase, o CRM Comercial 360 evoluiu para permitir busca, filtros combinados e cadastro de novos clientes diretamente pela interface.

### O que foi estudado

- Renderização de listas
- `map`
- `filter`
- `includes`
- Combinação de filtros
- Formulários controlados
- `value`
- `onChange`
- `onSubmit`
- `event.preventDefault()`
- Estado de formulário com objeto
- Computed property
- Validação simples
- Atualização imutável de arrays

### O que foi construído

Nesta fase, foram implementadas funcionalidades importantes para aproximar o CRM de uma aplicação real.

Funcionalidades criadas:

- busca textual por nome do cliente;
- filtro por status;
- filtro por segmento;
- combinação de busca, status e segmento;
- formulário controlado para cadastrar novo cliente;
- validação de campos obrigatórios;
- mensagem de erro no formulário;
- mensagem de sucesso após cadastro;
- adição de novo cliente na lista;
- limpeza automática do formulário após cadastro;
- atualização do contador de clientes cadastrados.

### Componentes criados ou alterados

```txt
src/App.jsx
src/App.css
src/components/layout/PageTitle.jsx
src/components/crm/ClienteFilters.jsx
src/components/crm/ClienteForm.jsx
```

---

## Fase 05 — useEffect, localStorage, API fake e CRUD

**Status:** concluída  
**Versão:** v0.6.0

### Objetivo da fase

Evoluir o CRM Comercial 360 para trabalhar com efeitos colaterais, persistência local, simulação de API e operações básicas de CRUD.

Nesta fase, os dados deixaram de existir apenas em memória e passaram a ser persistidos no navegador com `localStorage`.

### O que foi estudado

- `useEffect`
- Array de dependências
- Efeito ao carregar a página
- Efeito quando um state muda
- `localStorage`
- `JSON.stringify`
- `JSON.parse`
- API fake
- Promise
- `async/await`
- CRUD
- Create
- Read
- Update
- Delete
- Imutabilidade no CRUD

### O que foi construído

Funcionalidades implementadas:

- carregamento inicial de clientes com API fake;
- persistência de clientes no `localStorage`;
- manutenção dos clientes cadastrados após atualizar a página;
- edição de cliente;
- exclusão de cliente;
- confirmação antes de excluir;
- uso do mesmo formulário para cadastro e edição;
- botão para cancelar edição;
- atualização dos filtros após cadastro, edição e exclusão;
- separação da lógica de API fake e localStorage em arquivos próprios.

### Arquivos criados ou alterados

```txt
src/App.jsx
src/App.css
src/components/layout/PageTitle.jsx
src/components/crm/ClienteCard.jsx
src/components/crm/ClienteForm.jsx
src/services/clientesFakeApi.js
src/utils/localStorage.js
```

---

## Fase 06 — React Router, páginas e layout

**Status:** concluída  
**Versão:** v0.7.0

### Objetivo da fase

Adicionar navegação entre páginas usando React Router e organizar o CRM Comercial 360 com uma estrutura de layout mais próxima de um sistema real.

Nesta fase, o projeto deixou de ser uma única tela concentrada no `App.jsx` e passou a ter páginas separadas com rotas próprias.

### O que foi estudado

- React Router
- SPA — Single Page Application
- `BrowserRouter`
- `Routes`
- `Route`
- `Link`
- `NavLink`
- Layout principal
- Páginas
- Página 404
- Separação entre layout e conteúdo

### O que foi construído

Funcionalidades e estruturas implementadas:

- instalação do `react-router-dom`;
- configuração do `BrowserRouter`;
- criação de rotas principais;
- criação de layout principal com `MainLayout`;
- navegação real pela sidebar;
- destaque visual do link ativo;
- criação da página Dashboard;
- criação da página Clientes;
- criação da página Produtos;
- criação da página Atividades;
- criação da página Vendas;
- criação da página 404;
- migração da lógica de clientes para `ClientesPage`;
- simplificação do `App.jsx`.

### Rotas criadas

```txt
/             → DashboardPage
/clientes     → ClientesPage
/produtos     → ProdutosPage
/atividades   → AtividadesPage
/vendas       → VendasPage
*             → NotFoundPage
```

---

## Fase 07 — Autenticação fake, Context API e rotas privadas

**Status:** concluída  
**Versão:** v0.8.0

### Objetivo da fase

Adicionar autenticação simulada ao CRM Comercial 360 usando Context API, React Router e rotas privadas.

Nesta fase, o sistema passou a ter uma página de login, usuário autenticado, persistência de sessão no navegador e proteção das páginas internas.

### O que foi estudado

- Autenticação fake
- Context API
- `createContext`
- `useContext`
- Provider
- Hook customizado
- Login
- Logout
- Persistência no `localStorage`
- Rotas privadas
- `Navigate`
- `Outlet`
- Redirecionamento
- Proteção de páginas

### O que foi construído

Funcionalidades implementadas:

- página de login;
- formulário controlado de login;
- autenticação fake com e-mail e senha fixos;
- contexto global de autenticação;
- hook `useAuth`;
- persistência do usuário logado no `localStorage`;
- logout;
- exibição do usuário logado no Header;
- proteção das rotas internas;
- redirecionamento de usuário não logado para `/login`;
- redirecionamento de usuário logado ao tentar acessar `/login`.

### Credenciais de estudo

```txt
E-mail: admin@crm.com
Senha: 123456
```

---

## Fase 08 — Hooks customizados e organização profissional

**Status:** concluída  
**Versão:** v0.9.0

### Objetivo da fase

Refatorar o CRM Comercial 360 para ficar mais parecido com código de mercado, reaproveitando lógicas e separando responsabilidades.

Nesta fase, o foco não foi criar uma nova tela visual, mas melhorar a organização interna do projeto, reduzindo lógica concentrada em páginas grandes e criando hooks customizados reutilizáveis.

### O que foi estudado

- `useRef`
- `useMemo`
- `useCallback`
- Hooks customizados
- Quando otimizar e quando não otimizar
- Organização de pastas
- Services
- Utils
- Contexts
- Hooks
- Separação de responsabilidades
- Refatoração segura sem quebrar funcionalidades

### O que foi construído

Funcionalidades e estruturas implementadas:

- criação da pasta `src/hooks`;
- criação do hook `useToggle`;
- criação do hook `useLocalStorage`;
- criação do hook `useCustomers`;
- criação do hook `useCustomerForm`;
- criação do hook `useCustomerFilters`;
- criação do arquivo `customerUtils.js`;
- uso de `useToggle` no layout principal;
- uso de `useLocalStorage` para persistir filtros;
- uso de `useMemo` nos filtros de clientes;
- movimentação de regras de clientes para utils;
- redução de lógica concentrada em `ClientesPage`;
- manutenção do CRUD de clientes funcionando;
- manutenção dos filtros funcionando;
- manutenção da autenticação e rotas privadas funcionando.

### Arquivos criados ou alterados

```txt
src/hooks/useToggle.js
src/hooks/useLocalStorage.js
src/hooks/useCustomers.js
src/hooks/useCustomerForm.js
src/hooks/useCustomerFilters.js
src/utils/customerUtils.js
src/components/layout/MainLayout.jsx
src/pages/ClientesPage.jsx
src/contexts/AuthContext.jsx
```

### Hooks criados

```txt
useToggle
useLocalStorage
useCustomers
useCustomerForm
useCustomerFilters
```

### Utils criadas

```txt
getActiveCustomers
filterCustomers
createCustomerPayload
validateCustomerForm
```

### O que foi praticado

- Separação entre lógica e interface.
- Criação de hooks customizados com responsabilidade clara.
- Uso real de `useLocalStorage` para persistir filtros.
- Uso de `useMemo` para memorizar clientes filtrados.
- Extração de regras puras para `utils`.
- Manutenção das chamadas de API fake em `services`.
- Redução da complexidade da página `ClientesPage`.
- Refatoração sem alterar negativamente o comportamento visual do sistema.

### Principais aprendizados

Nesta fase, entendi melhor como organizar um projeto React para ficar mais próximo de um código de mercado.

Aprendi que páginas não devem concentrar toda a regra de negócio, e que hooks customizados ajudam a separar lógica reutilizável da interface.

Também pratiquei a diferença entre `components`, `pages`, `hooks`, `services`, `utils`, `contexts` e `routes`.

A Fase 08 mostrou que refatorar não significa mudar a aparência do sistema, mas melhorar a estrutura interna mantendo as funcionalidades funcionando.

### Critério de conclusão

A Fase 08 foi considerada concluída porque:

- `useLocalStorage` foi criado;
- `useCustomers` foi criado;
- `useToggle` foi criado;
- `useCustomerForm` foi criado;
- `useCustomerFilters` foi criado;
- cálculos e validações foram movidos para utils;
- chamadas continuam organizadas em services;
- `ClientesPage` ficou mais limpa;
- filtros persistem após recarregar a página;
- CRUD continua funcionando;
- modal e prioridade continuam funcionando;
- login/logout continuam funcionando;
- rotas privadas continuam funcionando;
- o projeto roda no navegador sem erro.


---

## Fase 09 — Migração para React com TypeScript

**Status:** concluída  
**Versão:** v1.0.0

### Objetivo da fase

Transformar o CRM Comercial 360 em uma versão profissional com TypeScript, reduzindo erros, melhorando a manutenção do código e preparando o projeto para padrões mais próximos do mercado.

Nesta fase, o projeto deixou de usar JavaScript/JSX dentro da pasta `src` e passou a utilizar TypeScript/TSX nos arquivos principais da aplicação.

### O que foi estudado

- TypeScript no React
- Props tipadas
- Tipos e interfaces
- Estado tipado
- Eventos tipados
- Formulário tipado
- Resposta de API tipada
- Generics básicos
- Uso consciente de tipos
- Como evitar uso desnecessário de `any`

### O que foi construído

Funcionalidades e estruturas implementadas:

- instalação do TypeScript no projeto;
- instalação dos tipos do React e React DOM;
- criação dos arquivos de configuração do TypeScript;
- criação dos tipos principais do CRM;
- migração dos dados mockados para TypeScript;
- migração das utils para TypeScript;
- migração dos services para TypeScript;
- migração dos hooks customizados para TypeScript;
- migração dos componentes para TSX;
- migração das páginas para TSX;
- migração do `App` e `main` para TSX;
- criação do arquivo `vite-env.d.ts`;
- correção de tipagens em props, eventos, formulários, hooks, services e contexto.

### Tipos principais criados

```txt
Customer
CustomerStatus
CustomerFormData
Product
User
Opportunity
OpportunityStatus
Activity
ActivityType
Sale
SaleStatus
```

### Arquivos de configuração criados

```txt
tsconfig.json
tsconfig.app.json
tsconfig.node.json
src/vite-env.d.ts
```

### Arquivos principais migrados

```txt
src/main.tsx
src/App.tsx
src/data/mockData.ts
src/types/crm.ts
src/utils/customerUtils.ts
src/utils/localStorage.ts
src/services/clientesFakeApi.ts
src/hooks/useToggle.ts
src/hooks/useLocalStorage.ts
src/hooks/useCustomers.ts
src/hooks/useCustomerForm.ts
src/hooks/useCustomerFilters.ts
src/contexts/AuthContext.tsx
src/routes/PrivateRoute.tsx
```

### Componentes migrados

```txt
CardIndicador.tsx
ClienteCard.tsx
ClienteFilters.tsx
ClienteForm.tsx
ClienteModal.tsx
ProdutoCard.tsx
Header.tsx
MainLayout.tsx
PageTitle.tsx
Sidebar.tsx
Card.tsx
Section.tsx
```

### Páginas migradas

```txt
LoginPage.tsx
DashboardPage.tsx
ClientesPage.tsx
ProdutosPage.tsx
AtividadesPage.tsx
VendasPage.tsx
NotFoundPage.tsx
```

### O que foi praticado

- Criação de tipos para entidades do domínio.
- Tipagem de props em componentes.
- Tipagem de eventos de input, select e formulário.
- Tipagem de estado com `useState`.
- Tipagem de hooks customizados.
- Uso de generics no `useLocalStorage`.
- Tipagem de services com retorno `Promise`.
- Tipagem do contexto de autenticação.
- Correção dos imports após migração para `.ts` e `.tsx`.
- Verificação do projeto com `npx tsc --noEmit`.

### Principais aprendizados

Nesta fase, entendi como TypeScript melhora a segurança e a clareza de um projeto React.

A criação de tipos como `Customer`, `Product` e `User` tornou o código mais previsível, ajudando a evitar erros comuns na passagem de props, manipulação de estado e chamadas de funções.

Também aprendi que TypeScript não altera o visual da aplicação, mas melhora a estrutura interna, a manutenção e a comunicação do código.

Essa fase deixou o CRM Comercial 360 mais preparado para evoluir com bibliotecas profissionais, integração futura com backend e apresentação em entrevistas técnicas.

### Critério de conclusão

A Fase 09 foi considerada concluída porque:

- TypeScript foi instalado;
- os arquivos de configuração foram criados;
- os tipos principais do CRM foram criados;
- os arquivos da pasta `src` foram migrados para `.ts` e `.tsx`;
- componentes principais estão tipados;
- hooks customizados estão tipados;
- services estão tipados;
- utils estão tipadas;
- contexto de autenticação está tipado;
- o projeto roda no navegador sem erro;
- o comando `npx tsc --noEmit` roda sem erro;
- a estrutura está pronta para a próxima fase.

---

## Fase 10 — Bibliotecas de mercado e experiência profissional

**Status:** concluída  
**Versão:** v1.1.0

### Objetivo da fase

Adicionar ferramentas muito usadas no mercado para formulários, validação, requisições, cache, estado global, gráficos, tabelas, datas e feedback visual.

Nesta fase, o CRM Comercial 360 evoluiu de uma aplicação React organizada para uma aplicação com bibliotecas reais do ecossistema profissional React.

### Bibliotecas aplicadas

- React Hook Form
- Zod
- @hookform/resolvers
- Sonner
- Axios
- TanStack Query
- Zustand
- Recharts
- TanStack Table
- date-fns

### Bibliotecas avaliadas para fases futuras

- Tailwind CSS
- Shadcn/UI

Tailwind CSS e Shadcn/UI foram avaliados, mas a decisão técnica foi deixar a aplicação visual dessas ferramentas para a Fase 12, que será focada exclusivamente em design moderno e futurista.

### O que foi construído

Funcionalidades e melhorias implementadas:

- formulário de clientes refatorado com React Hook Form;
- validação de cliente com Zod;
- mensagens de erro por campo;
- validação em tempo real com `mode: "onChange"`;
- feedback visual com toast usando Sonner;
- camada profissional de API com Axios;
- arquivo `api.ts` criado;
- service `customerService.ts` criado;
- arquivo `.env.example` criado com `VITE_API_URL`;
- TanStack Query configurado com `QueryClientProvider`;
- hook `useCustomers` refatorado com `useQuery` e `useMutation`;
- cache de clientes atualizado após cadastro, edição e exclusão;
- Zustand aplicado nos filtros de clientes;
- persistência dos filtros com Zustand;
- botão para limpar filtros;
- dashboard com gráficos usando Recharts;
- gráfico de clientes por status;
- gráfico de estoque por produto;
- gráfico de total comprado por cliente;
- tabela profissional de clientes com TanStack Table;
- ordenação por colunas;
- ações na tabela: ver, priorizar, editar e excluir;
- cards de clientes removidos para evitar duplicidade visual;
- datas adicionadas ao tipo `Customer`;
- campos `dataCadastro` e `ultimaInteracao`;
- formatação de datas com date-fns;
- utilitário `dateUtils.ts` criado;
- CSS ajustado para tabela, gráficos, status, prioridade e responsividade.

### Arquivos e estruturas criadas

```txt
src/schemas/customerSchema.ts
src/services/api.ts
src/services/customerService.ts
src/lib/queryClient.ts
src/stores/customerFiltersStore.ts
src/components/charts/ClientesStatusChart.tsx
src/components/charts/ProdutosEstoqueChart.tsx
src/components/charts/TotalCompradoChart.tsx
src/components/crm/ClienteTable.tsx
src/utils/dateUtils.ts
.env.example
```

### Principais melhorias técnicas

- Formulários mais profissionais.
- Validação centralizada em schema.
- Menos lógica manual no formulário.
- Feedback visual moderno com toast.
- Camada de services mais próxima de um projeto real.
- Preparação inicial para futura API real.
- Cache e mutations com TanStack Query.
- Estado global com Zustand.
- Dashboard mais visual com gráficos.
- Tabela profissional com ordenação.
- Datas formatadas em padrão brasileiro.
- Código mantendo TypeScript sem erros.

### Decisão sobre Tailwind CSS e Shadcn/UI

Tailwind CSS e Shadcn/UI não foram instalados nesta fase.

A decisão foi manter o CSS próprio nesta etapa para evitar uma migração visual grande durante uma fase focada em bibliotecas funcionais.

Essas tecnologias poderão ser aplicadas ou avaliadas com mais profundidade na Fase 12 — Design moderno e futurista, onde o objetivo será transformar a experiência visual da landing page e do CRM.

### Critério de conclusão

A Fase 10 foi considerada concluída porque:

- as bibliotecas aplicadas resolvem problemas reais do projeto;
- o formulário possui validação clara;
- o feedback visual foi melhorado;
- a camada de API está mais organizada;
- TanStack Query controla busca, cache e mutations;
- Zustand controla filtros globais com persistência;
- o dashboard possui gráficos úteis;
- a página de clientes possui tabela profissional;
- datas são tratadas com date-fns;
- o projeto roda no navegador sem erro;
- `npx tsc --noEmit` roda sem erro;
- a estrutura está pronta para a próxima fase.


---

## Fase 11 — Dashboard avançado com painel e relatórios

A Fase 11 evoluiu o Dashboard do CRM Comercial 360 para uma visão comercial mais estratégica, com indicadores, filtros, gráficos e relatórios.

### Funcionalidades implementadas

- Abas `Painel` e `Relatórios`
- Filtro por mês
- Filtro por ano
- Gráfico de evolução de venda
- Indicador `Vendido no mês`
- Indicador `Objetivo do mês`
- Indicador `Necessário vender por dia útil`
- Card `Carteira de clientes`
- Card `Positivação`
- Card `Curva ABC de clientes`
- Aba `Relatórios` organizada por categorias
- Dados mockados específicos para o Dashboard
- Estrutura inicial da feature `dashboard` em `src/features/dashboard`
- Configuração do Tailwind CSS no projeto

### Arquitetura adicionada

A Fase 11 iniciou a organização por features para o módulo Dashboard.

Estrutura adicionada:

src/features/dashboard/
├── components/
├── data/
├── hooks/
├── services/
├── types/
└── utils/

### Arquivos principais criados

- `src/features/dashboard/types/dashboard.types.ts`
- `src/features/dashboard/data/dashboardMockData.ts`
- `src/features/dashboard/utils/dashboardUtils.ts`
- `src/features/dashboard/services/dashboardService.ts`
- `src/features/dashboard/hooks/useDashboardData.ts`
- `src/features/dashboard/components/DashboardTabs.tsx`
- `src/features/dashboard/components/DashboardFilters.tsx`
- `src/features/dashboard/components/SalesMetricCard.tsx`
- `src/features/dashboard/components/SalesEvolutionChart.tsx`
- `src/features/dashboard/components/CustomerPortfolioCard.tsx`
- `src/features/dashboard/components/CustomerPositivationCard.tsx`
- `src/features/dashboard/components/CustomerABCChart.tsx`
- `src/features/dashboard/components/ReportsTab.tsx`

### Arquivos principais alterados

- `src/pages/DashboardPage.tsx`
- `src/index.css`
- `vite.config.js`
- `package.json`
- `package-lock.json`

### Configuração visual

O Tailwind CSS foi instalado e configurado para servir como base visual do projeto a partir desta fase.

Dependências adicionadas:

- `tailwindcss`
- `@tailwindcss/vite`

### Observação visual

Durante a validação da Fase 11, foi identificado que alguns botões ainda sofrem influência de estilos globais antigos do projeto.

A correção visual definitiva do CSS global foi planejada para a Fase 18 — Design moderno e futurista, evitando impacto em outras telas nesta fase.

### Status da Fase 11

- Dashboard funcional
- Abas funcionando
- Filtros funcionando
- Gráfico renderizando
- Cards de indicadores renderizando
- Cards analíticos renderizando
- Aba Relatórios renderizando
- Tailwind CSS configurado
- TypeScript validado com `npx tsc --noEmit`
- Vite iniciando sem erro
- Ajustes visuais globais planejados para fase futura

### Versionamento previsto

Branch da fase:

`feature/fase-11-dashboard-avancado`

Tag prevista ao concluir:

`v1.2.0`

Mensagem de commit prevista:

`feat: add advanced dashboard with sales indicators and reports`

Mensagem da tag prevista:

`Versão 1.2.0 - dashboard avançado com painel e relatórios`

---

## Fase 12 — Clientes profissional

A Fase 12 evoluiu a página Clientes do CRM Comercial 360 para uma área profissional de gestão de carteira, com lista visual mais completa, busca, filtros, drawer de cadastro/edição e persistência dos dados profissionais no localStorage via fake API.

### Funcionalidades implementadas

- Lista profissional de clientes em cards
- Busca por nome, razão social, CNPJ/CPF, e-mail, cidade, estado e segmento
- Filtros por cidade
- Filtro por estado
- Filtro por segmento
- Filtro por status
- Botão `+ Cadastrar cliente`
- Drawer de cadastro de cliente
- Drawer de edição de cliente
- Seção `Dados principais`
- Seção `Endereço principal`
- Seção `Contatos`
- Adição e remoção de contatos
- Card lateral `Carteira de clientes`
- Botão `Alterar` por cliente
- Nome do cliente clicável, preparando detalhe futuro
- Cadastro real com persistência
- Edição real com persistência
- Compatibilidade com clientes antigos no localStorage
- Adaptação entre modelo legado `Customer` e modelo profissional `ProfessionalCustomer`

### Arquitetura adicionada

A Fase 12 iniciou a organização da feature `customers`:

src/features/customers/
├── components/
├── data/
├── schemas/
├── types/
└── utils/

### Arquivos principais criados

- `src/features/customers/types/customer.types.ts`
- `src/features/customers/schemas/customerSchema.ts`
- `src/features/customers/utils/customerUtils.ts`
- `src/features/customers/utils/customerAdapters.ts`
- `src/features/customers/data/customerOptions.ts`
- `src/features/customers/components/CustomerList.tsx`
- `src/features/customers/components/CustomerListItem.tsx`
- `src/features/customers/components/CustomerSearchBar.tsx`
- `src/features/customers/components/CustomerPortfolioSidebar.tsx`
- `src/features/customers/components/CustomerFormDrawer.tsx`
- `src/features/customers/components/CustomerFormContent.tsx`
- `src/features/customers/components/CustomerMainDataSection.tsx`
- `src/features/customers/components/CustomerAddressSection.tsx`
- `src/features/customers/components/CustomerContactsSection.tsx`

### Arquivos principais alterados

- `src/pages/ClientesPage.tsx`
- `src/types/crm.ts`
- `src/schemas/customerSchema.ts`

### Decisão técnica

Para preservar compatibilidade com os clientes antigos já existentes no localStorage, a Fase 12 manteve o tipo global `Customer` com os campos antigos obrigatórios e adicionou os campos profissionais como opcionais.

Com isso, o sistema passa a suportar os novos dados profissionais sem quebrar o fluxo anterior de mockData, fake API, React Query e localStorage.

### Status da Fase 12

- Página Clientes funcional
- Lista profissional funcionando
- Busca e filtros funcionando
- Drawer de cadastro funcionando
- Drawer de edição funcionando
- Cadastro real funcionando
- Edição real funcionando
- Dados persistindo no localStorage
- TypeScript validado com `npx tsc --noEmit`
- Vite iniciando sem erro

### Versionamento previsto

Branch da fase:

`feature/fase-12-clientes-profissional`

Tag prevista ao concluir:

`v1.3.0`

Mensagem de commit prevista:

`feat: improve customer management experience`

Mensagem da tag prevista:

`Versão 1.3.0 - clientes profissional com busca carteira e gestão`


---

## Fase 13 — Detalhe profissional do cliente

A Fase 13 evoluiu o módulo de Clientes do CRM Comercial 360 com uma página de detalhe profissional do cliente, transformando o cadastro em uma central inicial de gestão e relacionamento.

A partir da lista de clientes, o usuário agora acessa o detalhe por meio do botão `Ver detalhes`, visualiza os dados completos do cliente e pode editar as informações diretamente dentro da página de detalhe.

### Funcionalidades implementadas

- Rota `/clientes/:clienteId`
- Página `CustomerDetailPage`
- Botão `Ver detalhes` na lista de clientes
- Nome do cliente removido como ação clicável
- Cabeçalho profissional do cliente
- Card de dados principais
- Card de endereço principal
- Card de contatos
- Seções placeholder para evolução futura:
  - Tarefas agendadas
  - Oportunidades abertas
  - Pedidos e atividades
  - Histórico comercial
- Estado de carregamento
- Estado de erro
- Estado de cliente não encontrado
- Botão `Voltar` para retornar à lista de clientes
- Botão `Alterar` dentro do detalhe
- Drawer de edição dentro da página de detalhe
- Edição real com persistência no localStorage
- Compatibilidade com clientes antigos e clientes profissionais criados na Fase 12

### Decisão de UX

A Fase 13 consolidou a seguinte decisão de experiência do usuário:

- A lista de clientes funciona como visão rápida da carteira.
- O botão `Ver detalhes` é a entrada oficial para a página do cliente.
- O nome do cliente na lista permanece como destaque visual, sem ação de clique.
- A página de detalhe passa a ser a central de gestão e edição do cliente.
- O botão `Alterar` fica concentrado dentro do detalhe.

Fluxo final:

`/clientes` → `Ver detalhes` → `/clientes/:clienteId` → `Alterar`

### Arquitetura adicionada

A Fase 13 adicionou a base visual e funcional do detalhe do cliente dentro da feature `customers`.

### Arquivos principais criados

- `src/pages/CustomerDetailPage.tsx`
- `src/features/customers/components/CustomerDetailHeader.tsx`
- `src/features/customers/components/CustomerDetailMainDataCard.tsx`
- `src/features/customers/components/CustomerDetailAddressCard.tsx`
- `src/features/customers/components/CustomerDetailContactsCard.tsx`
- `src/features/customers/components/CustomerDetailPlaceholderSection.tsx`
- `docs/fases/FASE_13_DETALHE_CLIENTE.md`

### Arquivos principais alterados

- `src/App.tsx`
- `src/pages/ClientesPage.tsx`
- `src/features/customers/components/CustomerListItem.tsx`
- `README.md`

### Status da Fase 13

- Navegação para o detalhe funcionando
- Página de detalhe funcionando
- Edição pelo detalhe funcionando
- Persistência validada no localStorage
- Cliente inexistente tratado
- TypeScript validado com `npx tsc --noEmit`
- Vite iniciando sem erro
- Validação manual concluída

### Versionamento previsto

Branch da fase:

`feature/fase-13-detalhe-cliente`

Tag prevista ao concluir:

`v1.4.0`

Mensagem de commit prevista:

`feat: add customer detail page`

Mensagem da tag prevista:

`Versão 1.4.0 - detalhe profissional do cliente`


---

## Fase 14 — Tarefas e atividades no detalhe do cliente

A Fase 14 evoluiu a página de detalhe do cliente, transformando-a em uma central inicial de relacionamento comercial.

Além dos dados cadastrais, endereço e contatos, o detalhe do cliente agora permite acompanhar tarefas futuras e registrar atividades realizadas.

### Funcionalidades implementadas

- Feature isolada `customerInteractions`
- Tipos próprios para tarefas e atividades
- Opções de canais, status, tipos e resultados
- Mock data inicial
- Fake API própria com localStorage separado
- Service próprio para tarefas e atividades
- Hook `useCustomerInteractions` com React Query
- Card `Tarefas agendadas`
- Card `Atividades realizadas`
- Integração dos cards na `CustomerDetailPage`
- Drawer de criação/edição de tarefa
- Formulário de tarefa
- Criação de tarefa
- Edição de tarefa
- Conclusão de tarefa
- Drawer de registro/edição de atividade
- Formulário de atividade
- Registro de atividade
- Edição de atividade
- Persistência no localStorage
- Filtro por `customerId`

### Diferença entre tarefa e atividade

Na Fase 14, foram separados dois conceitos importantes:

- **Tarefa:** ação futura ou pendente, como ligar para o cliente, enviar proposta, fazer visita ou retornar orçamento.
- **Atividade:** interação já realizada, como ligação feita, visita concluída, proposta enviada ou reunião realizada.

Essa separação prepara o CRM para evoluir como uma ferramenta real de gestão de relacionamento comercial.

### Persistência

A Fase 14 utiliza chaves próprias no localStorage:

- `crm-customer-tasks`
- `crm-customer-activities`

As tarefas e atividades são vinculadas ao cliente por `customerId`, mantendo os registros operacionais separados dos dados cadastrais do cliente.

### Arquitetura adicionada

A base da Fase 14 foi criada em:

`src/features/customerInteractions/`

### Arquivos principais criados

- `src/features/customerInteractions/types/customerInteraction.types.ts`
- `src/features/customerInteractions/data/customerInteractionOptions.ts`
- `src/features/customerInteractions/data/customerInteractionMockData.ts`
- `src/features/customerInteractions/services/customerInteractionFakeApi.ts`
- `src/features/customerInteractions/services/customerInteractionService.ts`
- `src/features/customerInteractions/hooks/useCustomerInteractions.ts`
- `src/features/customerInteractions/components/CustomerTasksCard.tsx`
- `src/features/customerInteractions/components/CustomerActivitiesCard.tsx`
- `src/features/customerInteractions/components/CustomerTaskForm.tsx`
- `src/features/customerInteractions/components/CustomerTaskDrawer.tsx`
- `src/features/customerInteractions/components/CustomerActivityForm.tsx`
- `src/features/customerInteractions/components/CustomerActivityDrawer.tsx`
- `docs/fases/FASE_14_TAREFAS_ATIVIDADES_CLIENTE.md`

### Arquivo principal alterado

- `src/pages/CustomerDetailPage.tsx`
- `README.md`

### Status da Fase 14

- Tarefas exibidas no detalhe do cliente
- Atividades exibidas no detalhe do cliente
- Criação de tarefa funcionando
- Edição de tarefa funcionando
- Conclusão de tarefa funcionando
- Registro de atividade funcionando
- Edição de atividade funcionando
- Persistência validada no localStorage
- Dados continuam após F5
- Filtro por `customerId` validado
- TypeScript validado com `npx tsc --noEmit`
- Vite iniciando sem erro
- Validação manual concluída

### Fora de escopo deixado para fases futuras

- Página global `/atividades`
- Criação automática de atividade ao concluir tarefa
- Integração com calendário
- Lembretes automáticos
- Notificações
- Histórico comercial completo
- Relatórios de produtividade

### Versionamento previsto

Branch da fase:

`feature/fase-14-tarefas-atividades-cliente`

Tag prevista ao concluir:

`v1.5.0`

Mensagem de commit prevista:

`feat: add customer tasks and activities`

Mensagem da tag prevista:

`Versão 1.5.0 - tarefas e atividades no detalhe do cliente`


---

## Fase 15 — Oportunidades abertas no detalhe do cliente

A Fase 15 evoluiu a página de detalhe do cliente, substituindo o placeholder de oportunidades por uma funcionalidade real de oportunidades comerciais vinculadas ao cliente.

Com essa fase, o detalhe do cliente passa a registrar negociações em andamento, propostas abertas, possíveis vendas futuras e oportunidades comerciais organizadas por funil, etapa, status e etiqueta.

### Funcionalidades implementadas

- Feature isolada `customerOpportunities`
- Tipos próprios para oportunidades comerciais
- Opções de funil, etapa, status e etiqueta
- Mock data inicial
- Fake API própria com localStorage separado
- Service próprio para oportunidades
- Hook `useCustomerOpportunities` com React Query
- Card `Oportunidades abertas`
- Integração do card na `CustomerDetailPage`
- Drawer de criação/edição de oportunidade
- Formulário de oportunidade
- Criação de oportunidade
- Edição de oportunidade
- Persistência no localStorage
- Filtro por `customerId`

### Modelagem da oportunidade

Uma oportunidade representa uma possibilidade comercial em andamento.

Exemplos:

- Negociação aberta
- Proposta em análise
- Orçamento em andamento
- Possível venda futura
- Pedido em negociação

Campos principais:

- Título
- Funil
- Etapa
- Valor estimado
- Status
- Etiqueta
- Previsão de fechamento
- Detalhes

### Diferença entre tarefa, atividade e oportunidade

A Fase 15 reforça a separação entre os principais conceitos do relacionamento comercial:

- **Tarefa:** ação futura ou pendente, como ligar para o cliente, enviar proposta ou fazer visita.
- **Atividade:** interação já realizada, como ligação feita, visita concluída ou proposta enviada.
- **Oportunidade:** possibilidade comercial em andamento, como proposta aberta, orçamento em análise ou negociação futura.

Essa separação deixa o CRM mais próximo de uma ferramenta real de gestão comercial.

### Persistência

A Fase 15 utiliza uma chave própria no localStorage:

- `crm-customer-opportunities`

As oportunidades são vinculadas ao cliente por `customerId`, mantendo os registros comerciais separados dos dados cadastrais do cliente e das interações comerciais.

### Arquitetura adicionada

A base da Fase 15 foi criada em:

`src/features/customerOpportunities/`

### Arquivos principais criados

- `src/features/customerOpportunities/types/customerOpportunity.types.ts`
- `src/features/customerOpportunities/data/customerOpportunityOptions.ts`
- `src/features/customerOpportunities/data/customerOpportunityMockData.ts`
- `src/features/customerOpportunities/services/customerOpportunityFakeApi.ts`
- `src/features/customerOpportunities/services/customerOpportunityService.ts`
- `src/features/customerOpportunities/hooks/useCustomerOpportunities.ts`
- `src/features/customerOpportunities/components/CustomerOpportunitiesCard.tsx`
- `src/features/customerOpportunities/components/CustomerOpportunityForm.tsx`
- `src/features/customerOpportunities/components/CustomerOpportunityDrawer.tsx`
- `docs/fases/FASE_15_OPORTUNIDADES_CLIENTE.md`

### Arquivo principal alterado

- `src/pages/CustomerDetailPage.tsx`
- `README.md`

### Status da Fase 15

- Oportunidades exibidas no detalhe do cliente
- Criação de oportunidade funcionando
- Edição de oportunidade funcionando
- Persistência validada no localStorage
- Dados continuam após F5
- Filtro por `customerId` validado
- TypeScript validado com `npx tsc --noEmit`
- Vite iniciando sem erro
- Validação manual concluída

### Fora de escopo deixado para fases futuras

- Kanban completo de oportunidades
- Página global de funis de vendas
- Drag and drop entre etapas
- Encerramento formal da oportunidade pela interface
- Conversão de oportunidade em pedido
- Geração de proposta/orçamento em PDF
- Relatórios de conversão
- Forecast comercial avançado

### Versionamento previsto

Branch da fase:

`feature/fase-15-oportunidades-cliente`

Tag prevista ao concluir:

`v1.6.0`

Mensagem de commit prevista:

`feat: add customer opportunities`

Mensagem da tag prevista:

`Versão 1.6.0 - oportunidades abertas no detalhe do cliente`
