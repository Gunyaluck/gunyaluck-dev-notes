import { useState } from "react";
import { AlertCreateAccount } from "../layout/AlertCreateAccount";
import { Button } from "../common/Button";

export function CommentForm({ id, isLoggedIn, onCommentAdded }) {
    const [comment, setComment] = useState("");
    const [showAlertCreateAccount, setShowAlertCreateAccount] = useState(false);

    return (
        <>
            <div className="flex flex-col gap-4">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="What are your thoughts?"
                    className="w-full min-h-[120px] p-4 bg-brown-300 rounded-lg border-none resize-none body-1-brown-600 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
                <div className="flex justify-start lg:justify-end">
                    <Button
                        onClick={async () => {
                            if (!isLoggedIn) {
                                setShowAlertCreateAccount(true);
                                return;
                            }

                            if (comment.trim()) {
                                const newComment = {
                                    id: Date.now(),
                                    author: "You",
                                    authorAvatar: null,
                                    date: new Date().toISOString(),
                                    content: comment.trim()
                                };

                                // Try to post comment to API
                                try {
                                    const response = await fetch(`https://blog-post-project-api.vercel.app/posts/${id}/comments`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ content: comment.trim() })
                                    });

                                    if (response.ok) {
                                        const data = await response.json();
                                        onCommentAdded(data.comment || newComment);
                                    } else {
                                        // If API fails, add locally
                                        onCommentAdded(newComment);
                                    }
                                } catch (err) {
                                    // If API not available, add locally
                                    onCommentAdded(newComment);
                                }

                                setComment("");
                            }
                        }}
                        variant="primary"
                        size="lg"
                        width="121"
                    >
                        Send
                    </Button>
                </div>
            </div>

            {/* Alert Modal */}
            <AlertCreateAccount
                isOpen={showAlertCreateAccount}
                onClose={() => setShowAlertCreateAccount(false)}
            />
        </>
    );
}