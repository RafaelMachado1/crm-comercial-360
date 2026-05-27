export function formatCurrencyBR(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatPercentageBR(value: number): string {
  return `${value.toFixed(2).replace(".", ",")}%`;
}

export function calculateRequiredPerBusinessDay(
  monthGoal: number,
  soldInMonth: number,
  remainingBusinessDays: number
): number | null {
  if (monthGoal <= 0 || remainingBusinessDays <= 0) {
    return null;
  }

  const remainingGoal = Math.max(monthGoal - soldInMonth, 0);

  return remainingGoal / remainingBusinessDays;
}
