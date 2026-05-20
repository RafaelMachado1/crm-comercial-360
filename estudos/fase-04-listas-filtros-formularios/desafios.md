# Fase 04 — Desafios práticos

## Objetivo dos desafios

Aplicar listas, filtros combinados e formulário controlado no CRM Comercial 360.

Os desafios desta fase serão implementados dentro do projeto real em `src/`.

---

## Desafio 1 — Criar busca textual por cliente

### Objetivo

Permitir buscar clientes pelo nome.

### Requisitos

- Criar estado `termoBusca`.
- Criar input de busca.
- Usar `onChange` para atualizar o valor.
- Filtrar clientes com `includes`.
- A busca deve ignorar maiúsculas e minúsculas.

### Conceitos usados

- `useState`
- `onChange`
- `filter`
- `includes`
- `toLowerCase`

---

## Desafio 2 — Criar filtro por segmento

### Objetivo

Permitir filtrar clientes por segmento.

### Requisitos

- Criar estado `segmentoSelecionado`.
- Criar select com:
  - todos
  - Cervejaria
  - Food Service
  - Hotelaria
  - Panificação
  - Saúde
- O filtro deve funcionar junto com o filtro de status.

### Conceitos usados

- `useState`
- `select`
- `onChange`
- filtros combinados

---

## Desafio 3 — Combinar busca, status e segmento

### Objetivo

Criar uma lista filtrada com mais de uma condição.

### Requisitos

O cliente deve aparecer apenas se corresponder:

- ao termo de busca;
- ao status selecionado;
- ao segmento selecionado.

Se o filtro estiver em `todos`, ele não deve bloquear o resultado.

### Conceitos usados

- `filter`
- `includes`
- operador `&&`
- condições booleanas

---

## Desafio 4 — Criar formulário controlado de novo cliente

### Objetivo

Cadastrar um novo cliente pela interface.

### Campos obrigatórios

- nome
- cidade
- segmento
- status

### Campos automáticos

- id
- totalComprado

### Conceitos usados

- `useState`
- objeto como state
- `value`
- `onChange`
- `onSubmit`

---

## Desafio 5 — Validar campos obrigatórios

### Objetivo

Evitar cadastro incompleto.

### Requisitos

- Se nome, cidade ou segmento estiverem vazios, mostrar erro.
- O cliente não deve ser cadastrado se houver erro.
- A mensagem deve aparecer na tela.

### Conceitos usados

- state de erro
- renderização condicional
- `return` para interromper envio

---

## Desafio 6 — Adicionar cliente na lista

### Objetivo

Atualizar a lista de clientes com o novo cadastro.

### Requisitos

- Criar novo objeto cliente.
- Adicionar novo cliente com spread.
- Não usar `push`.
- O novo cliente deve aparecer na lista automaticamente.

### Conceitos usados

- spread operator
- atualização imutável
- state com array

---

## Desafio 7 — Limpar formulário após cadastro

### Objetivo

Resetar o formulário após salvar.

### Requisitos

- Após cadastrar cliente, limpar os campos.
- Status deve voltar para `ativo`.
- Exibir mensagem de sucesso.

### Conceitos usados

- state de formulário
- state de sucesso
- formulário controlado

---

## Desafio 8 — Mensagem de lista vazia

### Objetivo

Melhorar feedback para o usuário.

### Requisitos

Se nenhum cliente corresponder aos filtros, mostrar:

```txt
Nenhum cliente encontrado com os filtros selecionados.
```

### Conceitos usados

- renderização condicional
- ternário

---

## Desafio 9 — Revisar imutabilidade

### Objetivo

Garantir que nenhuma lista seja alterada diretamente.

### Não fazer

```jsx
clientes.push(novoCliente);
```

### Fazer

```jsx
setClientes([...clientes, novoCliente]);
```

---

## Critério de conclusão dos desafios

A fase estará pronta quando:

- a busca por nome funcionar;
- o filtro por status funcionar;
- o filtro por segmento funcionar;
- os três filtros funcionarem juntos;
- o formulário cadastrar novo cliente;
- o formulário validar campos obrigatórios;
- o novo cliente aparecer na lista;
- o formulário limpar depois do cadastro;
- mensagens de erro e sucesso aparecerem corretamente;
- o projeto rodar no navegador sem erro.