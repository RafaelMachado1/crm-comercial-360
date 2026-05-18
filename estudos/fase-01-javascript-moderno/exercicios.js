// Fase 01 — Exercícios de JavaScript moderno para React
// Estes exercícios são independentes do projeto React.
// O objetivo é estudar JavaScript puro usando dados comerciais simulados.

const clientes = [
  {
    id: 1,
    nome: "Cervejaria Odin",
    cidade: "Teresópolis",
    status: "ativo",
    segmento: "Cervejaria",
    totalComprado: 2500,
    contato: {
      nome: "Carlos",
      telefone: "(21) 99999-1111",
    },
  },
  {
    id: 2,
    nome: "Restaurante Sabor da Serra",
    cidade: "Petrópolis",
    status: "pendente",
    segmento: "Food Service",
    totalComprado: 850,
    contato: {
      nome: "Mariana",
      telefone: "(24) 99999-2222",
    },
  },
  {
    id: 3,
    nome: "Hotel Imperial",
    cidade: "Petrópolis",
    status: "ativo",
    segmento: "Hotelaria",
    totalComprado: 4200,
    contato: {
      nome: "Renato",
      telefone: "(24) 99999-3333",
    },
  },
  {
    id: 4,
    nome: "Padaria Central",
    cidade: "Nova Friburgo",
    status: "inativo",
    segmento: "Panificação",
    totalComprado: 300,
    contato: null,
  },
];

const vendas = [
  { id: 1, clienteId: 1, valor: 2500 },
  { id: 2, clienteId: 2, valor: 850 },
  { id: 3, clienteId: 3, valor: 4200 },
];

console.log("FASE 01 — EXERCÍCIOS");
console.log("--------------------");


//-----------------------------------------------------------------------------------------------------------------------------------------
// EXERCÍCIO 1 — map
const nomesClientes = clientes.map((cliente) => cliente.nome);
console.log("1. Nomes dos clientes:", nomesClientes);

//-----------------------------------------------------------------------------------------------------------------------------------------
// EXERCÍCIO 2 — filter
const clientesAtivos = clientes.filter((cliente) => cliente.status === "ativo");
console.log("2. Clientes ativos:", clientesAtivos);

//-----------------------------------------------------------------------------------------------------------------------------------------
// EXERCÍCIO 3 — find
const clienteEncontrado = clientes.find((cliente) => cliente.id === 2);
console.log("3. Cliente encontrado:", clienteEncontrado);

//-----------------------------------------------------------------------------------------------------------------------------------------
// EXERCÍCIO 4 — reduce
const totalVendido = vendas.reduce((total, venda) => {
  return total + venda.valor;
}, 0);
console.log("4. Total vendido:", totalVendido);

//-----------------------------------------------------------------------------------------------------------------------------------------
// EXERCÍCIO 5 — destructuring
const primeiroCliente = clientes[0];
const { nome, cidade, segmento } = primeiroCliente;
console.log("5. Destructuring:", nome, cidade, segmento);

//-----------------------------------------------------------------------------------------------------------------------------------------
// EXERCÍCIO 6 — spread em array
const novoCliente = {
  id: 5,
  nome: "Clínica São Lucas",
  cidade: "Teresópolis",
  status: "pendente",
  segmento: "Saúde",
  totalComprado: 0,
  contato: {
    nome: "Fernanda",
    telefone: "(21) 99999-5555",
  },
};

const clientesComNovoCliente = [...clientes, novoCliente];
console.log("6. Novo array com cliente adicionado:", clientesComNovoCliente);

//-----------------------------------------------------------------------------------------------------------------------------------------
// EXERCÍCIO 7 — spread em objeto
const clienteOriginal = clientes[1];

const clienteAtualizado = {
  ...clienteOriginal,
  status: "ativo",
};

console.log("7. Cliente original:", clienteOriginal);
console.log("7. Cliente atualizado:", clienteAtualizado);

//-----------------------------------------------------------------------------------------------------------------------------------------
// EXERCÍCIO 8 — map + spread para atualizar item
const clientesAtualizados = clientes.map((cliente) => {
  if (cliente.id === 2) {
    return {
      ...cliente,
      status: "ativo",
    };
  }

  return cliente;
});

console.log("8. Lista com cliente atualizado:", clientesAtualizados);

//-----------------------------------------------------------------------------------------------------------------------------------------
// EXERCÍCIO 9 — optional chaining
const clienteSemContato = clientes[3];
const telefone = clienteSemContato.contato?.telefone || "Telefone não cadastrado";
console.log("9. Telefone:", telefone);

//-----------------------------------------------------------------------------------------------------------------------------------------
// EXERCÍCIO 10 — template string
const mensagem = `O cliente ${primeiroCliente.nome} é do segmento ${primeiroCliente.segmento}.`;
console.log("10. Mensagem:", mensagem);

//-----------------------------------------------------------------------------------------------------------------------------------------
// EXERCÍCIO 11 — rest operator em objeto
const { contato, ...dadosSemContato } = primeiroCliente;
console.log("11. Dados sem contato:", dadosSemContato);

//-----------------------------------------------------------------------------------------------------------------------------------------
// EXERCÍCIO 12 — Promise
function buscarClientes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(clientes);
    }, 2000);
  });
}

buscarClientes().then((dados) => {
  console.log("12. Clientes carregados com Promise:", dados);
});

//-----------------------------------------------------------------------------------------------------------------------------------------
// EXERCÍCIO 13 — async/await
async function carregarClientes() {
  const dados = await buscarClientes();
  console.log("13. Clientes carregados com async/await:", dados);
}

carregarClientes();