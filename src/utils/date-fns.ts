import { format } from "date-fns";

export function formatDate(date?: string | number | Date): string {
  if (!date) return "";
  return format(date, "dd/MM/yyyy");
}
