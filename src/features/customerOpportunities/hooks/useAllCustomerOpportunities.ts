import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createCustomerOpportunity,
  deleteCustomerOpportunity,
  getAllCustomerOpportunities,
  updateCustomerOpportunityData,
  updateCustomerOpportunityStage,
} from "../services/customerOpportunityService";
import type {
  CustomerOpportunity,
  CustomerOpportunityStage,
  CustomerOpportunityUpdatePayload,
} from "../types/customerOpportunity.types";

export const ALL_CUSTOMER_OPPORTUNITIES_QUERY_KEY = [
  "customerOpportunities",
  "all",
];

export function useAllCustomerOpportunities() {
  const queryClient = useQueryClient();

  const opportunitiesQuery = useQuery({
    queryKey: ALL_CUSTOMER_OPPORTUNITIES_QUERY_KEY,
    queryFn: getAllCustomerOpportunities,
  });

  function markInactiveOpportunityQueriesStale() {
    queryClient.invalidateQueries({
      queryKey: ["customerOpportunities"],
      refetchType: "inactive",
    });
  }

  function syncOpportunityQueries(updatedOpportunities: CustomerOpportunity[]) {
    queryClient.setQueryData(
      ALL_CUSTOMER_OPPORTUNITIES_QUERY_KEY,
      updatedOpportunities
    );
    markInactiveOpportunityQueriesStale();
  }

  function updateOpportunityInCachedQueries(
    opportunityId: string,
    updateOpportunity: (opportunity: CustomerOpportunity) => CustomerOpportunity
  ) {
    queryClient.setQueriesData<CustomerOpportunity[]>(
      { queryKey: ["customerOpportunities"] },
      (currentOpportunities) => {
        if (!currentOpportunities) {
          return currentOpportunities;
        }

        return currentOpportunities.map((opportunity) => {
          if (opportunity.id !== opportunityId) {
            return opportunity;
          }

          return updateOpportunity(opportunity);
        });
      }
    );
  }

  const createOpportunityMutation = useMutation({
    mutationFn: createCustomerOpportunity,
    onSuccess: syncOpportunityQueries,
  });

  const updateOpportunityMutation = useMutation({
    mutationFn: ({
      opportunityId,
      payload,
    }: {
      opportunityId: string;
      payload: CustomerOpportunityUpdatePayload;
    }) => updateCustomerOpportunityData(opportunityId, payload),
    onSuccess: syncOpportunityQueries,
  });

  const updateOpportunityStageMutation = useMutation({
    mutationFn: ({
      opportunityId,
      stage,
    }: {
      opportunityId: string;
      stage: CustomerOpportunityStage;
    }) => updateCustomerOpportunityStage(opportunityId, stage),
    onMutate: async ({ opportunityId, stage }) => {
      await queryClient.cancelQueries({ queryKey: ["customerOpportunities"] });

      const previousOpportunities = queryClient.getQueryData<
        CustomerOpportunity[]
      >(ALL_CUSTOMER_OPPORTUNITIES_QUERY_KEY);
      const updatedAt = new Date().toISOString();

      updateOpportunityInCachedQueries(opportunityId, (opportunity) => ({
        ...opportunity,
        stage,
        updatedAt,
      }));

      return { previousOpportunities };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousOpportunities) {
        queryClient.setQueryData(
          ALL_CUSTOMER_OPPORTUNITIES_QUERY_KEY,
          context.previousOpportunities
        );
      }
    },
    onSuccess: syncOpportunityQueries,
  });

  const deleteOpportunityMutation = useMutation({
    mutationFn: deleteCustomerOpportunity,
    onSuccess: syncOpportunityQueries,
  });

  async function createOpportunity(
    opportunity: CustomerOpportunity
  ): Promise<CustomerOpportunity[]> {
    return createOpportunityMutation.mutateAsync(opportunity);
  }

  async function updateOpportunity(
    opportunityId: string,
    payload: CustomerOpportunityUpdatePayload
  ): Promise<CustomerOpportunity[]> {
    return updateOpportunityMutation.mutateAsync({ opportunityId, payload });
  }

  async function updateOpportunityStage(
    opportunityId: string,
    stage: CustomerOpportunityStage
  ): Promise<CustomerOpportunity[]> {
    return updateOpportunityStageMutation.mutateAsync({
      opportunityId,
      stage,
    });
  }

  async function deleteOpportunity(
    opportunityId: string
  ): Promise<CustomerOpportunity[]> {
    return deleteOpportunityMutation.mutateAsync(opportunityId);
  }

  const opportunitiesLoading = opportunitiesQuery.isLoading;

  const opportunitiesError = opportunitiesQuery.error
    ? "Erro ao carregar oportunidades."
    : "";

  return {
    opportunities: opportunitiesQuery.data ?? [],
    opportunitiesLoading,
    loading: opportunitiesLoading,
    opportunitiesError,
    error: opportunitiesError,
    createOpportunity,
    updateOpportunity,
    updateOpportunityStage,
    deleteOpportunity,
    isCreatingOpportunity: createOpportunityMutation.isPending,
    isUpdatingOpportunity: updateOpportunityMutation.isPending,
    isUpdatingOpportunityStage: updateOpportunityStageMutation.isPending,
    isDeletingOpportunity: deleteOpportunityMutation.isPending,
  };
}
