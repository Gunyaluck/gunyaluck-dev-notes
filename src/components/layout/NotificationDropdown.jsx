import { formatDateTime } from "../../lib/utils";

// Mock notification data
const mockNotifications = [
    {
        id: 1,
        author: "Thompson P.",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        message: "Published new article.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        type: "article"
    },
    {
        id: 2,
        author: "Jacob Lash",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        message: "Comment on the article you have commented on.",
        timestamp: "2024-09-12T18:30:00Z", // 12 September 2024 at 18:30
        type: "comment"
    }
];

export function NotificationDropdown({ isOpen, onClose, mockNotifications: customNotifications }) {
    if (!isOpen) return null;

    // Use custom mock notifications if provided, otherwise use default
    const notifications = customNotifications || mockNotifications;

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
        
        return formatDateTime(timestamp);
    };

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 z-60"
                onClick={onClose}
            />
            
            {/* Dropdown */}
            <div className="absolute top-full right-[-23px] mt-2 z-60 w-[343px] bg-white rounded-lg shadow-lg border border-brown-100 lg:right-0 max-h-[400px] overflow-y-auto">
                <div className="px-4 py-3 flex flex-col gap-4">
                    {notifications.map((notification, index) => (
                        <div 
                            key={notification.id} 
                            className={`flex items-start gap-3`}
                        >
                            {/* Profile Picture */}
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
                                <p className="body-1-brown-600">
                                    <span className="font-semibold">{notification.author}</span> <span className="body-1-brown-400">{notification.message}</span>
                                </p>
                                <p className="body-3 text-brand-orange mt-1">
                                    {formatNotificationTime(notification.timestamp)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
