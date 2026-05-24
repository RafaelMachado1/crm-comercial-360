# Fase 10 — Desafios práticos

## Objetivo dos desafios

Aplicar bibliotecas profissionais no CRM Comercial 360, sempre resolvendo problemas reais do projeto.

A ideia não é instalar bibliotecas por vaidade, mas usar ferramentas de mercado para melhorar formulário, validação, API, cache, estado global, dashboard, tabela, datas e feedback visual.

---

## Desafio 1 — Refatorar formulário com React Hook Form

### Objetivo

Substituir o formulário manual de clientes por React Hook Form.

### Bibliotecas

```bash
npm install react-hook-form
```

### Requisitos

- Usar `useForm`.
- Usar `register`.
- Usar `handleSubmit`.
- Usar `reset`.
- Remover controle manual excessivo do formulário.
- Manter cadastro funcionando.
- Manter edição funcionando.

---

## Desafio 2 — Validar cliente com Zod

### Objetivo

Substituir validação manual por schema.

### Bibliotecas

```bash
npm install zod @hookform/resolvers
```

### Arquivo esperado

```txt
src/schemas/customerSchema.ts
```

### Requisitos

- Criar schema de cliente.
- Validar nome.
- Validar cidade.
- Validar segmento.
- Validar status.
- Exibir mensagens por campo.

---

## Desafio 3 — Criar camada de API com Axios

### Objetivo

Preparar o projeto para requisições reais.

### Biblioteca

```bash
npm install axios
```

### Arquivos esperados

```txt
src/services/api.ts
src/services/customerService.ts
```

### Requisitos

- Criar instância Axios.
- Criar service de customers.
- Manter compatibilidade com API fake enquanto não há backend real.
- Preparar `VITE_API_URL` para fase futura.

---

## Desafio 4 — Usar TanStack Query para clientes

### Objetivo

Melhorar busca, cache, loading e erro.

### Biblioteca

```bash
npm install @tanstack/react-query
```

### Requisitos

- Configurar `QueryClientProvider`.
- Usar `useQuery` para buscar clientes.
- Usar `useMutation` para criar, editar e excluir.
- Invalidar cache após alterações.
- Reduzir controle manual de loading/erro onde fizer sentido.

---

## Desafio 5 — Usar Zustand para filtros ou preferências

### Objetivo

Aplicar estado global em algo real.

### Biblioteca

```bash
npm install zustand
```

### Possíveis usos

- Filtros globais de clientes.
- Preferência de visualização.
- Estado de sidebar.
- Tema ou preferência do usuário.

### Requisito

Usar Zustand apenas se fizer sentido real no projeto.

---

## Desafio 6 — Criar gráficos com Recharts

### Objetivo

Melhorar o Dashboard com visual profissional.

### Biblioteca

```bash
npm install recharts
```

### Gráficos possíveis

- Clientes por status.
- Produtos com estoque x sem estoque.
- Total comprado por cliente.
- Distribuição por segmento.

### Requisitos

- Criar pelo menos dois gráficos úteis.
- Usar dados reais do mock/API fake.
- Manter dashboard claro e visual.

---

## Desafio 7 — Criar tabela de clientes com TanStack Table

### Objetivo

Transformar a listagem de clientes em uma visualização mais profissional.

### Biblioteca

```bash
npm install @tanstack/react-table
```

### Requisitos

- Criar tabela de clientes.
- Colunas: nome, cidade, segmento, status, total comprado, ações.
- Permitir ordenação.
- Permitir filtro ou busca.
- Manter ações de editar, excluir e ver detalhes.

---

## Desafio 8 — Usar date-fns em datas

### Objetivo

Preparar o projeto para lidar melhor com datas.

### Biblioteca

```bash
npm install date-fns
```

### Possíveis usos

- Data de cadastro fake.
- Data de última interação.
- Data de atividade.
- Data de venda.
- Formatação brasileira.

### Requisito

Usar date-fns apenas onde houver dado de data útil.

---

## Desafio 9 — Criar feedback visual com toast

### Objetivo

Melhorar mensagens de sucesso e erro.

### Possíveis opções

- Criar toast próprio.
- Usar biblioteca leve.
- Usar solução integrada se Shadcn/UI for adotado.

### Requisitos

- Mostrar toast ao cadastrar cliente.
- Mostrar toast ao editar cliente.
- Mostrar toast ao excluir cliente.
- Mostrar toast em erro de carregamento.

---

## Desafio 10 — Avaliar Tailwind CSS e Shadcn/UI

### Objetivo

Decidir se faz sentido usar essas tecnologias agora ou deixar para a Fase 12.

### Perguntas

- Tailwind vai ajudar agora ou atrapalhar?
- Shadcn/UI agrega valor real?
- O projeto deve manter CSS próprio até a fase de design?
- Vale instalar agora apenas por causa de toast/dialog/table?

### Critério

Não instalar sem decisão clara.

---

## Critério de conclusão dos desafios

A fase estará pronta quando:

- as bibliotecas usadas resolverem problemas reais;
- o formulário de clientes estiver mais profissional;
- a validação estiver clara;
- a camada de API estiver organizada;
- o dashboard tiver gráficos úteis;
- a tabela de clientes agregar valor;
- o feedback visual melhorar a experiência;
- o projeto rodar sem erro;
- `npx tsc --noEmit` rodar sem erro.