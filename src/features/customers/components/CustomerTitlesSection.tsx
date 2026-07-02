import { useState } from "react";
import { toast } from "sonner";

import { useCustomerTitles } from "../../customerTitles/hooks/useCustomerTitles";
import type {
  CustomerTitle,
  CustomerTitleInput,
  CustomerTitleStatus,
} from "../../customerTitles/types/customerTitle.types";
import { CustomerTitleModal } from "./CustomerTitleModal";

type CustomerTitlesSectionProps = {
  customerId: number;
  onOpenOrder: (orderId: string) => void;
};

type CustomerTitleTab = CustomerTitleStatus;

const INITIAL_VISIBLE_TITLES = 3;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(value: string) {
  const date = new Date(value + "T00:00:00");

  if (Number.isNaN(date.getTime())) {
    return "Data não informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function getTabLabel(tab: CustomerTitleTab) {
  return tab === "a_receber" ? "A receber" : "Recebidos";
}

function TitleMenu({
  title,
  isOpen,
  onToggle,
  onEdit,
  onDelete,
  onMarkAsReceived,
  onMarkAsReceivable,
}: {
  title: CustomerTitle;
  isOpen: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onMarkAsReceived: () => void;
  onMarkAsReceivable: () => void;
}) {
  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 !bg-white text-lg font-bold leading-none !text-slate-500 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
        aria-label="Abrir ações do título"
      >
        ...
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          <button
            type="button"
            onClick={onEdit}
            className="w-full !bg-transparent px-3 py-2 text-left text-sm font-semibold !text-slate-700 !shadow-none hover:!bg-slate-50"
          >
            Editar título
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="w-full !bg-transparent px-3 py-2 text-left text-sm font-semibold !text-red-600 !shadow-none hover:!bg-red-50"
          >
            Excluir título
          </button>
          {title.status === "a_receber" ? (
            <button
              type="button"
              onClick={onMarkAsReceived}
              className="w-full !bg-transparent px-3 py-2 text-left text-sm font-semibold !text-slate-700 !shadow-none hover:!bg-slate-50"
            >
              Marcar como recebido
            </button>
          ) : (
            <button
              type="button"
              onClick={onMarkAsReceivable}
              className="w-full !bg-transparent px-3 py-2 text-left text-sm font-semibold !text-slate-700 !shadow-none hover:!bg-slate-50"
            >
              Marcar como a receber
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

function CustomerTitleCard({
  title,
  isMenuOpen,
  onToggleMenu,
  onEdit,
  onDelete,
  onOpenOrder,
  onMarkAsReceived,
  onMarkAsReceivable,
}: {
  title: CustomerTitle;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onOpenOrder: (orderId: string) => void;
  onMarkAsReceived: () => void;
  onMarkAsReceivable: () => void;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-lg font-bold text-slate-950">
            {formatCurrency(title.amount)}
          </p>
        </div>

        <TitleMenu
          title={title}
          isOpen={isMenuOpen}
          onToggle={onToggleMenu}
          onEdit={onEdit}
          onDelete={onDelete}
          onMarkAsReceived={onMarkAsReceived}
          onMarkAsReceivable={onMarkAsReceivable}
        />
      </div>

      <div className="mt-4 grid gap-3 text-sm text-slate-600">
        <div>
          <span className="block text-xs font-bold uppercase text-slate-400">
            Vencimento
          </span>
          <span className="font-semibold text-slate-700">
            {formatDate(title.dueDate)}
          </span>
        </div>

        <div>
          <span className="block text-xs font-bold uppercase text-slate-400">
            Pedido
          </span>
          {title.orderId ? (
            <button
              type="button"
              onClick={() => onOpenOrder(title.orderId || "")}
              className="!bg-transparent !p-0 text-sm font-semibold !text-blue-700 !shadow-none hover:underline focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              #{title.orderNumber || title.orderId}
            </button>
          ) : (
            <span className="font-semibold text-slate-500">----------</span>
          )}
        </div>

        <div>
          <span className="block text-xs font-bold uppercase text-slate-400">
            Documento
          </span>
          <span className="font-semibold text-slate-700">
            {title.documentNumber}
          </span>
        </div>

        {title.observation ? (
          <p className="text-sm font-semibold text-slate-500">
            {title.observation}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export function CustomerTitlesSection({
  customerId,
  onOpenOrder,
}: CustomerTitlesSectionProps) {
  const {
    receivableTitles,
    receivedTitles,
    createTitle,
    updateTitle,
    deleteTitle,
    markTitleAsReceived,
    markTitleAsReceivable,
  } = useCustomerTitles(customerId);
  const [activeTab, setActiveTab] = useState<CustomerTitleTab>("a_receber");
  const [expandedTabs, setExpandedTabs] = useState<
    Record<CustomerTitleTab, boolean>
  >({
    a_receber: false,
    recebido: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTitle, setEditingTitle] = useState<CustomerTitle | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const activeTitles =
    activeTab === "a_receber" ? receivableTitles : receivedTitles;
  const isExpanded = expandedTabs[activeTab];
  const visibleTitles = isExpanded
    ? activeTitles
    : activeTitles.slice(0, INITIAL_VISIBLE_TITLES);
  const canToggleTitles = activeTitles.length > INITIAL_VISIBLE_TITLES;

  function handleOpenCreateModal() {
    setEditingTitle(null);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingTitle(null);
  }

  function handleSubmitTitle(input: CustomerTitleInput, addAnother: boolean) {
    if (editingTitle) {
      updateTitle(editingTitle.id, input);
      toast.success("Título atualizado com sucesso.");
      handleCloseModal();
      return;
    }

    createTitle(input);
    toast.success("Título adicionado com sucesso.");

    if (!addAnother) {
      handleCloseModal();
    }
  }

  function handleEditTitle(title: CustomerTitle) {
    setOpenMenuId(null);
    setEditingTitle(title);
    setIsModalOpen(true);
  }

  function handleDeleteTitle(title: CustomerTitle) {
    setOpenMenuId(null);
    deleteTitle(title.id);
    toast.success("Título excluído com sucesso.");
  }

  function handleMarkAsReceived(title: CustomerTitle) {
    setOpenMenuId(null);
    markTitleAsReceived(title);
    toast.success("Título marcado como recebido.");
  }

  function handleMarkAsReceivable(title: CustomerTitle) {
    setOpenMenuId(null);
    markTitleAsReceivable(title);
    toast.success("Título marcado como a receber.");
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
        <h2 className="text-sm font-bold uppercase text-slate-950">Títulos</h2>
        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="rounded-lg !bg-blue-600 px-3 py-2 text-xs font-bold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          + Adicionar título
        </button>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 rounded-lg border border-slate-200 bg-slate-100 p-1">
          {(["a_receber", "recebido"] as CustomerTitleTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                setOpenMenuId(null);
              }}
              className={[
                "rounded-md px-3 py-2 text-sm font-bold !shadow-none transition focus:outline-none focus:ring-2 focus:ring-blue-100",
                activeTab === tab
                  ? "!bg-white !text-slate-950"
                  : "!bg-transparent !text-slate-500 hover:!bg-slate-50",
              ].join(" ")}
            >
              {getTabLabel(tab)}
            </button>
          ))}
        </div>

        {activeTitles.length === 0 ? (
          <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <p className="text-sm font-semibold text-slate-600">
              Nenhum título encontrado nesta aba.
            </p>
          </div>
        ) : (
          <div className="mt-4">
            <div
              className={[
                "space-y-3",
                canToggleTitles
                  ? isExpanded
                    ? "h-[520px] overflow-y-auto pr-1"
                    : "h-[520px] overflow-hidden"
                  : "",
              ].join(" ")}
            >
              {visibleTitles.map((title) => (
                <CustomerTitleCard
                  key={title.id}
                  title={title}
                  isMenuOpen={openMenuId === title.id}
                  onToggleMenu={() =>
                    setOpenMenuId((currentMenuId) =>
                      currentMenuId === title.id ? null : title.id
                    )
                  }
                  onEdit={() => handleEditTitle(title)}
                  onDelete={() => handleDeleteTitle(title)}
                  onOpenOrder={onOpenOrder}
                  onMarkAsReceived={() => handleMarkAsReceived(title)}
                  onMarkAsReceivable={() => handleMarkAsReceivable(title)}
                />
              ))}
            </div>

            {canToggleTitles ? (
              <div className="pt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setExpandedTabs((currentTabs) => ({
                      ...currentTabs,
                      [activeTab]: !currentTabs[activeTab],
                    }));
                    setOpenMenuId(null);
                  }}
                  className="rounded-lg border border-slate-200 !bg-white px-4 py-2 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
                >
                  {isExpanded ? "Ver menos" : "Ver mais"}
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <CustomerTitleModal
        isOpen={isModalOpen}
        customerId={customerId}
        title={editingTitle}
        onClose={handleCloseModal}
        onSubmit={handleSubmitTitle}
      />
    </section>
  );
}
