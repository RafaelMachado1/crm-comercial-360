# Fase 09 — Exercícios guiados

## Objetivo dos exercícios

Praticar os conceitos principais da migração para TypeScript antes de aplicar no CRM Comercial 360.

Nesta fase, o foco é entender:

- tipos básicos;
- tipos e interfaces;
- union types;
- props tipadas;
- state tipado;
- eventos tipados;
- formulários tipados;
- hooks tipados;
- services tipados;
- generics básicos;
- como evitar `any`.

---

## Exercício 1 — Tipos básicos

### Objetivo

Entender como tipar valores simples.

### Exemplo

```ts
const nome: string = "Rafael";
const idade: number = 40;
const ativo: boolean = true;
```

### O que observar

- `string` representa texto.
- `number` representa número.
- `boolean` representa verdadeiro ou falso.
- O TypeScript avisa quando o tipo não bate.

### Exemplo de erro

```ts
const idade: number = "40";
```

Isso gera erro porque `"40"` é texto, não número.

---

## Exercício 2 — Criar tipo Customer

### Objetivo

Criar um tipo para representar um cliente do CRM.

### Exemplo

```ts
type CustomerStatus = "ativo" | "pendente" | "inativo";

type Customer = {
  id: number;
  nome: string;
  cidade: string;
  segmento: string;
  status: CustomerStatus;
  totalComprado: number;
};
```

### O que observar

- `CustomerStatus` limita os status permitidos.
- `Customer` representa a estrutura esperada de um cliente.
- Se faltar uma propriedade, o TypeScript avisa.
- Se o status estiver escrito errado, o TypeScript avisa.

---

## Exercício 3 — Criar objeto tipado

### Objetivo

Criar um objeto respeitando o tipo `Customer`.

### Exemplo

```ts
const cliente: Customer = {
  id: 1,
  nome: "Cervejaria Odin",
  cidade: "Teresópolis",
  segmento: "Cervejaria",
  status: "ativo",
  totalComprado: 2500,
};
```

### O que observar

- O objeto precisa seguir o formato do tipo.
- `status` só aceita `"ativo"`, `"pendente"` ou `"inativo"`.
- `totalComprado` precisa ser número.

---

## Exercício 4 — Array tipado

### Objetivo

Tipar uma lista de clientes.

### Exemplo

```ts
const clientes: Customer[] = [
  {
    id: 1,
    nome: "Cervejaria Odin",
    cidade: "Teresópolis",
    segmento: "Cervejaria",
    status: "ativo",
    totalComprado: 2500,
  },
];
```

### O que observar

- `Customer[]` significa array de clientes.
- Todos os itens do array precisam respeitar o tipo `Customer`.

---

## Exercício 5 — Função tipada

### Objetivo

Tipar parâmetros e retorno de função.

### Exemplo

```ts
function calcularTotal(clientes: Customer[]): number {
  return clientes.reduce((total, cliente) => {
    return total + cliente.totalComprado;
  }, 0);
}
```

### O que observar

- A função recebe `Customer[]`.
- A função retorna `number`.
- O TypeScript entende que cada `cliente` é um `Customer`.

---

## Exercício 6 — Props tipadas

### Objetivo

Entender como tipar props de componentes.

### Exemplo

```tsx
type ClienteCardProps = {
  cliente: Customer;
};

function ClienteCard({ cliente }: ClienteCardProps) {
  return (
    <article>
      <h3>{cliente.nome}</h3>
      <p>{cliente.cidade}</p>
    </article>
  );
}

export default ClienteCard;
```

### O que observar

- `ClienteCardProps` define as props aceitas.
- O componente espera receber um `cliente` do tipo `Customer`.
- Se enviar outro tipo de dado, o TypeScript avisa.

---

## Exercício 7 — Props com funções

### Objetivo

Tipar uma função recebida por props.

### Exemplo

```tsx
type ClienteCardProps = {
  cliente: Customer;
  onExcluirCliente: (clienteId: number) => void;
};

function ClienteCard({ cliente, onExcluirCliente }: ClienteCardProps) {
  return (
    <button onClick={() => onExcluirCliente(cliente.id)}>
      Excluir
    </button>
  );
}
```

### O que observar

- `onExcluirCliente` é uma função.
- Ela recebe um `number`.
- Ela não retorna nada, por isso usamos `void`.

---

## Exercício 8 — State tipado

### Objetivo

Tipar `useState`.

### Exemplo

```tsx
const [clientes, setClientes] = useState<Customer[]>([]);
```

### O que observar

- O state guarda uma lista de clientes.
- `setClientes` só aceita listas de `Customer`.

Outro exemplo:

```tsx
const [clienteSelecionado, setClienteSelecionado] = useState<Customer | null>(null);
```

Aqui o state pode ser:

- um `Customer`;
- ou `null`.

---

## Exercício 9 — Evento de input tipado

### Objetivo

Tipar evento de input.

### Exemplo

```tsx
function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
  console.log(event.target.value);
}
```

### O que observar

- `HTMLInputElement` é usado para input.
- O TypeScript entende `event.target.value`.

---

## Exercício 10 — Evento de select tipado

### Objetivo

Tipar evento de select.

### Exemplo

```tsx
function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
  console.log(event.target.value);
}
```

### O que observar

- `HTMLSelectElement` é usado para select.
- Isso será útil nos filtros e formulários.

---

## Exercício 11 — Evento de formulário tipado

### Objetivo

Tipar submit de formulário.

### Exemplo

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  console.log("Formulário enviado");
}
```

### O que observar

- `React.FormEvent<HTMLFormElement>` representa o submit.
- O TypeScript reconhece `event.preventDefault()`.

---

## Exercício 12 — Tipo de formulário

### Objetivo

Criar tipo específico para os dados do formulário.

### Exemplo

```ts
type CustomerFormData = {
  nome: string;
  cidade: string;
  segmento: string;
  status: CustomerStatus;
};
```

### O que observar

- O formulário não precisa ter `id`.
- O formulário não precisa ter `totalComprado`.
- Esses dados podem ser criados depois no payload.

---

## Exercício 13 — Service tipado

### Objetivo

Tipar função assíncrona.

### Exemplo

```ts
async function buscarClientesFake(clientesIniciais: Customer[]): Promise<Customer[]> {
  return clientesIniciais;
}
```

### O que observar

- A função recebe `Customer[]`.
- Retorna uma `Promise<Customer[]>`.
- Isso simula uma resposta de API.

---

## Exercício 14 — Generic básico

### Objetivo

Entender generics em uma função reutilizável.

### Exemplo

```ts
function getFirstItem<T>(items: T[]): T {
  return items[0];
}
```

### Uso

```ts
const primeiroCliente = getFirstItem<Customer>(clientes);
const primeiroProduto = getFirstItem<Product>(produtos);
```

### O que observar

- `T` representa um tipo flexível.
- A função funciona com clientes, produtos ou outros arrays.
- O retorno mantém o tipo correto.

---

## Exercício 15 — Generic no useLocalStorage

### Objetivo

Entender como generics ajudam hooks reutilizáveis.

### Exemplo

```ts
function useLocalStorage<T>(key: string, initialValue: T) {
  // lógica
}
```

### Uso

```ts
const clientesStorage = useLocalStorage<Customer[]>("crm-clientes", []);
const userStorage = useLocalStorage<User | null>("crm-user", null);
```

### O que observar

- O mesmo hook pode trabalhar com vários tipos.
- O TypeScript entende o tipo de dado salvo.
- Isso evita usar `any`.