import { useNavigate, useLocation } from "react-router-dom";
import { FileText, Folder, User, Bell, Lock, ExternalLink, LogOut } from "lucide-react";
import { Button } from "../common/Button";

export function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "article", label: "Article management", icon: FileText, path: "/admin/article-management" },
    { id: "category", label: "Category management", icon: Folder, path: "/admin/category-management" },
    { id: "profile", label: "Profile", icon: User, path: "/admin/profile" },
    { id: "notification", label: "Notification", icon: Bell, path: "/admin/notification" },
    { id: "reset-password", label: "Reset password", icon: Lock, path: "/admin/reset-password" },
  ];

  const bottomItems = [
    { id: "website", label: "hh. website", icon: ExternalLink, path: "/" },
    { id: "logout", label: "Log out", icon: LogOut, path: "/admin-login" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/admin-login");
  };

  const isActive = (path) => {
    // Check if current path matches or starts with the menu path
    // This allows "Article management" to be active on both /admin/article-management and /admin/create-article
    if (path === "/admin/article-management") {
      return location.pathname === path || location.pathname.startsWith("/admin/create-article") || location.pathname.startsWith("/admin/edit-article");
    }
    // This allows "Category management" to be active on both /admin/category-management and /admin/create-category
    if (path === "/admin/category-management") {
      return location.pathname === path || location.pathname.startsWith("/admin/create-category") || location.pathname.startsWith("/admin/edit-category");
    }
    return location.pathname === path;
  };

  return (
    <div className="w-[240px] h-screen bg-white border-r border-brown-300 flex flex-col shrink-0">
      {/* Logo Section */}
      <div className="px-6 py-6 border-b border-brown-300">
        <div className="flex items-center gap-2">
          <span className="text-headline-3 text-brown-600">hh.</span>
          <span className="text-headline-4 text-brand-orange">Admin panel</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
                active
                  ? "bg-brown-200 text-brown-600"
                  : "text-brown-400 hover:bg-brown-100 hover:text-brown-600"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="body-1-brown-600">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-brown-300 py-4">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={item.id === "logout" ? handleLogout : () => navigate(item.path)}
              className="w-full flex items-center gap-3 px-6 py-3 text-left text-brown-400 hover:bg-brown-100 hover:text-brown-600 transition-colors"
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="body-1-brown-600">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
