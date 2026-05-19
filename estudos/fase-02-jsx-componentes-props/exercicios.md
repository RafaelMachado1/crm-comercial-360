# Fase 02 — Exercícios guiados

## Objetivo dos exercícios

Praticar os conceitos principais da Fase 02 antes de aplicar no projeto real.

Nesta fase, os exercícios são exemplos de estudo. Eles servem para entender JSX, componentes, props e children antes de criar os componentes reais dentro de `src/components/`.

---

## Exercício 1 — Criar um componente simples

### Objetivo

Entender que um componente React é uma função que retorna JSX.

### Exemplo

```jsx
function Header() {
  return (
    <header>
      <h1>CRM Comercial 360</h1>
    </header>
  );
}

export default Header;
```

### O que observar

- O componente é uma função.
- O nome do componente começa com letra maiúscula.
- O componente retorna JSX.
- O componente é exportado para poder ser usado em outro arquivo.

---

## Exercício 2 — Usar um componente dentro de outro

### Objetivo

Entender a relação entre componente pai e componente filho.

### Exemplo

```jsx
function Header() {
  return <header>CRM Comercial 360</header>;
}

function App() {
  return (
    <main>
      <Header />
      <h1>Dashboard</h1>
    </main>
  );
}
```

### O que observar

- `App` é o componente pai.
- `Header` é o componente filho.
- O componente filho é usado como uma tag JSX: `<Header />`.

---

## Exercício 3 — Criar componente com props

### Objetivo

Entender como passar dados de um componente pai para um componente filho.

### Exemplo

```jsx
function PageTitle({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

function App() {
  return (
    <PageTitle
      title="Dashboard"
      description="Acompanhe os principais indicadores comerciais."
    />
  );
}
```

### O que observar

- `title` e `description` são props.
- As props são enviadas pelo componente pai.
- O componente filho recebe as props nos parâmetros da função.
- As props são usadas dentro do JSX com `{}`.

---

## Exercício 4 — Criar card de indicador com props

### Objetivo

Criar um componente reutilizável para exibir indicadores.

### Exemplo

```jsx
function CardIndicador({ titulo, valor, descricao }) {
  return (
    <article>
      <span>{titulo}</span>
      <strong>{valor}</strong>
      <p>{descricao}</p>
    </article>
  );
}

function App() {
  return (
    <section>
      <CardIndicador
        titulo="Clientes ativos"
        valor={12}
        descricao="Clientes em acompanhamento comercial"
      />

      <CardIndicador
        titulo="Produtos cadastrados"
        valor={8}
        descricao="Itens disponíveis no catálogo"
      />
    </section>
  );
}
```

### O que observar

- O mesmo componente é usado mais de uma vez.
- Cada uso recebe dados diferentes.
- Isso evita repetição de HTML.
- O componente fica mais fácil de manter.

---

## Exercício 5 — Passar objeto como prop

### Objetivo

Entender como passar um objeto inteiro para um componente.

### Exemplo

```jsx
const cliente = {
  id: 1,
  nome: "Cervejaria Odin",
  cidade: "Teresópolis",
  status: "ativo",
};

function ClienteCard({ cliente }) {
  return (
    <article>
      <h2>{cliente.nome}</h2>
      <p>{cliente.cidade}</p>
      <span>{cliente.status}</span>
    </article>
  );
}

function App() {
  return <ClienteCard cliente={cliente} />;
}
```

### O que observar

- A prop `cliente` recebe um objeto.
- Dentro do componente, acessamos `cliente.nome`, `cliente.cidade` e `cliente.status`.
- Isso será muito usado no CRM para renderizar clientes vindos do `mockData.js`.

---

## Exercício 6 — Renderizar lista com componente

### Objetivo

Combinar `map` com componente.

### Exemplo

```jsx
const clientes = [
  {
    id: 1,
    nome: "Cervejaria Odin",
    cidade: "Teresópolis",
    status: "ativo",
  },
  {
    id: 2,
    nome: "Hotel Imperial",
    cidade: "Petrópolis",
    status: "ativo",
  },
];

function ClienteCard({ cliente }) {
  return (
    <article>
      <h2>{cliente.nome}</h2>
      <p>{cliente.cidade}</p>
      <span>{cliente.status}</span>
    </article>
  );
}

function App() {
  return (
    <section>
      {clientes.map((cliente) => (
        <ClienteCard key={cliente.id} cliente={cliente} />
      ))}
    </section>
  );
}
```

### O que observar

- O `map` percorre a lista.
- Para cada cliente, renderizamos um `ClienteCard`.
- O `key` ajuda o React a identificar cada item da lista.
- A prop `cliente` envia o objeto inteiro para o componente.

---

## Exercício 7 — Criar componente com children

### Objetivo

Entender como `children` permite criar componentes flexíveis.

### Exemplo

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

function App() {
  return (
    <Card>
      <h2>Clientes ativos</h2>
      <p>12 clientes em acompanhamento</p>
    </Card>
  );
}
```

### O que observar

- Tudo que fica entre `<Card>` e `</Card>` entra na prop `children`.
- O componente `Card` não precisa saber exatamente qual conteúdo será exibido.
- Isso torna o componente mais reutilizável.

---

## Exercício 8 — Criar componente Section com children

### Objetivo

Criar um componente de layout para organizar blocos da tela.

### Exemplo

```jsx
function Section({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function App() {
  return (
    <Section title="Clientes">
      <p>Lista de clientes cadastrados no CRM.</p>
    </Section>
  );
}
```

### O que observar

- `title` é uma prop comum.
- `children` recebe o conteúdo interno.
- O componente `Section` pode ser usado para clientes, produtos, indicadores e atividades.

---

## Exercício 9 — Componentização inteligente

### Objetivo

Entender quando criar um componente.

### Exemplo ruim

```jsx
function App() {
  return (
    <main>
      <div>
        <h2>Cervejaria Odin</h2>
        <p>Teresópolis</p>
      </div>

      <div>
        <h2>Hotel Imperial</h2>
        <p>Petrópolis</p>
      </div>

      <div>
        <h2>Padaria Central</h2>
        <p>Nova Friburgo</p>
      </div>
    </main>
  );
}
```

### Exemplo melhor

```jsx
function ClienteCard({ nome, cidade }) {
  return (
    <article>
      <h2>{nome}</h2>
      <p>{cidade}</p>
    </article>
  );
}

function App() {
  return (
    <main>
      <ClienteCard nome="Cervejaria Odin" cidade="Teresópolis" />
      <ClienteCard nome="Hotel Imperial" cidade="Petrópolis" />
      <ClienteCard nome="Padaria Central" cidade="Nova Friburgo" />
    </main>
  );
}
```

### O que observar

- Se uma estrutura se repete, provavelmente pode virar componente.
- O nome do componente deve explicar sua função.
- Componentes ajudam a reduzir repetição.

---

## Exercício 10 — Como deve ficar a ideia do dashboard

### Objetivo

Visualizar como a tela será organizada no projeto real.

### Exemplo conceitual

```jsx
function App() {
  return (
    <div>
      <Header />

      <div>
        <Sidebar />

        <main>
          <PageTitle
            title="Dashboard"
            description="Visão geral da operação comercial."
          />

          <Section title="Indicadores">
            <CardIndicador titulo="Clientes" valor={12} />
            <CardIndicador titulo="Produtos" valor={8} />
          </Section>

          <Section title="Clientes recentes">
            <ClienteCard cliente={cliente} />
          </Section>
        </main>
      </div>
    </div>
  );
}
```

### O que observar

- `App` organiza a tela.
- `Header`, `Sidebar`, `PageTitle`, `Section` e cards cuidam de partes menores.
- A tela fica mais limpa e fácil de entender.