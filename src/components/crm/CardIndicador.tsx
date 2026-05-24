type CardIndicadorProps = {
  titulo: string;
  valor: number;
  descricao: string;
};

function CardIndicador({ titulo, valor, descricao }: CardIndicadorProps) {
  return (
    <article className="card">
      <span className="indicator-title">{titulo}</span>
      <strong className="indicator-value">{valor}</strong>
      <p className="indicator-description">{descricao}</p>
    </article>
  );
}

export default CardIndicador;