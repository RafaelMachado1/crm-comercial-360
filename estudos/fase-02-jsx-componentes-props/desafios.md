# Fase 02 — Desafios práticos

## Objetivo dos desafios

Fixar os conceitos de JSX, componentes, props e children antes de aplicar no projeto real.

Os desafios abaixo serão usados como guia para construir os componentes reais dentro de `src/components/`.

---

## Desafio 1 — Criar componente Header

### Objetivo

Criar um componente de topo da aplicação.

### Requisitos

O componente deve exibir:

- nome do sistema;
- subtítulo curto;
- indicação visual de que é o dashboard.

### Ideia de uso

```jsx
<Header />
```

---

## Desafio 2 — Criar componente Sidebar

### Objetivo

Criar um menu lateral simples.

### Requisitos

O componente deve exibir os itens:

- Dashboard
- Clientes
- Produtos
- Atividades
- Vendas

### Ideia de uso

```jsx
<Sidebar />
```

---

## Desafio 3 — Criar componente PageTitle

### Objetivo

Criar um componente para título e descrição de página.

### Props esperadas

```txt
title
description
```

### Ideia de uso

```jsx
<PageTitle
  title="Dashboard"
  description="Acompanhe os principais indicadores comerciais."
/>
```

---

## Desafio 4 — Criar componente CardIndicador

### Objetivo

Criar um card reutilizável para indicadores.

### Props esperadas

```txt
titulo
valor
descricao
```

### Ideia de uso

```jsx
<CardIndicador
  titulo="Clientes ativos"
  valor={clientes.length}
  descricao="Clientes cadastrados no CRM"
/>
```

---

## Desafio 5 — Criar componente ClienteCard

### Objetivo

Criar um card para exibir dados de cliente.

### Prop esperada

```txt
cliente
```

### Dados que devem aparecer

- nome;
- cidade;
- segmento;
- status;
- total comprado.

### Ideia de uso

```jsx
<ClienteCard cliente={cliente} />
```

---

## Desafio 6 — Criar componente ProdutoCard

### Objetivo

Criar um card para exibir dados de produto.

### Prop esperada

```txt
produto
```

### Dados que devem aparecer

- nome;
- categoria;
- preço;
- estoque.

### Ideia de uso

```jsx
<ProdutoCard produto={produto} />
```

---

## Desafio 7 — Criar componente Card com children

### Objetivo

Criar um componente genérico de card usando `children`.

### Prop esperada

```txt
children
```

### Ideia de uso

```jsx
<Card>
  <h3>Clientes ativos</h3>
  <p>Lista de clientes cadastrados.</p>
</Card>
```

---

## Desafio 8 — Criar componente Section com children

### Objetivo

Criar um componente de seção reutilizável.

### Props esperadas

```txt
title
children
```

### Ideia de uso

```jsx
<Section title="Clientes recentes">
  <ClienteCard cliente={cliente} />
</Section>
```

---

## Desafio 9 — Montar dashboard componentizado

### Objetivo

Usar todos os componentes criados para montar a primeira tela componentizada do CRM.

### Componentes esperados

- Header
- Sidebar
- PageTitle
- CardIndicador
- ClienteCard
- ProdutoCard
- Card
- Section

### Critério de conclusão

O `App.jsx` deve ficar mais limpo e apenas organizar os componentes principais.

---

## Desafio 10 — Revisar nomes dos componentes

### Objetivo

Conferir se os nomes dos componentes fazem sentido.

### Checklist

- `Header` representa o topo?
- `Sidebar` representa o menu lateral?
- `PageTitle` representa título e descrição da página?
- `CardIndicador` representa uma métrica?
- `ClienteCard` representa um cliente?
- `ProdutoCard` representa um produto?
- `Card` é genérico?
- `Section` organiza blocos da tela?

Se algum nome não explicar bem a função, deve ser ajustado antes do commit.