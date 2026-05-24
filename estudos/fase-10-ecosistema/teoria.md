# Fase 10 — Bibliotecas de mercado e experiência profissional

## Objetivo da fase

A Fase 10 tem como objetivo adicionar bibliotecas muito usadas no mercado ao CRM Comercial 360.

Até agora, o projeto já possui:

- React com Vite
- TypeScript
- Componentes tipados
- Hooks customizados
- Context API
- Rotas privadas
- CRUD de clientes
- API fake
- localStorage
- Estrutura organizada em pages, components, hooks, services, utils, contexts e routes

Agora vamos evoluir o projeto usando ferramentas profissionais do ecossistema React.

---

## Regra principal da fase

Nesta fase, não vamos instalar bibliotecas aleatoriamente.

Cada biblioteca precisa responder a uma pergunta:

```txt
Qual problema real essa biblioteca resolve no CRM?
```

Se a resposta for clara, usamos.

Se não for clara, não usamos ainda.

---

## Bibliotecas previstas

- React Hook Form
- Zod
- Axios
- TanStack Query
- Zustand
- Tailwind CSS
- Shadcn/UI ou componentes próprios
- Recharts
- TanStack Table
- date-fns
- Toast/feedback visual

---

## React Hook Form

React Hook Form é uma biblioteca para lidar com formulários em React.

Ela ajuda a:

- controlar formulários com menos código;
- reduzir re-renderizações;
- integrar validação;
- lidar com erros por campo;
- facilitar reset do formulário;
- facilitar edição de dados.

No CRM, ela será usada no formulário de clientes.

Antes:

```txt
Formulário manual com useState
```

Depois:

```txt
Formulário com React Hook Form
```

---

## Zod

Zod é uma biblioteca para validação de dados usando schemas.

Com Zod, definimos regras claras para os dados.

Exemplo:

```ts
const customerSchema = z.object({
  nome: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres."),
  cidade: z.string().min(2, "Informe a cidade."),
  segmento: z.string().min(2, "Informe o segmento."),
  status: z.enum(["ativo", "pendente", "inativo"]),
});
```

No CRM, Zod será usado para validar o formulário de clientes.

---

## @hookform/resolvers

Essa biblioteca conecta React Hook Form com Zod.

Ela permite usar o schema do Zod dentro do React Hook Form.

Exemplo:

```ts
resolver: zodResolver(customerSchema)
```

Assim, o formulário usa as regras do schema.

---

## Axios

Axios é uma biblioteca para fazer requisições HTTP.

Ela será útil para criar uma camada de API mais próxima de um projeto real.

Hoje temos API fake.

Futuramente teremos backend real.

Axios ajuda a preparar esse caminho.

Exemplo futuro:

```ts
const response = await api.get("/customers");
```

No CRM, vamos criar uma estrutura como:

```txt
src/services/api.ts
src/services/customerService.ts
```

---

## TanStack Query

TanStack Query é uma biblioteca para busca, cache e sincronização de dados.

Ela ajuda a lidar com:

- loading;
- erro;
- cache;
- refetch;
- atualização de dados;
- mutations;
- invalidação de cache.

No CRM, pode ser usada para buscar clientes e produtos de forma mais profissional.

Hoje:

```txt
useCustomers controla loading, erro e dados manualmente
```

Depois:

```txt
TanStack Query controla busca, cache, loading e erro
```

---

## Zustand

Zustand é uma biblioteca leve para estado global.

Ela pode ser usada para dados que precisam ser acessados por várias páginas ou componentes.

No CRM, pode fazer sentido para:

- filtros globais;
- preferências do usuário;
- estado do menu;
- tema;
- configurações.

Não vamos colocar tudo no Zustand.

Só vamos usar se resolver um problema real.

---

## Tailwind CSS

Tailwind CSS é uma ferramenta de estilização muito usada no mercado.

Ela permite criar interfaces rapidamente usando classes utilitárias.

Nesta fase, vamos avaliar se vale a pena migrar ou se vamos manter CSS próprio.

Como já existe uma Fase 12 focada em design futurista, talvez Tailwind seja preparado ou avaliado aqui, mas a transformação visual pesada ficará para a Fase 12.

---

## Shadcn/UI ou componentes próprios

Shadcn/UI é uma coleção de componentes modernos baseada em Tailwind e Radix.

Ela pode ajudar a criar:

- botões;
- inputs;
- cards;
- dialogs;
- dropdowns;
- tabelas;
- toasts.

Mas precisamos avaliar com cuidado.

Como o projeto já tem componentes próprios, podemos decidir entre:

```txt
usar Shadcn/UI
ou
evoluir nossos componentes próprios
```

---

## Recharts

Recharts é uma biblioteca de gráficos para React.

No CRM, será usada para melhorar o Dashboard.

Possíveis gráficos:

- clientes por status;
- produtos por estoque;
- vendas por período;
- atividades por tipo;
- oportunidades por status.

Isso agrega muito valor visual ao portfólio.

---

## TanStack Table

TanStack Table é uma biblioteca para criar tabelas avançadas.

Ela pode trazer:

- ordenação;
- filtros;
- paginação;
- colunas configuráveis;
- estrutura profissional para listas.

No CRM, pode substituir ou complementar a lista de clientes em cards.

---

## date-fns

date-fns é uma biblioteca para trabalhar com datas.

Ela será útil para:

- formatar datas;
- calcular períodos;
- exibir datas no padrão brasileiro;
- criar filtros por período;
- tratar datas de atividades e vendas.

Exemplo:

```ts
format(new Date(), "dd/MM/yyyy")
```

---

## Toast/feedback visual

Toast é um feedback visual temporário.

Exemplo:

```txt
Cliente cadastrado com sucesso.
Cliente excluído com sucesso.
Erro ao carregar dados.
```

Hoje usamos mensagens na tela.

Com toast, a experiência fica mais moderna.

Podemos usar biblioteca ou criar um toast simples próprio.

---

## Ordem sugerida de implementação

A ordem mais segura será:

```txt
1. React Hook Form + Zod
2. Toast/feedback visual
3. Axios
4. TanStack Query
5. Zustand
6. Recharts
7. TanStack Table
8. date-fns
9. Avaliação de Tailwind/Shadcn
```

Essa ordem faz sentido porque começa pelos formulários, depois melhora feedback, depois dados/API, depois dashboard e tabela.

---

## Como isso será aplicado no CRM Comercial 360

Na Fase 10, vamos aplicar bibliotecas em problemas reais:

```txt
Formulário de cliente
→ React Hook Form + Zod

Mensagens de sucesso/erro
→ Toast

Camada de dados
→ Axios

Busca/cache
→ TanStack Query

Filtros/preferências
→ Zustand

Dashboard
→ Recharts

Lista de clientes
→ TanStack Table

Datas
→ date-fns
```

---

## Critério de conclusão da Fase 10

A Fase 10 será considerada concluída quando:

- o formulário de cliente estiver mais profissional;
- a validação estiver clara;
- o projeto tiver uma camada de API organizada;
- o dashboard tiver gráficos;
- a tabela de clientes estiver mais forte;
- houver feedback visual melhor;
- as bibliotecas usadas resolverem problemas reais;
- o projeto rodar sem erro;
- o TypeScript compilar sem erro;
- README estiver atualizado;
- tag `v1.1.0` estiver criada.

---

## Resumo da Fase 10

A Fase 10 é uma fase de evolução profissional.

O objetivo é transformar o CRM Comercial 360 em um projeto com ferramentas reais de mercado, sem exagero e sem instalar bibliotecas desnecessárias.

Cada biblioteca será estudada, aplicada e testada em uma parte real do sistema.