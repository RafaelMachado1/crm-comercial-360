import type { ProfessionalCustomer } from "../types/customer.types";

type CustomerDetailAddressCardProps = {
  customer: ProfessionalCustomer;
};

type AddressFieldProps = {
  label: string;
  value?: string;
};

function AddressField({ label, value }: AddressFieldProps) {
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

export function CustomerDetailAddressCard({
  customer,
}: CustomerDetailAddressCardProps) {
  const { mainAddress } = customer;
  const cityAndState = [mainAddress.city, mainAddress.state]
    .filter(Boolean)
    .join("/");

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
          Endereço principal
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Localização principal cadastrada para o cliente.
        </p>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-2 xl:grid-cols-3">
        <AddressField label="CEP" value={mainAddress.zipCode} />
        <AddressField label="Endereço" value={mainAddress.street} />
        <AddressField label="Número" value={mainAddress.number} />
        <AddressField label="Complemento" value={mainAddress.complement} />
        <AddressField label="Bairro" value={mainAddress.district} />
        <AddressField label="Cidade/UF" value={cityAndState} />
      </div>
    </section>
  );
}
