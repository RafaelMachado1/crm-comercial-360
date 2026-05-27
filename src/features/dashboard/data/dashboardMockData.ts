import type {
  CustomerABCItem,
  CustomerPortfolio,
  CustomerPositivation,
  DashboardMonth,
  DashboardReportItem,
  SalesEvolutionPoint,
  SalesSummary,
} from "../types/dashboard.types";

export const dashboardMonths: DashboardMonth[] = [
  { value: 1, label: "Janeiro" },
  { value: 2, label: "Fevereiro" },
  { value: 3, label: "Março" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Maio" },
  { value: 6, label: "Junho" },
  { value: 7, label: "Julho" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Setembro" },
  { value: 10, label: "Outubro" },
  { value: 11, label: "Novembro" },
  { value: 12, label: "Dezembro" },
];

export const dashboardYears = [2024, 2025, 2026];

export const salesEvolutionMock: SalesEvolutionPoint[] = [
  { day: 1, date: "2026-05-01", salesAmount: 0, accumulatedSalesAmount: 0 },
  { day: 2, date: "2026-05-02", salesAmount: 0, accumulatedSalesAmount: 0 },
  { day: 3, date: "2026-05-03", salesAmount: 0, accumulatedSalesAmount: 0 },
  { day: 4, date: "2026-05-04", salesAmount: 0, accumulatedSalesAmount: 0 },
  { day: 5, date: "2026-05-05", salesAmount: 0, accumulatedSalesAmount: 0 },
  { day: 6, date: "2026-05-06", salesAmount: 0, accumulatedSalesAmount: 0 },
  { day: 7, date: "2026-05-07", salesAmount: 0, accumulatedSalesAmount: 0 },
  { day: 8, date: "2026-05-08", salesAmount: 0, accumulatedSalesAmount: 0 },
  { day: 9, date: "2026-05-09", salesAmount: 0, accumulatedSalesAmount: 0 },
  { day: 10, date: "2026-05-10", salesAmount: 0, accumulatedSalesAmount: 0 },
  { day: 11, date: "2026-05-11", salesAmount: 0, accumulatedSalesAmount: 0 },
  { day: 12, date: "2026-05-12", salesAmount: 0, accumulatedSalesAmount: 0 },
  { day: 13, date: "2026-05-13", salesAmount: 0, accumulatedSalesAmount: 0 },
  { day: 14, date: "2026-05-14", salesAmount: 2800, accumulatedSalesAmount: 2800 },
  { day: 15, date: "2026-05-15", salesAmount: 0, accumulatedSalesAmount: 2800 },
  { day: 16, date: "2026-05-16", salesAmount: 0, accumulatedSalesAmount: 2800 },
  { day: 17, date: "2026-05-17", salesAmount: 0, accumulatedSalesAmount: 2800 },
  { day: 18, date: "2026-05-18", salesAmount: 900, accumulatedSalesAmount: 3700 },
  { day: 19, date: "2026-05-19", salesAmount: 0, accumulatedSalesAmount: 3700 },
  { day: 20, date: "2026-05-20", salesAmount: 0, accumulatedSalesAmount: 3700 },
  { day: 21, date: "2026-05-21", salesAmount: 5670.06, accumulatedSalesAmount: 9370.06 },
  { day: 22, date: "2026-05-22", salesAmount: 0, accumulatedSalesAmount: 9370.06 },
  { day: 23, date: "2026-05-23", salesAmount: 0, accumulatedSalesAmount: 9370.06 },
  { day: 24, date: "2026-05-24", salesAmount: 0, accumulatedSalesAmount: 9370.06 },
  { day: 25, date: "2026-05-25", salesAmount: 0, accumulatedSalesAmount: 9370.06, salesForecast: 9700 },
  { day: 26, date: "2026-05-26", salesAmount: 0, accumulatedSalesAmount: 9370.06, salesForecast: 10400 },
  { day: 27, date: "2026-05-27", salesAmount: 0, accumulatedSalesAmount: 9370.06, salesForecast: 11100 },
  { day: 28, date: "2026-05-28", salesAmount: 0, accumulatedSalesAmount: 9370.06, salesForecast: 11800 },
  { day: 29, date: "2026-05-29", salesAmount: 0, accumulatedSalesAmount: 9370.06, salesForecast: 12400 },
  { day: 30, date: "2026-05-30", salesAmount: 0, accumulatedSalesAmount: 9370.06, salesForecast: 12400 },
  { day: 31, date: "2026-05-31", salesAmount: 0, accumulatedSalesAmount: 9370.06, salesForecast: 12400 },
];

export const salesSummaryMock: SalesSummary = {
  soldInMonth: 9370.06,
  monthGoal: 0,
  requiredPerBusinessDay: null,
  soldToday: 0,
};

export const customerPortfolioMock: CustomerPortfolio = {
  totalCustomers: 7,
  statuses: [
    { label: "Ativos", value: 7, percentage: 100 },
    { label: "Inativos recentes", value: 0, percentage: 0 },
    { label: "Inativos antigos", value: 0, percentage: 0 },
    { label: "Prospects", value: 0, percentage: 0 },
  ],
};

export const customerPositivationMock: CustomerPositivation = {
  totalActiveCustomers: 7,
  positivatedCustomers: 7,
  positivatedPercentage: 100,
};

export const customerABCMock: CustomerABCItem[] = [
  { curve: "A", customers: 4, percentage: 57.14 },
  { curve: "B", customers: 2, percentage: 28.57 },
  { curve: "C", customers: 1, percentage: 14.29 },
];

export const dashboardReportsMock: DashboardReportItem[] = [
  { id: "sales-summary", label: "Resumo de vendas", category: "Vendas", isNew: true },
  { id: "sales-detailed", label: "Vendas detalhadas", category: "Vendas", isNew: true },
  { id: "customer-portfolio", label: "Situação da carteira de clientes", category: "Clientes" },
  { id: "customer-positivation", label: "Positivação de clientes", category: "Clientes" },
  { id: "customer-abc", label: "Curva ABC de clientes", category: "Clientes" },
  { id: "completed-tasks", label: "Relatório de tarefas realizadas", category: "Clientes" },
  { id: "best-selling-products", label: "Produtos mais vendidos", category: "Produtos" },
  { id: "products-by-customer", label: "Positivação de produtos por cliente", category: "Produtos" },
  { id: "products-by-order", label: "Produtos por pedido", category: "Produtos" },
  { id: "invoiced-orders", label: "Pedidos faturados", category: "Faturamento e títulos" },
  { id: "billing", label: "Faturamento", category: "Faturamento e títulos" },
  { id: "titles", label: "Títulos", category: "Faturamento e títulos" },
  { id: "commissions", label: "Relatório de comissões", category: "Comissões" },
  { id: "sent-emails", label: "E-mails enviados", category: "Outros" },
];
