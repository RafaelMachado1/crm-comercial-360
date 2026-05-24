# Fase 10 — Exercícios guiados

## Objetivo dos exercícios

Entender o papel das principais bibliotecas profissionais do ecossistema React antes de aplicar no CRM Comercial 360.

Nesta fase, o foco é estudar:

- React Hook Form
- Zod
- Axios
- TanStack Query
- Zustand
- Recharts
- TanStack Table
- date-fns
- Toast/feedback visual
- Avaliação de Tailwind CSS e Shadcn/UI

---

## Exercício 1 — Entender o problema do formulário manual

### Objetivo

Entender por que vamos substituir parte da lógica manual do formulário de clientes.

### Situação atual

Hoje o formulário de cliente usa state manual:

```tsx
const [formCustomer, setFormCustomer] = useState<CustomerFormData>({
  nome: "",
  cidade: "",
  segmento: "",
  status: "ativo",
});
```

E a validação é feita com função manual:

```ts
function validateCustomerForm(formCustomer: CustomerFormData): string {
  if (!formCustomer.nome || !formCustomer.cidade || !formCustomer.segmento) {
    return "Preencha nome, cidade e segmento.";
  }

  return "";
}
```

### O que observar

- Funciona, mas pode crescer demais.
- Mensagem de erro é genérica.
- A lógica do formulário fica espalhada.
- React Hook Form e Zod ajudam a organizar isso.

---

## Exercício 2 — Conceito de React Hook Form

### Objetivo

Entender o papel do React Hook Form.

### Exemplo conceitual

```tsx
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm();
```

### O que observar

- `register` conecta inputs ao formulário.
- `handleSubmit` controla o envio.
- `errors` guarda erros por campo.
- `reset` limpa ou preenche o formulário.
- Reduz a necessidade de controlar tudo com `useState`.

---

## Exercício 3 — Conceito de Zod

### Objetivo

Entender como o Zod cria regras de validação.

### Exemplo

```ts
const customerSchema = z.object({
  nome: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres."),
  cidade: z.string().min(2, "Informe a cidade."),
  segmento: z.string().min(2, "Informe o segmento."),
  status: z.enum(["ativo", "pendente", "inativo"]),
});
```

### O que observar

- O schema centraliza as regras.
- Cada campo pode ter sua mensagem.
- O TypeScript pode inferir tipos a partir do schema.
- Validação fica mais profissional.

---

## Exercício 4 — Resolver entre React Hook Form e Zod

### Objetivo

Entender a ponte entre formulário e schema.

### Exemplo

```tsx
useForm({
  resolver: zodResolver(customerSchema),
});
```

### O que observar

- React Hook Form cuida do formulário.
- Zod cuida da validação.
- `zodResolver` conecta os dois.
- Se o formulário estiver inválido, o submit não avança.

---

## Exercício 5 — Conceito de Axios

### Objetivo

Entender como criar uma camada profissional de API.

### Exemplo

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});
```

### O que observar

- Axios centraliza requisições HTTP.
- `baseURL` evita repetir URL em todo lugar.
- Futuramente será usado para conectar com backend real.
- Podemos trocar API fake por API real com menos retrabalho.

---

## Exercício 6 — Service com Axios

### Objetivo

Entender como ficaria um service real.

### Exemplo

```ts
export async function getCustomers() {
  const response = await api.get<Customer[]>("/customers");

  return response.data;
}
```

### O que observar

- O service retorna dados já tipados.
- A página não precisa saber os detalhes da requisição.
- O hook pode consumir o service.
- Isso prepara o projeto para backend.

---

## Exercício 7 — Conceito de TanStack Query

### Objetivo

Entender o papel do TanStack Query.

### Exemplo

```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ["customers"],
  queryFn: getCustomers,
});
```

### O que observar

- `queryKey` identifica o cache.
- `queryFn` busca os dados.
- `isLoading` indica carregamento.
- `error` guarda erro da requisição.
- `data` guarda os dados retornados.
- A biblioteca evita controle manual excessivo de loading/cache.

---

## Exercício 8 — Conceito de mutation

### Objetivo

Entender como TanStack Query lida com criação, edição e exclusão.

### Exemplo

```tsx
const createCustomerMutation = useMutation({
  mutationFn: createCustomer,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["customers"] });
  },
});
```

### O que observar

- Mutation representa alteração de dados.
- Após cadastrar, editar ou excluir, invalidamos o cache.
- Isso força atualização dos dados.
- É mais profissional do que atualizar tudo manualmente.

---

## Exercício 9 — Conceito de Zustand

### Objetivo

Entender quando usar estado global.

### Exemplo

```ts
const useCustomerFiltersStore = create((set) => ({
  status: "todos",
  setStatus: (status) => set({ status }),
}));
```

### O que observar

- Zustand cria uma store simples.
- Pode guardar filtros, preferências ou tema.
- Não deve substituir todo state local.
- Deve ser usado quando várias partes do app precisam do mesmo estado.

---

## Exercício 10 — Conceito de Recharts

### Objetivo

Entender como criar gráficos no Dashboard.

### Exemplo conceitual

```tsx
<BarChart data={dados}>
  <XAxis dataKey="status" />
  <YAxis />
  <Bar dataKey="quantidade" />
</BarChart>
```

### O que observar

- Recharts cria gráficos com componentes React.
- O Dashboard fica mais visual.
- Gráficos ajudam recrutadores a entenderem o valor do projeto.
- Precisamos criar dados úteis, não gráficos decorativos.

---

## Exercício 11 — Conceito de TanStack Table

### Objetivo

Entender como criar tabelas profissionais.

### Exemplo conceitual

```tsx
const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
});
```

### O que observar

- A tabela é baseada em dados e colunas.
- Permite ordenação, filtros e paginação.
- É útil para a lista de clientes.
- Pode complementar ou substituir cards.

---

## Exercício 12 — Conceito de date-fns

### Objetivo

Entender como trabalhar com datas.

### Exemplo

```ts
format(new Date(), "dd/MM/yyyy");
```

### O que observar

- date-fns ajuda a formatar datas.
- Será útil para atividades, vendas e histórico.
- Podemos usar padrão brasileiro.
- Também serve para filtros por período.

---

## Exercício 13 — Conceito de toast

### Objetivo

Entender feedback visual moderno.

### Exemplo conceitual

```ts
toast.success("Cliente cadastrado com sucesso.");
toast.error("Erro ao salvar cliente.");
```

### O que observar

- Toast melhora a experiência do usuário.
- Substitui mensagens fixas na tela.
- Deve ser usado com critério.
- Ajuda o projeto a parecer mais profissional.

---

## Exercício 14 — Avaliar Tailwind CSS

### Objetivo

Entender se faz sentido instalar Tailwind agora.

### Pontos de análise

- O projeto já possui CSS próprio.
- A Fase 12 será focada em design futurista.
- Tailwind pode acelerar a criação visual.
- Migrar tudo agora pode ser trabalho grande demais.

### O que observar

Talvez Tailwind seja preparado na Fase 10 ou deixado para a Fase 12, dependendo da decisão de arquitetura visual.

---

## Exercício 15 — Avaliar Shadcn/UI

### Objetivo

Entender se vamos usar Shadcn/UI ou componentes próprios.

### Pontos de análise

- Shadcn/UI depende de Tailwind.
- Pode acelerar criação de componentes profissionais.
- O projeto já tem componentes próprios.
- Podemos usar apenas se fizer sentido para tabela, dialog, toast ou form.

### O que observar

Não vamos instalar Shadcn/UI automaticamente. Vamos avaliar quando chegarmos na parte de UI.