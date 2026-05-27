import { getDashboardData } from "../services/dashboardService";

export function useDashboardData(month: number, year: number) {
  const data = getDashboardData(month, year);

  return {
    data,
  };
}
