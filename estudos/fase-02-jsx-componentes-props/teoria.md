# Fase 02 — JSX, Componentes, Props e Children

## Objetivo da fase

A Fase 02 tem como objetivo construir a primeira interface componentizada do CRM Comercial 360 usando JSX, componentes reutilizáveis e props.

Até agora, o projeto tem uma tela simples criada na Fase 00 e dados mockados criados na Fase 01.

Nesta fase, vamos começar a transformar a aplicação em uma estrutura mais parecida com um projeto React real.

---

## O que será estudado

- JSX
- Componentes funcionais
- Import/export
- Props
- Children
- Componentização inteligente
- Separação entre componente pai e componente filho

---

## O que será construído no projeto

Nesta fase, vamos criar os primeiros componentes reutilizáveis do CRM:

- `Header`
- `Sidebar`
- `PageTitle`
- `CardIndicador`
- `ClienteCard`
- `ProdutoCard`
- `Card`
- `Section`

Também vamos montar uma tela inicial de dashboard usando esses componentes.

---

## O que é JSX?

JSX é uma sintaxe usada no React que permite escrever uma estrutura parecida com HTML dentro do JavaScript.

Exemplo:

```jsx
function App() {
  return <h1>CRM Comercial 360</h1>;
}
```

Apesar de parecer HTML, isso é JavaScript.

O JSX é convertido pelo React para criar elementos na tela.

---

## Diferença entre HTML e JSX

JSX parece HTML, mas tem algumas diferenças importantes.

No HTML usamos:

```html
<div class="card"></div>
```

No JSX usamos:

```jsx
<div className="card"></div>
```

No HTML usamos atributos comuns como:

```html
<label for="nome"></label>
```

No JSX usamos:

```jsx
<label htmlFor="nome"></label>
```

Outra diferença importante é que no JSX podemos usar JavaScript dentro de `{}`.

Exemplo:

```jsx
const nome = "Rafael";

function App() {
  return <h1>Olá, {nome}</h1>;
}
```

---

## JavaScript dentro do JSX

No JSX, usamos chaves `{}` para inserir expressões JavaScript.

Exemplos:

```jsx
<p>{cliente.nome}</p>
```

```jsx
<strong>{clientes.length}</strong>
```

```jsx
<span>{produto.estoque > 0 ? "Em estoque" : "Sem estoque"}</span>
```

Isso será usado no CRM para exibir:

- nome do cliente;
- cidade;
- status;
- quantidade de produtos;
- indicadores;
- listas.

---

## O que é componente?

Um componente é uma parte reutilizável da interface.

Em React, cada componente é uma função que retorna JSX.

Exemplo:

```jsx
function Header() {
  return <header>CRM Comercial 360</header>;
}
```

Depois, esse componente pode ser usado assim:

```jsx
<Header />
```

No CRM, vamos criar componentes para evitar deixar todo o código dentro do `App.jsx`.

---

## Por que usar componentes?

Componentes ajudam a:

- organizar melhor o código;
- evitar repetição;
- separar responsabilidades;
- reaproveitar partes da interface;
- deixar o projeto mais fácil de manter;
- aproximar o projeto da estrutura usada no mercado.

Sem componentes, o `App.jsx` fica grande e difícil de entender.

Com componentes, a tela é dividida em partes menores.

---

## Componente funcional

Um componente funcional é uma função JavaScript que retorna JSX.

Exemplo:

```jsx
function PageTitle() {
  return <h1>Dashboard</h1>;
}

export default PageTitle;
```

Esse componente pode ser importado em outro arquivo:

```jsx
import PageTitle from "./components/PageTitle";

function App() {
  return <PageTitle />;
}
```

---

## Import e export em componentes

Para usar um componente em outro arquivo, precisamos exportar e importar.

### Export default

```jsx
function Header() {
  return <header>CRM Comercial 360</header>;
}

export default Header;
```

### Import

```jsx
import Header from "./components/Header";
```

Depois usamos:

```jsx
<Header />
```

---

## O que são props?

Props são dados enviados de um componente pai para um componente filho.

Exemplo:

```jsx
function ClienteCard({ nome, cidade }) {
  return (
    <article>
      <h2>{nome}</h2>
      <p>{cidade}</p>
    </article>
  );
}
```

Uso:

```jsx
<ClienteCard nome="Cervejaria Odin" cidade="Teresópolis" />
```

Aqui:

- `nome` é uma prop;
- `cidade` é uma prop;
- `ClienteCard` recebe os dados e renderiza na tela.

---

## Por que usar props?

Props permitem criar componentes reutilizáveis.

Em vez de criar vários cards diferentes manualmente, criamos um componente único e passamos dados diferentes.

Exemplo:

```jsx
<ClienteCard nome="Cervejaria Odin" cidade="Teresópolis" />
<ClienteCard nome="Hotel Imperial" cidade="Petrópolis" />
<ClienteCard nome="Padaria Central" cidade="Nova Friburgo" />
```

O componente é o mesmo, mas os dados mudam.

---

## Props com objetos

Também podemos passar um objeto inteiro como prop.

Exemplo:

```jsx
function ClienteCard({ cliente }) {
  return (
    <article>
      <h2>{cliente.nome}</h2>
      <p>{cliente.cidade}</p>
      <span>{cliente.status}</span>
    </article>
  );
}
```

Uso:

```jsx
<ClienteCard cliente={cliente} />
```

Isso será usado no CRM para renderizar clientes vindos do `mockData.js`.

---

## O que é children?

`children` é uma prop especial do React.

Ela representa o conteúdo colocado dentro de um componente.

Exemplo:

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}
```

Uso:

```jsx
<Card>
  <h2>Clientes ativos</h2>
  <p>3 clientes cadastrados</p>
</Card>
```

Tudo que está dentro de `<Card>...</Card>` entra na prop `children`.

---

## Por que usar children?

`children` é útil para criar componentes flexíveis de layout.

Por exemplo, podemos criar um componente `Section`:

```jsx
function Section({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```

Uso:

```jsx
<Section title="Clientes">
  <ClienteCard cliente={cliente} />
</Section>
```

Isso ajuda a reaproveitar a estrutura visual sem prender o componente a um conteúdo específico.

---

## Componente pai e componente filho

Um componente pai é aquele que usa outro componente dentro dele.

Exemplo:

```jsx
function App() {
  return (
    <main>
      <Header />
      <ClienteCard nome="Cervejaria Odin" />
    </main>
  );
}
```

Aqui:

- `App` é o componente pai;
- `Header` é componente filho;
- `ClienteCard` é componente filho.

O componente pai pode passar dados para o filho usando props.

---

## Componentização inteligente

Componentizar não é sair criando arquivos sem critério.

Um bom componente deve ter uma responsabilidade clara.

Exemplos bons:

- `Header`: topo da aplicação;
- `Sidebar`: menu lateral;
- `PageTitle`: título e descrição da página;
- `CardIndicador`: card de métrica;
- `ClienteCard`: exibe dados de um cliente;
- `ProdutoCard`: exibe dados de um produto;
- `Card`: estrutura visual reutilizável;
- `Section`: bloco de conteúdo reutilizável.

Evite componentes com nomes genéricos demais, como:

- `Coisa`;
- `Bloco`;
- `Teste`;
- `Card2`;
- `NovoComponente`.

---

## Separação de responsabilidades

Cada componente deve cuidar de uma parte da tela.

Exemplo:

`App.jsx` não deve ter todo o HTML da aplicação.

Ele deve organizar a tela usando componentes:

```jsx
function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>
        <PageTitle />
        <Dashboard />
      </main>
    </div>
  );
}
```

Isso deixa o código mais limpo e fácil de evoluir.

---

## Como isso será aplicado no CRM Comercial 360

Nesta fase, vamos transformar a tela simples atual em um dashboard inicial.

Vamos usar:

- `Header` para o topo;
- `Sidebar` para o menu lateral;
- `PageTitle` para o título da página;
- `CardIndicador` para métricas;
- `ClienteCard` para clientes;
- `ProdutoCard` para produtos;
- `Card` e `Section` usando `children`.

Também vamos usar os dados de:

```txt
src/data/mockData.js
```

Esses dados foram preparados na Fase 01.

---

## Critério de conclusão da Fase 02

A Fase 02 será considerada concluída quando:

- a tela inicial estiver dividida em componentes;
- os componentes estiverem em arquivos separados;
- props estiverem sendo usadas corretamente;
- `children` estiver sendo usado em componentes de layout;
- não houver repetição exagerada de HTML;
- os nomes dos componentes fizerem sentido;
- o projeto rodar no navegador sem erro;
- o README estiver atualizado;
- a tag `v0.3.0` estiver criada.

---

## Resumo da Fase 02

A Fase 02 marca o início da componentização real do CRM Comercial 360.

O foco é sair de uma tela simples dentro do `App.jsx` e começar a organizar a aplicação com componentes reutilizáveis.

Essa fase prepara a base visual para as próximas etapas, onde entraremos em state, eventos, listas, formulários, rotas e APIs.