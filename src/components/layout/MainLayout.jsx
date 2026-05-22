import { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {
  const [sidebarAberta, setSidebarAberta] = useState(true);

  function alternarSidebar() {
    setSidebarAberta(!sidebarAberta);
  }

  return (
    <div className="app-shell">
      <Header
        sidebarAberta={sidebarAberta}
        onToggleSidebar={alternarSidebar}
      />

      <div className="app-body">
        {sidebarAberta && <Sidebar />}

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;