# Fase 05 — useEffect, localStorage, API fake e CRUD

## Objetivo da fase

A Fase 05 tem como objetivo evoluir o CRM Comercial 360 para trabalhar com efeitos colaterais, persistência local, simulação de API e operações básicas de CRUD.

Até a Fase 04, o projeto já possui:

- componentes reutilizáveis;
- props;
- children;
- state;
- eventos;
- renderização condicional;
- filtros;
- busca textual;
- formulário controlado;
- cadastro de cliente em memória.

Porém, até agora, os dados ainda se perdem quando a página é recarregada.

Nesta fase, vamos começar a resolver isso usando `useEffect` e `localStorage`.

---

## O que será estudado

- `useEffect`
- Ciclo de vida básico de um componente
- Array de dependências
- Efeito ao carregar a página
- Efeito quando um state muda
- `localStorage`
- `JSON.stringify`
- `JSON.parse`
- API fake
- Simulação de carregamento
- CRUD
- Create
- Read
- Update
- Delete
- Separação de responsabilidades

---

## O que é useEffect?

`useEffect` é um hook do React usado para executar efeitos colaterais.

Efeitos colaterais são ações que acontecem fora da renderização normal da interface.

Exemplos:

- buscar dados;
- salvar dados no localStorage;
- carregar dados do localStorage;
- configurar timers;
- observar mudanças em um state;
- integrar com APIs;
- manipular eventos externos.

Exemplo básico:

```jsx
import { useEffect } from "react";

useEffect(() => {
  console.log("Componente carregou");
}, []);
```

---

## Por que useEffect é importante?

O React renderiza a tela com base em dados e estado.

Mas algumas ações precisam acontecer depois da renderização ou quando algum estado muda.

Exemplo:

- quando a tela abrir, carregar clientes salvos;
- quando a lista de clientes mudar, salvar no navegador;
- quando clicar em carregar, simular chamada de API;
- quando buscar dados reais no futuro, chamar uma API.

Essas ações são feitas com `useEffect`.

---

## Array de dependências

O segundo parâmetro do `useEffect` é o array de dependências.

Ele controla quando o efeito será executado.

---

## useEffect com array vazio

```jsx
useEffect(() => {
  console.log("Executa uma vez ao carregar");
}, []);
```

Quando usamos `[]`, o efeito roda apenas uma vez, quando o componente é montado.

No CRM, isso será usado para carregar dados do `localStorage`.

---

## useEffect sem array de dependências

```jsx
useEffect(() => {
  console.log("Executa em toda renderização");
});
```

Sem array, o efeito roda toda vez que o componente renderiza.

Esse uso precisa de cuidado, porque pode causar comportamento indesejado ou loops.

---

## useEffect com dependência

```jsx
useEffect(() => {
  console.log("Clientes mudaram");
}, [clientes]);
```

Esse efeito roda sempre que o state `clientes` mudar.

No CRM, isso será usado para salvar clientes no `localStorage` sempre que a lista mudar.

---

## O que é localStorage?

`localStorage` é um recurso do navegador que permite salvar dados localmente.

Esses dados continuam salvos mesmo depois de atualizar a página ou fechar o navegador.

Exemplo:

```js
localStorage.setItem("nome", "Rafael");
```

Para ler:

```js
const nome = localStorage.getItem("nome");
```

Para remover:

```js
localStorage.removeItem("nome");
```

---

## localStorage só guarda texto

O `localStorage` salva apenas strings.

Por isso, quando queremos salvar arrays ou objetos, precisamos converter para texto usando `JSON.stringify`.

Exemplo:

```js
localStorage.setItem("clientes", JSON.stringify(clientes));
```

Para recuperar, usamos `JSON.parse`:

```js
const clientesSalvos = JSON.parse(localStorage.getItem("clientes"));
```

---

## JSON.stringify

`JSON.stringify` transforma objeto ou array em texto.

Exemplo:

```js
const cliente = {
  nome: "Cervejaria Odin",
};

const texto = JSON.stringify(cliente);
```

---

## JSON.parse

`JSON.parse` transforma texto JSON novamente em objeto ou array.

Exemplo:

```js
const texto = '{"nome":"Cervejaria Odin"}';

const cliente = JSON.parse(texto);
```

---

## Cuidado com JSON.parse

Se o valor não existir no `localStorage`, o retorno será `null`.

Por isso, é comum verificar antes:

```js
const clientesSalvos = localStorage.getItem("clientes");

if (clientesSalvos) {
  setClientes(JSON.parse(clientesSalvos));
}
```

---

## Persistência de dados

Persistência significa manter os dados salvos mesmo depois de recarregar a página.

Na Fase 04, quando cadastramos um cliente, ele aparece na tela, mas desaparece ao atualizar o navegador.

Na Fase 05, o cliente cadastrado deve continuar aparecendo mesmo após atualizar a página.

Fluxo:

```txt
Usuário cadastra cliente
↓
State clientes é atualizado
↓
useEffect percebe a mudança
↓
Lista é salva no localStorage
↓
Usuário atualiza a página
↓
useEffect carrega dados salvos
↓
Clientes aparecem novamente
```

---

## API fake

Uma API fake é uma simulação de comunicação com backend.

Como ainda não temos backend Java, vamos simular funções assíncronas.

Exemplo:

```js
function buscarClientesFake() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(clientes);
    }, 1000);
  });
}
```

Isso ajuda a treinar:

- loading;
- erro;
- async/await;
- fluxo de busca;
- comportamento parecido com API real.

---

## CRUD

CRUD é o conjunto básico de operações de um sistema.

```txt
C — Create — criar
R — Read — ler/listar
U — Update — atualizar
D — Delete — excluir
```

No CRM, isso significa:

- criar cliente;
- listar clientes;
- editar cliente;
- excluir cliente.

---

## Create

Create é criar um novo item.

No CRM, já começamos isso na Fase 04 com o cadastro de cliente.

Exemplo:

```jsx
setClientes([...clientes, novoCliente]);
```

---

## Read

Read é listar ou visualizar dados.

No CRM, fazemos isso ao renderizar a lista:

```jsx
clientes.map((cliente) => (
  <ClienteCard key={cliente.id} cliente={cliente} />
));
```

---

## Update

Update é editar um item existente.

Exemplo:

```jsx
const clientesAtualizados = clientes.map((cliente) => {
  if (cliente.id === clienteEditado.id) {
    return clienteEditado;
  }

  return cliente;
});

setClientes(clientesAtualizados);
```

No CRM, vamos usar isso para editar dados de cliente ou atualizar status.

---

## Delete

Delete é remover um item.

Exemplo:

```jsx
const clientesAtualizados = clientes.filter((cliente) => {
  return cliente.id !== clienteId;
});

setClientes(clientesAtualizados);
```

No CRM, vamos usar isso para excluir cliente da lista.

---

## Imutabilidade no CRUD

Mesmo no CRUD, não devemos alterar arrays diretamente.

Evitar:

```jsx
clientes.push(novoCliente);
clientes.splice(index, 1);
cliente.nome = "Novo nome";
```

Preferir:

```jsx
setClientes([...clientes, novoCliente]);
setClientes(clientes.filter((cliente) => cliente.id !== clienteId));
setClientes(clientes.map(...));
```

---

## Separação de responsabilidades

Nesta fase, o `App.jsx` pode começar a ficar grande.

Por isso, vamos observar quais partes podem ser separadas.

Possíveis evoluções:

- funções de localStorage;
- funções de API fake;
- componentes de formulário;
- componentes de filtro;
- componentes de modal;
- funções auxiliares de CRUD.

Mas vamos fazer isso com cuidado, sem criar complexidade desnecessária.

---

## Como isso será aplicado no CRM Comercial 360

Nesta fase, vamos implementar:

- carregar clientes do `localStorage`;
- salvar clientes no `localStorage`;
- manter novos clientes após atualizar a página;
- simular carregamento de dados com API fake;
- editar cliente;
- excluir cliente;
- melhorar fluxo de CRUD;
- manter filtros funcionando com a lista atualizada.

---

## Critério de conclusão da Fase 05

A Fase 05 será considerada concluída quando:

- clientes forem carregados do `localStorage`;
- clientes forem salvos no `localStorage`;
- cliente cadastrado continuar aparecendo após atualizar a página;
- existir simulação de API fake;
- for possível editar cliente;
- for possível excluir cliente;
- filtros continuarem funcionando;
- formulário continuar funcionando;
- não houver mutação direta de arrays ou objetos;
- projeto rodar no navegador sem erro;
- README estiver atualizado;
- tag `v0.6.0` estiver criada.

---

## Resumo da Fase 05

A Fase 05 aproxima o CRM Comercial 360 de uma aplicação real.

Agora os dados deixam de existir apenas em memória e começam a ser persistidos no navegador.

Também começamos a trabalhar com a lógica de CRUD, preparando o caminho para futuramente trocar o `localStorage` por uma API Java Spring Boot real.