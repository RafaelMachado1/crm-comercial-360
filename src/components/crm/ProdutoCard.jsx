import Card from "../ui/Card";

function ProdutoCard({ produto }) {
  return (
    <Card>
      <h3>{produto.nome}</h3>

      <div className="card-info">
        <span>Categoria: {produto.categoria}</span>
        <span>Preço: R$ {produto.preco}</span>
        <span>Estoque: {produto.estoque}</span>
      </div>
    </Card>
  );
}

export default ProdutoCard;