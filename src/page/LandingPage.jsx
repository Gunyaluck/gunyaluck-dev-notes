import NavBar from "../components/layout/Header";
import { HeroSection } from "../components/landing/HeroSection";
import { Footer } from "../components/layout/Footer";
import { ArticleSection } from "../components/landing/ArticleSection";
import { ArticleCard } from "../components/landing/ArticleCard";

export function LandingPage() {
    return (
        <>
            <NavBar />
            <HeroSection />
            <ArticleSection />
            <Footer />
        </>
    )
}