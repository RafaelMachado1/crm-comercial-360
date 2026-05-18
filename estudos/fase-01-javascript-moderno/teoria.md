# Fase 01 — JavaScript moderno para React

## Objetivo da fase

A Fase 01 tem como objetivo revisar os recursos de JavaScript moderno mais usados no React.

Antes de aprofundar em componentes, props, state, hooks, formulários e API, preciso dominar bem manipulação de arrays, objetos, funções e operações assíncronas.

Nesta fase, os exercícios serão feitos de forma isolada dentro da pasta `estudos/`, sem depender da aplicação React em `src/`.

---

## Por que estudar JavaScript antes do React?

React é JavaScript.

Mesmo usando JSX e componentes, grande parte da lógica da aplicação depende de JavaScript.

No React, JavaScript será usado para:

- renderizar listas;
- filtrar dados;
- buscar itens por ID;
- calcular indicadores;
- atualizar arrays e objetos;
- trabalhar com dados vindos de API;
- manipular estado sem alterar dados diretamente;
- criar funções auxiliares.

---

## map

O método `map` percorre um array e retorna um novo array transformado.

Exemplo:

```js
const nomesClientes = clientes.map((cliente) => cliente.nome);
```

No React, será usado para renderizar listas:

```jsx
{clientes.map((cliente) => (
  <p key={cliente.id}>{cliente.nome}</p>
))}
```

O `map` não altera o array original.

---

## filter

O método `filter` percorre um array e retorna um novo array apenas com os itens que passam em uma condição.

Exemplo:

```js
const clientesAtivos = clientes.filter((cliente) => cliente.status === "ativo");
```

No CRM, será usado para filtrar:

- clientes ativos;
- clientes pendentes;
- oportunidades abertas;
- atividades atrasadas;
- produtos com estoque.

O `filter` também não altera o array original.

---

## find

O método `find` procura um item dentro de um array e retorna o primeiro item encontrado.

Exemplo:

```js
const clienteEncontrado = clientes.find((cliente) => cliente.id === 1);
```

Se nenhum item for encontrado, o resultado será `undefined`.

No CRM, será útil para buscar cliente por ID, produto específico ou dados de uma tela de detalhe.

---

## reduce

O método `reduce` percorre um array e acumula um resultado.

Exemplo:

```js
const totalVendido = vendas.reduce((total, venda) => {
  return total + venda.valor;
}, 0);
```

No CRM, será usado para calcular:

- total vendido;
- valor total em estoque;
- total de oportunidades;
- ticket médio;
- indicadores do dashboard.

---

## destructuring

Destructuring permite extrair valores de objetos ou arrays.

Exemplo:

```js
const cliente = {
  nome: "Cervejaria Odin",
  cidade: "Teresópolis",
};

const { nome, cidade } = cliente;
```

No React, será muito usado em props:

```jsx
function ClienteCard({ nome, cidade }) {
  return <h2>{nome}</h2>;
}
```

---

## spread operator

O spread operator `...` permite copiar arrays e objetos.

Exemplo com array:

```js
const clientesAtualizados = [...clientes, novoCliente];
```

Exemplo com objeto:

```js
const clienteAtualizado = {
  ...cliente,
  status: "ativo",
};
```

No React, isso é essencial para atualizar estado sem alterar o dado original.

---

## rest operator

O rest operator também usa `...`, mas serve para agrupar o restante dos dados.

Exemplo:

```js
const { nome, ...restante } = cliente;
```

Aqui, `nome` fica separado e as outras propriedades ficam dentro de `restante`.

Também pode ser usado em funções:

```js
function somar(...numeros) {
  return numeros.reduce((total, numero) => total + numero, 0);
}
```

---

## template strings

Template strings permitem montar textos usando crase e interpolação.

Exemplo:

```js
const mensagem = `Cliente ${nome} está com status ${status}`;
```

No CRM, isso pode ser usado para mensagens, labels, logs e textos dinâmicos.

---

## optional chaining

Optional chaining `?.` permite acessar propriedades que podem não existir sem quebrar a aplicação.

Exemplo:

```js
const telefone = cliente.contato?.telefone;
```

Se `contato` não existir, o código não quebra. O resultado será `undefined`.

Isso é muito útil ao lidar com dados vindos de API.

---

## import e export

`export` permite disponibilizar uma variável, função ou componente para outro arquivo.

Exemplo:

```js
export const clientes = [];
```

`import` permite usar esse conteúdo em outro arquivo:

```js
import { clientes } from "./data/mockData";
```

No React, usamos import/export para separar componentes, dados, páginas e funções.

Nesta fase, os exercícios serão independentes. O import/export será entendido na teoria e usado no `src/data/mockData.js`.

---

## Promises

Promise representa uma operação assíncrona, ou seja, algo que pode demorar para responder.

Exemplo:

```js
function buscarClientes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(clientes);
    }, 2000);
  });
}
```

No React, Promises aparecem em:

- chamadas de API;
- login;
- envio de formulários;
- carregamento de dados.

---

## async/await

`async/await` é uma forma mais legível de trabalhar com Promises.

Exemplo:

```js
async function carregarClientes() {
  const dados = await buscarClientes();
  console.log(dados);
}
```

O `await` espera a Promise terminar antes de continuar.

---

## Imutabilidade

Imutabilidade significa não alterar diretamente um array ou objeto original.

Errado:

```js
cliente.status = "ativo";
```

Certo:

```js
const clienteAtualizado = {
  ...cliente,
  status: "ativo",
};
```

No React, a imutabilidade é fundamental para que a interface atualize corretamente.

---

## Resumo da Fase 01

Nesta fase, o foco é dominar JavaScript moderno aplicado ao contexto do CRM Comercial 360.

Ao final, devo conseguir:

- manipular arrays com `map`, `filter`, `find` e `reduce`;
- copiar e atualizar dados sem mutação direta;
- usar destructuring;
- usar spread e rest operator;
- usar optional chaining;
- entender Promises;
- usar async/await;
- preparar dados mockados que serão usados no projeto React.