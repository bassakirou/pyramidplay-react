import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { SidebarVideo } from "./SidebarVideo";
import { AudioPlayer } from "./AudioPlayer";

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  // Search functionality can be added here later

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleSearch = () => {
    // The search logic is handled by individual pages
    // Search query can be passed to child components via props or context
  };
  return (
    <div
      key={location.pathname}
      className="min-h-screen flex"
      style={{ backgroundColor: "#162a42" }}
      data-oid="4zxmebg"
    >
      {/* Sidebar */}
      {location.pathname.startsWith("/videos") ? (
        <SidebarVideo
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
          data-oid="_nr:fyb"
        />
      ) : (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
          data-oid="6z.0-_6"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64" data-oid="8u4o0:-">
        {/* Header - Fixed */}
        <Header
          onSearch={handleSearch}
          onMenuToggle={handleMenuToggle}
          isSidebarOpen={isSidebarOpen}
          data-oid="vzrcgwq"
        />

        {/* Page Content */}
        <main
          className="flex-1 pt-16 pb-24"
          style={{ backgroundColor: "#162a42" }}
          data-oid="5.kgt1r"
        >
          {" "}
          {/* pt-16 for fixed header, pb-24 for fixed audio player */}
          <Outlet key={location.pathname} data-oid="u9_ip8i" />
        </main>

        {/* Audio Player - Fixed */}
        <AudioPlayer data-oid="68h8zt:" />
      </div>
    </div>
  );
}
