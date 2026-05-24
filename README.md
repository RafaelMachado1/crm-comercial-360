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