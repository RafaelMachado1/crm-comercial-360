# Fase 07 — Autenticação fake, Context API e rotas privadas

## Objetivo da fase

A Fase 07 tem como objetivo adicionar autenticação simulada ao CRM Comercial 360 usando Context API, React Router e rotas privadas.

Até a Fase 06, o sistema já possui navegação entre páginas com React Router.

Nesta fase, vamos criar uma camada de autenticação para simular um fluxo real de login, logout e proteção de páginas internas.

---

## O que será estudado

- Autenticação fake
- Context API
- `createContext`
- `useContext`
- Provider
- Estado global
- Login
- Logout
- Persistência de usuário no `localStorage`
- Rotas privadas
- `Navigate`
- `Outlet`
- Proteção de páginas
- Redirecionamento
- Separação de responsabilidades

---

## O que é autenticação?

Autenticação é o processo de verificar se um usuário tem permissão para acessar o sistema.

Em uma aplicação real, normalmente o usuário informa:

- e-mail;
- senha.

O backend valida esses dados e retorna uma confirmação, geralmente com um token.

Nesta fase, ainda não teremos backend real. Por isso, vamos simular a autenticação no frontend.

---

## O que é autenticação fake?

Autenticação fake é uma simulação de login feita no frontend.

Ela não é segura para produção, mas é excelente para estudar fluxo de autenticação.

Exemplo:

```js
const usuarioFake = {
  email: "admin@crm.com",
  senha: "123456",
};
```

Se o usuário digitar esse e-mail e senha, consideramos que ele está logado.

---

## Por que usar autenticação fake?

Porque antes de integrar com backend real, precisamos entender:

- como criar tela de login;
- como salvar usuário logado;
- como proteger rotas;
- como redirecionar usuário;
- como compartilhar dados de autenticação na aplicação.

Depois, no futuro, trocamos a autenticação fake por uma autenticação real com backend Java Spring Boot e JWT.

---

## O que é Context API?

Context API é um recurso do React que permite compartilhar dados entre vários componentes sem precisar passar props manualmente por muitas camadas.

Exemplo de problema:

```txt
App
↓
MainLayout
↓
Header
↓
Botão de logout
```

Se o usuário logado está no `App`, passar esse dado por props até o `Header` pode ficar ruim.

Com Context API, criamos um contexto global de autenticação.

---

## createContext

`createContext` cria um contexto.

Exemplo:

```jsx
import { createContext } from "react";

const AuthContext = createContext();
```

Esse contexto poderá guardar informações como:

- usuário logado;
- função de login;
- função de logout;
- status de autenticação.

---

## Provider

O Provider é o componente que disponibiliza os dados para a aplicação.

Exemplo:

```jsx
<AuthContext.Provider value={{ user, login, logout }}>
  {children}
</AuthContext.Provider>
```

Tudo que estiver dentro do Provider poderá acessar `user`, `login` e `logout`.

---

## useContext

`useContext` permite consumir os dados do contexto.

Exemplo:

```jsx
import { useContext } from "react";

const { user, logout } = useContext(AuthContext);
```

Assim, qualquer componente dentro do Provider pode acessar o usuário logado ou executar logout.

---

## Criando um hook customizado

É comum criar um hook para facilitar o uso do contexto.

Exemplo:

```jsx
function useAuth() {
  return useContext(AuthContext);
}
```

Depois usamos:

```jsx
const { user, login, logout } = useAuth();
```

Isso deixa o código mais limpo.

---

## Estado global de autenticação

Nesta fase, criaremos um estado global para autenticação.

Exemplo:

```jsx
const [user, setUser] = useState(null);
```

Se `user` for `null`, o usuário não está logado.

Se `user` tiver dados, o usuário está logado.

---

## Login

Login é o processo de autenticar o usuário.

Exemplo fake:

```jsx
function login(email, senha) {
  if (email === "admin@crm.com" && senha === "123456") {
    const usuario = {
      nome: "Rafael Machado",
      email,
    };

    setUser(usuario);
    localStorage.setItem("crm-user", JSON.stringify(usuario));

    return true;
  }

  return false;
}
```

---

## Logout

Logout remove o usuário logado.

Exemplo:

```jsx
function logout() {
  setUser(null);
  localStorage.removeItem("crm-user");
}
```

Depois do logout, o usuário deve ser redirecionado para `/login`.

---

## Persistência do login

Se salvarmos o usuário apenas no state, ele será perdido ao atualizar a página.

Por isso, vamos usar `localStorage`.

Fluxo:

```txt
Usuário faz login
↓
State user é atualizado
↓
Usuário é salvo no localStorage
↓
Página é atualizada
↓
AuthProvider carrega usuário salvo
↓
Usuário continua logado
```

---

## Rotas privadas

Rotas privadas são páginas que só podem ser acessadas por usuários logados.

Exemplo:

```txt
/clientes
/produtos
/atividades
/vendas
```

Se o usuário não estiver logado, ele deve ser redirecionado para:

```txt
/login
```

---

## Navigate

`Navigate` é um componente do React Router usado para redirecionar.

Exemplo:

```jsx
import { Navigate } from "react-router-dom";

return <Navigate to="/login" />;
```

No CRM, vamos usar isso para proteger as páginas internas.

---

## Outlet

`Outlet` é usado para renderizar rotas filhas dentro de uma rota pai.

Exemplo:

```jsx
import { Outlet } from "react-router-dom";

function PrivateRoute() {
  return <Outlet />;
}
```

Nesta fase, podemos usar `Outlet` para organizar rotas protegidas.

---

## Exemplo de rota privada

```jsx
function PrivateRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
```

Aqui:

- se não existir usuário, redireciona para login;
- se existir usuário, libera as páginas internas.

---

## Página de login

A página de login terá:

- campo de e-mail;
- campo de senha;
- botão entrar;
- mensagem de erro;
- dados de acesso fake para estudo.

Exemplo de credenciais:

```txt
E-mail: admin@crm.com
Senha: 123456
```

---

## Rotas públicas e privadas

Nesta fase, teremos uma rota pública:

```txt
/login
```

E rotas privadas:

```txt
/
 /clientes
 /produtos
 /atividades
 /vendas
```

A página 404 também pode ficar dentro da área privada.

---

## Como isso será aplicado no CRM Comercial 360

Na Fase 07, vamos:

- criar `AuthContext`;
- criar `AuthProvider`;
- criar hook `useAuth`;
- criar `LoginPage`;
- criar `PrivateRoute`;
- proteger as páginas internas;
- adicionar logout no Header;
- exibir usuário logado no Header;
- persistir usuário no `localStorage`.

---

## Organização esperada

A estrutura deve evoluir para algo assim:

```txt
src/
├── contexts/
│   └── AuthContext.jsx
├── routes/
│   └── PrivateRoute.jsx
├── pages/
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── ClientesPage.jsx
│   ├── ProdutosPage.jsx
│   ├── AtividadesPage.jsx
│   ├── VendasPage.jsx
│   └── NotFoundPage.jsx
```

---

## Critério de conclusão da Fase 07

A Fase 07 será considerada concluída quando:

- existir página de login;
- existir autenticação fake;
- usuário puder fazer login;
- usuário puder fazer logout;
- usuário logado aparecer no Header;
- login for salvo no `localStorage`;
- rotas internas forem protegidas;
- usuário não logado for redirecionado para `/login`;
- usuário logado não precisar fazer login novamente ao atualizar a página;
- projeto rodar no navegador sem erro;
- README estiver atualizado;
- tag `v0.8.0` estiver criada.

---

## Resumo da Fase 07

A Fase 07 adiciona uma camada essencial de sistema real: autenticação.

Mesmo sendo fake, ela permite entender o fluxo de login, logout, persistência do usuário e rotas protegidas.

Essa fase prepara o CRM Comercial 360 para futuramente receber autenticação real com backend Java Spring Boot e JWT.