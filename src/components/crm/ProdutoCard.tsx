import type { Product } from "../../types/crm";

type ProdutoCardProps = {
  produto: Product;
};

function ProdutoCard({ produto }: ProdutoCardProps) {
  return (
    <article className="card">
      <h3>{produto.nome}</h3>

      <div className="card-info">
        <span>Categoria: {produto.categoria}</span>
        <span>Preço: R$ {produto.preco}</span>
        <span>Estoque: {produto.estoque}</span>
      </div>
    </article>
  );
}

export default ProdutoCard;