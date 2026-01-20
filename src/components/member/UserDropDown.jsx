import { User, RotateCcw, LogOut, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function UserDropDown({ user, onClose }) {
  const navigate = useNavigate();

  const handleProfile = () => {
    // Navigate to profile page
    navigate("/profile");
    if (onClose) onClose();
  };

  const handleResetPassword = () => {
    // Navigate to reset password page
    console.log("Navigate to reset password");
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
    <div className="bg-white rounded-lg shadow-lg min-w-[280px]">
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
            {user?.username || user?.name}
          </p>
        </div>
        <button
          className="w-12 h-12 rounded-full bg-white border border-brown-300 flex items-center justify-center hover:bg-brown-400 transition-colors shrink-0"
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6 text-brown-600" />
        </button>
      </div>

      {/* Menu Items */}
      <div>
        <button
          onClick={handleProfile}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brown-300 transition-colors text-left cursor-pointer"
        >
          <User className="w-5 h-5 text-brown-600 shrink-0" />
          <span className="body-1-brown-600 flex-1">Profile</span>
        </button>

        <button
          onClick={handleResetPassword}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brown-300 transition-colors text-left border-b border-brown-300"
        >
          <RotateCcw className="w-5 h-5 text-brown-600 shrink-0" />
          <span className="body-1-brown-600 flex-1">Reset password</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brown-300 transition-colors text-left cursor-pointer"
        >
          <LogOut className="w-5 h-5 text-brown-600 shrink-0" />
          <span className="body-1-brown-600 flex-1">Log out</span>
        </button>
      </div>
    </div>
  );
}
