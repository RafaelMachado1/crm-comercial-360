import { Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import DashboardPage from "./pages/DashboardPage";
import ClientesPage from "./pages/ClientesPage";
import ProdutosPage from "./pages/ProdutosPage";
import AtividadesPage from "./pages/AtividadesPage";
import VendasPage from "./pages/VendasPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./App.css";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/produtos" element={<ProdutosPage />} />
        <Route path="/atividades" element={<AtividadesPage />} />
        <Route path="/vendas" element={<VendasPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;