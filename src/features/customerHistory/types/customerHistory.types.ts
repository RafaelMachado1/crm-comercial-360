export type CustomerHistoryEventType =
  | "activity_registered"
  | "task_completed"
  | "opportunity_created"
  | "opportunity_updated"
  | "opportunity_closed"
  | "order_registered";

export type CustomerHistoryEventSource =
  | "activity"
  | "task"
  | "opportunity"
  | "order"
  | "invoice"
  | "system";

export type CustomerHistoryEvent = {
  id: string;
  customerId: number;
  type: CustomerHistoryEventType;
  source: CustomerHistoryEventSource;
  title: string;
  description?: string;
  dateTime: string;
  relatedId?: string;
  metadata?: Record<string, string | number | boolean | null | undefined>;
};
