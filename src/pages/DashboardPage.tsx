import { useState } from "react";

import PageTitle from "../components/layout/PageTitle";
import {
  dashboardMonths,
  dashboardYears,
} from "../features/dashboard/data/dashboardMockData";
import { useDashboardData } from "../features/dashboard/hooks/useDashboardData";
import { formatCurrencyBR } from "../features/dashboard/utils/dashboardUtils";
import {
  DashboardTabs,
  type DashboardTab,
} from "../features/dashboard/components/DashboardTabs";
import { DashboardFilters } from "../features/dashboard/components/DashboardFilters";
import { SalesMetricCard } from "../features/dashboard/components/SalesMetricCard";
import { SalesEvolutionChart } from "../features/dashboard/components/SalesEvolutionChart";
import { CustomerPortfolioCard } from "../features/dashboard/components/CustomerPortfolioCard";
import { CustomerPositivationCard } from "../features/dashboard/components/CustomerPositivationCard";
import { CustomerABCChart } from "../features/dashboard/components/CustomerABCChart";
import { ReportsTab } from "../features/dashboard/components/ReportsTab";

function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState(5);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [activeTab, setActiveTab] = useState<DashboardTab>("panel");

  const { data } = useDashboardData(selectedMonth, selectedYear);

  const monthGoalDescription =
    data.salesSummary.monthGoal > 0
      ? "Meta definida para o mês"
      : "Nenhuma meta definida";

  const requiredPerBusinessDayValue =
    data.salesSummary.requiredPerBusinessDay === null
      ? "R$ por dia útil"
      : formatCurrencyBR(data.salesSummary.requiredPerBusinessDay);

  const requiredPerBusinessDayDescription =
    data.salesSummary.requiredPerBusinessDay === null
      ? "Nenhuma meta definida"
      : "Necessário para atingir a meta";

  const goalProgress =
    data.salesSummary.monthGoal > 0
      ? (data.salesSummary.soldInMonth / data.salesSummary.monthGoal) * 100
      : undefined;

  return (
    <div className="space-y-6">
      <PageTitle
        label="Roadmap React • Fase 11"
        title="Dashboard"
        description="Acompanhe seus indicadores comerciais, evolução de vendas e relatórios."
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <DashboardFilters
          months={dashboardMonths}
          years={dashboardYears}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
        />
      </div>

      {activeTab === "panel" ? (
        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <SalesEvolutionChart data={data.salesEvolution} />

            <div className="grid gap-4">
              <SalesMetricCard
                title="Vendido no mês"
                value={formatCurrencyBR(data.salesSummary.soldInMonth)}
                description={`Hoje ${formatCurrencyBR(data.salesSummary.soldToday)}`}
              />

              <SalesMetricCard
                title="Objetivo do mês"
                value={formatCurrencyBR(data.salesSummary.monthGoal)}
                description={monthGoalDescription}
                progressValue={goalProgress}
              />

              <SalesMetricCard
                title="Necessário vender"
                value={requiredPerBusinessDayValue}
                description={requiredPerBusinessDayDescription}
              />
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <CustomerPortfolioCard data={data.customerPortfolio} />
            <CustomerPositivationCard data={data.customerPositivation} />
            <CustomerABCChart data={data.customerABC} />
          </div>
        </div>
      ) : (
        <ReportsTab reports={data.reports} />
      )}
    </div>
  );
}

export default DashboardPage;
