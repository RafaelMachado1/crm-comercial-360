import type { CustomerContact } from "../types/customer.types";

type CustomerContactsSectionProps = {
  contacts: CustomerContact[];
  onChangeContact: <Key extends keyof CustomerContact>(
    contactId: string,
    key: Key,
    value: CustomerContact[Key]
  ) => void;
  onAddContact: () => void;
  onRemoveContact: (contactId: string) => void;
};

export function CustomerContactsSection({
  contacts,
  onChangeContact,
  onAddContact,
  onRemoveContact,
}: CustomerContactsSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              Contatos
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Cadastre pessoas de contato dentro do cliente, como compras,
              financeiro, gerência ou operação.
            </p>
          </div>

          <button
            type="button"
            onClick={onAddContact}
            className="h-10 w-full appearance-none rounded-lg border border-blue-600 !bg-blue-600 px-4 text-sm font-semibold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:w-auto"
          >
            + Adicionar contato
          </button>
        </div>
      </div>

      <div className="space-y-4 p-5">
        {contacts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <h4 className="text-base font-semibold text-slate-900">
              Nenhum contato cadastrado
            </h4>

            <p className="mt-2 text-sm text-slate-500">
              Adicione pelo menos um contato para facilitar o relacionamento
              comercial com esse cliente.
            </p>
          </div>
        ) : (
          contacts.map((contact, index) => (
            <div
              key={contact.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h4 className="text-sm font-bold uppercase tracking-wide text-slate-600">
                  Contato {index + 1}
                </h4>

                <button
                  type="button"
                  onClick={() => onRemoveContact(contact.id)}
                  className="appearance-none rounded-lg border border-red-200 !bg-white px-3 py-2 text-xs font-semibold !text-red-600 !shadow-none transition hover:!bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  Remover
                </button>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <label
                    htmlFor={`contact-name-${contact.id}`}
                    className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
                  >
                    Nome
                  </label>

                  <input
                    id={`contact-name-${contact.id}`}
                    type="text"
                    value={contact.name}
                    onChange={(event) =>
                      onChangeContact(contact.id, "name", event.target.value)
                    }
                    placeholder="Nome do contato"
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`contact-role-${contact.id}`}
                    className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
                  >
                    Cargo
                  </label>

                  <input
                    id={`contact-role-${contact.id}`}
                    type="text"
                    value={contact.role || ""}
                    onChange={(event) =>
                      onChangeContact(contact.id, "role", event.target.value)
                    }
                    placeholder="Gerente de compras, financeiro, recepção etc."
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div>
                  <label
                    htmlFor={`contact-phone-${contact.id}`}
                    className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
                  >
                    Telefone
                  </label>

                  <input
                    id={`contact-phone-${contact.id}`}
                    type="text"
                    value={contact.phone || ""}
                    onChange={(event) =>
                      onChangeContact(contact.id, "phone", event.target.value)
                    }
                    placeholder="(00) 00000-0000"
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`contact-email-${contact.id}`}
                    className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
                  >
                    E-mail
                  </label>

                  <input
                    id={`contact-email-${contact.id}`}
                    type="email"
                    value={contact.email || ""}
                    onChange={(event) =>
                      onChangeContact(contact.id, "email", event.target.value)
                    }
                    placeholder="contato@email.com"
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
