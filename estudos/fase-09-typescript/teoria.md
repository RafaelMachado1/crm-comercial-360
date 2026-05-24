# Fase 09 — Migração para React com TypeScript

## Objetivo da fase

A Fase 09 tem como objetivo transformar o CRM Comercial 360 em uma versão profissional com TypeScript.

Até agora, o projeto foi construído com React e JavaScript.

Isso foi importante para aprender:

- componentes;
- props;
- state;
- eventos;
- formulários;
- CRUD;
- localStorage;
- API fake;
- React Router;
- Context API;
- hooks customizados;
- organização profissional.

Agora vamos adicionar tipagem com TypeScript para reduzir erros e preparar o projeto para padrões de mercado.

---

## O que será estudado

- TypeScript no React
- Props tipadas
- Tipos e interfaces
- Estado tipado
- Eventos tipados
- Formulário tipado
- Resposta de API tipada
- Evitar `any`
- Generics básicos

---

## O que é TypeScript?

TypeScript é uma linguagem baseada em JavaScript que adiciona tipagem estática.

Isso significa que podemos dizer ao código quais tipos de dados esperamos.

Exemplo em JavaScript:

```js
function somar(a, b) {
  return a + b;
}
```

Exemplo em TypeScript:

```ts
function somar(a: number, b: number): number {
  return a + b;
}
```

Agora fica claro que:

- `a` precisa ser número;
- `b` precisa ser número;
- o retorno será número.

---

## Por que usar TypeScript no React?

TypeScript ajuda a evitar erros comuns antes do projeto rodar.

Exemplo:

```jsx
<ClienteCard cliente={produto} />
```

Sem TypeScript, talvez o erro só apareça em tempo de execução.

Com TypeScript, o editor pode avisar antes:

```txt
Este componente espera um Customer, mas recebeu um Product.
```

Isso melhora:

- segurança;
- manutenção;
- produtividade;
- documentação do código;
- clareza para outros devs;
- qualidade para projetos profissionais.

---

## TypeScript não muda o comportamento visual

Migrar para TypeScript não significa mudar a aparência do sistema.

A tela continua igual.

O que muda é a qualidade interna do código.

Antes:

```jsx
function ClienteCard({ cliente }) {
  return <h3>{cliente.nome}</h3>;
}
```

Depois:

```tsx
type ClienteCardProps = {
  cliente: Customer;
};

function ClienteCard({ cliente }: ClienteCardProps) {
  return <h3>{cliente.nome}</h3>;
}
```

Agora o componente sabe exatamente que tipo de dado espera receber.

---

## Arquivos .js, .jsx, .ts e .tsx

No React com TypeScript, usamos:

```txt
.js   → JavaScript sem JSX
.jsx  → JavaScript com JSX
.ts   → TypeScript sem JSX
.tsx  → TypeScript com JSX
```

Exemplos:

```txt
App.jsx               → App.tsx
ClienteCard.jsx       → ClienteCard.tsx
customerUtils.js      → customerUtils.ts
useCustomers.js       → useCustomers.ts
```

Sempre que o arquivo tiver JSX, usamos `.tsx`.

---

## Tipos e interfaces

TypeScript permite criar tipos para representar os dados do sistema.

Exemplo:

```ts
export type CustomerStatus = "ativo" | "pendente" | "inativo";

export type Customer = {
  id: number;
  nome: string;
  cidade: string;
  segmento: string;
  status: CustomerStatus;
  totalComprado: number;
};
```

Esse tipo representa um cliente do CRM.

---

## Type ou interface?

Podemos usar `type` ou `interface`.

Exemplo com `type`:

```ts
type Product = {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
};
```

Exemplo com `interface`:

```ts
interface Product {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
}
```

No nosso projeto, vamos usar `type` para manter simples e direto.

---

## Union types

Union type permite limitar valores possíveis.

Exemplo:

```ts
type CustomerStatus = "ativo" | "pendente" | "inativo";
```

Assim, o status do cliente só pode ser um desses três valores.

Isso evita erros como:

```ts
status: "ativoo"
```

---

## Props tipadas

Props são dados recebidos por componentes.

Exemplo sem TypeScript:

```jsx
function ClienteCard({ cliente }) {
  return <h3>{cliente.nome}</h3>;
}
```

Exemplo com TypeScript:

```tsx
type ClienteCardProps = {
  cliente: Customer;
};

function ClienteCard({ cliente }: ClienteCardProps) {
  return <h3>{cliente.nome}</h3>;
}
```

Agora o componente só aceita um `Customer`.

---

## Estado tipado

O `useState` também pode ser tipado.

Exemplo:

```tsx
const [clientes, setClientes] = useState<Customer[]>([]);
```

Isso significa:

```txt
clientes é um array de Customer
```

Outro exemplo:

```tsx
const [clienteSelecionado, setClienteSelecionado] = useState<Customer | null>(null);
```

Isso significa:

```txt
clienteSelecionado pode ser um Customer ou null
```

---

## Eventos tipados

Eventos também devem ser tipados.

Exemplo de input:

```tsx
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  console.log(event.target.value);
}
```

Exemplo de select:

```tsx
function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
  console.log(event.target.value);
}
```

Exemplo de formulário:

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
}
```

Isso ajuda o editor a entender corretamente o evento.

---

## Formulário tipado

Podemos criar um tipo para o formulário.

Exemplo:

```ts
export type CustomerFormData = {
  nome: string;
  cidade: string;
  segmento: string;
  status: CustomerStatus;
};
```

Esse tipo pode ser usado no hook do formulário.

---

## Resposta de API tipada

Mesmo usando API fake, podemos tipar o retorno.

Exemplo:

```ts
export async function buscarClientesFake(
  clientesIniciais: Customer[]
): Promise<Customer[]> {
  return clientesIniciais;
}
```

Isso deixa claro que a função retorna uma promessa com array de clientes.

---

## Evitar any

`any` significa que o TypeScript deixa passar qualquer coisa.

Exemplo ruim:

```ts
function salvar(dado: any) {
  console.log(dado);
}
```

O problema é que `any` remove a segurança do TypeScript.

Nesta fase, o objetivo é evitar `any` sempre que possível.

Podemos usar tipos específicos:

```ts
function salvar(customer: Customer) {
  console.log(customer);
}
```

---

## Generics básicos

Generics permitem criar funções reutilizáveis com tipos flexíveis.

Exemplo:

```ts
function retornarPrimeiroItem<T>(lista: T[]): T {
  return lista[0];
}
```

Uso:

```ts
const primeiroCliente = retornarPrimeiroItem<Customer>(clientes);
const primeiroProduto = retornarPrimeiroItem<Product>(produtos);
```

No nosso projeto, generics podem aparecer em hooks como `useLocalStorage`.

Exemplo:

```ts
function useLocalStorage<T>(key: string, initialValue: T) {
  // lógica
}
```

Assim o hook pode trabalhar com diferentes tipos de dados.

---

## Tipos principais do CRM

Nesta fase, vamos criar tipos para as principais entidades do sistema.

### Customer

Representa um cliente.

```ts
export type CustomerStatus = "ativo" | "pendente" | "inativo";

export type Customer = {
  id: number;
  nome: string;
  cidade: string;
  segmento: string;
  status: CustomerStatus;
  totalComprado: number;
};
```

### Product

Representa um produto.

```ts
export type Product = {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
};
```

### User

Representa o usuário logado.

```ts
export type User = {
  nome: string;
  email: string;
};
```

### Opportunity

Representa uma oportunidade comercial.

```ts
export type Opportunity = {
  id: number;
  customerId: number;
  titulo: string;
  status: "aberta" | "ganha" | "perdida";
  valorEstimado: number;
};
```

### Activity

Representa uma atividade comercial.

```ts
export type Activity = {
  id: number;
  customerId: number;
  tipo: "ligacao" | "visita" | "reuniao" | "email";
  descricao: string;
  data: string;
  concluida: boolean;
};
```

### Sale

Representa uma venda.

```ts
export type Sale = {
  id: number;
  customerId: number;
  valor: number;
  data: string;
  status: "aberta" | "fechada" | "cancelada";
};
```

---

## Onde guardar os tipos

Vamos criar:

```txt
src/types/
```

E dentro:

```txt
src/types/crm.ts
```

Esse arquivo vai concentrar os principais tipos do CRM.

---

## Plano de migração gradual

Migrar tudo de uma vez pode gerar muitos erros.

Por isso, vamos seguir uma ordem segura:

```txt
1. Instalar TypeScript
2. Criar arquivos de configuração
3. Criar tipos principais
4. Migrar data/mockData.js para mockData.ts
5. Migrar utils para .ts
6. Migrar services para .ts
7. Migrar hooks para .ts
8. Migrar components para .tsx
9. Migrar pages para .tsx
10. Migrar App.jsx e main.jsx para .tsx
11. Corrigir erros do TypeScript
12. Rodar npm run dev
13. Rodar npx tsc --noEmit
```

---

## Como isso será aplicado no CRM Comercial 360

Na Fase 09, vamos:

- configurar TypeScript;
- criar tipos principais;
- migrar arquivos aos poucos;
- tipar props dos componentes;
- tipar hooks customizados;
- tipar services;
- tipar utils;
- tipar contexto de autenticação;
- evitar uso desnecessário de `any`;
- garantir que o projeto compile sem erro.

---

## Critério de conclusão da Fase 09

A Fase 09 será considerada concluída quando:

- o projeto estiver rodando com TypeScript;
- tipos principais estiverem criados;
- componentes principais estiverem tipados;
- hooks customizados estiverem tipados;
- services estiverem tipados;
- contextos estiverem tipados;
- não houver uso desnecessário de `any`;
- o projeto compilar sem erro;
- o usuário conseguir explicar os tipos criados;
- README estiver atualizado;
- tag `v1.0.0` estiver criada.

---

## Resumo da Fase 09

A Fase 09 transforma o CRM Comercial 360 em uma versão mais profissional.

A migração para TypeScript melhora a segurança, a clareza e a manutenção do código.

Essa fase é importante para preparar o projeto para mercado e para entrevistas técnicas.