/* NavBar*/
import logo from "../../assets/logo/logo.svg";

function NavBar() {
  return (
    <nav className="w-full h-[48px] bg-brown-100 border-b border-brown-300 flex items-center justify-between lg:h-[80px] lg:flex lg:items-center">
      <div className="w-full bg-brown-100 rounded-lg px-6 flex items-center justify-between lg:h-[80px] lg:px-30 lg:py-4">
        {/* Logo Section */}
        <div className="w-[24px] h-[24px] flex items-center gap-1 lg:w-[44px] lg:h-[44px]">
          <img src={logo} alt="Logo" className="w-full h-full" />
        </div>

        {/* Hamburger Menu */}
        <button
          className="w-[18px] h-[12px] flex flex-col items-center justify-between cursor-pointer lg:hidden"
          aria-label="Open menu"
        >
          <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
          <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
          <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
        </button>

        {/* login and signup Buttons */}
        <div className="hidden lg:w-[276px] lg:h-[48px] lg:flex items-center gap-2">
          <button className="w-[127px] h-[48px] px-6 py-3 border border-brown-400 rounded-[999px] body-1-brown-600 hover:bg-brown-600 transition-colors hover:text-white cursor-pointer">
            Log in
          </button>
          <button className="w-[141px] h-[48px] px-10 py-3 bg-brown-600 rounded-[999px] body-1-white hover:bg-brown-200 transition-colors hover:text-brown-600 cursor-pointer">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;