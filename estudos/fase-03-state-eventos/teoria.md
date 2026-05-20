# Fase 03 — State, eventos e renderização condicional

## Objetivo da fase

A Fase 03 tem como objetivo adicionar interação real ao CRM Comercial 360 usando `useState`, eventos e renderização condicional.

Até a Fase 02, a tela já foi componentizada, mas ainda está praticamente estática.

Nesta fase, a interface começa a reagir às ações do usuário.

---

## O que será estudado

- `useState`
- Eventos no React
- `onClick`
- `onChange`
- `onSubmit`
- Renderização condicional
- Condicional com `if`
- Condicional com operador ternário
- Condicional com `&&`
- Imutabilidade
- Re-renderização
- Estado com string
- Estado com boolean
- Estado com array
- Estado com objeto

---

## O que é state no React?

State é uma memória interna do componente.

Ele guarda informações que podem mudar com o tempo.

Quando o state muda, o React renderiza a tela novamente para mostrar o novo valor.

Exemplo:

```jsx
import { useState } from "react";

function App() {
  const [contador, setContador] = useState(0);

  return (
    <button onClick={() => setContador(contador + 1)}>
      Cliquei {contador} vezes
    </button>
  );
}
```

Neste exemplo:

- `contador` é o valor atual do estado;
- `setContador` é a função usada para atualizar o estado;
- `useState(0)` define o valor inicial como `0`.

---

## Por que state é importante?

Sem state, a interface não muda.

Com state, podemos criar interações como:

- abrir e fechar menu;
- filtrar clientes;
- selecionar um cliente;
- abrir modal;
- mostrar loading;
- mostrar erro;
- mostrar mensagem de lista vazia;
- atualizar formulário;
- alternar status.

No CRM Comercial 360, state será usado para transformar a tela em uma aplicação interativa.

---

## Como importar useState

Para usar state, importamos `useState` do React:

```jsx
import { useState } from "react";
```

Depois usamos dentro do componente:

```jsx
const [valor, setValor] = useState(valorInicial);
```

---

## Estado boolean

Um estado boolean guarda `true` ou `false`.

É útil para controlar algo que está ligado ou desligado.

Exemplo:

```jsx
const [menuAberto, setMenuAberto] = useState(true);
```

Uso:

```jsx
<button onClick={() => setMenuAberto(!menuAberto)}>
  Abrir/fechar menu
</button>
```

No CRM, isso será usado para abrir e fechar a sidebar.

---

## Estado string

Um estado string guarda texto.

É útil para filtros, campos de busca e seleção.

Exemplo:

```jsx
const [statusSelecionado, setStatusSelecionado] = useState("todos");
```

Uso:

```jsx
<select
  value={statusSelecionado}
  onChange={(event) => setStatusSelecionado(event.target.value)}
>
  <option value="todos">Todos</option>
  <option value="ativo">Ativos</option>
  <option value="pendente">Pendentes</option>
</select>
```

No CRM, isso será usado para filtrar clientes por status.

---

## Estado com objeto

Um estado pode guardar um objeto.

Exemplo:

```jsx
const [clienteSelecionado, setClienteSelecionado] = useState(null);
```

Quando o usuário clicar em um cliente:

```jsx
setClienteSelecionado(cliente);
```

No CRM, isso será usado para abrir um modal com detalhes do cliente.

---

## Estado com array

Um estado pode guardar uma lista.

Exemplo:

```jsx
const [clientes, setClientes] = useState(listaInicial);
```

Para adicionar um cliente:

```jsx
setClientes([...clientes, novoCliente]);
```

Para atualizar um cliente:

```jsx
const clientesAtualizados = clientes.map((cliente) => {
  if (cliente.id === clienteId) {
    return {
      ...cliente,
      status: "ativo",
    };
  }

  return cliente;
});

setClientes(clientesAtualizados);
```

No React, nunca devemos alterar arrays diretamente.

---

## Eventos no React

Eventos são ações do usuário na interface.

Exemplos:

- clique em botão;
- digitação em input;
- envio de formulário;
- mudança em select;
- seleção de item.

No React, eventos são escritos em camelCase.

HTML comum:

```html
<button onclick="fazerAlgo()">Clique</button>
```

React:

```jsx
<button onClick={fazerAlgo}>Clique</button>
```

---

## Evento onClick

`onClick` é usado quando o usuário clica em algo.

Exemplo:

```jsx
function App() {
  function mostrarMensagem() {
    console.log("Botão clicado");
  }

  return <button onClick={mostrarMensagem}>Clique aqui</button>;
}
```

Também podemos usar função inline:

```jsx
<button onClick={() => setMenuAberto(!menuAberto)}>
  Alternar menu
</button>
```

---

## Evento onChange

`onChange` é usado quando o valor de um campo muda.

Exemplo com input:

```jsx
const [busca, setBusca] = useState("");

<input
  value={busca}
  onChange={(event) => setBusca(event.target.value)}
/>
```

Exemplo com select:

```jsx
<select
  value={status}
  onChange={(event) => setStatus(event.target.value)}
>
  <option value="todos">Todos</option>
  <option value="ativo">Ativo</option>
</select>
```

---

## Evento onSubmit

`onSubmit` é usado em formulários.

Exemplo:

```jsx
function handleSubmit(event) {
  event.preventDefault();
  console.log("Formulário enviado");
}

<form onSubmit={handleSubmit}>
  <button type="submit">Salvar</button>
</form>
```

O `event.preventDefault()` evita que a página recarregue.

Formulários serão aprofundados na Fase 04.

---

## Renderização condicional

Renderização condicional significa mostrar ou esconder elementos de acordo com uma condição.

Exemplo:

```jsx
{menuAberto && <Sidebar />}
```

Se `menuAberto` for `true`, a sidebar aparece.

Se for `false`, ela não aparece.

---

## Condicional com operador ternário

O ternário é usado para escolher entre duas opções.

Exemplo:

```jsx
{clientes.length > 0 ? (
  <p>Existem clientes cadastrados.</p>
) : (
  <p>Nenhum cliente encontrado.</p>
)}
```

No CRM, isso será usado para mensagens de lista vazia.

---

## Condicional com &&

O `&&` é usado quando queremos mostrar algo apenas se a condição for verdadeira.

Exemplo:

```jsx
{clienteSelecionado && (
  <ModalCliente cliente={clienteSelecionado} />
)}
```

Se `clienteSelecionado` existir, o modal aparece.

---

## Condicional com if

Dentro de funções, podemos usar `if`.

Exemplo:

```jsx
function getMensagem(status) {
  if (status === "ativo") {
    return "Cliente ativo";
  }

  if (status === "pendente") {
    return "Cliente pendente";
  }

  return "Cliente inativo";
}
```

---

## Re-renderização

Re-renderização é quando o React atualiza a tela depois de uma mudança de estado.

Exemplo:

```jsx
const [contador, setContador] = useState(0);
```

Quando chamamos:

```jsx
setContador(contador + 1);
```

o React atualiza o valor e renderiza o componente novamente.

Isso é o que faz a tela mudar sem recarregar a página inteira.

---

## Imutabilidade

Imutabilidade significa não alterar diretamente arrays e objetos.

Errado:

```jsx
cliente.status = "ativo";
```

Certo:

```jsx
const clienteAtualizado = {
  ...cliente,
  status: "ativo",
};
```

Errado:

```jsx
clientes.push(novoCliente);
```

Certo:

```jsx
const clientesAtualizados = [...clientes, novoCliente];
```

No React, imutabilidade é essencial porque o React precisa perceber que o dado mudou.

---

## O que será aplicado no CRM Comercial 360

Nesta fase, vamos aplicar state e eventos em pontos reais da interface:

### 1. Menu lateral abre/fecha

Usaremos um estado boolean:

```jsx
const [sidebarAberta, setSidebarAberta] = useState(true);
```

### 2. Filtro de clientes por status

Usaremos estado string:

```jsx
const [statusSelecionado, setStatusSelecionado] = useState("todos");
```

### 3. Cliente prioritário

Usaremos estado para guardar o ID do cliente destacado:

```jsx
const [clientePrioritarioId, setClientePrioritarioId] = useState(null);
```

### 4. Modal de detalhes do cliente

Usaremos estado com objeto:

```jsx
const [clienteSelecionado, setClienteSelecionado] = useState(null);
```

### 5. Estados simulados

Vamos simular:

```jsx
const [loading, setLoading] = useState(false);
const [erro, setErro] = useState("");
```

---

## Critério de conclusão da Fase 03

A Fase 03 será considerada concluída quando:

- o menu lateral puder abrir e fechar;
- existir filtro de clientes por status;
- for possível destacar um cliente prioritário;
- existir modal simples de detalhes do cliente;
- existir renderização condicional para loading, erro ou lista vazia;
- o state for usado sem mutação direta;
- o projeto rodar no navegador sem erro;
- o README estiver atualizado;
- a tag `v0.4.0` estiver criada.

---

## Resumo da Fase 03

A Fase 03 transforma a tela componentizada em uma tela interativa.

Nesta fase, o CRM Comercial 360 começa a responder às ações do usuário.

O foco principal é entender como o React atualiza a interface com base em mudanças de estado.