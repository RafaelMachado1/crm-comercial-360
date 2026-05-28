import type { CustomerAddress } from "../types/customer.types";

export type CustomerAddressFormValues = Pick<
  CustomerAddress,
  | "zipCode"
  | "street"
  | "number"
  | "complement"
  | "district"
  | "city"
  | "state"
>;

type CustomerAddressSectionProps = {
  values: CustomerAddressFormValues;
  stateOptions: string[];
  onChange: <Key extends keyof CustomerAddressFormValues>(
    key: Key,
    value: CustomerAddressFormValues[Key]
  ) => void;
};

export function CustomerAddressSection({
  values,
  stateOptions,
  onChange,
}: CustomerAddressSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
          Endereço principal
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Informe o endereço principal de atendimento, entrega ou faturamento.
        </p>
      </div>

      <div className="space-y-5 p-5">
        <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
          <div>
            <label
              htmlFor="customer-zipcode"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              CEP
            </label>

            <input
              id="customer-zipcode"
              type="text"
              value={values.zipCode}
              onChange={(event) => onChange("zipCode", event.target.value)}
              placeholder="00000-000"
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="customer-street"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              Endereço
            </label>

            <input
              id="customer-street"
              type="text"
              value={values.street}
              onChange={(event) => onChange("street", event.target.value)}
              placeholder="Rua, avenida, estrada ou logradouro"
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[180px_minmax(0,1fr)]">
          <div>
            <label
              htmlFor="customer-number"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              Número
            </label>

            <input
              id="customer-number"
              type="text"
              value={values.number}
              onChange={(event) => onChange("number", event.target.value)}
              placeholder="Número"
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="customer-complement"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              Complemento
            </label>

            <input
              id="customer-complement"
              type="text"
              value={values.complement || ""}
              onChange={(event) => onChange("complement", event.target.value)}
              placeholder="Sala, bloco, loja, referência etc."
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div>
            <label
              htmlFor="customer-district"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              Bairro
            </label>

            <input
              id="customer-district"
              type="text"
              value={values.district}
              onChange={(event) => onChange("district", event.target.value)}
              placeholder="Bairro"
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="customer-city"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              Cidade
            </label>

            <input
              id="customer-city"
              type="text"
              value={values.city}
              onChange={(event) => onChange("city", event.target.value)}
              placeholder="Cidade"
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="customer-state"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              Estado
            </label>

            <select
              id="customer-state"
              value={values.state}
              onChange={(event) => onChange("state", event.target.value)}
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Selecione</option>

              {stateOptions.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
