/* NavBar - Unified header for guest, member, and admin */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ChevronDown } from "lucide-react";
import logo from "../../assets/logo/logo.svg";
import { Button } from "../common/Button";
import { UserDropDown } from "./UserDropDown";
import { NotificationDropdown } from "./NotificationDropdown";
import { useAuth } from "../../contexts/authentication";

function NavBar() {
  const { user, userRole, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const navigate = useNavigate();

  const isAdmin = userRole === "admin";
  const hasNotifications = true;

  const handleLandingPage = () => {
    navigate("/");
    setIsMenuOpen(false);
    setShowUserDropdown(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen && isAuthenticated) {
      setShowUserDropdown(true);
    } else {
      setShowUserDropdown(false);
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup");
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleCloseDropdown = () => {
    setShowUserDropdown(false);
    setIsMenuOpen(false);
  };

  const handleNotificationClick = () => {
    if (showUserDropdown) {
      setShowUserDropdown(false);
      setTimeout(() => {
        setShowNotificationDropdown(true);
      }, 100);
    } else {
      setShowNotificationDropdown(!showNotificationDropdown);
    }
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

      <nav
        className={`w-full bg-brown-100 border-b border-brown-300 lg:h-[80px] lg:flex lg:items-center ${
          isMenuOpen
            ? "fixed top-0 left-0 right-0 z-50 lg:relative lg:z-auto"
            : ""
        } ${isAuthenticated ? "lg:bg-white" : ""}`}
      >
        <div className="w-full bg-brown-100 rounded-lg px-6 flex flex-col lg:flex-row lg:items-center lg:justify-between lg:h-[80px] lg:px-30 lg:py-4 lg:bg-brown-100 lg:rounded-none">
          {/* Logo Section */}
          <div className="w-full h-[48px] flex items-center justify-between lg:w-auto lg:h-auto">
            <div className="w-[24px] h-[24px] flex items-center gap-1 lg:w-[44px] lg:h-[44px]">
              <img
                onClick={handleLandingPage}
                src={logo}
                alt="Logo"
                className="w-full h-full cursor-pointer"
              />
            </div>

            {/* Hamburger Menu */}
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

          {/* Guest: Login and Signup Buttons */}
          {!isAuthenticated && (
            <>
              {/* Mobile: login and signup Buttons - Show when menu is open */}
              {isMenuOpen && (
                <div className="w-full flex flex-col gap-4 py-4 border-t border-brown-300 lg:hidden">
                  <Button onClick={handleLoginClick} variant="outline" size="full">
                    Log in
                  </Button>
                  <Button onClick={handleSignUpClick} variant="secondary" size="full">
                    Sign up
                  </Button>
                </div>
              )}

              {/* Desktop: login and signup Buttons */}
              <div className="hidden lg:w-[290px] lg:h-[48px] lg:flex items-center gap-2">
                <Button
                  onClick={handleLoginClick}
                  variant="outline"
                  size="lg"
                  width="141"
                >
                  Log in
                </Button>
                <Button
                  onClick={handleSignUpClick}
                  variant="secondary"
                  size="lg"
                  width="141"
                >
                  Sign up
                </Button>
              </div>
            </>
          )}

          {/* Authenticated: User Section - Desktop - Right */}
          {isAuthenticated && (
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              {/* Notification Bell */}
              <div className="relative w-12 h-12 shrink-0">
                <Button
                  variant="icon"
                  size="icon-lg"
                  className="w-12 h-12 bg-white border border-brown-300 hover:bg-brown-100 shrink-0"
                  aria-label="Notifications"
                  onClick={handleNotificationClick}
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

              {/* User Avatar, Name, and Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                  aria-label="User menu"
                >
                  {/* User Avatar */}
                  <div className="w-10 h-10 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0">
                    {user?.profilePic || user?.avatar ? (
                      <img
                        src={user.profilePic || user.avatar}
                        alt={user?.username || user?.name || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-brown-300 flex items-center justify-center">
                        <span className="text-headline-4 text-brown-600">
                          {user?.name
                            ? user.name.charAt(0).toUpperCase()
                            : user?.email
                            ? user.email.charAt(0).toUpperCase()
                            : "U"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <span className="body-1-brown-600 font-medium">
                    {user?.name || user?.email || (isAdmin ? "Admin" : "User")}
                  </span>

                  {/* Chevron Down */}
                  <ChevronDown className="w-5 h-5 text-brown-600 shrink-0" />
                </button>

                {/* Dropdown Menu */}
                {showUserDropdown && (
                  <div className="absolute top-full right-0 mt-2 z-50">
                    <UserDropDown
                      user={isAdmin ? null : user}
                      admin={isAdmin ? user : null}
                      onClose={handleCloseDropdown}
                      onLogout={logout}
                      hideBell={true}
                      showAdminPanel={isAdmin}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile: User Dropdown - Show when menu is open */}
          {isAuthenticated && isMenuOpen && showUserDropdown && (
            <div className="w-full py-4 border-t border-brown-300 lg:hidden">
              <UserDropDown
                user={isAdmin ? null : user}
                admin={isAdmin ? user : null}
                onClose={handleCloseDropdown}
                onLogout={logout}
                hideBell={false}
                showAdminPanel={isAdmin}
              />
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
