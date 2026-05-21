# Fase 05 — Exercícios guiados

## Objetivo dos exercícios

Praticar os conceitos principais da Fase 05 antes de aplicar no CRM real.

Nesta fase, o foco é entender:

- `useEffect`;
- array de dependências;
- `localStorage`;
- `JSON.stringify`;
- `JSON.parse`;
- API fake;
- CRUD;
- persistência de dados;
- atualização imutável.

---

## Exercício 1 — useEffect executando ao carregar

### Objetivo

Entender como executar uma ação quando o componente carrega pela primeira vez.

### Exemplo

```jsx
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("Componente carregou");
  }, []);

  return <h1>CRM Comercial 360</h1>;
}

export default App;
```

### O que observar

- O `useEffect` foi importado do React.
- O array vazio `[]` faz o efeito rodar apenas uma vez.
- Esse padrão será usado para carregar clientes do `localStorage`.

---

## Exercício 2 — useEffect reagindo a uma mudança de estado

### Objetivo

Entender como executar uma ação sempre que um state mudar.

### Exemplo

```jsx
import { useEffect, useState } from "react";

function Contador() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log("Contador mudou:", contador);
  }, [contador]);

  return (
    <button onClick={() => setContador(contador + 1)}>
      Contador: {contador}
    </button>
  );
}

export default Contador;
```

### O que observar

- O efeito roda quando `contador` muda.
- O array `[contador]` define a dependência.
- Esse padrão será usado para salvar clientes quando a lista mudar.

---

## Exercício 3 — Salvar texto no localStorage

### Objetivo

Entender como salvar uma informação simples no navegador.

### Exemplo

```js
localStorage.setItem("nome", "Rafael");
```

Para buscar:

```js
const nomeSalvo = localStorage.getItem("nome");

console.log(nomeSalvo);
```

### O que observar

- `setItem` salva.
- `getItem` lê.
- O localStorage armazena valores como texto.
- O dado permanece salvo mesmo depois de atualizar a página.

---

## Exercício 4 — Salvar array no localStorage

### Objetivo

Entender como salvar arrays e objetos no navegador.

### Exemplo

```js
const clientes = [
  {
    id: 1,
    nome: "Cervejaria Odin",
  },
];

localStorage.setItem("clientes", JSON.stringify(clientes));
```

Para recuperar:

```js
const clientesSalvos = localStorage.getItem("clientes");

const clientesConvertidos = JSON.parse(clientesSalvos);

console.log(clientesConvertidos);
```

### O que observar

- `JSON.stringify` transforma array em texto.
- `JSON.parse` transforma texto novamente em array.
- Sem isso, não conseguimos salvar objetos corretamente no localStorage.

---

## Exercício 5 — Carregar dados do localStorage no React

### Objetivo

Carregar dados salvos quando o componente abrir.

### Exemplo

```jsx
import { useEffect, useState } from "react";

const clientesIniciais = [
  { id: 1, nome: "Cervejaria Odin" },
  { id: 2, nome: "Hotel Imperial" },
];

function App() {
  const [clientes, setClientes] = useState(clientesIniciais);

  useEffect(() => {
    const clientesSalvos = localStorage.getItem("clientes");

    if (clientesSalvos) {
      setClientes(JSON.parse(clientesSalvos));
    }
  }, []);

  return (
    <div>
      {clientes.map((cliente) => (
        <p key={cliente.id}>{cliente.nome}</p>
      ))}
    </div>
  );
}

export default App;
```

### O que observar

- O efeito roda uma vez ao carregar.
- Buscamos a chave `clientes`.
- Se existir dado salvo, atualizamos o state.
- Se não existir, o state continua com os dados iniciais.

---

## Exercício 6 — Salvar dados quando o state mudar

### Objetivo

Salvar a lista no localStorage sempre que ela mudar.

### Exemplo

```jsx
useEffect(() => {
  localStorage.setItem("clientes", JSON.stringify(clientes));
}, [clientes]);
```

### O que observar

- O efeito roda sempre que `clientes` muda.
- A lista é convertida para texto com `JSON.stringify`.
- Esse padrão mantém os dados persistidos.

---

## Exercício 7 — Simular API fake

### Objetivo

Simular uma chamada assíncrona como se fosse uma API real.

### Exemplo

```js
function buscarClientesFake() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, nome: "Cervejaria Odin" },
        { id: 2, nome: "Hotel Imperial" },
      ]);
    }, 1000);
  });
}
```

Uso com async/await:

```js
async function carregarClientes() {
  const dados = await buscarClientesFake();

  console.log(dados);
}
```

### O que observar

- A Promise simula uma resposta de API.
- `setTimeout` simula o tempo de carregamento.
- `async/await` deixa o código mais legível.
- Isso prepara o caminho para consumir uma API real no futuro.

---

## Exercício 8 — Create no CRUD

### Objetivo

Criar um novo cliente.

### Exemplo

```jsx
const novoCliente = {
  id: Date.now(),
  nome: "Novo Cliente",
  cidade: "Teresópolis",
  segmento: "Cervejaria",
  status: "ativo",
  totalComprado: 0,
};

setClientes([...clientes, novoCliente]);
```

### O que observar

- Criamos um novo objeto.
- Criamos um novo array com spread.
- Não usamos `push`.
- Isso mantém a imutabilidade.

---

## Exercício 9 — Read no CRUD

### Objetivo

Listar clientes.

### Exemplo

```jsx
{clientes.map((cliente) => (
  <ClienteCard key={cliente.id} cliente={cliente} />
))}
```

### O que observar

- `map` renderiza a lista.
- `key` identifica cada cliente.
- O componente recebe dados por props.

---

## Exercício 10 — Update no CRUD

### Objetivo

Editar um cliente existente.

### Exemplo

```jsx
const clienteEditado = {
  id: 1,
  nome: "Cervejaria Odin Atualizada",
  cidade: "Teresópolis",
  segmento: "Cervejaria",
  status: "ativo",
  totalComprado: 2500,
};

const clientesAtualizados = clientes.map((cliente) => {
  if (cliente.id === clienteEditado.id) {
    return clienteEditado;
  }

  return cliente;
});

setClientes(clientesAtualizados);
```

### O que observar

- `map` percorre a lista.
- Se encontrar o cliente correto, troca pelo editado.
- Os demais clientes continuam iguais.
- Não alteramos o objeto original diretamente.

---

## Exercício 11 — Delete no CRUD

### Objetivo

Excluir um cliente.

### Exemplo

```jsx
const clientesAtualizados = clientes.filter((cliente) => {
  return cliente.id !== clienteId;
});

setClientes(clientesAtualizados);
```

### O que observar

- `filter` cria uma nova lista sem o cliente excluído.
- Não usamos `splice`.
- O React recebe um novo array.

---

## Exercício 12 — Confirmar exclusão

### Objetivo

Pedir confirmação antes de excluir.

### Exemplo

```jsx
function excluirCliente(clienteId) {
  const confirmar = window.confirm("Deseja excluir este cliente?");

  if (!confirmar) {
    return;
  }

  const clientesAtualizados = clientes.filter((cliente) => {
    return cliente.id !== clienteId;
  });

  setClientes(clientesAtualizados);
}
```

### O que observar

- `window.confirm` retorna `true` ou `false`.
- Se o usuário cancelar, a função para.
- Se confirmar, o cliente é removido.

---

## Exercício 13 — Editar com formulário controlado

### Objetivo

Usar o mesmo formulário para cadastrar e editar.

### Exemplo conceitual

```jsx
const [clienteEmEdicao, setClienteEmEdicao] = useState(null);

function iniciarEdicao(cliente) {
  setClienteEmEdicao(cliente);

  setFormCliente({
    nome: cliente.nome,
    cidade: cliente.cidade,
    segmento: cliente.segmento,
    status: cliente.status,
  });
}
```

No submit:

```jsx
if (clienteEmEdicao) {
  const clientesAtualizados = clientes.map((cliente) => {
    if (cliente.id === clienteEmEdicao.id) {
      return {
        ...cliente,
        ...formCliente,
      };
    }

    return cliente;
  });

  setClientes(clientesAtualizados);
}
```

### O que observar

- `clienteEmEdicao` controla se estamos editando ou cadastrando.
- O formulário recebe os dados do cliente.
- O submit decide se cria ou atualiza.