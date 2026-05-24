import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import MainLayout from "./components/layout/MainLayout";
import PrivateRoute from "./routes/PrivateRoute";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ClientesPage from "./pages/ClientesPage";
import ProdutosPage from "./pages/ProdutosPage";
import AtividadesPage from "./pages/AtividadesPage";
import VendasPage from "./pages/VendasPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />

      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivateRoute />}>
          <Route
            path="/"
            element={
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            }
          />

          <Route
            path="/clientes"
            element={
              <MainLayout>
                <ClientesPage />
              </MainLayout>
            }
          />

          <Route
            path="/produtos"
            element={
              <MainLayout>
                <ProdutosPage />
              </MainLayout>
            }
          />

          <Route
            path="/atividades"
            element={
              <MainLayout>
                <AtividadesPage />
              </MainLayout>
            }
          />

          <Route
            path="/vendas"
            element={
              <MainLayout>
                <VendasPage />
              </MainLayout>
            }
          />

          <Route
            path="*"
            element={
              <MainLayout>
                <NotFoundPage />
              </MainLayout>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;