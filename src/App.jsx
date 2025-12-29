import "./App.css";
import { NavBar, HeroSection, Footer } from "./components/landing-page/NavBar-HeroSection-Footer";
import ArticleSection from "./components/landing-page/ArticleSection";

function App() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </>
  );
}

export default App;
