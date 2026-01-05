import NavBar from "../components/layout/Header";
import { HeroSection } from "../components/landing/HeroSection";
import { Footer } from "../components/layout/Footer";
import { ArticleGrid } from "../components/landing/ArticleGrid";

export function LandingPage() {
    return (
        <>
            <NavBar />
            <HeroSection />
            <ArticleGrid />
            <Footer />
        </>
    )
}