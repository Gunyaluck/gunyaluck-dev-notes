import { useState } from "react";
import { User, RotateCcw, LogOut, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { NotificationDropdown } from "./NotificationDropdown";

export function UserDropDown({ user, onClose, hideBell = false }) {
  const navigate = useNavigate();
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  
  // Mock: มีการแจ้งเตือน 2 รายการ
  const hasNotifications = true;

  const handleProfile = () => {
    // Navigate to profile page
    navigate("/profile");
    if (onClose) onClose();
  };

  const handleResetPassword = () => {
    // Navigate to reset password page
    navigate("/reset-password");
    if (onClose) onClose();
  };

  const handleLogout = () => {
    // Clear login state from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    
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
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || "User"}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-brown-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-headline-4 font-semibold text-brown-600 truncate">
            {user?.name || "User"}
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

        <Button
          onClick={handleResetPassword}
          variant="menu"
          className="border-b border-brown-300"
        >
          <RotateCcw className="w-5 h-5 text-brown-600 shrink-0" />
          <span className="body-1-brown-600 flex-1">Reset password</span>
        </Button>

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
