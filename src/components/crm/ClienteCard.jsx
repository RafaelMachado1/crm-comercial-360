import Card from "../ui/Card";

function ClienteCard({ cliente }) {
  return (
    <Card>
      <h3>{cliente.nome}</h3>

      <div className="card-info">
        <span>Cidade: {cliente.cidade}</span>
        <span>Segmento: {cliente.segmento}</span>
        <span>Status: {cliente.status}</span>
        <span>Total comprado: R$ {cliente.totalComprado}</span>
      </div>
    </Card>
  );
}

export default ClienteCard;