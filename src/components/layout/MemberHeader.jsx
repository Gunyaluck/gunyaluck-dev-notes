import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
import { UserDropDown } from "../member/UserDropDown";
import { Bell, ChevronDown } from "lucide-react";

export function MemberNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to load user data from localStorage
  const loadUserData = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        // Fallback to default user
        setUser({ name: "Moodeng ja", avatar: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=100&h=100&fit=crop" });
      }
    } else {
      // Default user data
      setUser({ name: "Moodeng ja", avatar: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=100&h=100&fit=crop" });
    }
  };

  // Get user data from localStorage
  useEffect(() => {
    loadUserData();
    
    // Listen for storage changes to update user data
    const handleStorageChange = (e) => {
      if (e.key === "user") {
        loadUserData();
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    // Also check periodically for changes (for same-tab updates)
    const interval = setInterval(() => {
      loadUserData();
    }, 100);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleLandingPage = () => {
    navigate("/");
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
    <nav className="w-full bg-brown-100 border-b border-brown-300 lg:h-[80px] lg:flex lg:items-center lg:bg-white lg:border-b lg:border-brown-300">
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
          <button
            onClick={toggleMenu}
            className="w-[18px] h-[12px] flex flex-col items-center justify-between cursor-pointer lg:hidden"
            aria-label="Open menu"
          >
            <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
            <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
            <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
          </button>
        </div>

        {/* User Section - Desktop - Right */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          {/* Notification Bell */}
          <div className="relative">
            <button
              className="w-10 h-10 rounded-full bg-white border border-brown-300 flex items-center justify-center hover:bg-brown-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-brown-600" />
              {/* Red notification dot */}
              <div className="absolute top-1 right-0 w-2 h-2 bg-brand-red rounded-full"></div>
            </button>
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
                    alt={user.username || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-brown-300 flex items-center justify-center">
                    <span className="text-headline-4 text-brown-600">
                      {user?.username ? user.username.charAt(0).toUpperCase() : null}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Username */}
              <span className="body-1-brown-600 font-medium">
                {user?.username}
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
            />
          </div>
        )}
      </div>
    </nav>
  );
}
