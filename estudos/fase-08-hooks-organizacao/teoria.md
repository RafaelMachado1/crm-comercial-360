# Fase 08 — Hooks customizados e organização profissional

## Objetivo da fase

A Fase 08 tem como objetivo refatorar o CRM Comercial 360 para ficar mais parecido com código de mercado, reaproveitando lógicas e separando responsabilidades.

Até agora, o projeto já possui:

- React com Vite
- Componentes reutilizáveis
- Props e children
- State e eventos
- Formulários controlados
- Filtros
- CRUD de clientes
- localStorage
- API fake
- React Router
- Autenticação fake
- Context API
- Rotas privadas

Com o crescimento do projeto, algumas páginas e componentes começam a concentrar muita responsabilidade.

Nesta fase, vamos organizar melhor o código criando hooks customizados, utils e services mais claros.

---

## O que será estudado

- `useRef`
- `useMemo`
- `useCallback`
- Hooks customizados
- Quando otimizar
- Quando não otimizar
- Organização de pastas
- Services
- Utils
- Contexts
- Hooks
- Separação de responsabilidades

---

## O que é organização profissional em React?

Organização profissional significa separar o código por responsabilidade.

Um projeto React não deve colocar tudo dentro de uma única página ou componente.

À medida que o sistema cresce, precisamos separar:

```txt
components  → interface reutilizável
pages       → telas da aplicação
hooks       → lógica reutilizável com React
services    → comunicação com API ou API fake
utils       → funções auxiliares puras
contexts    → estados globais
routes      → regras de rotas
data        → dados mockados
```

Essa separação deixa o projeto mais fácil de entender, manter e evoluir.

---

## O problema de componentes gigantes

Um componente gigante normalmente mistura:

- JSX
- estados
- funções de formulário
- regras de negócio
- filtros
- chamadas de API
- modal
- loading
- mensagens
- validações

Isso até funciona, mas fica difícil de manter.

O ideal é separar a lógica em arquivos específicos.

---

## O que são hooks customizados?

Hooks customizados são funções JavaScript que usam hooks do React para organizar lógica reutilizável.

Eles sempre começam com `use`.

Exemplo:

```jsx
function useToggle(valorInicial = false) {
  const [ativo, setAtivo] = useState(valorInicial);

  function alternar() {
    setAtivo((valorAtual) => !valorAtual);
  }

  return {
    ativo,
    alternar,
    setAtivo,
  };
}
```

Uso:

```jsx
const { ativo, alternar } = useToggle(false);
```

---

## Regra principal dos hooks

Hooks devem ser chamados no topo de componentes ou de outros hooks.

Não devemos chamar hooks dentro de:

- `if`
- `for`
- `while`
- funções comuns
- callbacks condicionais

Correto:

```jsx
function ClientesPage() {
  const clientes = useCustomers();

  return <h1>Clientes</h1>;
}
```

Errado:

```jsx
function ClientesPage() {
  if (algumaCondicao) {
    const clientes = useCustomers();
  }

  return <h1>Clientes</h1>;
}
```

---

## Diferença entre componente e hook

### Componente

Componente retorna JSX.

```jsx
function ClienteCard() {
  return <article>Cliente</article>;
}
```

### Hook

Hook retorna dados, estados e funções.

```jsx
function useCustomers() {
  return {
    customers,
    createCustomer,
    deleteCustomer,
  };
}
```

Resumo:

```txt
Componente → interface
Hook       → lógica
```

---

## useRef

`useRef` é um hook usado para guardar uma referência que não causa re-renderização quando muda.

Ele pode ser usado para:

- acessar elementos do DOM;
- guardar valores entre renderizações;
- controlar foco em inputs;
- evitar recriar informações que não precisam renderizar a tela.

Exemplo:

```jsx
import { useRef } from "react";

function LoginPage() {
  const emailInputRef = useRef(null);

  function focarEmail() {
    emailInputRef.current.focus();
  }

  return (
    <>
      <input ref={emailInputRef} />
      <button onClick={focarEmail}>Focar e-mail</button>
    </>
  );
}
```

No CRM, `useRef` pode ser usado para focar automaticamente o primeiro campo de um formulário.

---

## useMemo

`useMemo` memoriza o resultado de um cálculo.

Ele evita refazer cálculos quando as dependências não mudaram.

Exemplo:

```jsx
const clientesAtivos = useMemo(() => {
  return clientes.filter((cliente) => cliente.status === "ativo");
}, [clientes]);
```

Use `useMemo` quando:

- o cálculo depende de estados específicos;
- a lista pode crescer;
- o cálculo é usado várias vezes;
- o cálculo começa a ficar mais pesado.

Não use `useMemo` em tudo.

Para cálculos simples, pode ser desnecessário.

---

## useCallback

`useCallback` memoriza funções.

Ele evita que funções sejam recriadas a cada renderização, quando as dependências não mudam.

Exemplo:

```jsx
const handleClick = useCallback(() => {
  console.log("Cliquei");
}, []);
```

Use `useCallback` quando:

- a função é passada para componentes filhos;
- a função é dependência de algum hook;
- existe necessidade real de manter referência estável.

Não use `useCallback` em tudo, porque isso pode deixar o código mais complexo sem necessidade.

---

## Quando otimizar e quando não otimizar

Nem toda renderização é problema.

O React já é eficiente para muitos casos.

Devemos otimizar quando:

- existe lentidão perceptível;
- listas estão grandes;
- cálculos são repetidos muitas vezes;
- componentes filhos renderizam sem necessidade;
- a lógica começa a ficar difícil de manter.

Não devemos otimizar apenas por ansiedade.

Primeiro, organize o código.

Depois, otimize onde fizer sentido.

---

## Services

Services concentram chamadas externas ou simulações de API.

No projeto, já temos:

```txt
src/services/clientesFakeApi.js
```

Esse arquivo deve cuidar da simulação de API dos clientes.

No futuro, quando existir backend Java, esse service poderá ser trocado por chamadas com `axios`.

---

## Utils

Utils são funções auxiliares puras.

Elas não devem depender diretamente do React.

Exemplo:

```js
export function filtrarClientes(clientes, filtros) {
  return clientes.filter((cliente) => {
    // regra de filtro
  });
}
```

Utils podem guardar:

- cálculos;
- formatação;
- filtros;
- validações simples;
- conversões.

---

## Contexts

Contexts guardam estados globais.

No projeto, já temos:

```txt
src/contexts/AuthContext.jsx
```

Esse contexto controla:

- usuário logado;
- login;
- logout;
- autenticação;
- persistência do usuário.

Context não deve ser usado para tudo.

Use Context quando a informação precisa ser acessada por várias partes da aplicação.

---

## Hooks

Hooks customizados organizam lógica React.

Nesta fase, vamos criar:

```txt
src/hooks/useLocalStorage.js
src/hooks/useCustomers.js
src/hooks/useToggle.js
```

Cada um terá uma responsabilidade específica.

---

## Hook useLocalStorage

O `useLocalStorage` será responsável por lidar com dados persistidos no navegador.

Ele pode:

- ler dados do localStorage;
- salvar dados no localStorage;
- manter state sincronizado;
- reutilizar lógica em clientes, usuário ou outras entidades.

Exemplo conceitual:

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue) {
      setValue(JSON.parse(storedValue));
    }
  }, [key]);

  function updateValue(newValue) {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [value, updateValue];
}
```

---

## Hook useCustomers

O `useCustomers` será responsável pela lógica de clientes.

Ele pode concentrar:

- lista de clientes;
- loading;
- erro;
- carregar clientes;
- criar cliente;
- atualizar cliente;
- excluir cliente.

Exemplo conceitual:

```jsx
function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createCustomer(customer) {
    // criar cliente
  }

  async function updateCustomer(customer) {
    // atualizar cliente
  }

  async function deleteCustomer(customerId) {
    // excluir cliente
  }

  return {
    customers,
    loading,
    error,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  };
}
```

---

## Hook useToggle

O `useToggle` será responsável por estados booleanos simples.

Pode ser usado para:

- abrir e fechar modal;
- abrir e fechar menu;
- alternar estados visuais.

Exemplo:

```jsx
function useToggle(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function toggle() {
    setIsOpen((currentValue) => !currentValue);
  }

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  };
}
```

---

## Mover cálculos para utils

Hoje alguns cálculos podem ficar dentro da página.

Exemplo:

```jsx
const clientesAtivos = clientes.filter((cliente) => cliente.status === "ativo");
```

Podemos mover para utils:

```js
export function getClientesAtivos(clientes) {
  return clientes.filter((cliente) => cliente.status === "ativo");
}
```

Assim a página fica mais limpa.

---

## Separação de responsabilidades

Separar responsabilidades significa que cada arquivo deve ter uma função clara.

Exemplo:

```txt
ClienteCard.jsx        → mostra dados do cliente
ClienteForm.jsx        → mostra formulário
ClientesPage.jsx       → monta a tela
useCustomers.js        → controla lógica dos clientes
clientesFakeApi.js     → simula API
customerUtils.js       → filtra/calcula dados
AuthContext.jsx        → controla autenticação
```

Quando cada arquivo tem uma responsabilidade clara, o projeto fica mais profissional.

---

## Como isso será aplicado no CRM Comercial 360

Na Fase 08, vamos:

- criar `useLocalStorage`;
- criar `useCustomers`;
- criar `useToggle`;
- criar utils para clientes;
- reorganizar parte da lógica da `ClientesPage`;
- manter services separados;
- reduzir o tamanho da página de clientes;
- manter o comportamento atual funcionando.

---

## Critério de conclusão da Fase 08

A Fase 08 será considerada concluída quando:

- `useLocalStorage` existir;
- `useCustomers` existir;
- `useToggle` existir;
- chamadas continuarem em services;
- cálculos forem movidos para utils;
- a estrutura de pastas estiver clara;
- a `ClientesPage` estiver mais limpa;
- o CRUD continuar funcionando;
- filtros continuarem funcionando;
- modal/menu continuarem funcionando;
- autenticação continuar funcionando;
- rotas privadas continuarem funcionando;
- o projeto rodar no navegador sem erro;
- README estiver atualizado;
- tag `v0.9.0` estiver criada.

---

## Resumo da Fase 08

A Fase 08 melhora a arquitetura do CRM Comercial 360.

O foco não é adicionar uma nova tela, mas transformar o código em algo mais organizado, reaproveitável e parecido com projetos reais de mercado.