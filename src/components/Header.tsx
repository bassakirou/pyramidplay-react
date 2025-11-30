import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  onSearch: (query: string) => void;
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

export function Header({ onMenuToggle, isSidebarOpen }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isSearchPage =
    location.pathname.startsWith("/search") ||
    location.pathname.startsWith("/videos/search");
  const isVideoRoute = location.pathname.startsWith("/videos");
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 flex flex-1 z-50 lg:ml-64"
      style={{ backgroundColor: "#091d35", borderBottom: "1px solid #374151" }}
      data-oid="o1rez:_"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8" data-oid="6-f_0kh">
        <div
          className="flex items-center justify-between h-16 gap-4 flex-nowrap"
          data-oid="_5w:s4o"
        >
          {/* Logo and Menu Toggle */}
          <div className="flex items-center space-x-4" data-oid="bsa8t9u">
            <button
              onClick={onMenuToggle}
              className="p-2 text-gray-300 hover:text-white transition-colors lg:hidden"
              data-oid="offx1ea"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6" data-oid="b-7de8u" />
              ) : (
                <Menu className="w-6 h-6" data-oid="5kt7e1e" />
              )}
            </button>

            <div className="flex items-center space-x-3" data-oid="e7qvyz9">
              <img
                src="/icons/logo.svg"
                alt="PyramidPlay Logo"
                className="h-8 w-auto"
                style={{ height: "32px" }}
                data-oid="l28snm9"
              />

              <button
                className="px-3 py-1 rounded-md text-sm font-medium transition-colors"
                style={{ backgroundColor: "#fdac0d", color: "#091d35" }}
                onClick={() => navigate(isVideoRoute ? "/" : "/videos")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e69a0a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fdac0d";
                }}
                data-oid="g9kbjg8"
              >
                {isVideoRoute ? "Audios" : "Vidéos"}
              </button>
            </div>
          </div>

          {!isSearchPage && (
            <div
              className="flex-1 min-w-0 mx-4 lg:mx-6 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl"
              data-oid="l:bxces"
            >
              <form
                className="relative"
                onSubmit={(e) => {
                  e.preventDefault();
                  const q = searchQuery.trim();
                  if (q) {
                    navigate(
                      `${
                        isVideoRoute ? "/videos/search" : "/search"
                      }?q=${encodeURIComponent(q)}`,
                    );
                  } else {
                    navigate(isVideoRoute ? "/videos/search" : "/search");
                  }
                }}
                data-oid="uff38ut"
              >
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  data-oid="mjyvy5n"
                />

                <input
                  type="search"
                  placeholder="Rechercher des artistes ou des titres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:border-transparent text-white placeholder-gray-400"
                  style={{
                    backgroundColor: "#162a42",
                    border: "1px solid #374151",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#fdac0d";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 2px rgba(253, 172, 13, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#374151";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  data-oid="p-3t9:v"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      navigate(isVideoRoute ? "/videos/search" : "/search");
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    data-oid="qx0wjbp"
                  >
                    <X className="w-5 h-5" data-oid="95ax3jd" />
                  </button>
                )}
              </form>
            </div>
          )}
          {isSearchPage && (
            <div className="flex-1 min-w-0" data-oid="zsw2w1q" />
          )}

          <div
            className="flex items-center space-x-4 flex-shrink-0"
            data-oid="__u.7df"
          >
            {!user ? (
              <>
                <button
                  className="px-3 py-1 rounded-md text-sm font-medium transition-colors"
                  style={{ backgroundColor: "#fdac0d", color: "#091d35" }}
                  onClick={() => navigate("/auth/login")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e69a0a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fdac0d";
                  }}
                  data-oid="hq7vehj"
                >
                  Se connecter
                </button>
                <button
                  className="px-3 py-1 rounded-md text-sm font-medium transition-colors border"
                  style={{ color: "#fdac0d", borderColor: "#fdac0d" }}
                  onClick={() => navigate("/auth/signup")}
                  data-oid="vl1sc9m"
                >
                  S’inscrire
                </button>
              </>
            ) : (
              <div className="relative" data-oid="o:t-hi.">
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center gap-2"
                  data-oid="oge0v5f"
                >
                  <div
                    className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white"
                    data-oid="0rd5wfk"
                  >
                    {user.name.slice(0, 1).toUpperCase()}
                  </div>
                  <span
                    className="text-white text-sm hidden sm:block"
                    data-oid="pqf:7gf"
                  >
                    {user.name}
                  </span>
                </button>
                {open && (
                  <div
                    className="absolute right-0 mt-2 w-40 rounded-md border bg-[#091d35] text-white shadow-lg"
                    style={{ borderColor: "#374151" }}
                    data-oid="33zscjp"
                  >
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-[#162a42]"
                      onClick={() => {
                        setOpen(false);
                        navigate("/profile");
                      }}
                      data-oid="5rq4l4t"
                    >
                      Profil
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-[#162a42]"
                      onClick={() => {
                        setOpen(false);
                        logout();
                      }}
                      data-oid="aug2smw"
                    >
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
