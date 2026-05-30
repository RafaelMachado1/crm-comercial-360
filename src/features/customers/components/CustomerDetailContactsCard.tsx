import type { ProfessionalCustomer } from "../types/customer.types";

type CustomerDetailContactsCardProps = {
  customer: ProfessionalCustomer;
};

type ContactFieldProps = {
  label: string;
  value?: string;
};

function ContactField({ label, value }: ContactFieldProps) {
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

export function CustomerDetailContactsCard({
  customer,
}: CustomerDetailContactsCardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
          Contatos
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Pessoas de contato vinculadas ao cliente.
        </p>
      </div>

      <div className="p-5">
        {customer.contacts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <h3 className="text-sm font-semibold text-slate-900">
              Nenhum contato cadastrado
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Os contatos profissionais do cliente serão exibidos aqui.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {customer.contacts.map((contact) => (
              <article
                key={contact.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <ContactField label="Nome" value={contact.name} />
                  <ContactField label="Cargo" value={contact.role} />
                  <ContactField label="Telefone" value={contact.phone} />
                  <ContactField label="E-mail" value={contact.email} />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
