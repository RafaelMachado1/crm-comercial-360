import type { ReactNode } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

import useToggle from "../../hooks/useToggle";

type MainLayoutProps = {
  children: ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  const sidebar = useToggle(true);

  return (
    <div className="app-shell">
      <Header sidebarAberta={sidebar.isOpen} onToggleSidebar={sidebar.toggle} />

      <div className="app-body">
        {sidebar.isOpen && <Sidebar />}

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;