import Header from "./Header";
import Sidebar from "./Sidebar";

import useToggle from "../../hooks/useToggle";

function MainLayout({ children }) {
  const sidebar = useToggle(true);

  return (
    <div className="app-shell">
      <Header
        sidebarAberta={sidebar.isOpen}
        onToggleSidebar={sidebar.toggle}
      />

      <div className="app-body">
        {sidebar.isOpen && <Sidebar />}

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;