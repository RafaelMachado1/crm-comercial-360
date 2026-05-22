import { produtos } from "../data/mockData";

import PageTitle from "../components/layout/PageTitle";
import Section from "../components/ui/Section";
import ProdutoCard from "../components/crm/ProdutoCard";

function ProdutosPage() {
  return (
    <>
      <PageTitle
        label="Roadmap React • Fase 06"
        title="Produtos"
        description="Catálogo inicial de produtos disponíveis no CRM."
      />

      <Section title="Lista de produtos">
        <div className="grid">
          {produtos.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      </Section>
    </>
  );
}

export default ProdutosPage;