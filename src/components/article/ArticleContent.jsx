import { useState, useEffect } from "react";
import { formatDate, formatDateTime } from "../../lib/utils";
import Markdown from "react-markdown";
import { Smile } from "lucide-react";
import { AlertCreateAccount } from "../layout/AlertCreateAccount";
import { ShareButtons } from "./ShareButtons";
import { CommentForm } from "./CommentForm";
import { ArticleAuthorSidebar } from "./ArticleAuthorSidebar";


export function ArticleContent({ id }) {
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [reactionCount, setReactionCount] = useState(321);
    const [showAlertCreateAccount, setShowAlertCreateAccount] = useState(false);

    // Simulate: All users are not logged in
    const isLoggedIn = false;

    const fetchArticleContent = async () => {
        if (!id) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://blog-post-project-api.vercel.app/posts/${id}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch article: ${response.status}`);
            }

            const data = await response.json();
            setArticle(data);

            console.log(data);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching article:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchArticleContent();
    }, [id]);

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                    <svg className="animate-spin h-12 w-12 text-brand-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="body-1-brown-400">Loading article...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4 px-4">
                    <span className="text-headline-3 text-brand-red">Error</span>
                    <span className="body-1-brown-400 text-center">{error}</span>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4 px-4">
                    <span className="text-headline-3">Article not found</span>
                    <span className="body-1-brown-400 text-center">The article you're looking for doesn't exist.</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col lg:pt-15">
            {/* Article Image - Full width at top (outside container) */}
            {article.image && (
                <div className="w-full h-[184px] lg:w-[1200px] lg:h-[587px] lg:mx-auto overflow-hidden lg:rounded-2xl">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-start lg:w-[1200px] lg:mx-auto">
                    {/* Main Content - Left Side */}
                    <div className="w-full lg:flex-1 flex flex-col">
                        <div className="flex flex-col gap-6 pt-6 lg:pt-12">
                            {/* Category Tag and Date - Below image */}
                            <div className="flex items-center justify-start gap-4">
                                {article.category && (
                                    <span className="px-3 py-1 rounded-full bg-brand-green-soft body-2-green-600 font-medium">
                                        {article.category}
                                    </span>
                                )}
                                {article.date && (
                                    <span className="body-2">{formatDate(article.date)}</span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-headline-3">{article.title}</h1>

                            {/* Introduction/Description */}
                            {article.description && (
                                <p className="body-1-brown-600 leading-relaxed">
                                    {article.description}
                                </p>
                            )}

                            {/* Article Content */}
                            {article.content && (
                                <div className="markdown body-1-brown-600 whitespace-pre-wrap leading-relaxed">
                                    <Markdown>{article.content}</Markdown>
                                </div>
                            )}

                            {/* Author Information Block - Mobile Only */}
                            <div className="flex flex-col gap-4 mb-10 lg:hidden">
                                <div className="bg-brown-200 rounded-lg p-6 flex flex-col gap-4">
                                    <div className="flex items-start gap-4 border-b border-brown-300 pb-4">
                                        {article.authorAvatar ? (
                                            <img
                                                src={article.authorAvatar}
                                                alt={article.author || "Author"}
                                                className="w-11 h-11 rounded-full object-cover shrink-0"
                                            />
                                        ) : (
                                            <div className="w-11 h-11 rounded-full bg-brand-orange flex items-center justify-center shrink-0">
                                                <span className="text-headline-4 text-white">
                                                    {article.author ? article.author.charAt(0).toUpperCase() : "A"}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex flex-col flex-1">
                                            <span className="body-3 text-brown-400">Author</span>
                                            <h3 className="text-headline-4 font-semibold">{article.author || "Unknown Author"}</h3>
                                        </div>
                                    </div>
                                    <p className="body-1-brown-400">
                                        {article.authorBio || (
                                            <>
                                                I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.
                                                <br />
                                                <br />
                                                When I'm not writing, I spend time volunteering at my local animal shelter, helping cats find loving homes.
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Interaction Section */}
                        <div className="bg-brown-200 p-4 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-3 mt-6 lg:rounded-lg">
                            {/* Reaction Bar - Click to like */}
                            <button
                                onClick={() => {
                                    if (!isLoggedIn) {
                                        setShowAlertCreateAccount(true);
                                    } else {
                                        // Handle reaction when logged in
                                        setReactionCount(prev => prev + 1);
                                    }
                                }}
                                className="w-full lg:w- h-[48px] bg-white border border-brown-400 rounded-full px-4 py-2 flex items-center gap-2 justify-center hover:bg-brown-300 transition-colors cursor-pointer lg:w-[135px]"
                                aria-label="Like this article"
                            >
                                <Smile className="w-6 h-6 text-brown-600" />
                                <span className="body-1-brown-600">{reactionCount}</span>
                            </button>

                            {/* Share Buttons */}
                            <ShareButtons url={window.location.href} />
                        </div>

                        {/* Comment Input Section */}
                        <div className="my-8">
                            <h2 className="body-1-brown-500 mb-4">Comment</h2>
                            <CommentForm
                                id={id}
                                isLoggedIn={isLoggedIn}
                                onCommentAdded={(newComment) => setComments([...comments, newComment])}
                            />

                            {/* Comments Display Section */}
                            <div className="mt-8 mb-8 flex flex-col gap-6">
                                {comments.length > 0 ? (
                                    comments.map((commentItem) => (
                                        <div key={commentItem.id} className="flex gap-4">
                                            {commentItem.authorAvatar ? (
                                                <img
                                                    src={commentItem.authorAvatar}
                                                    alt={commentItem.author}
                                                    className="w-10 h-10 rounded-full object-cover shrink-0"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-brown-300 flex items-center justify-center shrink-0">
                                                    <span className="body-3">
                                                        {commentItem.author ? commentItem.author.charAt(0).toUpperCase() : "U"}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex flex-col gap-1 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-headline-4 font-semibold">{commentItem.author}</span>
                                                    <span className="body-2 text-brown-400">
                                                        {formatDateTime(commentItem.date)}
                                                    </span>
                                                </div>
                                                <p className="body-1-brown-600">{commentItem.content}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="body-2 text-brown-400">No comments yet. Be the first to comment!</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Right Side (Desktop Only) */}
                    <ArticleAuthorSidebar article={article} />
                </div>
            </div>

            {/* Alert Modal */}
            <AlertCreateAccount
                isOpen={showAlertCreateAccount}
                onClose={() => setShowAlertCreateAccount(false)}
            />
        </div>
    );
}
