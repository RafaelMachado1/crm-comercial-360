import type { Customer } from "../../types/crm";

type ClienteModalProps = {
  cliente: Customer | null;
  onClose: () => void;
};

function ClienteModal({ cliente, onClose }: ClienteModalProps) {
  if (!cliente) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{cliente.nome}</h2>

          <button type="button" className="button-secondary" onClick={onClose}>
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