import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AdminHeader } from "../../components/admin/AdminHeader";
import { HeroSection } from "../../components/landing/HeroSection";
import { Footer } from "../../components/layout/Footer";
import { ArticleGrid } from "../../components/landing/ArticleGrid";

export function AdminLandingPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Check login status from localStorage
        const checkLoginStatus = () => {
            const loginStatus = localStorage.getItem("isLoggedIn");
            setIsLoggedIn(loginStatus === "true");
        };

        // Initial check
        checkLoginStatus();

        // Listen for storage changes
        const handleStorageChange = (e) => {
            if (e.key === "isLoggedIn" || e.key === "user") {
                checkLoginStatus();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        // Also check periodically for same-tab updates
        const interval = setInterval(checkLoginStatus, 100);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            clearInterval(interval);
        };
    }, [location.pathname]); // Re-check when route changes

    return (
        <>
            <AdminHeader />
            <HeroSection />
            <ArticleGrid />
            <Footer />
        </>
    );
}