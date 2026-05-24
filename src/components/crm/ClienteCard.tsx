import type { Customer } from "../../types/crm";

type ClienteCardProps = {
  cliente: Customer;
  isPrioritario: boolean;
  onTogglePrioridade: (clienteId: number) => void;
  onVerDetalhes: (cliente: Customer) => void;
  onEditarCliente: (cliente: Customer) => void;
  onExcluirCliente: (clienteId: number) => void;
};

function ClienteCard({
  cliente,
  isPrioritario,
  onTogglePrioridade,
  onVerDetalhes,
  onEditarCliente,
  onExcluirCliente,
}: ClienteCardProps) {
  return (
    <article className={`card cliente-card ${isPrioritario ? "prioritario" : ""}`}>
      <div className="cliente-card-header">
        <h3>{cliente.nome}</h3>

        {isPrioritario && <span className="priority-badge">Prioritário</span>}
      </div>

      <div className="card-info">
        <span>Cidade: {cliente.cidade}</span>
        <span>Segmento: {cliente.segmento}</span>
        <span>Status: {cliente.status}</span>
        <span>Total comprado: R$ {cliente.totalComprado}</span>
      </div>

      <div className="card-actions">
        <button type="button" onClick={() => onVerDetalhes(cliente)}>
          Ver detalhes
        </button>

        <button
          type="button"
          className="button-secondary"
          onClick={() => onTogglePrioridade(cliente.id)}
        >
          {isPrioritario ? "Remover prioridade" : "Marcar prioridade"}
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
    </article>
  );
}

export default ClienteCard;