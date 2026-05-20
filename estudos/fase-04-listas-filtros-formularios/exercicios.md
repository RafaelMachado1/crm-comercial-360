# Fase 04 — Exercícios guiados

## Objetivo dos exercícios

Praticar listas, filtros e formulários controlados antes de aplicar no CRM real.

Nesta fase, o foco é entender:

- renderização de listas;
- busca textual;
- filtros combinados;
- formulário controlado;
- estado de formulário com objeto;
- validação simples;
- atualização imutável de arrays.

---

## Exercício 1 — Renderizar lista com map

### Objetivo

Revisar como renderizar uma lista no React usando `map`.

### Exemplo

```jsx
const clientes = [
  { id: 1, nome: "Cervejaria Odin" },
  { id: 2, nome: "Hotel Imperial" },
  { id: 3, nome: "Padaria Central" },
];

function ListaClientes() {
  return (
    <section>
      <h2>Clientes</h2>

      {clientes.map((cliente) => (
        <p key={cliente.id}>{cliente.nome}</p>
      ))}
    </section>
  );
}

export default ListaClientes;
```

### O que observar

- `map` percorre a lista.
- Cada item retorna JSX.
- `key` identifica cada item.
- O ideal é usar `id` como `key`.

---

## Exercício 2 — Filtrar clientes por status

### Objetivo

Usar `filter` para exibir apenas clientes de determinado status.

### Exemplo

```jsx
const clientes = [
  { id: 1, nome: "Cervejaria Odin", status: "ativo" },
  { id: 2, nome: "Restaurante Sabor da Serra", status: "pendente" },
  { id: 3, nome: "Hotel Imperial", status: "ativo" },
];

const clientesAtivos = clientes.filter((cliente) => {
  return cliente.status === "ativo";
});
```

### O que observar

- `filter` cria um novo array.
- O array original não é alterado.
- Apenas clientes com status `ativo` entram no novo array.

---

## Exercício 3 — Busca textual com includes

### Objetivo

Buscar clientes pelo nome.

### Exemplo

```jsx
const termoBusca = "odin";

const clientesFiltrados = clientes.filter((cliente) => {
  return cliente.nome.toLowerCase().includes(termoBusca.toLowerCase());
});
```

### O que observar

- `includes` verifica se um texto contém outro texto.
- `toLowerCase()` evita erro com maiúsculas e minúsculas.
- A busca funciona mesmo digitando `odin`, `Odin` ou `ODIN`.

---

## Exercício 4 — Filtros combinados

### Objetivo

Combinar busca textual com filtro de status.

### Exemplo

```jsx
const termoBusca = "hotel";
const statusSelecionado = "ativo";

const clientesFiltrados = clientes.filter((cliente) => {
  const correspondeBusca = cliente.nome
    .toLowerCase()
    .includes(termoBusca.toLowerCase());

  const correspondeStatus =
    statusSelecionado === "todos" || cliente.status === statusSelecionado;

  return correspondeBusca && correspondeStatus;
});
```

### O que observar

- O cliente precisa passar nos dois filtros.
- Se `statusSelecionado` for `todos`, o status não bloqueia o cliente.
- Essa lógica será usada no CRM.

---

## Exercício 5 — Formulário controlado com um campo

### Objetivo

Entender `value` e `onChange`.

### Exemplo

```jsx
import { useState } from "react";

function FormNome() {
  const [nome, setNome] = useState("");

  return (
    <form>
      <label>
        Nome:
        <input
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
      </label>

      <p>Nome digitado: {nome}</p>
    </form>
  );
}

export default FormNome;
```

### O que observar

- O input mostra o valor do state.
- A cada digitação, `onChange` atualiza o state.
- O React controla o valor do campo.

---

## Exercício 6 — Formulário controlado com objeto

### Objetivo

Controlar vários campos com um único objeto no state.

### Exemplo

```jsx
import { useState } from "react";

function FormCliente() {
  const [formCliente, setFormCliente] = useState({
    nome: "",
    cidade: "",
    segmento: "",
    status: "ativo",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormCliente({
      ...formCliente,
      [name]: value,
    });
  }

  return (
    <form>
      <input
        name="nome"
        value={formCliente.nome}
        onChange={handleChange}
        placeholder="Nome do cliente"
      />

      <input
        name="cidade"
        value={formCliente.cidade}
        onChange={handleChange}
        placeholder="Cidade"
      />

      <input
        name="segmento"
        value={formCliente.segmento}
        onChange={handleChange}
        placeholder="Segmento"
      />

      <select
        name="status"
        value={formCliente.status}
        onChange={handleChange}
      >
        <option value="ativo">Ativo</option>
        <option value="pendente">Pendente</option>
        <option value="inativo">Inativo</option>
      </select>
    </form>
  );
}

export default FormCliente;
```

### O que observar

- `formCliente` guarda todos os campos.
- `name` identifica qual campo está sendo alterado.
- `[name]: value` atualiza o campo correto.
- O spread mantém os outros campos.

---

## Exercício 7 — onSubmit com preventDefault

### Objetivo

Enviar o formulário sem recarregar a página.

### Exemplo

```jsx
function handleSubmit(event) {
  event.preventDefault();

  console.log("Cliente cadastrado:", formCliente);
}

<form onSubmit={handleSubmit}>
  <button type="submit">Cadastrar cliente</button>
</form>
```

### O que observar

- `onSubmit` dispara ao enviar o formulário.
- `event.preventDefault()` impede o reload da página.
- Depois disso, podemos validar, criar objeto e atualizar lista.

---

## Exercício 8 — Validação simples

### Objetivo

Validar campos obrigatórios.

### Exemplo

```jsx
function handleSubmit(event) {
  event.preventDefault();

  if (!formCliente.nome || !formCliente.cidade || !formCliente.segmento) {
    setErroFormulario("Preencha todos os campos obrigatórios.");
    return;
  }

  setErroFormulario("");
}
```

### O que observar

- Se algum campo estiver vazio, a função para no `return`.
- A mensagem de erro fica no state.
- Se tudo estiver certo, limpamos o erro.

---

## Exercício 9 — Adicionar novo cliente na lista

### Objetivo

Atualizar uma lista de forma imutável.

### Exemplo

```jsx
const novoCliente = {
  id: Date.now(),
  nome: formCliente.nome,
  cidade: formCliente.cidade,
  segmento: formCliente.segmento,
  status: formCliente.status,
  totalComprado: 0,
};

setClientes([...clientes, novoCliente]);
```

### O que observar

- Criamos um novo objeto.
- Criamos um novo array com spread.
- Não usamos `push`.
- O React recebe uma nova lista e atualiza a tela.

---

## Exercício 10 — Limpar formulário após cadastro

### Objetivo

Resetar os campos depois do cadastro.

### Exemplo

```jsx
setFormCliente({
  nome: "",
  cidade: "",
  segmento: "",
  status: "ativo",
});
```

### O que observar

- O state volta para o valor inicial.
- Como os inputs são controlados, os campos limpam automaticamente.