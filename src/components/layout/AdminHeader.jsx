import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
import { UserDropDown } from "./UserDropDown";
import { NotificationDropdown } from "./NotificationDropdown";
import { Bell, ChevronDown } from "lucide-react";
import { Button } from "../common/Button";

export function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const navigate = useNavigate();
  
  // Mock: มีการแจ้งเตือน 1 รายการ
  const hasNotifications = true;

  // Mock user data
  const user = {
    name: "Moodeng ja",
    avatar: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=100&h=100&fit=crop"
  };

  // Mock notifications for AdminHeader
  const adminMockNotifications = [
    {
      id: 1,
      author: "Jacob Lash",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      message: "Commented on your article.",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      type: "comment"
    }
  ];

  const handleLandingPage = () => {
    navigate("/admin-landing-page");
    setIsMenuOpen(false);
    setShowUserDropdown(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setShowUserDropdown(true);
    } else {
      setShowUserDropdown(false);
    }
  };

  const handleCloseDropdown = () => {
    setShowUserDropdown(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Backdrop - Mobile only */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMenu}
        />
      )}
      
      <nav className={`w-full bg-brown-100 border-b border-brown-300 lg:h-[80px] lg:flex lg:items-center lg:bg-white lg:border-b lg:border-brown-300 ${isMenuOpen ? 'fixed top-0 left-0 right-0 z-50 lg:relative lg:z-auto' : ''}`}>
        <div className="w-full bg-brown-100 rounded-lg px-6 flex flex-col lg:flex-row lg:items-center lg:justify-between lg:h-[80px] lg:px-30 lg:py-4 lg:bg-white lg:rounded-none">
        {/* Logo Section - Left */}
        <div className="w-full h-[48px] flex items-center justify-between lg:w-auto lg:h-auto">
          <div className="w-[24px] h-[24px] flex items-center gap-1 lg:w-[44px] lg:h-[44px]">
            <img
              onClick={handleLandingPage}
              src={logo}
              alt="Logo"
              className="w-full h-full cursor-pointer"
            />
          </div>

          {/* Hamburger Menu - Mobile */}
          <Button
            onClick={toggleMenu}
            variant="hamburger"
            className="lg:hidden"
            aria-label="Open menu"
          >
            <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
            <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
            <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
          </Button>
        </div>

        {/* User Section - Desktop - Right */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          {/* Notification Bell */}
          <div className="relative w-12 h-12 shrink-0">
            <Button
              variant="icon"
              size="icon-lg"
              className="w-12 h-12 bg-white border border-brown-300 hover:bg-brown-100 shrink-0"
              aria-label="Notifications"
              onClick={() => {
                // If UserDropDown is open, close it first before opening NotificationDropdown
                if (showUserDropdown) {
                  setShowUserDropdown(false);
                  // Wait a bit before opening NotificationDropdown to ensure UserDropDown is closed
                  setTimeout(() => {
                    setShowNotificationDropdown(true);
                  }, 100);
                } else {
                  setShowNotificationDropdown(!showNotificationDropdown);
                }
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
              mockNotifications={adminMockNotifications}
            />
          </div>

          {/* User Avatar, Name, and Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="User menu"
            >
              {/* User Avatar */}
              <div className="w-10 h-10 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-brown-300 flex items-center justify-center">
                    <span className="text-headline-4 text-brown-600">
                      {user?.name ? user.name.charAt(0).toUpperCase() : null}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Name */}
              <span className="body-1-brown-600 font-medium">
                {user?.name || "Moodeng ja"}
              </span>
              
              {/* Chevron Down */}
              <ChevronDown className="w-5 h-5 text-brown-600 shrink-0" />
            </button>
            
            {/* Dropdown Menu */}
            {showUserDropdown && (
              <div className="absolute top-full right-0 mt-2 z-50">
                <UserDropDown
                  user={user}
                  onClose={handleCloseDropdown}
                  hideBell={true}
                  showAdminPanel={true}
                />
              </div>
            )}
          </div>
        </div>

        {/* Mobile: User Dropdown - Show when menu is open */}
        {isMenuOpen && showUserDropdown && (
          <div className="w-full py-4 border-t border-brown-300 lg:hidden">
            <UserDropDown
              user={user}
              onClose={handleCloseDropdown}
              hideBell={false}
              showAdminPanel={true}
              mockNotifications={adminMockNotifications}
            />
          </div>
        )}
      </div>
    </nav>
    </>
  );
}
