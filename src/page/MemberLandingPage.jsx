import { MemberNavBar } from "../components/layout/MemberHeader";
import { HeroSection } from "../components/landing/HeroSection";
import { Footer } from "../components/layout/Footer";
import { ArticleGrid } from "../components/landing/ArticleGrid";

export function MemberLandingPage() {
    return (
        <>
            <MemberNavBar />
            <HeroSection />
            <ArticleGrid />
            <Footer />
        </>
    )
}