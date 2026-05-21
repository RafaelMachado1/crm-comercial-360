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