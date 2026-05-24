# Fase 07 — Exercícios guiados

## Objetivo dos exercícios

Praticar os conceitos principais da Fase 07 antes de aplicar no CRM Comercial 360.

Nesta fase, o foco é entender:

- autenticação fake;
- Context API;
- `createContext`;
- `useContext`;
- Provider;
- hook customizado;
- login;
- logout;
- persistência no `localStorage`;
- rotas privadas;
- `Navigate`;
- `Outlet`.

---

## Exercício 1 — Criar um contexto simples

### Objetivo

Entender como criar um contexto no React.

### Exemplo

```jsx
import { createContext } from "react";

const UserContext = createContext();

export default UserContext;
```

### O que observar

- `createContext` cria um contexto.
- O contexto pode ser usado para compartilhar dados.
- Nesta fase, vamos criar um contexto de autenticação.

---

## Exercício 2 — Criar um Provider

### Objetivo

Entender como disponibilizar dados para vários componentes.

### Exemplo

```jsx
import { createContext, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
```

### O que observar

- O Provider envolve componentes filhos.
- Tudo dentro do Provider pode acessar `user` e `setUser`.
- `children` representa o conteúdo interno do Provider.

---

## Exercício 3 — Consumir contexto com useContext

### Objetivo

Entender como acessar dados do contexto.

### Exemplo

```jsx
import { useContext } from "react";
import { UserContext } from "./UserProvider";

function Header() {
  const { user } = useContext(UserContext);

  return (
    <header>
      <p>Usuário: {user ? user.nome : "Não logado"}</p>
    </header>
  );
}

export default Header;
```

### O que observar

- `useContext` acessa os dados do contexto.
- O componente precisa estar dentro do Provider.
- Se `user` for `null`, o usuário não está logado.

---

## Exercício 4 — Criar hook customizado

### Objetivo

Facilitar o uso do contexto.

### Exemplo

```jsx
import { useContext } from "react";
import { UserContext } from "./UserProvider";

export function useUser() {
  return useContext(UserContext);
}
```

Uso:

```jsx
const { user } = useUser();
```

### O que observar

- O hook deixa o código mais limpo.
- Em vez de importar `useContext` em todo lugar, usamos `useUser`.
- No CRM, vamos criar `useAuth`.

---

## Exercício 5 — Login fake

### Objetivo

Simular autenticação sem backend.

### Exemplo

```jsx
function login(email, senha) {
  if (email === "admin@crm.com" && senha === "123456") {
    const usuario = {
      nome: "Rafael Machado",
      email,
    };

    setUser(usuario);

    return true;
  }

  return false;
}
```

### O que observar

- O login compara e-mail e senha com valores fixos.
- Se estiver correto, salva o usuário no state.
- Se estiver errado, retorna `false`.
- Isso é apenas para estudo, não é seguro para produção.

---

## Exercício 6 — Logout

### Objetivo

Remover o usuário logado.

### Exemplo

```jsx
function logout() {
  setUser(null);
}
```

### O que observar

- Logout limpa o usuário do state.
- Depois disso, o sistema deve tratar o usuário como não autenticado.
- No CRM, também vamos remover o usuário do `localStorage`.

---

## Exercício 7 — Persistir usuário no localStorage

### Objetivo

Manter o usuário logado após atualizar a página.

### Exemplo

```jsx
const usuario = {
  nome: "Rafael Machado",
  email: "admin@crm.com",
};

localStorage.setItem("crm-user", JSON.stringify(usuario));
```

Para recuperar:

```jsx
const usuarioSalvo = localStorage.getItem("crm-user");

if (usuarioSalvo) {
  const usuarioConvertido = JSON.parse(usuarioSalvo);
  setUser(usuarioConvertido);
}
```

### O que observar

- `localStorage` mantém o dado salvo no navegador.
- `JSON.stringify` converte objeto em texto.
- `JSON.parse` converte o texto de volta para objeto.
- Esse padrão será usado no `AuthProvider`.

---

## Exercício 8 — Página de login com formulário controlado

### Objetivo

Criar campos controlados para e-mail e senha.

### Exemplo

```jsx
import { useState } from "react";

function LoginPage() {
  const [formLogin, setFormLogin] = useState({
    email: "",
    senha: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  }

  return (
    <form>
      <input
        name="email"
        value={formLogin.email}
        onChange={handleChange}
        placeholder="E-mail"
      />

      <input
        name="senha"
        type="password"
        value={formLogin.senha}
        onChange={handleChange}
        placeholder="Senha"
      />
    </form>
  );
}

export default LoginPage;
```

### O que observar

- O formulário de login também é controlado por state.
- `name` identifica o campo.
- `[name]: value` atualiza o campo correto.

---

## Exercício 9 — Redirecionar com Navigate

### Objetivo

Entender como enviar o usuário para outra rota.

### Exemplo

```jsx
import { Navigate } from "react-router-dom";

function PrivateRoute({ user }) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <p>Conteúdo protegido</p>;
}
```

### O que observar

- `Navigate` redireciona automaticamente.
- Se não existe usuário, manda para `/login`.
- Se existe usuário, libera o conteúdo.

---

## Exercício 10 — Usar Outlet em rota privada

### Objetivo

Renderizar rotas protegidas dentro de um componente de proteção.

### Exemplo

```jsx
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ user }) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateRoute;
```

### O que observar

- `Outlet` renderiza a rota filha.
- `PrivateRoute` decide se libera ou bloqueia.
- Isso será usado para proteger Dashboard, Clientes, Produtos, Atividades e Vendas.

---

## Exercício 11 — Estrutura de rotas públicas e privadas

### Objetivo

Entender a separação entre `/login` e páginas internas.

### Exemplo

```jsx
<Routes>
  <Route path="/login" element={<LoginPage />} />

  <Route element={<PrivateRoute />}>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/clientes" element={<ClientesPage />} />
    <Route path="/produtos" element={<ProdutosPage />} />
  </Route>
</Routes>
```

### O que observar

- `/login` é pública.
- As demais ficam dentro de `PrivateRoute`.
- Quem não estiver logado é enviado para `/login`.

---

## Exercício 12 — Mostrar usuário no Header

### Objetivo

Exibir dados do usuário logado em um componente global.

### Exemplo

```jsx
function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      <p>{user?.nome}</p>
      <button onClick={logout}>Sair</button>
    </header>
  );
}
```

### O que observar

- `Header` acessa o usuário pelo contexto.
- O botão chama `logout`.
- `user?.nome` evita erro se `user` for `null`.