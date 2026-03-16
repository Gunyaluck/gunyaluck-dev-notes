import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../../lib/utils";
import { useAuth } from "../../contexts/authentication";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getMessageFromType(type) {
    switch (type) {
        case "like":
            return "liked your article.";
        case "comment":
            return "commented on your article.";
        case "reply":
        case "comment_reply":
            return "replied to your comment.";
        case "new_post_created":
        case "new_article":
            return "Published new article.";
        default:
            return "Published new article.";
    }
}

export function NotificationDropdown({ isOpen, onClose, onHasUnread }) {
    const { user, isAuthenticated } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isOpen || !isAuthenticated || !user) return;
        let cancelled = false;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        const token = localStorage.getItem("token");
        axios
            .get(`${API_BASE_URL}/notifications`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                if (cancelled) return;
                const list = Array.isArray(res.data) ? res.data : [];
                setNotifications(list);
                const hasUnread = list.some((n) => !n.is_read);
                if (onHasUnread) onHasUnread(hasUnread);
            })
            .catch(() => {
                if (!cancelled) setNotifications([]);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, [isOpen, isAuthenticated]);

    if (!isOpen) return null;

    const displayList = notifications
        .map((n) => ({
            id: n.id,
            author: n.actor_name ?? n.actorName ?? "Someone",
            authorAvatar: n.actor_avatar ?? n.actorAvatar ?? null,
            message: getMessageFromType(n.type),
            timestamp: n.created_at ?? n.timestamp,
            type: n.type,
            post_id: n.post_id,
            is_read: n.is_read,
        }))
        // เรียงตามเวลาใหม่สุดอยู่บนเสมอ ไม่ว่าจะเป็น like/comment/reply
        .sort((a, b) => {
            const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0;
            const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0;
            return tb - ta;
        });

    const formatNotificationTime = (timestamp) => {
        if (!timestamp) return "";
        const now = new Date();
        const notificationDate = new Date(timestamp);
        const diffInHours = (now - notificationDate) / (1000 * 60 * 60);
        if (diffInHours < 24) {
            const hours = Math.floor(diffInHours);
            if (hours === 0) {
                const minutes = Math.floor((now - notificationDate) / (1000 * 60));
                return minutes <= 0 ? "Just now" : `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
            }
            return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
        }
        return formatDateTime(timestamp);
    };

    const handleNotificationClick = async (item) => {
        if (!item.is_read) {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    await axios.patch(
                        `${API_BASE_URL}/notifications/mark-as-read/${item.id}`,
                        {},
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    setNotifications((prev) =>
                        prev.map((n) => (n.id === item.id ? { ...n, is_read: true } : n))
                    );
                    const stillUnread = notifications.some((n) => n.id !== item.id && !n.is_read);
                    if (onHasUnread) onHasUnread(stillUnread);
                } catch (err) {
                    console.error("Failed to mark notification as read:", err);
                }
            }
        }
        if (item.post_id) navigate(`/post/${item.post_id}`);
        onClose();
    };

    return (
        <>
            <div className="fixed inset-0 z-60" onClick={onClose} aria-hidden="true" />
            <div className="absolute top-full right-[-23px] mt-2 z-60 w-[343px] bg-white rounded-lg shadow-lg border border-brown-100 lg:right-0 max-h-[400px] overflow-y-auto">
                <div className="px-4 py-3 flex flex-col gap-4">
                    {loading ? (
                        <p className="body-2 text-brown-400">Loading...</p>
                    ) : displayList.length === 0 ? (
                        <p className="body-2 text-brown-400">No notifications yet.</p>
                    ) : (
                        displayList.map((notification) => (
                            <button
                                type="button"
                                key={notification.id}
                                onClick={() => handleNotificationClick(notification)}
                                className={`w-full flex items-start gap-3 text-left rounded-lg p-1 -m-1 transition-colors ${!notification.is_read ? "bg-brand-red/10 hover:bg-brand-red/20" : "hover:bg-brown-100"}`}
                            >
                                <div className="w-12 h-12 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0">
                                    {notification.authorAvatar ? (
                                        <img
                                            src={notification.authorAvatar}
                                            alt={notification.author}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="body-1-brown-600">
                                            {notification.author.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="body-1-brown-600">
                                        <span className="font-semibold">{notification.author}</span>{" "}
                                        <span className="body-1-brown-400">{notification.message}</span>
                                    </p>
                                    <p className="body-3 text-brand-orange mt-1">
                                        {formatNotificationTime(notification.timestamp)}
                                    </p>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
