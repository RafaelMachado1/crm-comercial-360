type CustomerDetailPlaceholderSectionProps = {
  title: string;
  description: string;
  items?: string[];
};

export function CustomerDetailPlaceholderSection({
  title,
  description,
  items = [],
}: CustomerDetailPlaceholderSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>

        <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase text-slate-500">
          Em evolução
        </span>
      </div>

      {items.length > 0 && (
        <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
          {items.map((item) => (
            <li key={item} className="text-sm text-slate-600">
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
