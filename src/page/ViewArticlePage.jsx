import { useEffect } from "react";
import NavBar from "../components/layout/Header";
import { ArticleContent } from "../components/article/ArticleContent";
import { Footer } from "../components/layout/Footer";
import { useParams } from "react-router-dom";

export function ViewArticlePage() {
    const { postId } = useParams();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [postId]);
    
    return ( 
        <>  
        <NavBar />
        <ArticleContent id={postId} />
        <Footer />
        </>
    );
}