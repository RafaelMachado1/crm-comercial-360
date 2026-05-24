# Fase 08 — Exercícios guiados

## Objetivo dos exercícios

Praticar os conceitos principais da Fase 08 antes de aplicar no CRM Comercial 360.

Nesta fase, o foco é entender:

- `useRef`
- `useMemo`
- `useCallback`
- hooks customizados
- organização profissional
- services
- utils
- separação de responsabilidades

---

## Exercício 1 — Entendendo o problema de lógica misturada com JSX

### Objetivo

Perceber quando uma página começa a concentrar responsabilidades demais.

### Exemplo de problema

```jsx
function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [formCliente, setFormCliente] = useState({});
  const [termoBusca, setTermoBusca] = useState("");
  const [statusSelecionado, setStatusSelecionado] = useState("todos");

  function criarCliente() {
    // regra de cadastro
  }

  function editarCliente() {
    // regra de edição
  }

  function excluirCliente() {
    // regra de exclusão
  }

  const clientesFiltrados = clientes.filter(() => {
    // regra de filtros
  });

  return (
    <main>
      {/* muito JSX */}
    </main>
  );
}
```

### O que observar

- A página mistura state, CRUD, filtros, formulário e JSX.
- Com o tempo, fica difícil entender e manter.
- Hooks customizados ajudam a separar essa lógica.

---

## Exercício 2 — Criar um hook customizado simples

### Objetivo

Entender que um hook customizado é uma função que começa com `use` e retorna dados/funções.

### Exemplo

```jsx
import { useState } from "react";

function useCounter() {
  const [contador, setContador] = useState(0);

  function incrementar() {
    setContador((valorAtual) => valorAtual + 1);
  }

  function zerar() {
    setContador(0);
  }

  return {
    contador,
    incrementar,
    zerar,
  };
}

export default useCounter;
```

### Uso

```jsx
const { contador, incrementar, zerar } = useCounter();
```

### O que observar

- O hook usa `useState`.
- O hook não retorna JSX.
- O hook retorna estado e funções.
- A lógica fica separada da interface.

---

## Exercício 3 — Criar useToggle

### Objetivo

Criar um hook reutilizável para estados booleanos.

### Exemplo

```jsx
import { useState } from "react";

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

export default useToggle;
```

### Uso

```jsx
const sidebar = useToggle(true);

<button onClick={sidebar.toggle}>
  {sidebar.isOpen ? "Fechar menu" : "Abrir menu"}
</button>
```

### O que observar

- O hook pode ser usado para sidebar, modal ou outros estados booleanos.
- A página/componente fica mais limpo.
- A lógica de abrir/fechar fica reaproveitável.

---

## Exercício 4 — Criar useLocalStorage

### Objetivo

Centralizar leitura e escrita no `localStorage`.

### Exemplo

```jsx
import { useEffect, useState } from "react";

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

export default useLocalStorage;
```

### Uso

```jsx
const [clientes, setClientes] = useLocalStorage("crm-clientes", []);
```

### O que observar

- O hook lê dados do localStorage.
- O hook salva dados no localStorage.
- O componente que usa o hook não precisa saber os detalhes de `JSON.parse` e `JSON.stringify`.

---

## Exercício 5 — Criar função utilitária pura

### Objetivo

Entender que `utils` guardam funções auxiliares que não dependem do React.

### Exemplo

```js
export function getCustomersByStatus(customers, status) {
  if (status === "todos") {
    return customers;
  }

  return customers.filter((customer) => customer.status === status);
}
```

### Uso

```js
const clientesAtivos = getCustomersByStatus(customers, "ativo");
```

### O que observar

- A função não usa `useState`, `useEffect` nem JSX.
- Ela recebe dados e retorna dados.
- Isso facilita testes e manutenção.

---

## Exercício 6 — Criar filtro em utils

### Objetivo

Mover a lógica de filtro para fora da página.

### Exemplo

```js
export function filterCustomers(customers, filters) {
  const { searchTerm, status, segment } = filters;

  return customers.filter((customer) => {
    const matchesSearch = customer.nome
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus = status === "todos" || customer.status === status;

    const matchesSegment =
      segment === "todos" || customer.segmento === segment;

    return matchesSearch && matchesStatus && matchesSegment;
  });
}
```

### O que observar

- A regra de filtro saiu da página.
- A página apenas usa a função.
- O nome da função deixa clara sua responsabilidade.

---

## Exercício 7 — Usar useMemo para cálculo derivado

### Objetivo

Entender como memorizar um cálculo derivado.

### Exemplo

```jsx
import { useMemo } from "react";

const clientesFiltrados = useMemo(() => {
  return filterCustomers(clientes, {
    searchTerm: termoBusca,
    status: statusSelecionado,
    segment: segmentoSelecionado,
  });
}, [clientes, termoBusca, statusSelecionado, segmentoSelecionado]);
```

### O que observar

- `useMemo` memoriza o resultado do filtro.
- O cálculo só roda novamente quando as dependências mudam.
- Isso pode ser útil quando a lista cresce.

---

## Exercício 8 — Usar useCallback para função passada por props

### Objetivo

Entender como memorizar funções.

### Exemplo

```jsx
import { useCallback } from "react";

const handleDeleteCustomer = useCallback((customerId) => {
  setCustomers((currentCustomers) => {
    return currentCustomers.filter((customer) => customer.id !== customerId);
  });
}, []);
```

### O que observar

- `useCallback` memoriza a função.
- Pode ser útil quando a função é passada para componentes filhos.
- Não deve ser usado em tudo sem necessidade.

---

## Exercício 9 — Criar useCustomers

### Objetivo

Separar a lógica principal de clientes.

### Exemplo conceitual

```jsx
function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadCustomers() {
    // buscar clientes
  }

  async function createCustomer(customer) {
    // criar cliente
  }

  async function updateCustomer(customer) {
    // editar cliente
  }

  async function deleteCustomer(customerId) {
    // excluir cliente
  }

  return {
    customers,
    loading,
    error,
    loadCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    setError,
  };
}
```

### O que observar

- O hook concentra CRUD.
- A página passa a chamar funções do hook.
- A regra de negócio fica menos misturada com JSX.

---

## Exercício 10 — Como deve ficar a página mais limpa

### Objetivo

Visualizar o resultado esperado.

### Antes

```jsx
function ClientesPage() {
  // muitos states
  // muitas funções
  // muitos filtros
  // muito JSX
}
```

### Depois

```jsx
function ClientesPage() {
  const customers = useCustomers();
  const form = useCustomerForm();
  const filters = useCustomerFilters(customers.customers);

  return (
    <>
      {/* JSX da página usando dados e funções dos hooks */}
    </>
  );
}
```

### O que observar

- A página continua montando a tela.
- A lógica fica nos hooks.
- Os nomes ajudam a entender o que cada parte faz.