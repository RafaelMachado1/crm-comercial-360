# Fase 07 — Desafios práticos

## Objetivo dos desafios

Aplicar autenticação fake, Context API e rotas privadas no CRM Comercial 360.

Nesta fase, o sistema deve ter uma página de login e proteger as páginas internas.

---

## Desafio 1 — Criar AuthContext

### Objetivo

Criar o contexto global de autenticação.

### Requisitos

Criar o arquivo:

```txt
src/contexts/AuthContext.jsx
```

O contexto deve controlar:

- usuário logado;
- função de login;
- função de logout;
- carregamento inicial do usuário salvo.

### Conceitos usados

- `createContext`
- `useContext`
- `useState`
- `useEffect`
- Provider

---

## Desafio 2 — Criar AuthProvider

### Objetivo

Disponibilizar autenticação para toda a aplicação.

### Requisitos

- Criar `AuthProvider`.
- Envolver a aplicação com ele no `main.jsx`.
- O Provider deve entregar:
  - `user`;
  - `login`;
  - `logout`;
  - `isAuthenticated`.

### Conceitos usados

- Context API
- Provider
- children

---

## Desafio 3 — Criar hook useAuth

### Objetivo

Facilitar o uso do contexto de autenticação.

### Requisitos

Criar função:

```jsx
export function useAuth() {
  return useContext(AuthContext);
}
```

### Conceitos usados

- hook customizado
- `useContext`

---

## Desafio 4 — Criar LoginPage

### Objetivo

Criar uma tela de login para o CRM.

### Requisitos

Criar arquivo:

```txt
src/pages/LoginPage.jsx
```

A página deve ter:

- campo de e-mail;
- campo de senha;
- botão Entrar;
- mensagem de erro;
- credenciais fake exibidas para estudo.

Credenciais:

```txt
E-mail: admin@crm.com
Senha: 123456
```

### Conceitos usados

- formulário controlado
- `useState`
- `onSubmit`
- `useNavigate`
- renderização condicional

---

## Desafio 5 — Implementar login fake

### Objetivo

Permitir login com credenciais fixas.

### Requisitos

Se os dados estiverem corretos:

- criar objeto do usuário;
- salvar usuário no state;
- salvar usuário no `localStorage`;
- redirecionar para `/`.

Se estiverem errados:

- mostrar mensagem de erro.

### Conceitos usados

- autenticação fake
- `localStorage`
- redirecionamento

---

## Desafio 6 — Implementar logout

### Objetivo

Permitir sair do sistema.

### Requisitos

- Criar função `logout`.
- Remover usuário do state.
- Remover usuário do `localStorage`.
- Redirecionar para `/login`.

### Conceitos usados

- Context API
- localStorage
- navegação

---

## Desafio 7 — Criar PrivateRoute

### Objetivo

Proteger páginas internas.

### Requisitos

Criar arquivo:

```txt
src/routes/PrivateRoute.jsx
```

Se não houver usuário logado:

```txt
Redirecionar para /login
```

Se houver usuário logado:

```txt
Liberar acesso com Outlet
```

### Conceitos usados

- `Navigate`
- `Outlet`
- rotas privadas

---

## Desafio 8 — Proteger rotas no App.jsx

### Objetivo

Separar rotas públicas e privadas.

### Requisitos

- `/login` deve ser pública.
- As rotas abaixo devem ser privadas:
  - `/`
  - `/clientes`
  - `/produtos`
  - `/atividades`
  - `/vendas`
  - `*`

### Conceitos usados

- React Router
- rotas aninhadas
- `PrivateRoute`

---

## Desafio 9 — Atualizar Header

### Objetivo

Mostrar usuário logado e botão de logout.

### Requisitos

No Header, exibir:

- nome do usuário;
- e-mail do usuário;
- botão Sair.

### Conceitos usados

- `useAuth`
- renderização condicional
- evento `onClick`

---

## Desafio 10 — Persistir login após atualizar página

### Objetivo

Manter usuário logado depois do refresh.

### Requisitos

- Ao fazer login, salvar em `localStorage`.
- Ao iniciar o app, carregar usuário salvo.
- Se usuário salvo existir, manter acesso às rotas privadas.

### Conceitos usados

- `useEffect`
- `localStorage`
- `JSON.parse`
- `JSON.stringify`

---

## Desafio 11 — Redirecionar usuário logado longe do login

### Objetivo

Evitar que usuário logado acesse `/login`.

### Requisitos

Se o usuário já estiver logado e acessar `/login`, redirecionar para `/`.

### Conceitos usados

- `Navigate`
- `isAuthenticated`

---

## Critério de conclusão dos desafios

A Fase 07 estará pronta quando:

- existir página de login;
- login fake funcionar;
- logout funcionar;
- usuário aparecer no Header;
- usuário permanecer logado após atualizar a página;
- rotas privadas bloquearem usuário não logado;
- usuário não logado for redirecionado para `/login`;
- usuário logado for redirecionado para `/` ao tentar acessar `/login`;
- projeto rodar no navegador sem erro.