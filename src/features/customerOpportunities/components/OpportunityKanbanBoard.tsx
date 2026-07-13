import { useState } from "react";

import type { Customer } from "../../../types/crm";
import type {
  CustomerOpportunity,
  CustomerOpportunityStage,
} from "../types/customerOpportunity.types";
import type { OpportunityKanbanColumnData } from "../utils/opportunityKanban";
import { OpportunityKanbanColumn } from "./OpportunityKanbanColumn";

type OpportunityKanbanBoardProps = {
  columns: OpportunityKanbanColumnData[];
  customers: Customer[];
  selectedOpportunityId?: string;
  sourceCustomerId?: number | null;
  isDeletingOpportunity?: boolean;
  isMovingOpportunity?: boolean;
  onReturnToSourceCustomer?: () => void;
  onEditOpportunity: (opportunity: CustomerOpportunity) => void;
  onDeleteOpportunity: (opportunity: CustomerOpportunity) => void;
  onDropOpportunityOnStage: (
    opportunityId: string,
    stage: CustomerOpportunityStage
  ) => void;
};

export function OpportunityKanbanBoard({
  columns,
  customers,
  selectedOpportunityId,
  sourceCustomerId = null,
  isDeletingOpportunity = false,
  isMovingOpportunity = false,
  onReturnToSourceCustomer,
  onEditOpportunity,
  onDeleteOpportunity,
  onDropOpportunityOnStage,
}: OpportunityKanbanBoardProps) {
  const [draggedOpportunityId, setDraggedOpportunityId] = useState("");
  const [dragOverStage, setDragOverStage] =
    useState<CustomerOpportunityStage | null>(null);

  function handleDragStartOpportunity(opportunity: CustomerOpportunity) {
    setDraggedOpportunityId(opportunity.id);
  }

  function handleDragEndOpportunity() {
    setDraggedOpportunityId("");
    setDragOverStage(null);
  }

  function handleDropOpportunityOnStage(
    opportunityId: string,
    stage: CustomerOpportunityStage
  ) {
    onDropOpportunityOnStage(opportunityId, stage);
    handleDragEndOpportunity();
  }

  return (
    <div className="overflow-x-auto pb-3">
      <div className="flex min-w-max gap-4">
        {columns.map((column) => (
          <OpportunityKanbanColumn
            key={column.stage}
            column={column}
            customers={customers}
            selectedOpportunityId={selectedOpportunityId}
            sourceCustomerId={sourceCustomerId}
            draggedOpportunityId={draggedOpportunityId}
            dragOverStage={dragOverStage}
            isDeletingOpportunity={isDeletingOpportunity}
            isMovingOpportunity={isMovingOpportunity}
            onReturnToSourceCustomer={onReturnToSourceCustomer}
            onEditOpportunity={onEditOpportunity}
            onDeleteOpportunity={onDeleteOpportunity}
            onDragStartOpportunity={handleDragStartOpportunity}
            onDragEndOpportunity={handleDragEndOpportunity}
            onDragOverStage={setDragOverStage}
            onDropOpportunityOnStage={handleDropOpportunityOnStage}
          />
        ))}
      </div>
    </div>
  );
}
