# Fase 06 — React Router, páginas e layout

## Objetivo da fase

A Fase 06 tem como objetivo adicionar navegação entre páginas usando React Router e organizar o CRM Comercial 360 com uma estrutura de layout mais próxima de um sistema real.

Até a Fase 05, o projeto possui várias funcionalidades em uma única tela dentro do `App.jsx`.

Nesta fase, vamos separar o sistema em páginas e criar uma estrutura mais profissional.

---

## O que será estudado

- React Router
- Rotas
- `BrowserRouter`
- `Routes`
- `Route`
- `Link`
- `NavLink`
- Layout principal
- Páginas
- Navegação SPA
- Separação entre layout e conteúdo
- Página 404
- Organização de pastas

---

## O que é React Router?

React Router é uma biblioteca usada para criar navegação em aplicações React.

Com ela, podemos criar páginas como:

- `/`
- `/clientes`
- `/produtos`
- `/atividades`
- `/vendas`

Sem precisar recarregar a página inteira.

Isso é importante porque aplicações React normalmente funcionam como SPA.

---

## O que é SPA?

SPA significa Single Page Application.

Em uma SPA, o navegador carrega uma única página HTML principal.

Depois disso, o React controla a troca de telas sem pedir uma nova página para o servidor.

Exemplo:

```txt
Usuário clica em Clientes
↓
URL muda para /clientes
↓
React troca o componente exibido
↓
A página não recarrega inteira
```

---

## Por que usar React Router?

Sem React Router, o sistema fica preso a uma única tela.

Com React Router, podemos organizar melhor a aplicação.

No CRM Comercial 360, isso permite separar:

- Dashboard
- Clientes
- Produtos
- Atividades
- Vendas

Cada parte do sistema fica em uma página própria.

---

## Instalação do React Router

Para instalar:

```bash
npm install react-router-dom
```

Depois podemos importar os recursos principais:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
```

---

## BrowserRouter

`BrowserRouter` envolve a aplicação e habilita o sistema de rotas.

Exemplo:

```jsx
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* Rotas aqui */}
    </BrowserRouter>
  );
}
```

Normalmente o `BrowserRouter` fica no `main.jsx` ou no `App.jsx`.

Nesta fase, vamos usar no `main.jsx`.

---

## Routes

`Routes` é o componente que agrupa as rotas.

Exemplo:

```jsx
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/clientes" element={<Clientes />} />
</Routes>
```

---

## Route

`Route` define uma rota específica.

Exemplo:

```jsx
<Route path="/clientes" element={<Clientes />} />
```

Aqui:

- `path="/clientes"` define o endereço;
- `element={<Clientes />}` define qual componente será exibido.

---

## Link

`Link` cria links internos sem recarregar a página.

Exemplo:

```jsx
import { Link } from "react-router-dom";

<Link to="/clientes">Clientes</Link>
```

Diferente de `<a href="">`, o `Link` mantém o comportamento de SPA.

---

## NavLink

`NavLink` é parecido com `Link`, mas permite identificar qual rota está ativa.

Exemplo:

```jsx
import { NavLink } from "react-router-dom";

<NavLink to="/clientes">Clientes</NavLink>
```

Com `NavLink`, podemos aplicar uma classe quando o link estiver ativo.

Exemplo:

```jsx
<NavLink
  to="/clientes"
  className={({ isActive }) => isActive ? "active" : ""}
>
  Clientes
</NavLink>
```

No CRM, isso será usado na sidebar para destacar a página atual.

---

## Layout principal

Um layout principal é uma estrutura visual comum usada em várias páginas.

Exemplo:

```txt
Header
Sidebar
Conteúdo da página
```

Em vez de repetir `Header` e `Sidebar` em cada página, criamos um componente de layout.

Exemplo:

```jsx
function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

Nesta fase, podemos organizar o CRM usando um layout principal.

---

## Separação entre layout e páginas

Layout é a estrutura comum.

Páginas são os conteúdos específicos.

Exemplo:

```txt
layout/
- MainLayout.jsx

pages/
- DashboardPage.jsx
- ClientesPage.jsx
- ProdutosPage.jsx
- AtividadesPage.jsx
- VendasPage.jsx
- NotFoundPage.jsx
```

Isso deixa o projeto mais organizado.

---

## Página Dashboard

A página Dashboard deve mostrar uma visão geral do CRM.

Exemplo de conteúdo:

- indicadores;
- resumo de clientes;
- resumo de produtos;
- visão geral comercial.

---

## Página Clientes

A página Clientes deve concentrar:

- formulário de cliente;
- filtros;
- lista de clientes;
- edição;
- exclusão;
- modal.

Grande parte do que hoje está no `App.jsx` será movida para essa página.

---

## Página Produtos

A página Produtos deve listar os produtos.

Nesta fase, ela pode ser simples.

Mais para frente, poderá ter:

- cadastro de produtos;
- filtros;
- estoque;
- edição;
- exclusão.

---

## Página Atividades

A página Atividades será criada como estrutura inicial.

Nesta fase, pode ter conteúdo estático.

Mais para frente, poderá ter:

- tarefas;
- visitas;
- ligações;
- reuniões;
- status;
- datas.

---

## Página Vendas

A página Vendas será criada como estrutura inicial.

Mais para frente, poderá ter:

- pedidos;
- valor vendido;
- histórico;
- indicadores;
- gráfico.

---

## Página 404

Página 404 aparece quando o usuário acessa uma rota que não existe.

Exemplo:

```jsx
<Route path="*" element={<NotFoundPage />} />
```

O `*` representa qualquer rota não encontrada.

---

## Organização esperada do projeto

Nesta fase, a estrutura deve evoluir para algo assim:

```txt
src/
├── components/
│   ├── crm/
│   ├── layout/
│   └── ui/
├── data/
├── pages/
│   ├── DashboardPage.jsx
│   ├── ClientesPage.jsx
│   ├── ProdutosPage.jsx
│   ├── AtividadesPage.jsx
│   ├── VendasPage.jsx
│   └── NotFoundPage.jsx
├── services/
├── utils/
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## Como isso será aplicado no CRM Comercial 360

Na Fase 06, vamos:

- instalar `react-router-dom`;
- configurar `BrowserRouter`;
- criar rotas;
- transformar a sidebar em navegação real;
- criar páginas separadas;
- mover a lógica de clientes para `ClientesPage`;
- deixar o `App.jsx` responsável principalmente pelas rotas;
- criar página 404;
- manter layout com Header e Sidebar.

---

## Critério de conclusão da Fase 06

A Fase 06 será considerada concluída quando:

- React Router estiver instalado;
- rotas estiverem funcionando;
- sidebar navegar entre páginas;
- link ativo estiver destacado;
- existirem páginas para Dashboard, Clientes, Produtos, Atividades e Vendas;
- existir página 404;
- o `App.jsx` estiver mais limpo;
- o layout principal estiver organizado;
- o projeto rodar no navegador sem erro;
- README estiver atualizado;
- tag `v0.7.0` estiver criada.

---

## Resumo da Fase 06

A Fase 06 transforma o CRM Comercial 360 de uma tela única em uma aplicação com navegação real.

Essa fase é importante porque aproxima o projeto da estrutura de sistemas profissionais, onde cada área do sistema possui sua própria página e rota.