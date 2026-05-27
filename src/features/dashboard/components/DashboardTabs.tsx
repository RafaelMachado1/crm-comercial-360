export type DashboardTab = "panel" | "reports";

type DashboardTabsProps = {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
};

const tabs: Array<{
  id: DashboardTab;
  label: string;
  icon: string;
}> = [
  {
    id: "panel",
    label: "Painel",
    icon: "▦",
  },
  {
    id: "reports",
    label: "Relatórios",
    icon: "▣",
  },
];

export function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
  return (
    <div className="flex items-center gap-6 border-b border-slate-200 bg-white px-4">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={[
              "appearance-none flex items-center gap-2 rounded-none border-x-0 border-t-0 border-b-2 bg-transparent px-1 py-4 text-sm font-semibold uppercase tracking-wide shadow-none transition-colors focus:outline-none focus:ring-0",
              isActive
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-400 hover:text-slate-700",
            ].join(" ")}
          >
            <span aria-hidden="true" className="text-base leading-none">
              {tab.icon}
            </span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
