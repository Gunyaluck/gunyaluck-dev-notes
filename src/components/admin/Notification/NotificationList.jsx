import { useNavigate } from "react-router-dom";

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    author: "Jacob Lash",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    message: "Commented on your article: The Fascinating World of Cats: Why We Love Our Furry Friends",
    comment: "I loved this article! It really explains why my cat is so independent yet loving. The purring section was super Interesting.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    type: "comment",
    articleId: 1,
  },
  {
    id: 2,
    author: "Jacob Lash",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    message: "liked your article: The Fascinating World of Cats: Why We Love Our Furry Friends",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    type: "like",
    articleId: 1,
  },
];

const formatNotificationTime = (timestamp) => {
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

  const handleView = (notification) => {
    if (notification.articleId) {
      navigate(`/post/${notification.articleId}`);
    }
  };

  return (
    <div className="flex flex-col gap-0">
      {mockNotifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`flex items-start gap-4 px-6 py-6 border-b border-brown-200 hover:bg-brown-100 transition-colors duration-300 ${
            index === mockNotifications.length - 1 ? 'border-b-0' : ''
          }`}
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
            
            {/* Comment (if exists) */}
            {notification.comment && (
              <p className="body-1-brown-400 mb-2 italic">
                "{notification.comment}"
              </p>
            )}
            
            {/* Timestamp */}
            <p className="body-3 text-brand-orange">
              {formatNotificationTime(notification.timestamp)}
            </p>
          </div>

          {/* View Button */}
          <div className="flex items-start shrink-0">
            <button
              onClick={() => handleView(notification)}
              className="body-1-brown-600 hover:text-brand-green transition-colors duration-300 underline cursor-pointer"
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
