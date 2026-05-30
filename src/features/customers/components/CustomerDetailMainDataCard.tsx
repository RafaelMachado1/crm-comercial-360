import type { ProfessionalCustomer } from "../types/customer.types";
import { formatCustomerDocument } from "../utils/customerUtils";

type CustomerDetailMainDataCardProps = {
  customer: ProfessionalCustomer;
};

type DetailFieldProps = {
  label: string;
  value?: string;
};

function DetailField({ label, value }: DetailFieldProps) {
  return (
    <div>
      <span className="block text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </span>

      <span className="mt-1 block text-sm text-slate-700">
        {value || "Não informado"}
      </span>
    </div>
  );
}

export function CustomerDetailMainDataCard({
  customer,
}: CustomerDetailMainDataCardProps) {
  const personTypeLabel =
    customer.personType === "legal" ? "Pessoa jurídica" : "Pessoa física";
  const formattedDocument = formatCustomerDocument(customer.document);

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
          Dados principais
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Identificação e informações comerciais do cliente.
        </p>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-2 xl:grid-cols-3">
        <DetailField label="Tipo de pessoa" value={personTypeLabel} />
        <DetailField label="Documento" value={formattedDocument} />
        <DetailField label="Razão social" value={customer.legalName} />
        <DetailField label="Nome fantasia" value={customer.tradeName} />
        <DetailField label="Telefone" value={customer.phone} />
        <DetailField label="E-mail" value={customer.email} />
        <DetailField
          label="Inscrição estadual"
          value={customer.stateRegistration}
        />
        <DetailField label="SUFRAMA" value={customer.suframa} />
        <DetailField label="Segmento" value={customer.segment} />
        <DetailField label="Rede" value={customer.network} />

        <div className="sm:col-span-2 xl:col-span-3">
          <DetailField
            label="Informações adicionais"
            value={customer.additionalInfo}
          />
        </div>
      </div>
    </section>
  );
}
