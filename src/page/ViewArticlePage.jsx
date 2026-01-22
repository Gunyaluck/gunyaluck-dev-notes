import { useEffect, useState } from "react";
import NavBar from "../components/layout/Header";
import { ArticleContent } from "../components/article/ArticleContent";
import { Footer } from "../components/layout/Footer";
import { useParams } from "react-router-dom";
import { MemberNavBar } from "../components/member/MemberHeader";
import { AdminHeader } from "../components/admin/AdminHeader";

export function ViewArticlePage() {
    const { postId } = useParams();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkLoginStatus = () => {
            const loginStatus = localStorage.getItem("isLoggedIn");
            setIsLoggedIn(loginStatus === "true");
            const adminStatus = localStorage.getItem("isAdmin");
            setIsAdmin(adminStatus === "true");
        };

        // Initial check
        checkLoginStatus();

        // Listen for storage changes
        const handleStorageChange = (e) => {
            if (e.key === "isLoggedIn" || e.key === "isAdmin" || e.key === "user") {
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
    }, [postId]); // Re-check when route changes
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [postId]);
    
    return ( 
        <>  
        {isAdmin ? <AdminHeader /> : isLoggedIn ? <MemberNavBar /> : <NavBar />}
        <ArticleContent id={postId} />
        <Footer />
        </>
    );
}