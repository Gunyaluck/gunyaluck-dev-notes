import { useState } from "react";
import { User, RotateCcw, LogOut, Bell, SquareArrowOutUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { NotificationDropdown } from "./NotificationDropdown";

export function UserDropDown({ admin, user, onClose, hideBell = false, showAdminPanel = false, mockNotifications }) {
  const navigate = useNavigate();
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  
  // Determine if this is admin mode (check showAdminPanel or admin prop)
  const isAdmin = showAdminPanel || !!admin;
  
  // Use admin data if available, otherwise use user data
  const displayUser = isAdmin ? {
    name: admin?.adminName || admin?.name || "Admin",
    avatar: admin?.adminAvatar || admin?.avatar || null,
  } : (user || { name: "User", avatar: null });

  // Mock: มีการแจ้งเตือน 2 รายการ
  const hasNotifications = true;

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
    // Clear login state from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    
    // Close dropdown
    if (onClose) onClose();
    
    // Navigate to regular landing page (not logged in)
    navigate("/");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg min-w-[280px] border border-brown-100">
      {/* User Info Section */}
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full bg-brown-300 flex items-center justify-center shrink-0 overflow-hidden">
          {displayUser?.avatar ? (
            <img
              src={displayUser.avatar}
              alt={displayUser.name || (isAdmin ? "Admin" : "User")}
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
              className="w-12 h-12 bg-white border border-brown-300 hover:bg-brown-100 shrink-0"
              aria-label="Notifications"
              onClick={(e) => {
                e.stopPropagation();
                setShowNotificationDropdown(!showNotificationDropdown);
              }}
            >
              <Bell className="w-5 h-5 text-brown-600" />
            </Button>
            {/* Red notification dot - Hide when dropdown is open */}
            {hasNotifications && !showNotificationDropdown && (
              <div className="absolute top-1 right-0.5 w-2 h-2 bg-brand-red rounded-full"></div>
            )}
            
            {/* Notification Dropdown */}
            <NotificationDropdown
              isOpen={showNotificationDropdown}
              onClose={() => setShowNotificationDropdown(false)}
              mockNotifications={mockNotifications}
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
