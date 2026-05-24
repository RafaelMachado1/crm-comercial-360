import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

function Header({ sidebarAberta, onToggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="header">
      <div>
        <strong>CRM Comercial 360</strong>
        <span>Gestão comercial para representantes</span>
      </div>

      <div className="header-actions">
        {user && (
          <div className="user-info">
            <strong>{user.nome}</strong>
            <span>{user.email}</span>
          </div>
        )}

        <button type="button" onClick={onToggleSidebar} className="button-secondary">
          {sidebarAberta ? "Fechar menu" : "Abrir menu"}
        </button>

        <span className="header-badge">Dashboard</span>

        <button type="button" onClick={handleLogout} className="button-danger">
          Sair
        </button>
      </div>
    </header>
  );
}

export default Header;