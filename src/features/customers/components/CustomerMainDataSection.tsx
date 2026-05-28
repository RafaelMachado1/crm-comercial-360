import type { CustomerPersonType, CustomerStatus } from "../types/customer.types";

export type CustomerMainDataFormValues = {
  personType: CustomerPersonType;
  document: string;
  legalName: string;
  tradeName: string;
  phone: string;
  email: string;
  stateRegistration: string;
  suframa: string;
  segment: string;
  network: string;
  status: CustomerStatus;
  additionalInfo: string;
};

type CustomerMainDataSectionProps = {
  values: CustomerMainDataFormValues;
  segmentOptions: string[];
  networkOptions: string[];
  statusOptions: Array<{
    value: CustomerStatus;
    label: string;
  }>;
  onChange: <Key extends keyof CustomerMainDataFormValues>(
    key: Key,
    value: CustomerMainDataFormValues[Key]
  ) => void;
};

export function CustomerMainDataSection({
  values,
  segmentOptions,
  networkOptions,
  statusOptions,
  onChange,
}: CustomerMainDataSectionProps) {
  const documentLabel =
    values.personType === "legal" ? "CNPJ" : "CPF";

  const legalNameLabel =
    values.personType === "legal" ? "Razão social" : "Nome completo";

  const documentPlaceholder =
    values.personType === "legal"
      ? "00.000.000/0000-00"
      : "000.000.000-00";

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
          Dados principais
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Informe os dados cadastrais básicos do cliente.
        </p>
      </div>

      <div className="space-y-5 p-5">
        <div>
          <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
            Tipo de pessoa
          </span>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              <input
                type="radio"
                name="personType"
                value="legal"
                checked={values.personType === "legal"}
                onChange={() => onChange("personType", "legal")}
                className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Pessoa Jurídica
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              <input
                type="radio"
                name="personType"
                value="individual"
                checked={values.personType === "individual"}
                onChange={() => onChange("personType", "individual")}
                className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Pessoa Física
            </label>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label
              htmlFor="customer-document"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              {documentLabel}
            </label>

            <input
              id="customer-document"
              type="text"
              value={values.document}
              onChange={(event) => onChange("document", event.target.value)}
              placeholder={documentPlaceholder}
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="customer-legal-name"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              {legalNameLabel}
            </label>

            <input
              id="customer-legal-name"
              type="text"
              value={values.legalName}
              onChange={(event) => onChange("legalName", event.target.value)}
              placeholder={legalNameLabel}
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label
              htmlFor="customer-trade-name"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              Nome fantasia
            </label>

            <input
              id="customer-trade-name"
              type="text"
              value={values.tradeName}
              onChange={(event) => onChange("tradeName", event.target.value)}
              placeholder="Nome comercial do cliente"
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="customer-phone"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              Telefone
            </label>

            <input
              id="customer-phone"
              type="text"
              value={values.phone}
              onChange={(event) => onChange("phone", event.target.value)}
              placeholder="(00) 00000-0000"
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label
              htmlFor="customer-email"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              E-mail
            </label>

            <input
              id="customer-email"
              type="email"
              value={values.email}
              onChange={(event) => onChange("email", event.target.value)}
              placeholder="cliente@email.com"
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="customer-state-registration"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              Inscrição estadual
            </label>

            <input
              id="customer-state-registration"
              type="text"
              value={values.stateRegistration}
              onChange={(event) =>
                onChange("stateRegistration", event.target.value)
              }
              placeholder="Inscrição estadual"
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label
              htmlFor="customer-suframa"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              SUFRAMA
            </label>

            <input
              id="customer-suframa"
              type="text"
              value={values.suframa}
              onChange={(event) => onChange("suframa", event.target.value)}
              placeholder="Opcional"
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1 text-xs text-slate-400">
              Preencha apenas quando aplicável.
            </p>
          </div>

          <div>
            <label
              htmlFor="customer-status"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              Status
            </label>

            <select
              id="customer-status"
              value={values.status}
              onChange={(event) =>
                onChange("status", event.target.value as CustomerStatus)
              }
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label
              htmlFor="customer-segment"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              Segmento
            </label>

            <select
              id="customer-segment"
              value={values.segment}
              onChange={(event) => onChange("segment", event.target.value)}
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Selecione</option>

              {segmentOptions.map((segment) => (
                <option key={segment} value={segment}>
                  {segment}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="customer-network"
              className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
            >
              Rede
            </label>

            <select
              id="customer-network"
              value={values.network}
              onChange={(event) => onChange("network", event.target.value)}
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Sem rede</option>

              {networkOptions.map((network) => (
                <option key={network} value={network}>
                  {network}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="customer-additional-info"
            className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
          >
            Informações adicionais
          </label>

          <textarea
            id="customer-additional-info"
            value={values.additionalInfo}
            onChange={(event) => onChange("additionalInfo", event.target.value)}
            placeholder="Observações comerciais, particularidades do cliente ou informações importantes."
            rows={4}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
    </section>
  );
}
