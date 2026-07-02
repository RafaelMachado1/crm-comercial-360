import type { CustomerOrder } from "../../customerOrders/types/customerOrder.types";

export type CustomerSummaryMetrics = {
  rankingPosition: number | null;
  totalPurchases: number;
  ordersCount: number;
  averageTicket: number;
  daysWithoutPurchase: number | null;
};

function getOrderDate(order: CustomerOrder): Date | null {
  const rawDate = order.issuedAt || order.createdAt || order.updatedAt;
  const date = new Date(rawDate);

  return Number.isNaN(date.getTime()) ? null : date;
}

function isValidSalesOrder(order: CustomerOrder) {
  return (
    order.type === "pedido" &&
    order.status !== "cancelado" &&
    order.status !== "recusado"
  );
}

function subtractMonths(date: Date, months: number) {
  const result = new Date(date);
  result.setMonth(result.getMonth() - months);

  return result;
}

function isWithinPeriod(order: CustomerOrder, periodStart: Date, periodEnd: Date) {
  const orderDate = getOrderDate(order);

  if (!orderDate) {
    return false;
  }

  return orderDate >= periodStart && orderDate <= periodEnd;
}

export function buildCustomerSummaryMetrics({
  customerId,
  customerOrders,
  allOrders,
  referenceDate = new Date(),
}: {
  customerId: number;
  customerOrders: CustomerOrder[];
  allOrders: CustomerOrder[];
  referenceDate?: Date;
}): CustomerSummaryMetrics {
  const periodStart = subtractMonths(referenceDate, 6);
  const validCustomerOrders = customerOrders.filter((order) => {
    return (
      isValidSalesOrder(order) && isWithinPeriod(order, periodStart, referenceDate)
    );
  });
  const totalPurchases = validCustomerOrders.reduce((total, order) => {
    return total + order.totalValue;
  }, 0);
  const ordersCount = validCustomerOrders.length;
  const averageTicket = ordersCount > 0 ? totalPurchases / ordersCount : 0;
  const mostRecentOrder = [...validCustomerOrders].sort((firstOrder, secondOrder) => {
    const firstDate = getOrderDate(firstOrder)?.getTime() ?? 0;
    const secondDate = getOrderDate(secondOrder)?.getTime() ?? 0;

    return secondDate - firstDate;
  })[0];
  const mostRecentDate = mostRecentOrder ? getOrderDate(mostRecentOrder) : null;
  const daysWithoutPurchase = mostRecentDate
    ? Math.max(
        0,
        Math.floor(
          (referenceDate.getTime() - mostRecentDate.getTime()) / 86400000
        )
      )
    : null;
  const totalsByCustomerId = new Map<number, number>();

  allOrders.forEach((order) => {
    if (!isValidSalesOrder(order) || !isWithinPeriod(order, periodStart, referenceDate)) {
      return;
    }

    totalsByCustomerId.set(
      order.customerId,
      (totalsByCustomerId.get(order.customerId) ?? 0) + order.totalValue
    );
  });

  const ranking = Array.from(totalsByCustomerId.entries())
    .filter(([, total]) => total > 0)
    .sort((firstEntry, secondEntry) => secondEntry[1] - firstEntry[1]);
  const rankingIndex = ranking.findIndex(([currentCustomerId]) => {
    return currentCustomerId === customerId;
  });

  return {
    rankingPosition: rankingIndex >= 0 ? rankingIndex + 1 : null,
    totalPurchases,
    ordersCount,
    averageTicket,
    daysWithoutPurchase,
  };
}
