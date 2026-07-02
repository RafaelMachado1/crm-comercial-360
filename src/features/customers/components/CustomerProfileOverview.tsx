import type { ReactNode } from "react";

import type { CustomerContact, ProfessionalCustomer } from "../types/customer.types";
import { formatCustomerDocument } from "../utils/customerUtils";

type CustomerProfileOverviewProps = {
  customer: ProfessionalCustomer;
};

type ProfileFieldProps = {
  label: string;
  value?: string;
};

type ProfileColumnProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div className="min-w-0">
      <span className="block text-xs font-bold uppercase text-slate-400">
        {label}
      </span>
      <span className="mt-1 block break-words text-sm font-semibold text-slate-800">
        {value || "Não informado"}
      </span>
    </div>
  );
}

function ProfileColumn({ title, description, children }: ProfileColumnProps) {
  return (
    <section className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-sm font-bold text-slate-950">{title}</h3>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
      <div className="mt-4 grid gap-4">{children}</div>
    </section>
  );
}

function getPersonTypeLabel(customer: ProfessionalCustomer) {
  return customer.personType === "legal" ? "Pessoa jurídica" : "Pessoa física";
}

function getCityAndState(customer: ProfessionalCustomer) {
  return [customer.mainAddress.city, customer.mainAddress.state]
    .filter(Boolean)
    .join(" / ");
}

function getAddressSummary(customer: ProfessionalCustomer) {
  const { mainAddress } = customer;
  const streetAndNumber = [mainAddress.street, mainAddress.number]
    .filter(Boolean)
    .join(", ");

  return [streetAndNumber, mainAddress.complement].filter(Boolean).join(" - ");
}

function ContactPreview({ contact }: { contact: CustomerContact }) {
  const secondaryInfo = [contact.role, contact.phone, contact.email]
    .filter(Boolean)
    .join(" • ");

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-3">
      <h4 className="text-sm font-bold text-slate-900">
        {contact.name || "Contato sem nome"}
      </h4>
      <p className="mt-1 text-xs font-semibold text-slate-500">
        {secondaryInfo || "Dados de contato não informados"}
      </p>
    </article>
  );
}

export function CustomerProfileOverview({ customer }: CustomerProfileOverviewProps) {
  const formattedDocument = formatCustomerDocument(customer.document);
  const visibleContacts = customer.contacts.slice(0, 3);
  const remainingContacts = customer.contacts.length - visibleContacts.length;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-1 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-950">Perfil do cliente</h2>
          <p className="mt-1 text-sm text-slate-500">
            Dados cadastrais, localização e contatos principais em uma visão compacta.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        <ProfileColumn
          title="Dados comerciais"
          description="Identificação e informações comerciais."
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            <ProfileField label="Tipo de pessoa" value={getPersonTypeLabel(customer)} />
            <ProfileField label="Documento" value={formattedDocument} />
            <ProfileField label="Razão social" value={customer.legalName} />
            <ProfileField label="Nome fantasia" value={customer.tradeName} />
            <ProfileField label="Segmento" value={customer.segment} />
            <ProfileField label="Rede" value={customer.network} />
            <ProfileField label="Inscrição estadual" value={customer.stateRegistration} />
            <ProfileField label="SUFRAMA" value={customer.suframa} />
          </div>
        </ProfileColumn>

        <ProfileColumn
          title="Contato e localização"
          description="Canais principais e endereço resumido."
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            <ProfileField label="Telefone" value={customer.phone} />
            <ProfileField label="E-mail" value={customer.email} />
            <ProfileField label="Cidade/UF" value={getCityAndState(customer)} />
            <ProfileField label="Endereço" value={getAddressSummary(customer)} />
            <ProfileField label="CEP" value={customer.mainAddress.zipCode} />
            <ProfileField label="Bairro" value={customer.mainAddress.district} />
          </div>
        </ProfileColumn>

        <ProfileColumn
          title="Contatos vinculados"
          description="Principais pessoas de contato."
        >
          {visibleContacts.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm font-semibold text-slate-500">
              Nenhum contato cadastrado
            </div>
          ) : (
            <div className="grid gap-3">
              {visibleContacts.map((contact) => (
                <ContactPreview key={contact.id} contact={contact} />
              ))}
              {remainingContacts > 0 ? (
                <p className="text-xs font-semibold text-slate-500">
                  +{remainingContacts} contato(s) adicional(is) no cadastro.
                </p>
              ) : null}
            </div>
          )}
        </ProfileColumn>
      </div>
    </section>
  );
}
