# Fase 08 — Desafios práticos

## Objetivo dos desafios

Aplicar hooks customizados e organização profissional no CRM Comercial 360.

Nesta fase, o foco não é criar uma grande funcionalidade visual nova, mas sim refatorar o projeto de forma segura.

---

## Desafio 1 — Criar pasta hooks

### Objetivo

Organizar os hooks customizados do projeto.

### Requisito

Criar a pasta:

```txt
src/hooks
```

---

## Desafio 2 — Criar useToggle

### Objetivo

Criar um hook reutilizável para estados booleanos.

### Arquivo esperado

```txt
src/hooks/useToggle.js
```

### O hook deve retornar

```txt
isOpen
open
close
toggle
setIsOpen
```

### Onde usar

Usar no `MainLayout` para controlar abrir/fechar sidebar.

---

## Desafio 3 — Criar useLocalStorage

### Objetivo

Criar hook para manipular localStorage com state.

### Arquivo esperado

```txt
src/hooks/useLocalStorage.js
```

### O hook deve permitir

- ler valor inicial;
- salvar valor;
- atualizar state;
- sincronizar com localStorage.

---

## Desafio 4 — Criar utils de clientes

### Objetivo

Mover cálculos e filtros para utils.

### Arquivo esperado

```txt
src/utils/customerUtils.js
```

### Funções esperadas

```txt
getActiveCustomers
filterCustomers
createCustomerPayload
validateCustomerForm
```

---

## Desafio 5 — Criar useCustomers

### Objetivo

Mover lógica principal de clientes para um hook.

### Arquivo esperado

```txt
src/hooks/useCustomers.js
```

### O hook deve controlar

- customers;
- loading;
- error;
- loadCustomers;
- createCustomer;
- updateCustomer;
- deleteCustomer;
- clearError.

### Regras

- Continuar usando `clientesFakeApi`.
- Não quebrar localStorage.
- Não quebrar CRUD.

---

## Desafio 6 — Criar useCustomerForm

### Objetivo

Mover lógica do formulário para um hook.

### Arquivo esperado

```txt
src/hooks/useCustomerForm.js
```

### O hook deve controlar

- formCustomer;
- formError;
- successMessage;
- customerEditing;
- handleChangeFormCustomer;
- startEditCustomer;
- clearForm;
- setFormError;
- setSuccessMessage.

---

## Desafio 7 — Criar useCustomerFilters

### Objetivo

Mover lógica dos filtros para um hook.

### Arquivo esperado

```txt
src/hooks/useCustomerFilters.js
```

### O hook deve controlar

- searchTerm;
- setSearchTerm;
- selectedStatus;
- setSelectedStatus;
- selectedSegment;
- setSelectedSegment;
- filteredCustomers.

---

## Desafio 8 — Refatorar ClientesPage

### Objetivo

Reduzir a quantidade de lógica dentro da página.

### Requisitos

A página deve usar:

```txt
useCustomers
useCustomerForm
useCustomerFilters
```

A `ClientesPage` deve continuar responsável por montar a tela, mas não por concentrar toda a regra.

---

## Desafio 9 — Aplicar useToggle no layout

### Objetivo

Usar hook real em parte do layout.

### Requisito

Trocar o state manual de sidebar no `MainLayout` por `useToggle`.

---

## Desafio 10 — Testar tudo após refatoração

### Testar

- Login
- Logout
- Rotas privadas
- Dashboard
- Clientes
- Produtos
- Cadastro de cliente
- Edição de cliente
- Exclusão de cliente
- Filtros
- Modal
- Prioridade
- Sidebar abre/fecha
- LocalStorage

---

## Critério de conclusão dos desafios

A fase estará pronta quando:

- `useLocalStorage` existir;
- `useCustomers` existir;
- `useToggle` existir;
- cálculos estiverem em utils;
- chamadas continuarem em services;
- a `ClientesPage` estiver mais limpa;
- as regras de negócio não estiverem misturadas com JSX;
- hooks reaproveitarem lógica real;
- pastas e nomes estiverem claros;
- o projeto rodar sem erro.