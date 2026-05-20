# Fase 03 — Desafios práticos

## Objetivo dos desafios

Aplicar `useState`, eventos e renderização condicional no CRM Comercial 360.

Os desafios desta fase serão implementados dentro do projeto real em `src/`.

---

## Desafio 1 — Sidebar abre e fecha

### Objetivo

Permitir que o usuário esconda ou mostre o menu lateral.

### Requisitos

- Criar estado `sidebarAberta`.
- Criar botão no `Header` para alternar o menu.
- Quando `sidebarAberta` for `false`, a `Sidebar` não deve aparecer.
- O texto do botão deve mudar entre:
  - `Fechar menu`
  - `Abrir menu`

### Conceitos usados

- `useState`
- `onClick`
- renderização condicional com `&&`
- estado boolean

---

## Desafio 2 — Filtro de clientes por status

### Objetivo

Filtrar a lista de clientes exibida na tela.

### Requisitos

- Criar estado `statusSelecionado`.
- Criar um `<select>` com:
  - todos
  - ativo
  - pendente
  - inativo
- Quando o usuário mudar o select, a lista de clientes deve ser filtrada.
- Se selecionar `todos`, todos os clientes aparecem.

### Conceitos usados

- `useState`
- `onChange`
- estado string
- `filter`
- renderização de listas

---

## Desafio 3 — Mensagem de lista vazia

### Objetivo

Mostrar uma mensagem quando nenhum cliente for encontrado.

### Requisitos

- Se `clientesFiltrados.length === 0`, mostrar:
  - `Nenhum cliente encontrado para este filtro.`
- Se houver clientes, mostrar os cards normalmente.

### Conceitos usados

- operador ternário
- renderização condicional

---

## Desafio 4 — Cliente prioritário

### Objetivo

Permitir destacar um cliente como prioritário.

### Requisitos

- Criar estado `clientePrioritarioId`.
- Criar botão em cada `ClienteCard`:
  - `Marcar como prioridade`
  - `Remover prioridade`
- Quando um cliente for prioritário, o card deve receber uma classe visual diferente.
- Apenas um cliente deve estar destacado por vez.

### Conceitos usados

- `useState`
- `onClick`
- props
- renderização condicional
- classe condicional

---

## Desafio 5 — Modal de detalhes do cliente

### Objetivo

Abrir uma janela simples com mais informações do cliente.

### Requisitos

- Criar estado `clienteSelecionado`.
- Criar botão `Ver detalhes` em cada cliente.
- Ao clicar, abrir modal com:
  - nome;
  - cidade;
  - segmento;
  - status;
  - total comprado.
- Criar botão para fechar o modal.

### Conceitos usados

- estado objeto
- `onClick`
- renderização condicional com `&&`

---

## Desafio 6 — Loading simulado

### Objetivo

Simular carregamento de dados.

### Requisitos

- Criar estado `loading`.
- Criar botão `Simular carregamento`.
- Ao clicar:
  - mostrar mensagem `Carregando clientes...`
  - depois de 2 segundos, voltar para a lista normal.

### Conceitos usados

- `useState`
- `setTimeout`
- ternário

---

## Desafio 7 — Erro simulado

### Objetivo

Simular mensagem de erro na tela.

### Requisitos

- Criar estado `erro`.
- Criar botão `Simular erro`.
- Mostrar mensagem:
  - `Erro ao carregar clientes.`
- Criar botão `Limpar erro`.

### Conceitos usados

- `useState`
- string como estado
- renderização condicional com `&&`

---

## Desafio 8 — Revisão de imutabilidade

### Objetivo

Garantir que arrays e objetos não sejam alterados diretamente.

### Requisitos

Ao atualizar qualquer cliente, usar:

```jsx
clientes.map(...)
```

E para atualizar objeto, usar:

```jsx
{
  ...cliente,
  propriedade: novoValor
}
```

### Não fazer

```jsx
cliente.status = "ativo";
clientes.push(novoCliente);
```

---

## Critério de conclusão dos desafios

A fase estará pronta quando:

- a sidebar abre e fecha;
- o filtro de status funciona;
- a lista vazia aparece quando necessário;
- cliente prioritário pode ser marcado;
- modal de detalhes abre e fecha;
- loading e erro simulados aparecem corretamente;
- nenhuma atualização de array ou objeto é feita por mutação direta.