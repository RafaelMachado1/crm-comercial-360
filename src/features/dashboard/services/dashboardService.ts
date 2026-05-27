import {
  customerABCMock,
  customerPortfolioMock,
  customerPositivationMock,
  dashboardReportsMock,
  salesEvolutionMock,
  salesSummaryMock,
} from "../data/dashboardMockData";

import type { DashboardData } from "../types/dashboard.types";

export function getDashboardData(month: number, year: number): DashboardData {
  return {
    selectedMonth: month,
    selectedYear: year,
    salesEvolution: salesEvolutionMock,
    salesSummary: salesSummaryMock,
    customerPortfolio: customerPortfolioMock,
    customerPositivation: customerPositivationMock,
    customerABC: customerABCMock,
    reports: dashboardReportsMock,
  };
}
