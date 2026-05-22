# Fase 06 — Exercícios guiados

## Objetivo dos exercícios

Praticar os conceitos principais da Fase 06 antes de aplicar no CRM Comercial 360.

Nesta fase, o foco é entender:

- React Router;
- BrowserRouter;
- Routes;
- Route;
- Link;
- NavLink;
- páginas;
- layout principal;
- navegação SPA;
- página 404.

---

## Exercício 1 — Estrutura básica com BrowserRouter

### Objetivo

Entender que o `BrowserRouter` habilita o sistema de rotas na aplicação React.

### Exemplo

```jsx
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <h1>CRM Comercial 360</h1>
    </BrowserRouter>
  );
}

export default App;
```

### O que observar

- `BrowserRouter` envolve a aplicação.
- Ele permite que o React Router controle a navegação.
- Normalmente ele fica no `main.jsx` ou no `App.jsx`.
- Nesta fase, vamos colocar no `main.jsx`.

---

## Exercício 2 — Criar primeiras rotas

### Objetivo

Entender como `Routes` e `Route` funcionam.

### Exemplo

```jsx
import { Routes, Route } from "react-router-dom";

function DashboardPage() {
  return <h1>Dashboard</h1>;
}

function ClientesPage() {
  return <h1>Clientes</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/clientes" element={<ClientesPage />} />
    </Routes>
  );
}

export default App;
```

### O que observar

- `Routes` agrupa as rotas.
- Cada `Route` representa um caminho.
- `path="/"` representa a página inicial.
- `element={<DashboardPage />}` define qual componente será mostrado.

---

## Exercício 3 — Navegação com Link

### Objetivo

Entender como navegar entre páginas sem recarregar o navegador.

### Exemplo

```jsx
import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/clientes">Clientes</Link>
      <Link to="/produtos">Produtos</Link>
    </nav>
  );
}

export default Menu;
```

### O que observar

- `Link` substitui o uso de `<a href="">` para navegação interna.
- A URL muda, mas a página não recarrega inteira.
- Isso mantém o comportamento de SPA.

---

## Exercício 4 — Navegação com NavLink

### Objetivo

Entender como destacar o link ativo.

### Exemplo

```jsx
import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/clientes"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Clientes
      </NavLink>
    </nav>
  );
}

export default Menu;
```

### O que observar

- `NavLink` sabe qual rota está ativa.
- `isActive` permite aplicar uma classe condicional.
- No CRM, vamos usar isso na `Sidebar`.

---

## Exercício 5 — Criar página simples

### Objetivo

Entender que uma página é apenas um componente React representando uma rota.

### Exemplo

```jsx
function ProdutosPage() {
  return (
    <main>
      <h1>Produtos</h1>
      <p>Lista de produtos do CRM.</p>
    </main>
  );
}

export default ProdutosPage;
```

### O que observar

- Página também é componente.
- A diferença é que ela representa uma tela inteira.
- Normalmente fica dentro da pasta `src/pages`.

---

## Exercício 6 — Criar layout principal

### Objetivo

Entender como evitar repetir Header e Sidebar em todas as páginas.

### Exemplo

```jsx
function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <Header />

      <div className="app-body">
        <Sidebar />

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
```

### O que observar

- `MainLayout` define a estrutura comum.
- `children` representa o conteúdo da página.
- Header e Sidebar ficam no layout.
- Cada página entra dentro da área principal.

---

## Exercício 7 — Usar layout com rotas

### Objetivo

Combinar layout principal com páginas.

### Exemplo

```jsx
function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
      </Routes>
    </MainLayout>
  );
}
```

### O que observar

- O layout fica por fora.
- As páginas mudam dentro da área de conteúdo.
- Header e Sidebar permanecem fixos.

---

## Exercício 8 — Criar página 404

### Objetivo

Criar uma rota para páginas inexistentes.

### Exemplo

```jsx
function NotFoundPage() {
  return (
    <div>
      <h1>Página não encontrada</h1>
      <p>A rota acessada não existe.</p>
    </div>
  );
}

export default NotFoundPage;
```

Uso na rota:

```jsx
<Route path="*" element={<NotFoundPage />} />
```

### O que observar

- O `*` captura qualquer rota não definida.
- É importante para melhorar a experiência do usuário.
- No CRM, vamos criar uma página 404 simples.

---

## Exercício 9 — App.jsx mais limpo

### Objetivo

Entender que o `App.jsx` deve organizar rotas, e não concentrar toda a regra de negócio.

### Antes

```jsx
function App() {
  return (
    <div>
      {/* Header */}
      {/* Sidebar */}
      {/* Formulário */}
      {/* Filtros */}
      {/* Clientes */}
      {/* Produtos */}
    </div>
  );
}
```

### Depois

```jsx
function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/produtos" element={<ProdutosPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}
```

### O que observar

- O `App.jsx` fica mais limpo.
- As responsabilidades ficam separadas.
- Cada página cuida do seu próprio conteúdo.

---

## Exercício 10 — Organização esperada

### Objetivo

Visualizar como o projeto ficará após a Fase 06.

### Estrutura esperada

```txt
src/
├── components/
│   ├── crm/
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── MainLayout.jsx
│   │   ├── PageTitle.jsx
│   │   └── Sidebar.jsx
│   └── ui/
├── pages/
│   ├── DashboardPage.jsx
│   ├── ClientesPage.jsx
│   ├── ProdutosPage.jsx
│   ├── AtividadesPage.jsx
│   ├── VendasPage.jsx
│   └── NotFoundPage.jsx
├── App.jsx
└── main.jsx
```

### O que observar

- `components/layout` guarda componentes estruturais.
- `pages` guarda telas completas.
- `App.jsx` configura as rotas.
- `main.jsx` envolve a aplicação com `BrowserRouter`.