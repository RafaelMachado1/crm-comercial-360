# Fase 01 — Anotações pessoais

## O que foi feito nesta fase

Nesta fase, revisei JavaScript moderno aplicado ao contexto do React.

Os exercícios foram feitos dentro da pasta `estudos/`, separados do código real da aplicação em `src/`.

Também foi criado o arquivo `src/data/mockData.js`, que será usado futuramente no CRM Comercial 360.

## O que entendi

React usa JavaScript o tempo todo.

Antes de criar componentes mais avançados, preciso dominar bem a manipulação de arrays e objetos.

Métodos como `map`, `filter`, `find` e `reduce` serão usados constantemente no projeto.

Também entendi que não devo alterar arrays e objetos diretamente. O ideal é criar novas cópias usando spread operator.

## Principais aprendizados

- `map` transforma listas.
- `filter` filtra listas.
- `find` encontra um item específico.
- `reduce` acumula valores.
- destructuring facilita extrair dados.
- spread operator ajuda a copiar e atualizar dados.
- rest operator agrupa o restante dos dados.
- optional chaining evita erro ao acessar propriedades inexistentes.
- Promise representa uma operação assíncrona.
- async/await deixa o código assíncrono mais legível.

## Como isso será usado no CRM

Esses conceitos serão usados para:

- listar clientes;
- filtrar clientes por status;
- buscar cliente por ID;
- calcular total vendido;
- renderizar cards;
- atualizar dados no estado;
- consumir APIs futuramente.