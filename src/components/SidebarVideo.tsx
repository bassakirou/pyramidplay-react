import React from "react";
import { Home, Search, List, PlaySquare } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarVideoProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  {
    icon: <Home size={20} data-oid="fs2bluk" />,
    label: "Accueil",
    path: "/videos",
  },
  {
    icon: <PlaySquare size={20} data-oid="f5meigj" />,
    label: "Shorts",
    path: "/videos/shorts",
  },
  {
    icon: <Search size={20} data-oid="583s1y5" />,
    label: "Recherche",
    path: "/videos/search",
  },
  {
    icon: <List size={20} data-oid="u1:q5hf" />,
    label: "Playlists",
    path: "/videos/playlists",
  },
];

export function SidebarVideo({ isOpen, onClose }: SidebarVideoProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          data-oid="i_6l2td"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 h-dvh w-64 bg-[#091d35] border-r border-gray-700 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        data-oid="u4gwtjl"
      >
        <div
          className="flex flex-col h-full overflow-y-auto"
          data-oid="xnxxlf2"
        >
          <div className="p-6 border-b border-gray-700" data-oid="1l9t6yt">
            <div className="flex items-center space-x-2" data-oid="7653flx">
              <img
                src="/icons/logo.svg"
                alt="PyramidPlay Logo"
                className="h-8 w-8"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
                data-oid=".n:47b-"
              />

              <div
                className="hidden h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: "#fdac0d", color: "#091d35" }}
                data-oid="tzuljbh"
              >
                PP
              </div>
              <span className="text-xl font-bold text-white" data-oid="3ksefg4">
                Vidéos
              </span>
            </div>
          </div>

          <nav className="flex-1 p-4" data-oid="zy7hpk-">
            <ul className="space-y-2" data-oid="55v8k6s">
              {navItems.map((item) => (
                <li key={item.path} data-oid="zryriee">
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer ${
                        isActive
                          ? "text-white"
                          : "text-gray-300 hover:bg-gray-700"
                      }`
                    }
                    style={({ isActive }) =>
                      isActive
                        ? { backgroundColor: "#fdac0d", color: "#091d35" }
                        : {}
                    }
                    data-oid="31jl9ac"
                  >
                    <span className="text-gray-300" data-oid="u_j1f6k">
                      {item.icon}
                    </span>
                    <span className="font-medium" data-oid="c890.8c">
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-700" data-oid="j9dhbgx">
            <div
              className="text-xs text-gray-400 text-center"
              data-oid=":pomn3n"
            >
              <p data-oid="7e-jvk_">PyramidPlay</p>
              <p data-oid="abwxulj">Streaming Vidéo</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
