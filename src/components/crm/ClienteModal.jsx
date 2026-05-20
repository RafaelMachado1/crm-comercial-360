function ClienteModal({ cliente, onClose }) {
  if (!cliente) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{cliente.nome}</h2>

          <button type="button" onClick={onClose} className="button-secondary">
            Fechar
          </button>
        </div>

        <div className="modal-info">
          <p>
            <strong>Cidade:</strong> {cliente.cidade}
          </p>

          <p>
            <strong>Segmento:</strong> {cliente.segmento}
          </p>

          <p>
            <strong>Status:</strong> {cliente.status}
          </p>

          <p>
            <strong>Total comprado:</strong> R$ {cliente.totalComprado}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClienteModal;