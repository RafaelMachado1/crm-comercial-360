import type {
  DashboardReportCategory,
  DashboardReportItem,
} from "../types/dashboard.types";

type ReportsTabProps = {
  reports: DashboardReportItem[];
};

const reportCategories: DashboardReportCategory[] = [
  "Vendas",
  "Clientes",
  "Produtos",
  "Faturamento e títulos",
  "Comissões",
  "Outros",
];

function getReportsByCategory(
  reports: DashboardReportItem[],
  category: DashboardReportCategory
) {
  return reports.filter((report) => report.category === category);
}

export function ReportsTab({ reports }: ReportsTabProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
          Relatórios
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Acesse relatórios comerciais organizados por área.
        </p>
      </div>

      <div className="grid gap-8 p-6 lg:grid-cols-2">
        {reportCategories.map((category) => {
          const categoryReports = getReportsByCategory(reports, category);

          if (categoryReports.length === 0) {
            return null;
          }

          return (
            <section key={category}>
              <h3 className="border-b border-slate-200 pb-2 text-lg font-semibold text-slate-500">
                {category}
              </h3>

              <div className="mt-3 space-y-2">
                {categoryReports.map((report) => (
                  <button
                    key={report.id}
                    type="button"
                    className="group flex w-full appearance-none items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm font-medium text-purple-700 shadow-none transition hover:bg-purple-50 hover:px-4 focus:outline-none focus:ring-2 focus:ring-purple-100"
                  >
                    <span className="flex items-center gap-2">
                      {report.label}

                      {report.isNew ? (
                        <span className="rounded-full border border-green-500 px-2 py-0.5 text-[10px] font-bold uppercase text-green-600">
                          Novo
                        </span>
                      ) : null}

                      {report.isLegacy ? (
                        <span className="rounded-full border border-slate-400 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-500">
                          Antigo
                        </span>
                      ) : null}
                    </span>

                    <span className="text-slate-300 transition group-hover:text-purple-600">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
