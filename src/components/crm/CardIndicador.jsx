import Card from "../ui/Card";

function CardIndicador({ titulo, valor, descricao }) {
  return (
    <Card>
      <span className="indicator-title">{titulo}</span>
      <strong className="indicator-value">{valor}</strong>
      <p className="indicator-description">{descricao}</p>
    </Card>
  );
}

export default CardIndicador;