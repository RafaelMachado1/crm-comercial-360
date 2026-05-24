import { useMemo, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

import type { Customer } from "../../types/crm";
import { formatDateBR } from "../../utils/dateUtils";

type ClienteTableProps = {
  clientes: Customer[];
  clientePrioritarioId: number | null;
  onTogglePrioridade: (clienteId: number) => void;
  onVerDetalhes: (cliente: Customer) => void;
  onEditarCliente: (cliente: Customer) => void;
  onExcluirCliente: (clienteId: number) => void;
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function ClienteTable({
  clientes,
  clientePrioritarioId,
  onTogglePrioridade,
  onVerDetalhes,
  onEditarCliente,
  onExcluirCliente,
}: ClienteTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: "nome",
        header: "Cliente",
        cell: ({ row }) => {
          const cliente = row.original;
          const isPrioritario = clientePrioritarioId === cliente.id;

          return (
            <div className="table-customer-name">
              <strong>{cliente.nome}</strong>

              {isPrioritario && (
                <span className="table-priority-badge">Prioritário</span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "cidade",
        header: "Cidade",
      },
      {
        accessorKey: "segmento",
        header: "Segmento",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const status = getValue<Customer["status"]>();

          return <span className={`status-badge status-${status}`}>{status}</span>;
        },
      },
      {
        accessorKey: "totalComprado",
        header: "Total comprado",
        cell: ({ getValue }) => {
          const total = getValue<number>();

          return <strong>{formatCurrency(total)}</strong>;
        },
      },
      {
        accessorKey: "dataCadastro",
        header: "Cadastro",
        cell: ({ getValue }) => {
          const date = getValue<string>();

          return <span>{formatDateBR(date)}</span>;
        },
      },
      {
        accessorKey: "ultimaInteracao",
        header: "Última interação",
        cell: ({ getValue }) => {
          const date = getValue<string>();

          return <span>{formatDateBR(date)}</span>;
        },
      },
      {
        id: "acoes",
        header: "Ações",
        enableSorting: false,
        cell: ({ row }) => {
          const cliente = row.original;
          const isPrioritario = clientePrioritarioId === cliente.id;

          return (
            <div className="table-actions">
              <button type="button" onClick={() => onVerDetalhes(cliente)}>
                Ver
              </button>

              <button
                type="button"
                className="button-secondary"
                onClick={() => onTogglePrioridade(cliente.id)}
              >
                {isPrioritario ? "Remover" : "Priorizar"}
              </button>

              <button
                type="button"
                className="button-secondary"
                onClick={() => onEditarCliente(cliente)}
              >
                Editar
              </button>

              <button
                type="button"
                className="button-danger"
                onClick={() => onExcluirCliente(cliente.id)}
              >
                Excluir
              </button>
            </div>
          );
        },
      },
    ],
    [
      clientePrioritarioId,
      onEditarCliente,
      onExcluirCliente,
      onTogglePrioridade,
      onVerDetalhes,
    ]
  );

  const table = useReactTable({
    data: clientes,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (clientes.length === 0) {
    return (
      <p className="empty-message">
        Nenhum cliente disponível para exibir na tabela.
      </p>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="crm-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <button
                      type="button"
                      className="table-header-button"
                      onClick={header.column.getToggleSortingHandler()}
                      disabled={!header.column.getCanSort()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {{
                        asc: " ↑",
                        desc: " ↓",
                      }[header.column.getIsSorted() as string] ?? ""}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClienteTable;