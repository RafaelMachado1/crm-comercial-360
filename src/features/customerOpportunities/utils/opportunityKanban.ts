import { customerOpportunityStageOptions } from "../data/customerOpportunityOptions";
import type {
  CustomerOpportunity,
  CustomerOpportunityStage,
} from "../types/customerOpportunity.types";

export type OpportunityKanbanColumnData = {
  stage: CustomerOpportunityStage;
  label: string;
  opportunities: CustomerOpportunity[];
  totalValue: number;
};

export type OpportunityStageMoveDirection = "previous" | "next";

export const opportunityKanbanStages = customerOpportunityStageOptions.map(
  (stageOption) => {
    return stageOption.value;
  }
);

function getStageIndex(stage: CustomerOpportunityStage) {
  return opportunityKanbanStages.indexOf(stage);
}

export function getPreviousOpportunityStage(stage: CustomerOpportunityStage) {
  const stageIndex = getStageIndex(stage);

  if (stageIndex <= 0) {
    return undefined;
  }

  return opportunityKanbanStages[stageIndex - 1];
}

export function getNextOpportunityStage(stage: CustomerOpportunityStage) {
  const stageIndex = getStageIndex(stage);

  if (stageIndex < 0 || stageIndex >= opportunityKanbanStages.length - 1) {
    return undefined;
  }

  return opportunityKanbanStages[stageIndex + 1];
}

export function canMoveOpportunityToPreviousStage(
  stage: CustomerOpportunityStage
) {
  return Boolean(getPreviousOpportunityStage(stage));
}

export function canMoveOpportunityToNextStage(stage: CustomerOpportunityStage) {
  return Boolean(getNextOpportunityStage(stage));
}

export function getOpportunityStageByDirection(
  stage: CustomerOpportunityStage,
  direction: OpportunityStageMoveDirection
) {
  if (direction === "previous") {
    return getPreviousOpportunityStage(stage);
  }

  return getNextOpportunityStage(stage);
}

export function groupOpportunitiesByStage(
  opportunities: CustomerOpportunity[]
): OpportunityKanbanColumnData[] {
  return customerOpportunityStageOptions.map((stageOption) => {
    const stageOpportunities = opportunities.filter((opportunity) => {
      return opportunity.stage === stageOption.value;
    });

    return {
      stage: stageOption.value,
      label: stageOption.label,
      opportunities: stageOpportunities,
      totalValue: stageOpportunities.reduce((total, opportunity) => {
        return total + opportunity.value;
      }, 0),
    };
  });
}
