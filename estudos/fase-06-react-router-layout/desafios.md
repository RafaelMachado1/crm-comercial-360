# Fase 06 — Desafios práticos

## Objetivo dos desafios

Aplicar React Router, páginas e layout principal no CRM Comercial 360.

Nesta fase, o sistema deve deixar de ser uma única tela e passar a ter navegação real entre páginas.

---

## Desafio 1 — Configurar BrowserRouter

### Objetivo

Habilitar o React Router no projeto.

### Requisitos

- Importar `BrowserRouter` no `main.jsx`.
- Envolver o componente `<App />` com `<BrowserRouter>`.
- Garantir que o projeto continue rodando sem erro.

### Conceitos usados

- `BrowserRouter`
- configuração inicial de rotas

---

## Desafio 2 — Criar páginas do CRM

### Objetivo

Criar componentes de página dentro de `src/pages`.

### Páginas esperadas

```txt
DashboardPage.jsx
ClientesPage.jsx
ProdutosPage.jsx
AtividadesPage.jsx
VendasPage.jsx
NotFoundPage.jsx
```

### Conceitos usados

- componentes de página;
- separação de responsabilidades;
- organização de pastas.

---

## Desafio 3 — Criar rotas no App.jsx

### Objetivo

Configurar as rotas principais do sistema.

### Rotas esperadas

```txt
/             → DashboardPage
/clientes     → ClientesPage
/produtos     → ProdutosPage
/atividades   → AtividadesPage
/vendas       → VendasPage
*             → NotFoundPage
```

### Conceitos usados

- `Routes`
- `Route`
- rota 404

---

## Desafio 4 — Criar MainLayout

### Objetivo

Criar um layout principal para reaproveitar Header, Sidebar e área de conteúdo.

### Requisitos

Criar o arquivo:

```txt
src/components/layout/MainLayout.jsx
```

O layout deve conter:

- Header;
- Sidebar;
- área principal;
- controle para abrir e fechar sidebar.

### Conceitos usados

- children;
- layout reutilizável;
- state de layout.

---

## Desafio 5 — Transformar Sidebar em navegação real

### Objetivo

Fazer a sidebar navegar entre as páginas.

### Requisitos

- Substituir `<a href="#">` por `NavLink`.
- Criar links para:
  - Dashboard;
  - Clientes;
  - Produtos;
  - Atividades;
  - Vendas.
- Destacar link ativo.

### Conceitos usados

- `NavLink`
- navegação SPA
- classe ativa

---

## Desafio 6 — Mover lógica de clientes para ClientesPage

### Objetivo

Tirar do `App.jsx` a lógica de clientes e mover para a página correta.

### Requisitos

A página `ClientesPage` deve conter:

- formulário;
- filtros;
- lista de clientes;
- modal;
- edição;
- exclusão;
- localStorage;
- API fake;
- CRUD.

### Conceitos usados

- separação de responsabilidades;
- página específica;
- organização do projeto.

---

## Desafio 7 — Criar DashboardPage

### Objetivo

Criar uma página inicial com visão geral.

### Requisitos

A página Dashboard deve mostrar:

- título da página;
- indicadores de clientes e produtos;
- resumo inicial;
- aviso de que a gestão de clientes está na página Clientes.

### Conceitos usados

- página;
- componentes reutilizáveis;
- dados mockados;
- navegação para página específica.

---

## Desafio 8 — Criar ProdutosPage

### Objetivo

Mover a lista de produtos para uma página própria.

### Requisitos

A página Produtos deve mostrar:

- título;
- descrição;
- lista de produtos;
- cards de produtos.

### Conceitos usados

- página;
- map;
- componente ProdutoCard.

---

## Desafio 9 — Criar páginas Atividades e Vendas

### Objetivo

Criar páginas iniciais para futuras fases.

### Requisitos

As páginas podem ter conteúdo estático nesta fase.

Atividades deve explicar que futuramente terá:

- visitas;
- ligações;
- reuniões;
- tarefas.

Vendas deve explicar que futuramente terá:

- pedidos;
- histórico;
- valores;
- indicadores.

---

## Desafio 10 — Criar página 404

### Objetivo

Criar fallback para rotas inexistentes.

### Requisitos

- Criar `NotFoundPage`.
- Configurar rota `*`.
- Mostrar mensagem clara.
- Criar opção para voltar ao dashboard.

### Conceitos usados

- rota coringa;
- Link;
- experiência do usuário.

---

## Critério de conclusão dos desafios

A Fase 06 estará pronta quando:

- React Router estiver instalado;
- BrowserRouter estiver configurado;
- rotas principais funcionarem;
- sidebar navegar corretamente;
- link ativo estiver destacado;
- dashboard estiver em página própria;
- clientes estiver em página própria;
- produtos estiver em página própria;
- atividades e vendas existirem;
- página 404 funcionar;
- App.jsx estiver mais limpo;
- projeto rodar no navegador sem erro.