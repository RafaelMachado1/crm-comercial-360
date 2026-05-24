import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDateBR(date: string): string {
  if (!date) {
    return "-";
  }

  return format(parseISO(date), "dd/MM/yyyy", {
    locale: ptBR,
  });
}