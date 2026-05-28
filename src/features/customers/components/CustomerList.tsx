import type { ProfessionalCustomer } from "../types/customer.types";
import { CustomerListItem } from "./CustomerListItem";

type CustomerListProps = {
  customers: ProfessionalCustomer[];
  onEdit: (customer: ProfessionalCustomer) => void;
  onSelect?: (customer: ProfessionalCustomer) => void;
};

export function CustomerList({
  customers,
  onEdit,
  onSelect,
}: CustomerListProps) {
  if (customers.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <h3 className="text-base font-semibold text-slate-900">
          Nenhum cliente encontrado
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Ajuste os filtros ou cadastre um novo cliente para começar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {customers.map((customer) => (
        <CustomerListItem
          key={customer.id}
          customer={customer}
          onEdit={onEdit}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
