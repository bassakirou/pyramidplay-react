import React from "react";
import { Home, Search, Music, Heart, User, Settings, Disc } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: <Home size={20} data-oid="psf:g64" />, label: "Accueil", path: "/" },
  {
    icon: <Search size={20} data-oid="::dk1pa" />,
    label: "Recherche",
    path: "/search",
  },
  {
    icon: <Music size={20} data-oid="e.75edq" />,
    label: "Votre bibliothèque",
    path: "/library",
  },
  {
    icon: <Heart size={20} data-oid="j6py7_z" />,
    label: "Favoris",
    path: "/favorites",
  },
  {
    icon: <Disc size={20} data-oid="zniu4sj" />,
    label: "Albums",
    path: "/albums",
  },
  {
    icon: <User size={20} data-oid="krm8h-c" />,
    label: "Artistes",
    path: "/artists",
  },
  {
    icon: <Settings size={20} data-oid="2tu5ly5" />,
    label: "Paramètres",
    path: "/settings",
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          data-oid="_awt9f0"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 h-dvh w-64 bg-[#091d35] border-r border-gray-700 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        data-oid="8co74-8"
      >
        <div
          className="flex flex-col h-full overflow-y-auto"
          data-oid="kb-taug"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-700" data-oid="71-6xt1">
            <div className="flex items-center space-x-2" data-oid="wv2n85c">
              <img
                src="/icons/logo.svg"
                alt="PyramidPlay Logo"
                className="h-8 w-8"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
                data-oid="s0ri6_4"
              />

              <div
                className="hidden h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: "#fdac0d", color: "#091d35" }}
                data-oid="d:.r091"
              >
                PP
              </div>
              <span className="text-xl font-bold text-white" data-oid="mkfrzvs">
                PyramidPlay
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4" data-oid="uxyf2q3">
            <ul className="space-y-2" data-oid="v7uelqi">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path} data-oid=":1eg1m7">
                    <Button
                      asChild
                      variant="ghost"
                      className={`w-full justify-start space-x-3 px-4 py-6 rounded-lg text-left transition-colors cursor-pointer ${
                        isActive
                          ? "text-white bg-[#fdac0d] hover:bg-[#fdac0d]/90 hover:text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      <Link to={item.path} onClick={onClose}>
                        <span className={isActive ? "text-[#091d35]" : "text-gray-300"}>
                          {item.icon}
                        </span>
                        <span className={`font-medium text-base ${isActive ? "text-[#091d35]" : ""}`}>
                          {item.label}
                        </span>
                      </Link>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700" data-oid="3_3mtsk">
            <div
              className="text-xs text-gray-400 text-center"
              data-oid="m7xz0w3"
            >
              <p data-oid="0xpnmj1">PyramidPlay</p>
              <p data-oid="vvur7u3">Musique Africaine</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
