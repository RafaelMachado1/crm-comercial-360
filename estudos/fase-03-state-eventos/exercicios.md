# Fase 03 — Exercícios guiados

## Objetivo dos exercícios

Praticar os conceitos principais da Fase 03 antes de aplicar no CRM real.

Nesta fase, o foco é entender:

- `useState`
- eventos
- renderização condicional
- imutabilidade
- estado boolean
- estado string
- estado objeto
- estado array

---

## Exercício 1 — Estado simples com contador

### Objetivo

Entender que `useState` guarda um valor que pode mudar com o tempo.

### Exemplo

```jsx
import { useState } from "react";

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Valor atual: {contador}</p>

      <button onClick={() => setContador(contador + 1)}>
        Aumentar
      </button>
    </div>
  );
}

export default Contador;
```

### O que observar

- `contador` é o valor atual.
- `setContador` atualiza o valor.
- Quando o estado muda, o React renderiza a tela novamente.
- O botão dispara um evento `onClick`.

---

## Exercício 2 — Estado boolean para abrir e fechar

### Objetivo

Entender como usar `true` e `false` para mostrar ou esconder elementos.

### Exemplo

```jsx
import { useState } from "react";

function MenuToggle() {
  const [menuAberto, setMenuAberto] = useState(true);

  return (
    <div>
      <button onClick={() => setMenuAberto(!menuAberto)}>
        {menuAberto ? "Fechar menu" : "Abrir menu"}
      </button>

      {menuAberto && (
        <aside>
          <a href="#">Dashboard</a>
          <a href="#">Clientes</a>
          <a href="#">Produtos</a>
        </aside>
      )}
    </div>
  );
}

export default MenuToggle;
```

### O que observar

- `menuAberto` começa como `true`.
- Ao clicar, o valor inverte.
- `&&` mostra o menu apenas quando `menuAberto` é verdadeiro.
- O texto do botão usa operador ternário.

---

## Exercício 3 — Estado string com select

### Objetivo

Entender como guardar uma opção escolhida pelo usuário.

### Exemplo

```jsx
import { useState } from "react";

function FiltroStatus() {
  const [statusSelecionado, setStatusSelecionado] = useState("todos");

  return (
    <div>
      <label>Status:</label>

      <select
        value={statusSelecionado}
        onChange={(event) => setStatusSelecionado(event.target.value)}
      >
        <option value="todos">Todos</option>
        <option value="ativo">Ativo</option>
        <option value="pendente">Pendente</option>
        <option value="inativo">Inativo</option>
      </select>

      <p>Status selecionado: {statusSelecionado}</p>
    </div>
  );
}

export default FiltroStatus;
```

### O que observar

- `statusSelecionado` guarda o valor atual do select.
- `onChange` captura a mudança.
- `event.target.value` representa o novo valor escolhido.
- Esse padrão será usado para filtrar clientes por status.

---

## Exercício 4 — Filtrar lista com state

### Objetivo

Combinar `useState`, `filter` e renderização de listas.

### Exemplo

```jsx
import { useState } from "react";

const clientes = [
  { id: 1, nome: "Cervejaria Odin", status: "ativo" },
  { id: 2, nome: "Restaurante Sabor da Serra", status: "pendente" },
  { id: 3, nome: "Hotel Imperial", status: "ativo" },
];

function ListaClientes() {
  const [statusSelecionado, setStatusSelecionado] = useState("todos");

  const clientesFiltrados =
    statusSelecionado === "todos"
      ? clientes
      : clientes.filter((cliente) => cliente.status === statusSelecionado);

  return (
    <div>
      <select
        value={statusSelecionado}
        onChange={(event) => setStatusSelecionado(event.target.value)}
      >
        <option value="todos">Todos</option>
        <option value="ativo">Ativos</option>
        <option value="pendente">Pendentes</option>
      </select>

      {clientesFiltrados.map((cliente) => (
        <p key={cliente.id}>{cliente.nome}</p>
      ))}
    </div>
  );
}

export default ListaClientes;
```

### O que observar

- O estado controla o filtro.
- A lista exibida muda conforme o estado.
- O array original não é alterado.
- O `filter` cria uma nova lista.

---

## Exercício 5 — Renderização condicional com ternário

### Objetivo

Mostrar mensagens diferentes dependendo da quantidade de itens.

### Exemplo

```jsx
function ListaVazia({ clientes }) {
  return (
    <div>
      {clientes.length > 0 ? (
        <p>Existem clientes cadastrados.</p>
      ) : (
        <p>Nenhum cliente encontrado.</p>
      )}
    </div>
  );
}

export default ListaVazia;
```

### O que observar

- O ternário escolhe entre duas mensagens.
- Se a lista tiver clientes, mostra uma mensagem.
- Se estiver vazia, mostra outra.

---

## Exercício 6 — Estado objeto para selecionar cliente

### Objetivo

Guardar um objeto no estado.

### Exemplo

```jsx
import { useState } from "react";

const clientes = [
  { id: 1, nome: "Cervejaria Odin", cidade: "Teresópolis" },
  { id: 2, nome: "Hotel Imperial", cidade: "Petrópolis" },
];

function ClienteSelecionado() {
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  return (
    <div>
      {clientes.map((cliente) => (
        <button
          key={cliente.id}
          onClick={() => setClienteSelecionado(cliente)}
        >
          Ver {cliente.nome}
        </button>
      ))}

      {clienteSelecionado && (
        <div>
          <h2>{clienteSelecionado.nome}</h2>
          <p>{clienteSelecionado.cidade}</p>
        </div>
      )}
    </div>
  );
}

export default ClienteSelecionado;
```

### O que observar

- O estado começa como `null`.
- Ao clicar, o estado recebe um objeto cliente.
- O bloco só aparece se existir cliente selecionado.
- Esse padrão será usado no modal.

---

## Exercício 7 — Modal simples

### Objetivo

Entender como abrir e fechar um modal com state.

### Exemplo

```jsx
import { useState } from "react";

function ModalExemplo() {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <div>
      <button onClick={() => setModalAberto(true)}>
        Abrir modal
      </button>

      {modalAberto && (
        <div className="modal">
          <div className="modal-content">
            <h2>Detalhes do cliente</h2>
            <p>Informações comerciais do cliente.</p>

            <button onClick={() => setModalAberto(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalExemplo;
```

### O que observar

- `modalAberto` controla se o modal aparece.
- Clicar em abrir define `true`.
- Clicar em fechar define `false`.
- Renderização condicional controla a existência do modal na tela.

---

## Exercício 8 — Estado array com imutabilidade

### Objetivo

Entender como atualizar uma lista sem alterar o array original.

### Exemplo

```jsx
import { useState } from "react";

const clientesIniciais = [
  { id: 1, nome: "Cervejaria Odin", prioridade: false },
  { id: 2, nome: "Hotel Imperial", prioridade: false },
];

function ClientesPrioritarios() {
  const [clientes, setClientes] = useState(clientesIniciais);

  function marcarPrioritario(clienteId) {
    const clientesAtualizados = clientes.map((cliente) => {
      if (cliente.id === clienteId) {
        return {
          ...cliente,
          prioridade: !cliente.prioridade,
        };
      }

      return cliente;
    });

    setClientes(clientesAtualizados);
  }

  return (
    <div>
      {clientes.map((cliente) => (
        <article key={cliente.id}>
          <h2>{cliente.nome}</h2>

          <button onClick={() => marcarPrioritario(cliente.id)}>
            {cliente.prioridade ? "Remover prioridade" : "Marcar prioridade"}
          </button>
        </article>
      ))}
    </div>
  );
}

export default ClientesPrioritarios;
```

### O que observar

- O array original não é alterado diretamente.
- `map` cria uma nova lista.
- `spread` cria uma cópia do cliente alterado.
- O React percebe a mudança porque recebeu um novo array.

---

## Exercício 9 — Estado de loading

### Objetivo

Simular carregamento de dados.

### Exemplo

```jsx
import { useState } from "react";

function LoadingExemplo() {
  const [loading, setLoading] = useState(false);

  function simularCarregamento() {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  return (
    <div>
      <button onClick={simularCarregamento}>
        Carregar dados
      </button>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <p>Dados carregados.</p>
      )}
    </div>
  );
}

export default LoadingExemplo;
```

### O que observar

- `loading` controla a mensagem exibida.
- O botão inicia o carregamento.
- `setTimeout` simula uma espera.
- O ternário troca a mensagem da tela.

---

## Exercício 10 — Estado de erro

### Objetivo

Simular uma mensagem de erro na interface.

### Exemplo

```jsx
import { useState } from "react";

function ErroExemplo() {
  const [erro, setErro] = useState("");

  function simularErro() {
    setErro("Erro ao carregar clientes.");
  }

  function limparErro() {
    setErro("");
  }

  return (
    <div>
      <button onClick={simularErro}>Simular erro</button>
      <button onClick={limparErro}>Limpar erro</button>

      {erro && <p>{erro}</p>}
    </div>
  );
}

export default ErroExemplo;
```

### O que observar

- String vazia representa ausência de erro.
- Quando existe texto em `erro`, a mensagem aparece.
- `&&` é usado para renderização condicional.