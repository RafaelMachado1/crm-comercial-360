# Fase 04 — Listas, filtros e formulários controlados

## Objetivo da fase

A Fase 04 tem como objetivo aprofundar o trabalho com listas, filtros e formulários controlados no React.

Até a Fase 03, o CRM Comercial 360 já possui componentes, props, children, state, eventos, filtro simples por status, modal e interações básicas.

Nesta fase, vamos evoluir a interface para permitir:

- busca de clientes por texto;
- filtros combinados;
- formulário controlado para cadastrar novo cliente;
- atualização de lista com novo item;
- validações simples;
- mensagens condicionais;
- organização melhor da área de clientes.

---

## O que será estudado

- Renderização de listas
- Filtros com `filter`
- Busca textual com `includes`
- Combinação de filtros
- Formulários controlados
- `value`
- `onChange`
- Estado de formulário
- Estado com objeto
- Estado com array
- Validação simples
- `onSubmit`
- `event.preventDefault()`
- Limpeza de formulário
- Atualização imutável de listas

---

## O que é uma lista no React?

Uma lista no React é normalmente renderizada usando `map`.

Exemplo:

```jsx
const clientes = [
  { id: 1, nome: "Cervejaria Odin" },
  { id: 2, nome: "Hotel Imperial" },
];

function ListaClientes() {
  return (
    <div>
      {clientes.map((cliente) => (
        <p key={cliente.id}>{cliente.nome}</p>
      ))}
    </div>
  );
}
```

O `map` percorre o array e retorna um elemento JSX para cada item.

---

## Por que usar key?

Quando renderizamos listas, o React precisa identificar cada item.

Por isso usamos a prop `key`.

Exemplo:

```jsx
{clientes.map((cliente) => (
  <ClienteCard key={cliente.id} cliente={cliente} />
))}
```

A `key` ajuda o React a entender qual item foi adicionado, removido ou atualizado.

O ideal é usar um ID único.

Evite usar o índice do array como `key`, principalmente quando a lista pode mudar.

---

## Filtros em listas

Filtros permitem exibir apenas parte dos dados.

Exemplo:

```jsx
const clientesAtivos = clientes.filter((cliente) => {
  return cliente.status === "ativo";
});
```

No CRM, filtros serão usados para:

- clientes ativos;
- clientes pendentes;
- clientes inativos;
- clientes por cidade;
- clientes por segmento;
- clientes por busca textual.

---

## Busca textual com includes

Para buscar texto dentro de uma string, podemos usar `includes`.

Exemplo:

```jsx
const termoBusca = "odin";

const clientesFiltrados = clientes.filter((cliente) => {
  return cliente.nome.toLowerCase().includes(termoBusca.toLowerCase());
});
```

Usamos `toLowerCase()` para evitar problema com letras maiúsculas e minúsculas.

Assim, buscar por `odin`, `Odin` ou `ODIN` funciona.

---

## Combinação de filtros

Podemos combinar mais de um filtro.

Exemplo:

```jsx
const clientesFiltrados = clientes.filter((cliente) => {
  const correspondeStatus =
    statusSelecionado === "todos" || cliente.status === statusSelecionado;

  const correspondeBusca = cliente.nome
    .toLowerCase()
    .includes(termoBusca.toLowerCase());

  return correspondeStatus && correspondeBusca;
});
```

Neste exemplo, o cliente só aparece se passar nos dois filtros:

- status;
- busca textual.

---

## O que é formulário controlado?

Um formulário controlado é um formulário em que os valores dos campos são controlados pelo state do React.

Exemplo:

```jsx
const [nome, setNome] = useState("");

<input
  value={nome}
  onChange={(event) => setNome(event.target.value)}
/>
```

Aqui:

- `nome` guarda o valor atual do input;
- `setNome` atualiza o valor;
- `value` conecta o input ao state;
- `onChange` atualiza o state a cada digitação.

---

## Por que usar formulário controlado?

Formulários controlados permitem:

- ler os valores dos campos;
- validar dados;
- limpar o formulário;
- montar objetos;
- enviar dados;
- controlar a interface;
- exibir mensagens de erro.

No CRM, isso será usado para cadastrar novos clientes.

---

## Estado de formulário com objeto

Quando o formulário tem vários campos, podemos guardar tudo em um objeto.

Exemplo:

```jsx
const [formCliente, setFormCliente] = useState({
  nome: "",
  cidade: "",
  segmento: "",
  status: "ativo",
});
```

Para atualizar um campo:

```jsx
function handleChange(event) {
  const { name, value } = event.target;

  setFormCliente({
    ...formCliente,
    [name]: value,
  });
}
```

Aqui usamos:

- destructuring;
- computed property `[name]`;
- spread operator;
- imutabilidade.

---

## O que é name no input?

O atributo `name` identifica qual campo está sendo alterado.

Exemplo:

```jsx
<input
  name="nome"
  value={formCliente.nome}
  onChange={handleChange}
/>
```

Quando esse input muda, `event.target.name` será `"nome"`.

Isso permite usar uma única função `handleChange` para vários campos.

---

## Computed property

Computed property permite usar uma variável como nome de propriedade.

Exemplo:

```jsx
const campo = "nome";

const cliente = {
  [campo]: "Cervejaria Odin",
};
```

Resultado:

```js
{
  nome: "Cervejaria Odin"
}
```

No formulário, isso permite atualizar dinamicamente o campo correto:

```jsx
setFormCliente({
  ...formCliente,
  [name]: value,
});
```

---

## onSubmit

`onSubmit` é o evento usado no envio de formulário.

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

O `event.preventDefault()` impede que a página recarregue.

---

## Criando um novo item

Para cadastrar um novo cliente, criamos um objeto com os dados do formulário.

Exemplo:

```jsx
const novoCliente = {
  id: Date.now(),
  nome: formCliente.nome,
  cidade: formCliente.cidade,
  segmento: formCliente.segmento,
  status: formCliente.status,
  totalComprado: 0,
};
```

Depois adicionamos na lista:

```jsx
setClientes([...clientes, novoCliente]);
```

Isso cria um novo array sem alterar o original.

---

## Limpando o formulário

Depois de cadastrar, limpamos os campos:

```jsx
setFormCliente({
  nome: "",
  cidade: "",
  segmento: "",
  status: "ativo",
});
```

Assim o formulário volta ao estado inicial.

---

## Validação simples

Antes de cadastrar, podemos validar se os campos obrigatórios foram preenchidos.

Exemplo:

```jsx
if (!formCliente.nome || !formCliente.cidade) {
  setErroFormulario("Preencha nome e cidade.");
  return;
}
```

No CRM, vamos validar:

- nome;
- cidade;
- segmento.

Se algum campo estiver vazio, uma mensagem será exibida.

---

## Estado de erro no formulário

Podemos criar um estado para erro:

```jsx
const [erroFormulario, setErroFormulario] = useState("");
```

Se houver erro:

```jsx
setErroFormulario("Preencha todos os campos obrigatórios.");
```

Para limpar:

```jsx
setErroFormulario("");
```

Na tela:

```jsx
{erroFormulario && <p>{erroFormulario}</p>}
```

---

## Estado de sucesso

Também podemos exibir mensagem de sucesso:

```jsx
const [mensagemSucesso, setMensagemSucesso] = useState("");
```

Depois do cadastro:

```jsx
setMensagemSucesso("Cliente cadastrado com sucesso.");
```

Na tela:

```jsx
{mensagemSucesso && <p>{mensagemSucesso}</p>}
```

---

## Atualização imutável de array

No React, não devemos fazer:

```jsx
clientes.push(novoCliente);
```

O correto é:

```jsx
setClientes([...clientes, novoCliente]);
```

Assim o React recebe um novo array e consegue atualizar a tela.

---

## Formulário e lista trabalhando juntos

Nesta fase, teremos duas partes conectadas:

1. Formulário para cadastrar cliente.
2. Lista para exibir clientes.

Fluxo:

```txt
Usuário preenche formulário
↓
Clica em cadastrar
↓
React valida os campos
↓
Cria novo cliente
↓
Atualiza lista com setClientes
↓
Formulário é limpo
↓
Novo cliente aparece na tela
```

---

## Como isso será aplicado no CRM Comercial 360

Nesta fase, vamos aplicar:

- busca textual por cliente;
- filtro por status;
- filtro por segmento;
- formulário controlado de novo cliente;
- validação simples;
- mensagem de erro;
- mensagem de sucesso;
- atualização da lista de clientes;
- mensagem quando nenhum cliente for encontrado.

---

## Critério de conclusão da Fase 04

A Fase 04 será considerada concluída quando:

- existir busca textual por nome do cliente;
- existir filtro por status;
- existir filtro por segmento;
- os filtros funcionarem juntos;
- existir formulário controlado para cadastrar cliente;
- o formulário validar campos obrigatórios;
- novo cliente aparecer na lista;
- formulário limpar após cadastro;
- mensagens de erro e sucesso aparecerem corretamente;
- o projeto rodar no navegador sem erro;
- README estiver atualizado;
- tag `v0.5.0` estiver criada.

---

## Resumo da Fase 04

A Fase 04 aprofunda a manipulação de listas e formulários no React.

Essa fase é importante porque aproxima o CRM de uma aplicação real, onde o usuário consegue buscar, filtrar e cadastrar informações pela interface.