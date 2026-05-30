import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  CustomerActivity,
  CustomerTask,
} from "../types/customerInteraction.types";
import {
  completeCustomerTask,
  createCustomerActivity,
  createCustomerTask,
  getCustomerActivities,
  getCustomerTasks,
  updateCustomerActivity,
  updateCustomerTask,
} from "../services/customerInteractionService";

function getCustomerTasksQueryKey(customerId: number) {
  return ["customerTasks", customerId];
}

function getCustomerActivitiesQueryKey(customerId: number) {
  return ["customerActivities", customerId];
}

function filterTasksByCustomerId(tasks: CustomerTask[], customerId: number) {
  return tasks.filter((task) => task.customerId === customerId);
}

function filterActivitiesByCustomerId(
  activities: CustomerActivity[],
  customerId: number
) {
  return activities.filter((activity) => activity.customerId === customerId);
}

export function useCustomerInteractions(customerId: number) {
  const queryClient = useQueryClient();
  const tasksQueryKey = getCustomerTasksQueryKey(customerId);
  const activitiesQueryKey = getCustomerActivitiesQueryKey(customerId);

  const tasksQuery = useQuery({
    queryKey: tasksQueryKey,
    queryFn: () => getCustomerTasks(customerId),
  });

  const activitiesQuery = useQuery({
    queryKey: activitiesQueryKey,
    queryFn: () => getCustomerActivities(customerId),
  });

  const createTaskMutation = useMutation({
    mutationFn: createCustomerTask,
    onSuccess: (updatedTasks) => {
      queryClient.setQueryData(
        tasksQueryKey,
        filterTasksByCustomerId(updatedTasks, customerId)
      );
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateCustomerTask,
    onSuccess: (updatedTasks) => {
      queryClient.setQueryData(
        tasksQueryKey,
        filterTasksByCustomerId(updatedTasks, customerId)
      );
    },
  });

  const completeTaskMutation = useMutation({
    mutationFn: completeCustomerTask,
    onSuccess: (updatedTasks) => {
      queryClient.setQueryData(
        tasksQueryKey,
        filterTasksByCustomerId(updatedTasks, customerId)
      );
    },
  });

  const createActivityMutation = useMutation({
    mutationFn: createCustomerActivity,
    onSuccess: (updatedActivities) => {
      queryClient.setQueryData(
        activitiesQueryKey,
        filterActivitiesByCustomerId(updatedActivities, customerId)
      );
    },
  });

  const updateActivityMutation = useMutation({
    mutationFn: updateCustomerActivity,
    onSuccess: (updatedActivities) => {
      queryClient.setQueryData(
        activitiesQueryKey,
        filterActivitiesByCustomerId(updatedActivities, customerId)
      );
    },
  });

  async function createTask(task: CustomerTask): Promise<CustomerTask[]> {
    const updatedTasks = await createTaskMutation.mutateAsync(task);

    return filterTasksByCustomerId(updatedTasks, customerId);
  }

  async function updateTask(task: CustomerTask): Promise<CustomerTask[]> {
    const updatedTasks = await updateTaskMutation.mutateAsync(task);

    return filterTasksByCustomerId(updatedTasks, customerId);
  }

  async function completeTask(taskId: string): Promise<CustomerTask[]> {
    const updatedTasks = await completeTaskMutation.mutateAsync(taskId);

    return filterTasksByCustomerId(updatedTasks, customerId);
  }

  async function createActivity(
    activity: CustomerActivity
  ): Promise<CustomerActivity[]> {
    const updatedActivities =
      await createActivityMutation.mutateAsync(activity);

    return filterActivitiesByCustomerId(updatedActivities, customerId);
  }

  async function updateActivity(
    activity: CustomerActivity
  ): Promise<CustomerActivity[]> {
    const updatedActivities =
      await updateActivityMutation.mutateAsync(activity);

    return filterActivitiesByCustomerId(updatedActivities, customerId);
  }

  const tasksLoading = tasksQuery.isLoading || tasksQuery.isFetching;
  const activitiesLoading =
    activitiesQuery.isLoading || activitiesQuery.isFetching;

  const tasksError = tasksQuery.error
    ? "Erro ao carregar tarefas do cliente."
    : "";
  const activitiesError = activitiesQuery.error
    ? "Erro ao carregar atividades do cliente."
    : "";

  const loading =
    tasksLoading ||
    activitiesLoading ||
    createTaskMutation.isPending ||
    updateTaskMutation.isPending ||
    completeTaskMutation.isPending ||
    createActivityMutation.isPending ||
    updateActivityMutation.isPending;

  return {
    tasks: tasksQuery.data ?? [],
    activities: activitiesQuery.data ?? [],
    tasksLoading,
    activitiesLoading,
    loading,
    tasksError,
    activitiesError,
    error: tasksError || activitiesError,
    createTask,
    updateTask,
    completeTask,
    createActivity,
    updateActivity,
    isCreatingTask: createTaskMutation.isPending,
    isUpdatingTask: updateTaskMutation.isPending,
    isCompletingTask: completeTaskMutation.isPending,
    isCreatingActivity: createActivityMutation.isPending,
    isUpdatingActivity: updateActivityMutation.isPending,
  };
}
