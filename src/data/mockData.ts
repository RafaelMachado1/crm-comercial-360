import type { Customer, Product } from "../types/crm";

export const clientes: Customer[] = [
  {
    id: 1,
    nome: "Cervejaria Odin",
    cidade: "Teresópolis",
    segmento: "Cervejaria",
    status: "ativo",
    totalComprado: 2500,
  },
  {
    id: 2,
    nome: "Restaurante Sabor da Serra",
    cidade: "Petrópolis",
    segmento: "Food Service",
    status: "pendente",
    totalComprado: 1200,
  },
  {
    id: 3,
    nome: "Hotel Imperial",
    cidade: "Petrópolis",
    segmento: "Hotelaria",
    status: "ativo",
    totalComprado: 4200,
  },
];

export const produtos: Product[] = [
  {
    id: 1,
    nome: "Detergente Alcalino",
    categoria: "Limpeza Profissional",
    preco: 89.9,
    estoque: 12,
  },
  {
    id: 2,
    nome: "Sanitizante Peracético",
    categoria: "Sanitização",
    preco: 149.9,
    estoque: 8,
  },
  {
    id: 3,
    nome: "Desinfetante Hospitalar",
    categoria: "Desinfecção",
    preco: 119.9,
    estoque: 0,
  },
];