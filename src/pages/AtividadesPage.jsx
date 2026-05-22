import PageTitle from "../components/layout/PageTitle";
import Section from "../components/ui/Section";

function AtividadesPage() {
  return (
    <>
      <PageTitle
        label="Roadmap React • Fase 06"
        title="Atividades"
        description="Área reservada para acompanhar tarefas, visitas, ligações e reuniões."
      />

      <Section title="Em desenvolvimento">
        <div className="empty-message">
          Nas próximas fases, esta página poderá receber cadastro de atividades,
          status, datas, tarefas pendentes e acompanhamento comercial.
        </div>
      </Section>
    </>
  );
}

export default AtividadesPage;