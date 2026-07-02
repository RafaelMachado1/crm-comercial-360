import type { ReactNode } from "react";

type CustomerCommercialWorkspaceProps = {
  children: ReactNode;
  history: ReactNode;
};

export function CustomerCommercialWorkspace({
  children,
  history,
}: CustomerCommercialWorkspaceProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-base font-bold text-slate-950">
          Movimentação comercial
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Acompanhe tarefas, oportunidades, pedidos e histórico deste cliente.
        </p>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="flex min-w-0 flex-col gap-5">{children}</div>
        <aside className="min-w-0">{history}</aside>
      </div>
    </section>
  );
}
