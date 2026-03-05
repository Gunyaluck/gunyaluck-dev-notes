import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../contexts/authentication";
import { LoadingSpinner } from "../../common/LoadingSpinner";

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

const formatNotificationTime = (timestamp) => {
  if (!timestamp) return "";
  const now = new Date();
  const notificationDate = new Date(timestamp);
  const diffInHours = (now - notificationDate) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    const hours = Math.floor(diffInHours);
    if (hours === 0) {
      const minutes = Math.floor((now - notificationDate) / (1000 * 60));
      return minutes <= 0 ? "Just now" : `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  const days = Math.floor(diffInHours / 24);
  return `${days} ${days === 1 ? 'day' : 'days'} ago`;
};

export function NotificationList() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    axios
      .get(`${API_BASE_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (cancelled) return;
        const list = Array.isArray(res.data) ? res.data : [];
        setNotifications(list);
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Failed to fetch notifications:", err);
          setError("Failed to load notifications");
          setNotifications([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [isAuthenticated, user]);

  const handleView = (notification) => {
    if (notification.post_id) {
      navigate(`/post/${notification.post_id}`);
    }
  };

  const displayList = notifications.map((n) => ({
    id: n.id,
    author: n.actor_name ?? n.actorName ?? "Someone",
    authorAvatar: n.actor_avatar ?? n.actorAvatar ?? null,
    message: getMessageFromType(n.type),
    timestamp: n.created_at ?? n.timestamp,
    type: n.type,
    post_id: n.post_id,
    comment_text: n.comment_text ?? n.commentText ?? null,
    is_read: n.is_read,
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="body-2 text-brown-400">{error}</p>
      </div>
    );
  }

  if (displayList.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="body-2 text-brown-400">No notifications yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0">
      {displayList.map((notification, index) => (
        <div
          key={notification.id}
          className={`flex items-start gap-4 px-6 py-6 border-b border-brown-200 hover:bg-brown-100 transition-colors duration-300 ${
            index === displayList.length - 1 ? 'border-b-0' : ''
          } ${!notification.is_read ? 'bg-brand-red/5' : ''}`}
        >
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-brown-300 flex items-center justify-center overflow-hidden shrink-0">
            {notification.authorAvatar ? (
              <img
                src={notification.authorAvatar}
                alt={notification.author}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-brown-300 flex items-center justify-center">
                <span className="body-1-brown-600">
                  {notification.author.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Notification Content */}
          <div className="flex-1 min-w-0">
            <p className="body-1-brown-600 mb-2">
              <span className="font-semibold">{notification.author}</span>{" "}
              <span className="body-1-brown-400">{notification.message}</span>
            </p>
            {/* Comment text (if exists) */}
            {notification.comment_text && (
              <p className="body-1-brown-400 mb-2 italic">
                "{notification.comment_text}"
              </p>
            )}

            {/* Timestamp */}
            <p className="body-3 text-brand-orange">
              {formatNotificationTime(notification.timestamp)}
            </p>
          </div>

          {/* View Button */}
          {notification.post_id && (
            <div className="flex items-start shrink-0">
              <button
                onClick={() => handleView(notification)}
                className="body-1-brown-600 hover:text-brand-green transition-colors duration-300 underline cursor-pointer"
              >
                View
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
