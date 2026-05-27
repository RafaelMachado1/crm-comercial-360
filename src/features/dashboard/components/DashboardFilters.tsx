import type { DashboardMonth } from "../types/dashboard.types";

type DashboardFiltersProps = {
  months: DashboardMonth[];
  years: number[];
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
};

export function DashboardFilters({
  months,
  years,
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}: DashboardFiltersProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 bg-white p-4 md:flex-row md:items-center">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-700">
        Filtrar por:
      </span>

      <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-[1fr_160px]">
        <label className="sr-only" htmlFor="dashboard-month">
          Mês
        </label>

        <select
          id="dashboard-month"
          value={selectedMonth}
          onChange={(event) => onMonthChange(Number(event.target.value))}
          className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="dashboard-year">
          Ano
        </label>

        <select
          id="dashboard-year"
          value={selectedYear}
          onChange={(event) => onYearChange(Number(event.target.value))}
          className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
