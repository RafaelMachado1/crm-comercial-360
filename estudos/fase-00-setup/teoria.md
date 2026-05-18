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

## O que é React?

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

## O que é Vite?

Vite é uma ferramenta moderna usada para criar e rodar projetos Frontend.

Ele facilita a criação de projetos com React e oferece um ambiente de desenvolvimento rápido.

Com Vite, conseguimos criar um projeto React usando:

```bash
npm create vite@latest crm-comercial-360 -- --template react
```

Depois, para rodar o projeto, usamos:

```bash
npm run dev
```

Esse comando inicia um servidor local e mostra um endereço como:

```txt
http://localhost:5173/
```

Esse endereço é aberto no navegador para visualizar a aplicação.

---

## Por que usar Vite com React?

O Vite simplifica o setup do projeto.

Ele já cria uma estrutura inicial com os arquivos necessários para começar a desenvolver em React.

Entre as vantagens do Vite estão:

- criação rápida do projeto;
- servidor local de desenvolvimento;
- atualização automática no navegador;
- estrutura simples;
- boa performance;
- compatibilidade com o ecossistema React moderno.

No CRM Comercial 360, o Vite será a base para rodar o projeto durante o desenvolvimento.

---

## O que é localhost?

`localhost` é o endereço usado para rodar uma aplicação no próprio computador.

Quando executamos:

```bash
npm run dev
```

o Vite inicia o projeto localmente e mostra um endereço parecido com:

```txt
http://localhost:5173/
```

Isso significa que o projeto está rodando na máquina local, sem ainda estar publicado na internet.

Durante o desenvolvimento, é normal testar tudo em `localhost`.

---

## Estrutura inicial do projeto

A estrutura inicial do projeto será organizada assim:

```txt
crm-comercial-360/
├── docs/
├── estudos/
│   └── fase-00-setup/
│       ├── teoria.md
│       ├── anotacoes.md
│       ├── comandos.md
│       └── checklist.md
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── README.md
└── vite.config.js
```

Essa estrutura separa duas coisas importantes:

- `estudos/` guarda teoria, comandos, anotações, exercícios e desafios;
- `src/` guarda o código real da aplicação React.

---

## Função das principais pastas

### `docs/`

Pasta para documentações extras do projeto.

Pode guardar:

- decisões técnicas;
- planejamento;
- prints;
- observações;
- changelog;
- ideias futuras.

### `estudos/`

Pasta para guardar o material de estudo de cada fase.

Exemplo:

```txt
estudos/fase-00-setup/
estudos/fase-01-javascript-moderno/
estudos/fase-02-jsx-componentes-props/
```

### `src/`

Pasta principal da aplicação React.

É nela que o CRM Comercial 360 será construído.

### `src/components/`

Pasta para componentes reutilizáveis.

Futuramente poderá ter:

```txt
Header.jsx
Sidebar.jsx
CardIndicador.jsx
ClienteCard.jsx
ProdutoCard.jsx
```

### `src/pages/`

Pasta para páginas da aplicação.

Futuramente poderá ter:

```txt
Dashboard.jsx
Clientes.jsx
Produtos.jsx
Atividades.jsx
Vendas.jsx
```

### `src/data/`

Pasta para dados mockados.

Mock é um dado falso usado para simular informações reais durante o desenvolvimento.

### `src/utils/`

Pasta para funções auxiliares.

Exemplos futuros:

```txt
formatCurrency.js
formatDate.js
calculateTotalSales.js
filterCustomers.js
```

### `src/styles/`

Pasta para estilos globais ou arquivos CSS separados.

### `src/assets/`

Pasta para imagens, ícones e arquivos visuais.

---

## Arquivos principais do React com Vite

### `package.json`

Arquivo que controla o projeto.

Nele ficam:

- nome do projeto;
- scripts;
- dependências;
- configurações básicas.

Exemplo de script:

```json
"dev": "vite"
```

Esse script permite rodar:

```bash
npm run dev
```

### `index.html`

Arquivo HTML base da aplicação.

Ele contém uma `div` com id `root`.

É dentro dessa `div` que o React renderiza a aplicação.

### `src/main.jsx`

É o ponto de entrada da aplicação React.

Ele conecta o React com o HTML.

Exemplo:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Esse código significa:

- importe o React;
- importe o componente principal `App`;
- encontre a `div` com id `root`;
- renderize o componente `App` dentro dela.

### `src/App.jsx`

É o componente principal da aplicação.

Nesta fase, ele exibe apenas uma tela inicial simples do CRM Comercial 360.

Mais para frente, o `App.jsx` será reorganizado e passará a usar componentes, páginas e rotas.

### `src/App.css`

Arquivo de estilos do componente `App`.

Nesta fase, ele define o visual da primeira tela.

### `src/index.css`

Arquivo de estilos globais.

Ele define ajustes gerais, como:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}
```

---

## O que é Git?

Git é uma ferramenta de versionamento.

Ele registra a evolução do projeto.

Com Git, é possível:

- salvar versões do código;
- ver o histórico de mudanças;
- criar commits;
- criar tags;
- voltar para versões anteriores;
- organizar o projeto por fases.

---

## O que é GitHub?

GitHub é uma plataforma online para armazenar repositórios Git.

No CRM Comercial 360, o GitHub será usado para:

- guardar o código;
- registrar a evolução do projeto;
- servir como portfólio;
- mostrar organização;
- facilitar apresentação em entrevistas.

---

## O que é commit?

Um commit é um registro de uma mudança importante no projeto.

É como uma fotografia do projeto naquele momento.

Exemplo:

```bash
git commit -m "chore: setup react crm project with vite"
```

Esse commit representa o setup inicial do projeto.

---

## O que é tag?

Uma tag é uma marca de versão.

No roadmap, cada fase será marcada com uma tag.

A Fase 00 será:

```txt
v0.1.0
```

Essa tag representa:

```txt
Fase 00 concluída — setup inicial do projeto
```

As próximas fases seguirão a lógica:

```txt
v0.1.0 — Fase 00
v0.2.0 — Fase 01
v0.3.0 — Fase 02
```

---

## O que construímos na Fase 00

Nesta fase, foi criada a base inicial do CRM Comercial 360.

O projeto passou a ter:

- React;
- Vite;
- estrutura inicial de pastas;
- primeira tela visual;
- README inicial;
- arquivos de estudo da Fase 00;
- versionamento com Git;
- repositório no GitHub.

A primeira tela mostra:

- nome do projeto;
- descrição do sistema;
- status do setup.

Essa tela ainda não é o CRM completo. Ela serve apenas para validar que o ambiente está funcionando corretamente.

---

## Critério de conclusão da Fase 00

A Fase 00 estará concluída quando:

- o projeto estiver criado com Vite;
- a aplicação abrir em `localhost`;
- a primeira tela do CRM aparecer no navegador;
- a estrutura inicial de pastas estiver criada;
- o README inicial estiver pronto;
- o material de estudos da Fase 00 estiver criado;
- o projeto estiver versionado no Git;
- o repositório estiver no GitHub;
- a tag `v0.1.0` estiver criada.

---

## Resumo final da Fase 00

A Fase 00 é a fundação do projeto.

Ela prepara o ambiente para que as próximas fases sejam estudadas e aplicadas de forma organizada.

A partir da próxima fase, o foco será revisar JavaScript moderno para React, com exercícios e desafios práticos.