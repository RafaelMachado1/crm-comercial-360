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