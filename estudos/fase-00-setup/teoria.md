# Fase 00 — Teoria: Setup do repositório e base do projeto

## Objetivo da Fase 00

A Fase 00 é a fundação do projeto CRM Comercial 360.

Antes de estudar componentes, props, state, formulários, rotas e consumo de API, é necessário preparar corretamente o ambiente de desenvolvimento.

Nesta fase, o objetivo é criar um projeto React com Vite, organizar a estrutura inicial de pastas, preparar o README, iniciar o Git, conectar ao GitHub e criar a primeira versão do projeto.

Ao final desta fase, o projeto precisa:

- rodar no navegador;
- ter uma tela inicial simples;
- ter uma estrutura organizada;
- ter documentação inicial;
- estar versionado no Git;
- estar publicado no GitHub;
- ter a tag `v0.1.0`.

---

## 1. O que é o projeto CRM Comercial 360?

O CRM Comercial 360 é o projeto principal deste roadmap.

A ideia é construir uma aplicação para representantes comerciais acompanharem:

- clientes;
- produtos;
- atividades;
- oportunidades;
- pedidos;
- vendas;
- indicadores;
- dashboard.

Esse projeto foi escolhido porque conecta o estudo de React com uma realidade comercial prática.

Em vez de criar apenas um CRUD genérico, o projeto simula uma ferramenta real de gestão comercial.

---

## 2. O que é React?

React é uma biblioteca JavaScript usada para criar interfaces de usuário.

Com React, a interface é construída em partes menores chamadas componentes.

Um componente pode representar qualquer parte da tela, por exemplo:

- um botão;
- um card;
- um menu;
- um formulário;
- uma tabela;
- uma página inteira.

No futuro, o CRM Comercial 360 terá componentes como:

- `Header`;
- `Sidebar`;
- `PageTitle`;
- `CardIndicador`;
- `ClienteCard`;
- `ProdutoCard`.

Nesta Fase 00, ainda não vamos aprofundar em componentes. O foco é apenas criar o projeto e validar que o React está funcionando.

---

## 3. O que é Vite?

Vite é uma ferramenta moderna usada para criar e rodar projetos Frontend.

Ele facilita a criação de projetos com React e oferece um ambiente de desenvolvimento rápido.

Com Vite, conseguimos criar um projeto React usando:

```bash
npm create vite@latest crm-comercial-360 -- --template react