export const clientes = [
  {
    id: 1,
    nome: "Cervejaria Odin",
    cidade: "Teresópolis",
    status: "ativo",
    segmento: "Cervejaria",
    totalComprado: 2500,
  },
  {
    id: 2,
    nome: "Restaurante Sabor da Serra",
    cidade: "Petrópolis",
    status: "pendente",
    segmento: "Food Service",
    totalComprado: 850,
  },
  {
    id: 3,
    nome: "Hotel Imperial",
    cidade: "Petrópolis",
    status: "ativo",
    segmento: "Hotelaria",
    totalComprado: 4200,
  },
];

export const produtos = [
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
];

export const oportunidades = [
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
];

export const atividades = [
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
];