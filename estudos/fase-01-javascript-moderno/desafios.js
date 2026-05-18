// Fase 01 — Desafios de JavaScript moderno para React
// Resolva e estude cada desafio usando dados comerciais simulados.

const produtos = [
  {
    id: 1,
    nome: "Bionew",
    categoria: "Detergente",
    preco: 89.9,
    estoque: 12,
  },
  {
    id: 2,
    nome: "Bioprotein",
    categoria: "Desinfetante",
    preco: 120,
    estoque: 5,
  },
  {
    id: 3,
    nome: "Clean40",
    categoria: "Limpador",
    preco: 65,
    estoque: 0,
  },
  {
    id: 4,
    nome: "Bioclore Gel",
    categoria: "Clorado",
    preco: 98.5,
    estoque: 8,
  },
];

const oportunidades = [
  {
    id: 1,
    clienteId: 1,
    titulo: "Implantação de protocolo CIP",
    status: "aberta",
    valorEstimado: 3500,
  },
  {
    id: 2,
    clienteId: 2,
    titulo: "Padronização de limpeza da cozinha",
    status: "negociacao",
    valorEstimado: 1800,
  },
  {
    id: 3,
    clienteId: 3,
    titulo: "Produtos para governança",
    status: "ganha",
    valorEstimado: 4200,
  },
];

const atividades = [
  {
    id: 1,
    clienteId: 1,
    tipo: "visita",
    descricao: "Visitar cliente para apresentar linha CIP",
    status: "pendente",
  },
  {
    id: 2,
    clienteId: 2,
    tipo: "ligacao",
    descricao: "Retornar proposta enviada",
    status: "pendente",
  },
  {
    id: 3,
    clienteId: 3,
    tipo: "reuniao",
    descricao: "Reunião para revisão de consumo",
    status: "concluida",
  },
];

console.log("FASE 01 — DESAFIOS");
console.log("------------------");

//------------------------------------------------------------------------------------------------------------------------------------------
// DESAFIO 1 — lista de nomes dos produtos
const nomesProdutos = produtos.map((produto) => produto.nome);
console.log("1. Nomes dos produtos:", nomesProdutos);

//------------------------------------------------------------------------------------------------------------------------------------------
// DESAFIO 2 — produtos com estoque
const produtosComEstoque = produtos.filter((produto) => produto.estoque > 0);
console.log("2. Produtos com estoque:", produtosComEstoque);

//------------------------------------------------------------------------------------------------------------------------------------------
// DESAFIO 3 — produto por ID
const produtoEncontrado = produtos.find((produto) => produto.id === 3);
console.log("3. Produto encontrado:", produtoEncontrado);

//------------------------------------------------------------------------------------------------------------------------------------------
// DESAFIO 4 — valor total em estoque
const valorTotalEmEstoque = produtos.reduce((total, produto) => {
  return total + produto.preco * produto.estoque;
}, 0);
console.log("4. Valor total em estoque:", valorTotalEmEstoque);

//------------------------------------------------------------------------------------------------------------------------------------------
// DESAFIO 5 — oportunidades abertas
const oportunidadesAbertas = oportunidades.filter(
  (oportunidade) => oportunidade.status === "aberta"
);
console.log("5. Oportunidades abertas:", oportunidadesAbertas);

//------------------------------------------------------------------------------------------------------------------------------------------
// DESAFIO 6 — total de oportunidades
const totalOportunidades = oportunidades.reduce((total, oportunidade) => {
  return total + oportunidade.valorEstimado;
}, 0);
console.log("6. Total de oportunidades:", totalOportunidades);

//------------------------------------------------------------------------------------------------------------------------------------------
// DESAFIO 7 — atividades pendentes
const atividadesPendentes = atividades.filter(
  (atividade) => atividade.status === "pendente"
);
console.log("7. Atividades pendentes:", atividadesPendentes);

//------------------------------------------------------------------------------------------------------------------------------------------
// DESAFIO 8 — adicionar produto com spread
const novoProduto = {
  id: 5,
  nome: "Quatbio",
  categoria: "Desinfetante hospitalar",
  preco: 145,
  estoque: 3,
};

const produtosAtualizados = [...produtos, novoProduto];
console.log("8. Produtos atualizados:", produtosAtualizados);

//------------------------------------------------------------------------------------------------------------------------------------------
// DESAFIO 9 — atualizar estoque do Clean40 para 10
const produtosComEstoqueAtualizado = produtos.map((produto) => {
  if (produto.nome === "Clean40") {
    return {
      ...produto,
      estoque: 10,
    };
  }

  return produto;
});

console.log("9. Produtos com estoque atualizado:", produtosComEstoqueAtualizado);

//------------------------------------------------------------------------------------------------------------------------------------------
// DESAFIO 10 — rest operator
const produto = produtos[0];
const { preco, ...produtoSemPreco } = produto;
console.log("10. Produto sem preço:", produtoSemPreco);