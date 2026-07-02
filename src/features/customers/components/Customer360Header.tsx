import type { CustomerContact, ProfessionalCustomer } from "../types/customer.types";
import {
  formatCustomerDocument,
  getCustomerDisplayName,
} from "../utils/customerUtils";

type Customer360HeaderProps = {
  customer: ProfessionalCustomer;
  onBack: () => void;
  onEditCustomer: () => void;
  isFullProfileOpen: boolean;
  onToggleFullProfile: () => void;
};

type DetailRowProps = {
  label: string;
  value?: string;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="grid gap-1 border-b border-slate-100 py-3 sm:grid-cols-[180px_minmax(0,1fr)]">
      <span className="text-sm font-semibold text-slate-500">{label}</span>
      <span className="min-w-0 break-words text-sm font-semibold text-slate-800">
        {value || "Não informado"}
      </span>
    </div>
  );
}

function ContactRows({ contacts }: { contacts: CustomerContact[] }) {
  if (contacts.length === 0) {
    return <DetailRow label="Contatos" value="Nenhum contato cadastrado" />;
  }

  return (
    <div className="grid gap-1 border-b border-slate-100 py-3 sm:grid-cols-[180px_minmax(0,1fr)]">
      <span className="text-sm font-semibold text-slate-500">Contatos</span>
      <div className="space-y-2">
        {contacts.map((contact) => {
          const contactInfo = [contact.role, contact.phone, contact.email]
            .filter(Boolean)
            .join(" • ");

          return (
            <div key={contact.id} className="text-sm text-slate-800">
              <strong>{contact.name || "Contato sem nome"}</strong>
              {contactInfo ? (
                <span className="block text-slate-500">{contactInfo}</span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
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
  const cityAndState = getCityAndState(customer);
  const zipCode = mainAddress.zipCode ? `CEP ${mainAddress.zipCode}` : "";

  return [streetAndNumber, mainAddress.district, cityAndState, zipCode]
    .filter(Boolean)
    .join(" - ");
}

function getMapsUrl(addressSummary: string) {
  if (!addressSummary) {
    return "";
  }

  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(addressSummary)
  );
}

function getPersonTypeLabel(customer: ProfessionalCustomer) {
  return customer.personType === "legal" ? "Pessoa jurídica" : "Pessoa física";
}

function formatDate(dateValue?: string) {
  if (!dateValue) {
    return "Não informado";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("pt-BR").format(date);
}

export function Customer360Header({
  customer,
  onBack,
  onEditCustomer,
  isFullProfileOpen,
  onToggleFullProfile,
}: Customer360HeaderProps) {
  const displayName = getCustomerDisplayName(customer);
  const cityAndState = getCityAndState(customer);
  const addressSummary = getAddressSummary(customer);
  const mapsUrl = getMapsUrl(addressSummary);
  const formattedDocument = formatCustomerDocument(customer.document);

  return (
    <header className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="px-5 py-5">
        <button
          type="button"
          onClick={onBack}
          className="appearance-none !bg-transparent !p-0 text-sm font-semibold !text-blue-700 !shadow-none transition hover:!text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          Voltar para clientes
        </button>

        <div className="mt-4">
          <h1 className="text-3xl font-bold text-slate-950">{displayName}</h1>

          <button
            type="button"
            onClick={onEditCustomer}
            className="mt-3 h-9 appearance-none rounded-lg border border-slate-200 !bg-white px-4 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            Alterar
          </button>
        </div>
      </div>

      <div className="border-t border-slate-200 px-5 py-4">
        <div className="space-y-3 text-sm text-slate-700">
          <div className="flex gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
            <span>{customer.email || "E-mail não informado"}</span>
          </div>

          <div className="flex gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
            <div>
              <p>{addressSummary || "Endereço não informado"}</p>
              {cityAndState ? (
                <p className="mt-1 text-slate-500">{cityAndState}</p>
              ) : null}
              {mapsUrl ? (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex text-sm font-semibold text-blue-700 transition hover:text-blue-800"
                >
                  Visualizar mapa
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {isFullProfileOpen ? (
        <div className="border-t border-slate-200 px-5 py-4">
          <h2 className="text-base font-bold text-slate-950">
            Cadastro completo
          </h2>
          <div className="mt-2">
            <DetailRow label="Tipo de pessoa" value={getPersonTypeLabel(customer)} />
            <DetailRow label="Razão social" value={customer.legalName} />
            <DetailRow label="Nome fantasia" value={customer.tradeName} />
            <DetailRow label="Documento/CNPJ" value={formattedDocument} />
            <DetailRow label="Inscrição estadual" value={customer.stateRegistration} />
            <DetailRow label="Telefone" value={customer.phone} />
            <DetailRow label="E-mail" value={customer.email} />
            <DetailRow label="Segmento" value={customer.segment} />
            <DetailRow label="Rede" value={customer.network} />
            <DetailRow label="SUFRAMA" value={customer.suframa} />
            <ContactRows contacts={customer.contacts} />
            <DetailRow label="Tabelas de preço" value="Todas as tabelas" />
            <DetailRow label="Data do cadastro" value={formatDate(customer.createdAt)} />
            <DetailRow label="Origem do cadastro" value="Não informado" />
            <DetailRow label="Cadastrado por" value="Não informado" />
          </div>
        </div>
      ) : null}

      <div className="border-t border-slate-200 px-5 py-3 text-center">
        <button
          type="button"
          onClick={onToggleFullProfile}
          className="appearance-none !bg-transparent !p-0 text-sm font-semibold !text-blue-700 !shadow-none transition hover:!text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          {isFullProfileOpen
            ? "Ocultar cadastro completo ↑"
            : "Ver cadastro completo ↓"}
        </button>
      </div>
    </header>
  );
}
