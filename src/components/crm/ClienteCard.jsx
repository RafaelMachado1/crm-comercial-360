import Card from "../ui/Card";

function ClienteCard({
  cliente,
  isPrioritario,
  onTogglePrioridade,
  onVerDetalhes,
}) {
  return (
    <Card>
      <div className={isPrioritario ? "cliente-card prioritario" : "cliente-card"}>
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
            onClick={() => onTogglePrioridade(cliente.id)}
            className="button-secondary"
          >
            {isPrioritario ? "Remover prioridade" : "Marcar prioridade"}
          </button>
        </div>
      </div>
    </Card>
  );
}

export default ClienteCard;