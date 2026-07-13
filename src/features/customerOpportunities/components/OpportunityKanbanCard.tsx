import type { DragEvent, MouseEvent } from "react";

import {
  getCustomerOpportunityFunnelLabel,
  getCustomerOpportunityLabelLabel,
  getCustomerOpportunityStatusLabel,
} from "../data/customerOpportunityOptions";
import type { CustomerOpportunity } from "../types/customerOpportunity.types";

type OpportunityKanbanCardProps = {
  opportunity: CustomerOpportunity;
  customerName: string;
  isSelected?: boolean;
  isDragging?: boolean;
  canReturnToCustomer?: boolean;
  isDeleting?: boolean;
  isMoving?: boolean;
  onReturnToCustomer?: () => void;
  onEditOpportunity: (opportunity: CustomerOpportunity) => void;
  onDeleteOpportunity: (opportunity: CustomerOpportunity) => void;
  onDragStartOpportunity: (opportunity: CustomerOpportunity) => void;
  onDragEndOpportunity: () => void;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(value?: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("pt-BR").format(date);
}

export function OpportunityKanbanCard({
  opportunity,
  customerName,
  isSelected = false,
  isDragging = false,
  canReturnToCustomer = false,
  isDeleting = false,
  isMoving = false,
  onReturnToCustomer,
  onEditOpportunity,
  onDeleteOpportunity,
  onDragStartOpportunity,
  onDragEndOpportunity,
}: OpportunityKanbanCardProps) {
  const cardClassName = isSelected
    ? "border-blue-600 bg-blue-50 shadow-lg ring-2 ring-blue-200"
    : "border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:bg-slate-50";
  const dragClassName = isDragging
    ? "cursor-grabbing opacity-60 shadow-xl ring-2 ring-blue-100"
    : "cursor-grab";
  const badgeClassName = isSelected
    ? "border-blue-200 bg-white text-blue-800"
    : "border-slate-200 bg-slate-50 text-slate-600";
  const canDrag = !isDeleting && !isMoving;

  function handleDragStart(event: DragEvent<HTMLElement>) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", opportunity.id);
    onDragStartOpportunity(opportunity);
  }

  function stopButtonPropagation(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
  }

  return (
    <article
      draggable={canDrag}
      onDragStart={handleDragStart}
      onDragEnd={onDragEndOpportunity}
      className={
        "rounded-lg border p-4 text-left transition " +
        cardClassName +
        " " +
        dragClassName
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-slate-950">
            {opportunity.title}
          </h3>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            {customerName}
          </p>
        </div>

        {isSelected ? (
          <span className="shrink-0 rounded-full border border-blue-600 bg-blue-600 px-2 py-1 text-[11px] font-bold uppercase text-white">
            Selecionada
          </span>
        ) : null}
      </div>

      {isSelected ? (
        <p className="mt-3 rounded-md border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-800">
          Aberta a partir do Cliente 360
        </p>
      ) : null}

      <p className="mt-3 text-sm font-bold text-slate-900">
        {formatCurrency(opportunity.value)}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <span
          className={
            "rounded-full border px-2.5 py-1 text-xs font-semibold " +
            badgeClassName
          }
        >
          {getCustomerOpportunityFunnelLabel(opportunity.funnel)}
        </span>
        <span
          className={
            "rounded-full border px-2.5 py-1 text-xs font-semibold " +
            badgeClassName
          }
        >
          {getCustomerOpportunityStatusLabel(opportunity.status)}
        </span>
        <span
          className={
            "rounded-full border px-2.5 py-1 text-xs font-semibold " +
            badgeClassName
          }
        >
          {getCustomerOpportunityLabelLabel(opportunity.label)}
        </span>
      </div>

      <div className="mt-3 space-y-1 text-xs font-semibold text-slate-500">
        {opportunity.expectedCloseDate ? (
          <p>Previsão: {formatDate(opportunity.expectedCloseDate)}</p>
        ) : null}
        {opportunity.updatedAt ? (
          <p>Atualizada em: {formatDate(opportunity.updatedAt)}</p>
        ) : null}
      </div>

      <p className="mt-4 rounded-md border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-center text-[11px] font-bold uppercase tracking-wide text-slate-400">
        Arraste para mudar de etapa
      </p>

      <div className="mt-3 flex flex-col gap-2">
        <button
          type="button"
          onClick={(event) => {
            stopButtonPropagation(event);
            onEditOpportunity(opportunity);
          }}
          disabled={isDeleting || isMoving}
          className="w-full rounded-lg border border-slate-200 !bg-white px-3 py-2 text-xs font-bold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Editar
        </button>

        {canReturnToCustomer ? (
          <button
            type="button"
            onClick={(event) => {
              stopButtonPropagation(event);
              onReturnToCustomer?.();
            }}
            className="w-full rounded-lg border border-blue-600 !bg-white px-3 py-2 text-xs font-bold !text-blue-700 !shadow-none transition hover:!bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Voltar ao cliente
          </button>
        ) : null}

        <button
          type="button"
          onClick={(event) => {
            stopButtonPropagation(event);
            onDeleteOpportunity(opportunity);
          }}
          disabled={isDeleting || isMoving}
          className="w-full rounded-lg border border-red-200 !bg-white px-3 py-2 text-xs font-bold !text-red-700 !shadow-none transition hover:!bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDeleting ? "Excluindo..." : "Excluir"}
        </button>
      </div>
    </article>
  );
}
