import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { AlertCreateAccount } from "../layout/AlertCreateAccount";
import { Button } from "../common/Button";
import { useAuth } from "../../contexts/authentication";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function CommentForm({ id, isLoggedIn, parentId, onCommentAdded }) {
    const { user } = useAuth();
    const [commentText, setCommentText] = useState("");
    const [showAlertCreateAccount, setShowAlertCreateAccount] = useState(false);
    const [sending, setSending] = useState(false);

    const handleSendComment = async () => {
        if (!isLoggedIn) {
            setShowAlertCreateAccount(true);
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Authentication required. Please login again.");
            return;
        }

        const text = commentText.trim();
        if (!text) {
            toast.error("Please write your comment");
            return;
        }

        const userId = user?.id ?? user?.user_id;
        if (!userId) {
            toast.error("User information not found. Please login again.");
            return;
        }

        setSending(true);
        try {
            const body = {
                post_id: Number(id),
                user_id: userId,
                comment_text: text,
                parent_id: parentId != null ? Number(parentId) : null,
                title: "Comment",
            };

            const response = await axios.post(
                `${API_BASE_URL}/posts/${id}/comments`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const created = response.data;
            toast.success("Comment posted", {
                description: "Your comment has been added.",
                duration: 5000,
            });

            setCommentText("");
            if (onCommentAdded && created) {
                onCommentAdded({
                    id: created.id,
                    author: user?.name || user?.username || "You",
                    authorAvatar: user?.profilePic || user?.avatar || null,
                    date: created.created_at || new Date().toISOString(),
                    content: created.comment_text || text,
                });
            }
        } catch (error) {
            console.error("Error saving comment:", error);
            console.error("Error response:", error.response?.data);
            if (error.response?.status === 401) {
                toast.error("Authentication required. Please login again.");
                localStorage.removeItem("token");
                setTimeout(() => window.location.href = "/login", 2000);
            } else {
                toast.error(
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Failed to post comment"
                );
            }
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-4">
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="What are your thoughts?"
                    className="w-full min-h-[120px] p-4 bg-brown-300 rounded-lg border-none resize-none body-1-brown-600 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
                <div className="flex justify-start lg:justify-end">
                    <Button
                        onClick={handleSendComment}
                        disabled={sending}
                        variant="primary"
                        size="lg"
                        width="121"
                    >
                        {sending ? "Sending..." : "Send"}
                    </Button>
                </div>
            </div>

            <AlertCreateAccount
                isOpen={showAlertCreateAccount}
                onClose={() => setShowAlertCreateAccount(false)}
            />
        </>
    );
}