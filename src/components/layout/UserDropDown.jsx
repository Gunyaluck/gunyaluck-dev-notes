import { useState, useEffect } from "react";
import axios from "axios";
import { User, RotateCcw, LogOut, Bell, SquareArrowOutUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { NotificationDropdown } from "./NotificationDropdown";
import { NotificationCountBadge } from "./NotificationCountBadge";
import { useAuth } from "../../contexts/authentication";
import { API_BASE_URL } from "@/config/env";

export function UserDropDown({ admin, onClose, onLogout, hideBell = false, showAdminPanel = false }) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  const isAdmin = showAdminPanel || !!admin;

  useEffect(() => {
    if (!isAuthenticated) {
      setUnreadNotificationCount(0);
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get(`${API_BASE_URL}/notifications`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        setUnreadNotificationCount(list.filter((n) => !n.is_read).length);
      })
      .catch(() => setUnreadNotificationCount(0));
  }, [isAuthenticated]);

  const displayUser = isAdmin ? {
    name: admin?.adminName || admin?.name || "Admin",
    avatar: admin?.adminAvatar || admin?.avatar || null,
  } : (user || { name: "User", avatar: null });

  const handleProfile = () => {
    // Navigate to profile page
    if (isAdmin) {
      navigate("/admin/profile");
    } else {
      navigate("/profile");
    }
    if (onClose) onClose();
  };

  const handleResetPassword = () => {
    // Navigate to reset password page
    if (isAdmin) {
      navigate("/admin/reset-password");
    } else {
      navigate("/reset-password");
    }
    if (onClose) onClose();
  };

  const handleAdminPanel = () => {
    // Navigate to admin landing page
    navigate("/admin/article-management");
    if (onClose) onClose();
  };

  const handleLogout = () => {
    if (onClose) onClose();
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      localStorage.removeItem("isAdmin");
      navigate("/");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg min-w-[280px] border border-brown-100">
      {/* User Info Section */}
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full bg-brown-300 flex items-center justify-center shrink-0 overflow-hidden">
          {user?.profilePic || user?.avatar ? (
            <img
              src={user.profilePic || user.avatar}
              alt={user?.username || user?.name || "User"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-brown-300 flex items-center justify-center">
              <span className="text-headline-4 text-brown-600">
                {displayUser?.name ? displayUser.name.charAt(0).toUpperCase() : (isAdmin ? "A" : "U")}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-headline-4 font-semibold text-brown-600 truncate">
            {displayUser?.name || (isAdmin ? "Admin" : "User")}
          </p>
        </div>
        {!hideBell && (
          <div className="relative w-12 h-12 shrink-0">
            <Button
              variant="icon"
              size="icon-lg"
              className="relative w-12 h-12 bg-white border border-brown-300 hover:bg-brown-100 shrink-0"
              aria-label={
                unreadNotificationCount > 0
                  ? `Notifications, ${unreadNotificationCount} unread`
                  : "Notifications"
              }
              onClick={(e) => {
                e.stopPropagation();
                setShowNotificationDropdown(!showNotificationDropdown);
              }}
            >
              <Bell className="w-5 h-5 text-brown-600" />
              {!showNotificationDropdown && (
                <NotificationCountBadge count={unreadNotificationCount} />
              )}
            </Button>

            {/* Notification Dropdown */}
            <NotificationDropdown
              isOpen={showNotificationDropdown}
              onClose={() => setShowNotificationDropdown(false)}
              onUnreadCountChange={setUnreadNotificationCount}
            />
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div>
        <Button
          onClick={handleProfile}
          variant="menu"
        >
          <User className="w-5 h-5 text-brown-600 shrink-0" />
          <span className="body-1-brown-600 flex-1">Profile</span>
        </Button>

        <div className={showAdminPanel ? "" : "relative"}>
        <Button
          onClick={handleResetPassword}
          variant="menu"
        >
          <RotateCcw className="w-5 h-5 text-brown-600 shrink-0" />
          <span className="body-1-brown-600 flex-1">Reset password</span>
        </Button>
          {!showAdminPanel && (
            <div className="absolute bottom-0 left-4 right-4 h-px bg-brown-300"></div>
          )}
        </div>

        {showAdminPanel && (
          <div className="relative">
          <Button
            onClick={handleAdminPanel}
            variant="menu"
          >
            <SquareArrowOutUpRight className="w-5 h-5 text-brown-600 shrink-0" />
            <span className="body-1-brown-600 flex-1">Admin panel</span>
          </Button>
            <div className="absolute bottom-0 left-4 right-4 h-px bg-brown-300"></div>
          </div>
        )}

        <Button
          onClick={handleLogout}
          variant="menu"
        >
          <LogOut className="w-5 h-5 text-brown-600 shrink-0" />
          <span className="body-1-brown-600 flex-1">Log out</span>
        </Button>
      </div>
    </div>
  );
}
