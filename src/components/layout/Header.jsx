function Header({ sidebarAberta, onToggleSidebar }) {
  return (
    <header className="header">
      <div>
        <strong>CRM Comercial 360</strong>
        <span>Gestão comercial para representantes</span>
      </div>

      <div className="header-actions">
        <button type="button" onClick={onToggleSidebar} className="button-secondary">
          {sidebarAberta ? "Fechar menu" : "Abrir menu"}
        </button>

        <span className="header-badge">Dashboard</span>
      </div>
    </header>
  );
}

export default Header;