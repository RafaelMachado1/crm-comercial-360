import { Link } from "react-router-dom";

import PageTitle from "../components/layout/PageTitle";
import Section from "../components/ui/Section";

function NotFoundPage() {
  return (
    <>
      <PageTitle
        label="Erro 404"
        title="Página não encontrada"
        description="A rota acessada não existe no CRM Comercial 360."
      />

      <Section title="Voltar para o sistema">
        <div className="empty-message">
          <p>Use o botão abaixo para voltar ao dashboard.</p>

          <Link className="button-link" to="/">
            Voltar ao dashboard
          </Link>
        </div>
      </Section>
    </>
  );
}

export default NotFoundPage;