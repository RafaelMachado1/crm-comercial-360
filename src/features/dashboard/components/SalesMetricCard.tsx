import type { ReactNode } from "react";

type SalesMetricCardProps = {
  title: string;
  value: string;
  description?: string;
  icon?: ReactNode;
  progressValue?: number;
  footerText?: string;
};

export function SalesMetricCard({
  title,
  value,
  description,
  icon,
  progressValue,
  footerText,
}: SalesMetricCardProps) {
  const normalizedProgress =
    typeof progressValue === "number"
      ? Math.min(Math.max(progressValue, 0), 100)
      : null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <strong className="mt-2 block text-2xl font-bold text-slate-950">
            {value}
          </strong>

          {description ? (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          ) : null}
        </div>

        {icon ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            {icon}
          </div>
        ) : null}
      </div>

      {normalizedProgress !== null ? (
        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-900 transition-all"
              style={{ width: `${normalizedProgress}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {normalizedProgress.toFixed(0)}%
          </p>
        </div>
      ) : null}

      {footerText ? (
        <p className="mt-4 text-sm text-slate-500">{footerText}</p>
      ) : null}
    </div>
  );
}
