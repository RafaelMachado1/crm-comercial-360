import PageTitle from "../components/layout/PageTitle";
import Section from "../components/ui/Section";

function VendasPage() {
  return (
    <>
      <PageTitle
        label="Roadmap React • Fase 09"
        title="Vendas"
        description="Área reservada para histórico comercial, pedidos e indicadores de vendas."
      />

      <Section title="Em desenvolvimento">
        <div className="empty-message">
          Nas próximas fases, esta página poderá receber pedidos, histórico de
          compras, valores vendidos, filtros por período e gráficos.
        </div>
      </Section>
    </>
  );
}

export default VendasPage;