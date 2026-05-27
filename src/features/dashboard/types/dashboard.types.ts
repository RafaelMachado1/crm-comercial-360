export type DashboardMonth = {
  value: number;
  label: string;
};

export type DashboardYear = number;

export type SalesEvolutionPoint = {
  day: number;
  date: string;
  salesAmount: number;
  accumulatedSalesAmount: number;
  salesForecast?: number;
};

export type SalesSummary = {
  soldInMonth: number;
  monthGoal: number;
  requiredPerBusinessDay: number | null;
  soldToday: number;
};

export type CustomerPortfolioStatus = {
  label: string;
  value: number;
  percentage: number;
};

export type CustomerPortfolio = {
  totalCustomers: number;
  statuses: CustomerPortfolioStatus[];
};

export type CustomerPositivation = {
  totalActiveCustomers: number;
  positivatedCustomers: number;
  positivatedPercentage: number;
};

export type CustomerABCItem = {
  curve: "A" | "B" | "C";
  customers: number;
  percentage: number;
};

export type DashboardReportCategory =
  | "Vendas"
  | "Clientes"
  | "Produtos"
  | "Faturamento e títulos"
  | "Comissões"
  | "Outros";

export type DashboardReportItem = {
  id: string;
  label: string;
  category: DashboardReportCategory;
  isNew?: boolean;
  isLegacy?: boolean;
};

export type DashboardData = {
  selectedMonth: number;
  selectedYear: number;
  salesEvolution: SalesEvolutionPoint[];
  salesSummary: SalesSummary;
  customerPortfolio: CustomerPortfolio;
  customerPositivation: CustomerPositivation;
  customerABC: CustomerABCItem[];
  reports: DashboardReportItem[];
};
