import { useState, useEffect, useMemo } from "react";
import { formatDate, formatDateTime } from "../../lib/utils";
import Markdown from "react-markdown";
import { Smile } from "lucide-react";
import { AlertCreateAccount } from "../layout/AlertCreateAccount";
import { ShareButtons } from "./ShareButtons";
import { CommentForm } from "./CommentForm";
import { ArticleAuthorSidebar } from "./ArticleAuthorSidebar";
import { LoadingSpinner } from "../common/LoadingSpinner";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../../contexts/authentication";
import { API_BASE_URL } from "@/config/env";

export function ArticleContent({ id }) {
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [reactionCount, setReactionCount] = useState(0);
    const [userHasLiked, setUserHasLiked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);
    const [showAlertCreateAccount, setShowAlertCreateAccount] = useState(false);
    const [openReplyBox, setOpenReplyBox] = useState(null);
    const { isAuthenticated, user } = useAuth();
    const isLoggedIn = isAuthenticated;
    
    const fetchArticleContent = async () => {
        if (!id) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
            const data = response.data;
            setArticle({
                ...data,
                author: data.author ?? data.author_name ?? data.authorName,
                authorAvatar: data.authorAvatar ?? data.author_avatar ?? data.author_profile_pic ?? data.profile_pic,
                authorBio: data.authorBio ?? data.author_bio ?? data.bio,
            });
            const embedded = data.comments ?? data.comments_list;
            if (Array.isArray(embedded) && embedded.length > 0) {
                const mapped = embedded.map(mapComment);
                mapped.sort((a, b) => new Date(b.date) - new Date(a.date));
                setComments(mapped);
                setCommentsLoading(false);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const mapComment = (c) => ({
        id: c.id,
        parent_id:
            c.parent_id ??
            c.parentId ??
            c.parent_comment_id ??
            c.parentCommentId ??
            null,
        author: c.name ?? c.author_name ?? c.authorName ?? c.user_name ?? c.userName ?? c.author ?? "User",
        authorAvatar: c.profile_pic ?? c.author_avatar ?? c.authorAvatar ?? c.user_avatar ?? c.userAvatar ?? c.profilePic ?? null,
        date: c.created_at ?? c.date ?? new Date().toISOString(),
        content: c.comment_text ?? c.commentText ?? c.content ?? "",
    });

    const buildTree = (comments) => {
        if (!Array.isArray(comments) || comments.length === 0) return [];
        const map = {};
        const roots = [];
        comments.forEach((c) => {
            map[c.id] = { ...c, replies: [] };
        });
        comments.forEach((c) => {
            if (c.parent_id) {
                if (map[c.parent_id]) map[c.parent_id].replies.push(map[c.id]);
                else roots.push(map[c.id]);
            } else {
                roots.push(map[c.id]);
            }
        });
        roots.sort((a, b) => new Date(b.date) - new Date(a.date));
        roots.forEach((r) => {
            r.replies.sort((a, b) => new Date(a.date) - new Date(b.date));
        });
        return roots;
    };

    const commentTree = useMemo(() => buildTree(comments), [comments]);

    const fetchComments = async () => {
        if (!id) return;

        setCommentsLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/posts/${id}/comments`);
            const raw = response.data;
            const list = Array.isArray(raw)
                ? raw
                : raw?.comments ?? raw?.data ?? [];
            if (!Array.isArray(list)) {
                setComments([]);
                return;
            }
            const mapped = list.map(mapComment);
            mapped.sort((a, b) => new Date(b.date) - new Date(a.date));
            setComments(mapped);
        } catch (err) {
            console.error("Error fetching comments:", err);
        } finally {
            setCommentsLoading(false);
        }
    };

    const fetchLikes = async () => {
        if (!id) return;
        try {
            const token = localStorage.getItem("token");
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await axios.get(`${API_BASE_URL}/posts/${id}/likes`, { headers });
            const data = response.data;
            const hasLiked = data.user_has_liked ?? data.userHasLiked ?? false;
            setUserHasLiked(Boolean(hasLiked));
            const count = typeof data === "number"
                ? data
                : Array.isArray(data)
                    ? data.length
                    : data?.count ?? data?.likes_count ?? data?.likesCount ?? data?.like_count;
            if (count != null && !Number.isNaN(Number(count))) {
                setReactionCount(Number(count));
            }
        } catch (err) {
            console.error("Error fetching likes:", err);
        }
    };

    const handleLikeClick = async () => {
        if (!isLoggedIn) {
            setShowAlertCreateAccount(true);
            return;
        }
        const userId = user?.id ?? user?.user_id;
        if (!userId) {
            toast.error("User information not found. Please log in again.");
            return;
        }

        setLikeLoading(true);
        try {
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            };
            const body = { user_id: userId };
            if (userHasLiked) {
                await axios.delete(`${API_BASE_URL}/posts/${id}/likes`, {
                    headers,
                    data: body,
                });
            } else {
                await axios.post(
                    `${API_BASE_URL}/posts/${id}/likes`,
                    body,
                    { headers }
                );
            }
            await fetchLikes();
        } catch (err) {
            if (err.response?.status === 409) {
                await fetchLikes();
                return;
            }
            const msg = err.response?.data?.message ?? err.response?.data?.error ?? err.message;
            console.error("Error toggling like:", err.response?.data ?? err);
            toast.error(msg || "Failed to update like");
        } finally {
            setLikeLoading(false);
        }
    };

    useEffect(() => {
        fetchArticleContent();
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchComments();
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchLikes();
        }
    }, [id]);

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center py-20">
                <LoadingSpinner />
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
                    <div className="w-full min-w-0 lg:flex-1 flex flex-col">
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
                                <div className="markdown body-1-brown-600 min-w-0 max-w-full whitespace-pre-wrap leading-relaxed">
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
                                    {article.authorBio ? (
                                        <p className="body-1-brown-400">{article.authorBio}</p>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* Interaction Section */}
                        <div className="bg-brown-200 p-4 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-3 mt-6 lg:rounded-lg">
                            {/* Reaction Bar - Like / Unlike */}
                            <button
                                type="button"
                                onClick={handleLikeClick}
                                disabled={likeLoading}
                                className={`w-full h-[48px] bg-white border border-brown-400 rounded-full px-4 py-2 flex items-center gap-2 justify-center hover:bg-brown-300 transition-colors cursor-pointer lg:w-[135px] disabled:opacity-60 disabled:cursor-not-allowed ${userHasLiked ? "border-amber-400 bg-amber-200 hover:bg-amber-300" : ""}`}
                                aria-label={userHasLiked ? "Unlike this article" : "Like this article"}
                            >
                                <Smile className={`w-6 h-6 ${userHasLiked ? "text-amber-600" : "text-brown-600"}`} />
                                <span className="body-1-brown-600">{reactionCount ?? 0}</span>
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
                                onCommentAdded={fetchComments}
                            />

                            {/* Comments Display Section */}
                            <div className="mt-8 flex flex-col">
                                {commentsLoading ? (
                                    <div className="flex justify-center py-6">
                                        <LoadingSpinner />
                                    </div>
                                ) : commentTree.length > 0 ? (
                                    commentTree.map((commentItem, index) => {
                                        const renderComment = (comment, depth) => (
                                            <div key={comment.id} className={depth > 0 ? "mt-4 ml-6 lg:ml-10 pl-4 border-l-2 border-brown-300 flex flex-col gap-3" : "flex flex-col gap-3 lg:gap-6"}>
                                                <div className="flex gap-4 items-center">
                                                    {comment.authorAvatar ? (
                                                        <img
                                                            src={comment.authorAvatar}
                                                            alt={comment.author}
                                                            className="w-11 h-11 rounded-full object-cover shrink-0"
                                                        />
                                                    ) : (
                                                        <div className="w-11 h-11 rounded-full bg-brown-300 flex items-center justify-center shrink-0">
                                                            <span className="body-3">
                                                                {comment.author ? comment.author.charAt(0).toUpperCase() : "U"}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-headline-4 font-semibold">{comment.author}</span>
                                                        <span className="body-2 text-brown-400">{formatDateTime(comment.date)}</span>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="body-1-brown-600">{comment.content}</p>
                                                </div>
                                                <div>
                                                    <button
                                                        type="button"
                                                        className="text-brand-orange hover:underline body-2 font-medium cursor-pointer"
                                                        onClick={() => setOpenReplyBox(openReplyBox === comment.id ? null : comment.id)}
                                                    >
                                                        Reply
                                                    </button>
                                                </div>
                                                {openReplyBox === comment.id && (
                                                    <div className="mt-2">
                                                        <CommentForm
                                                            id={id}
                                                            isLoggedIn={isLoggedIn}
                                                            parentId={comment.id}
                                                            onCommentAdded={() => { fetchComments(); setOpenReplyBox(null); }}
                                                        />
                                                    </div>
                                                )}
                                                {comment.replies?.length > 0 && (
                                                    <div className="flex flex-col">
                                                        {comment.replies.map((reply) => renderComment(reply, depth + 1))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                        return (
                                            <div key={commentItem.id} className={index < commentTree.length - 1 ? "border-b border-brown-300 mb-6 pb-6" : "pb-2"}>
                                                {renderComment(commentItem, 0)}
                                            </div>
                                        );
                                    })
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
