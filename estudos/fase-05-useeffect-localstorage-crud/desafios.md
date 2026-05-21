# Fase 05 — Desafios práticos

## Objetivo dos desafios

Aplicar `useEffect`, `localStorage`, API fake e CRUD no CRM Comercial 360.

Nesta fase, o CRM deve começar a persistir dados e permitir editar e excluir clientes.

---

## Desafio 1 — Carregar clientes do localStorage

### Objetivo

Ao abrir o sistema, carregar clientes salvos no navegador.

### Requisitos

- Usar `useEffect` com array vazio.
- Buscar a chave `crm-clientes`.
- Se existir dado salvo, usar `JSON.parse`.
- Atualizar o state `clientes`.

### Conceitos usados

- `useEffect`
- `localStorage.getItem`
- `JSON.parse`

---

## Desafio 2 — Salvar clientes no localStorage

### Objetivo

Salvar a lista de clientes sempre que ela mudar.

### Requisitos

- Usar `useEffect` com `[clientes]`.
- Salvar na chave `crm-clientes`.
- Usar `JSON.stringify`.

### Conceitos usados

- `useEffect`
- array de dependências
- `localStorage.setItem`
- `JSON.stringify`

---

## Desafio 3 — Persistir cliente cadastrado

### Objetivo

Garantir que um cliente novo continue na lista após atualizar a página.

### Requisitos

- Cadastrar novo cliente.
- Atualizar a página.
- O cliente deve continuar aparecendo.
- O contador de clientes deve continuar correto.

### Conceitos usados

- localStorage
- state
- persistência

---

## Desafio 4 — Criar API fake de clientes

### Objetivo

Simular uma API antes de ter backend real.

### Requisitos

Criar funções fake para:

- buscar clientes;
- criar cliente;
- atualizar cliente;
- excluir cliente.

### Sugestão de arquivo

```txt
src/services/clientesFakeApi.js
```

### Conceitos usados

- Promise
- setTimeout
- async/await
- separação de responsabilidades

---

## Desafio 5 — Editar cliente

### Objetivo

Permitir editar dados de um cliente já cadastrado.

### Requisitos

- Criar estado `clienteEmEdicao`.
- Criar botão `Editar` no card do cliente.
- Ao clicar, preencher o formulário com os dados do cliente.
- Ao enviar, atualizar o cliente existente.
- Após editar, limpar formulário e sair do modo edição.

### Conceitos usados

- state objeto
- formulário controlado
- update com `map`
- imutabilidade

---

## Desafio 6 — Mudar texto do botão do formulário

### Objetivo

Indicar visualmente se o usuário está cadastrando ou editando.

### Requisitos

Se não estiver editando:

```txt
Cadastrar cliente
```

Se estiver editando:

```txt
Salvar alterações
```

### Conceitos usados

- renderização condicional
- estado `clienteEmEdicao`

---

## Desafio 7 — Cancelar edição

### Objetivo

Permitir sair do modo edição.

### Requisitos

- Criar botão `Cancelar edição`.
- Mostrar esse botão apenas quando estiver editando.
- Ao clicar:
  - limpar `clienteEmEdicao`;
  - limpar formulário;
  - limpar mensagens.

### Conceitos usados

- estado objeto
- renderização condicional
- eventos

---

## Desafio 8 — Excluir cliente

### Objetivo

Permitir excluir um cliente da lista.

### Requisitos

- Criar botão `Excluir` no card do cliente.
- Pedir confirmação com `window.confirm`.
- Se confirmar, remover cliente da lista.
- Atualizar localStorage automaticamente.

### Conceitos usados

- `filter`
- imutabilidade
- localStorage
- evento `onClick`

---

## Desafio 9 — Manter filtros funcionando após editar ou excluir

### Objetivo

Garantir que a lista continue funcionando depois das operações de CRUD.

### Requisitos

- Buscar por nome depois de editar.
- Filtrar por status depois de editar.
- Filtrar por segmento depois de editar.
- Excluir cliente com filtros ativos sem quebrar a tela.

### Conceitos usados

- derived state
- filtros combinados
- renderização condicional

---

## Desafio 10 — Revisar responsabilidade do App.jsx

### Objetivo

Observar se o `App.jsx` começou a ficar grande demais.

### Requisitos

Avaliar se faz sentido separar:

- API fake;
- funções de localStorage;
- lógica de formulário;
- componentes visuais.

### Observação

Nesta fase, não precisa refatorar tudo. O objetivo é começar a perceber quando o componente principal começa a ficar grande.

---

## Critério de conclusão dos desafios

A Fase 05 estará pronta quando:

- clientes forem carregados do localStorage;
- clientes forem salvos no localStorage;
- novo cliente permanecer após atualizar a página;
- existir API fake de clientes;
- cliente puder ser editado;
- cliente puder ser excluído;
- filtros continuarem funcionando;
- formulário funcionar para cadastro e edição;
- não houver mutação direta de arrays ou objetos;
- projeto rodar no navegador sem erro.