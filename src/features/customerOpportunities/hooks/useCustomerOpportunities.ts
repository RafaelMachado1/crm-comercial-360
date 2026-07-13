import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  closeCustomerOpportunity,
  createCustomerOpportunity,
  deleteCustomerOpportunity,
  getCustomerOpportunities,
  updateCustomerOpportunity,
  updateCustomerOpportunityStage,
} from "../services/customerOpportunityService";
import type {
  CustomerOpportunity,
  CustomerOpportunityStage,
} from "../types/customerOpportunity.types";

type CustomerOpportunityClosedStatus =
  | "ganha"
  | "perdida"
  | "pausada"
  | "cancelada";

function getCustomerOpportunitiesQueryKey(customerId: number) {
  return ["customerOpportunities", customerId];
}

function filterOpportunitiesByCustomerId(
  opportunities: CustomerOpportunity[],
  customerId: number
) {
  return opportunities.filter((opportunity) => {
    return opportunity.customerId === customerId;
  });
}

export function useCustomerOpportunities(customerId: number) {
  const queryClient = useQueryClient();
  const opportunitiesQueryKey = getCustomerOpportunitiesQueryKey(customerId);

  const opportunitiesQuery = useQuery({
    queryKey: opportunitiesQueryKey,
    queryFn: () => getCustomerOpportunities(customerId),
  });

  const createOpportunityMutation = useMutation({
    mutationFn: createCustomerOpportunity,
    onSuccess: (updatedOpportunities) => {
      queryClient.setQueryData(
        opportunitiesQueryKey,
        filterOpportunitiesByCustomerId(updatedOpportunities, customerId)
      );
      queryClient.invalidateQueries({ queryKey: ["customerOpportunities"] });
    },
  });

  const updateOpportunityMutation = useMutation({
    mutationFn: updateCustomerOpportunity,
    onSuccess: (updatedOpportunities) => {
      queryClient.setQueryData(
        opportunitiesQueryKey,
        filterOpportunitiesByCustomerId(updatedOpportunities, customerId)
      );
      queryClient.invalidateQueries({ queryKey: ["customerOpportunities"] });
    },
  });

  const updateOpportunityStageMutation = useMutation({
    mutationFn: ({
      opportunityId,
      stage,
    }: {
      opportunityId: string;
      stage: CustomerOpportunityStage;
    }) => updateCustomerOpportunityStage(opportunityId, stage),
    onSuccess: (updatedOpportunities) => {
      queryClient.setQueryData(
        opportunitiesQueryKey,
        filterOpportunitiesByCustomerId(updatedOpportunities, customerId)
      );
      queryClient.invalidateQueries({ queryKey: ["customerOpportunities"] });
    },
  });

  const closeOpportunityMutation = useMutation({
    mutationFn: ({
      opportunityId,
      status,
    }: {
      opportunityId: string;
      status: CustomerOpportunityClosedStatus;
    }) => closeCustomerOpportunity(opportunityId, status),
    onSuccess: (updatedOpportunities) => {
      queryClient.setQueryData(
        opportunitiesQueryKey,
        filterOpportunitiesByCustomerId(updatedOpportunities, customerId)
      );
      queryClient.invalidateQueries({ queryKey: ["customerOpportunities"] });
    },
  });

  const deleteOpportunityMutation = useMutation({
    mutationFn: deleteCustomerOpportunity,
    onSuccess: (updatedOpportunities) => {
      queryClient.setQueryData(
        opportunitiesQueryKey,
        filterOpportunitiesByCustomerId(updatedOpportunities, customerId)
      );
      queryClient.invalidateQueries({ queryKey: ["customerOpportunities"] });
    },
  });

  async function createOpportunity(
    opportunity: CustomerOpportunity
  ): Promise<CustomerOpportunity[]> {
    const updatedOpportunities =
      await createOpportunityMutation.mutateAsync(opportunity);

    return filterOpportunitiesByCustomerId(updatedOpportunities, customerId);
  }

  async function updateOpportunity(
    opportunity: CustomerOpportunity
  ): Promise<CustomerOpportunity[]> {
    const updatedOpportunities =
      await updateOpportunityMutation.mutateAsync(opportunity);

    return filterOpportunitiesByCustomerId(updatedOpportunities, customerId);
  }

  async function updateOpportunityStage(
    opportunityId: string,
    stage: CustomerOpportunityStage
  ): Promise<CustomerOpportunity[]> {
    const updatedOpportunities =
      await updateOpportunityStageMutation.mutateAsync({ opportunityId, stage });

    return filterOpportunitiesByCustomerId(updatedOpportunities, customerId);
  }

  async function closeOpportunity(
    opportunityId: string,
    status: CustomerOpportunityClosedStatus
  ): Promise<CustomerOpportunity[]> {
    const updatedOpportunities = await closeOpportunityMutation.mutateAsync({
      opportunityId,
      status,
    });

    return filterOpportunitiesByCustomerId(updatedOpportunities, customerId);
  }

  async function deleteOpportunity(
    opportunityId: string
  ): Promise<CustomerOpportunity[]> {
    const updatedOpportunities =
      await deleteOpportunityMutation.mutateAsync(opportunityId);

    return filterOpportunitiesByCustomerId(updatedOpportunities, customerId);
  }

  const opportunitiesLoading =
    opportunitiesQuery.isLoading || opportunitiesQuery.isFetching;

  const opportunitiesError = opportunitiesQuery.error
    ? "Erro ao carregar oportunidades do cliente."
    : "";

  const loading =
    opportunitiesLoading ||
    createOpportunityMutation.isPending ||
    updateOpportunityMutation.isPending ||
    updateOpportunityStageMutation.isPending ||
    closeOpportunityMutation.isPending ||
    deleteOpportunityMutation.isPending;

  return {
    opportunities: opportunitiesQuery.data ?? [],
    opportunitiesLoading,
    loading,
    opportunitiesError,
    error: opportunitiesError,
    createOpportunity,
    updateOpportunity,
    updateOpportunityStage,
    closeOpportunity,
    deleteOpportunity,
    isCreatingOpportunity: createOpportunityMutation.isPending,
    isUpdatingOpportunity: updateOpportunityMutation.isPending,
    isUpdatingOpportunityStage: updateOpportunityStageMutation.isPending,
    isClosingOpportunity: closeOpportunityMutation.isPending,
    isDeletingOpportunity: deleteOpportunityMutation.isPending,
  };
}
