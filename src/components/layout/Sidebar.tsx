import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/clientes"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Clientes
        </NavLink>

        <NavLink
          to="/pedidos"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Pedidos
        </NavLink>

        <NavLink
          to="/produtos"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Produtos
        </NavLink>

        <NavLink
          to="/atividades"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Atividades
        </NavLink>

        <NavLink
          to="/vendas"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Vendas
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;