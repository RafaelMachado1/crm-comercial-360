import type { DragEvent } from "react";

import type { Customer } from "../../../types/crm";
import type {
  CustomerOpportunity,
  CustomerOpportunityStage,
} from "../types/customerOpportunity.types";
import type {
  OpportunityKanbanColumnData,
} from "../utils/opportunityKanban";
import { OpportunityKanbanCard } from "./OpportunityKanbanCard";

type OpportunityKanbanColumnProps = {
  column: OpportunityKanbanColumnData;
  customers: Customer[];
  selectedOpportunityId?: string;
  sourceCustomerId?: number | null;
  draggedOpportunityId?: string;
  dragOverStage?: CustomerOpportunityStage | null;
  isDeletingOpportunity?: boolean;
  isMovingOpportunity?: boolean;
  onReturnToSourceCustomer?: () => void;
  onEditOpportunity: (opportunity: CustomerOpportunity) => void;
  onDeleteOpportunity: (opportunity: CustomerOpportunity) => void;
  onDragStartOpportunity: (opportunity: CustomerOpportunity) => void;
  onDragEndOpportunity: () => void;
  onDragOverStage: (stage: CustomerOpportunityStage | null) => void;
  onDropOpportunityOnStage: (
    opportunityId: string,
    stage: CustomerOpportunityStage
  ) => void;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getCustomerName(customers: Customer[], customerId: number) {
  const customer = customers.find((currentCustomer) => {
    return currentCustomer.id === customerId;
  });

  if (!customer) {
    return "Cliente não encontrado";
  }

  return customer.tradeName || customer.legalName || customer.nome;
}

export function OpportunityKanbanColumn({
  column,
  customers,
  selectedOpportunityId,
  sourceCustomerId = null,
  draggedOpportunityId = "",
  dragOverStage = null,
  isDeletingOpportunity = false,
  isMovingOpportunity = false,
  onReturnToSourceCustomer,
  onEditOpportunity,
  onDeleteOpportunity,
  onDragStartOpportunity,
  onDragEndOpportunity,
  onDragOverStage,
  onDropOpportunityOnStage,
}: OpportunityKanbanColumnProps) {
  const isDragOver = dragOverStage === column.stage;

  function handleDragOver(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "move";
    onDragOverStage(column.stage);
  }

  function handleDragLeave(event: DragEvent<HTMLElement>) {
    const nextTarget = event.relatedTarget;

    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
      return;
    }

    onDragOverStage(null);
  }

  function handleDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    event.stopPropagation();
    const opportunityId =
      event.dataTransfer.getData("text/plain") || draggedOpportunityId;

    if (opportunityId) {
      onDropOpportunityOnStage(opportunityId, column.stage);
    } else {
      onDragOverStage(null);
    }
  }

  return (
    <section
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={
        "flex max-h-[calc(100vh-260px)] min-h-[520px] w-[300px] shrink-0 flex-col rounded-lg border transition " +
        (isDragOver
          ? "border-blue-400 bg-blue-50 ring-2 ring-blue-100"
          : "border-slate-200 bg-slate-50")
      }
    >
      <header className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-950">
              {column.label}
            </h2>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              {column.opportunities.length} oportunidade(s)
            </p>
          </div>

          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-700">
            {formatCurrency(column.totalValue)}
          </span>
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto p-3">
        {isDragOver ? (
          <div className="rounded-lg border border-dashed border-blue-300 bg-white/80 p-3 text-center text-xs font-bold uppercase text-blue-700">
            Soltar aqui
          </div>
        ) : null}

        {column.opportunities.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-center text-sm font-semibold text-slate-500">
            Sem oportunidades nesta etapa.
          </div>
        ) : (
          column.opportunities.map((opportunity) => {
            const isSelected = opportunity.id === selectedOpportunityId;

            return (
              <OpportunityKanbanCard
                key={opportunity.id}
                opportunity={opportunity}
                customerName={getCustomerName(customers, opportunity.customerId)}
                isSelected={isSelected}
                isDragging={opportunity.id === draggedOpportunityId}
                canReturnToCustomer={isSelected && sourceCustomerId !== null}
                isDeleting={isDeletingOpportunity}
                isMoving={isMovingOpportunity}
                onReturnToCustomer={onReturnToSourceCustomer}
                onEditOpportunity={onEditOpportunity}
                onDeleteOpportunity={onDeleteOpportunity}
                onDragStartOpportunity={onDragStartOpportunity}
                onDragEndOpportunity={onDragEndOpportunity}
              />
            );
          })
        )}
      </div>
    </section>
  );
}
