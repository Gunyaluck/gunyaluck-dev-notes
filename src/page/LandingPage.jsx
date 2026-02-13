import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import NavBar from "../components/layout/Header";
import { HeroSection } from "../components/landing/HeroSection";
import { Footer } from "../components/layout/Footer";
import { ArticleGrid } from "../components/landing/ArticleGrid";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import logo from "../assets/logo/logo.svg";

export function LandingPage() {
  const { getUserLoading } = useAuth();
  const navigate = useNavigate();

  const renderHeader = () => {
    if (getUserLoading) {
      return (
        <nav className="w-full bg-brown-100 border-b border-brown-300 lg:h-[80px] lg:flex lg:items-center">
          <div className="w-full bg-brown-100 rounded-lg px-6 flex flex-row items-center justify-between h-[48px] lg:h-[80px] lg:px-30 lg:py-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-[24px] h-[24px] lg:w-[44px] lg:h-[44px]"
              aria-label="Home"
            >
              <img src={logo} alt="Logo" className="w-full h-full" />
            </button>
            <LoadingSpinner />
          </div>
        </nav>
      );
    }
    return <NavBar />;
  };

  return (
    <>
      {renderHeader()}
      <HeroSection />
      <ArticleGrid />
      <Footer />
    </>
  );
}