import { useState, useEffect } from "react";
import NotificationItem from "../components/NotificationItem";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Your project was updated", createdAt: Date.now() },
    { id: 2, title: "New review added", createdAt: Date.now() - 60000 },
    { id: 3, title: "Editor accepted request", createdAt: Date.now() - 3600000 },
    { id: 4, title: "New community created", createdAt: Date.now() - 86400000 },
  ]);

  const [timeNow, setTimeNow] = useState(Date.now());

  //  update time every 30 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeNow(Date.now());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (createdAt) => {
    const diff = Math.floor((timeNow - createdAt) / 1000);

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;

    return `${Math.floor(diff / 604800)} weeks ago`;
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter((item) => item.id !== id));
  };

  return (
    <div className="home">
      <div className="home-top">
        <h1>Notifications</h1>
      </div>

      <div className="notification-page">
        {notifications.map((item) => (
          <NotificationItem
            key={item.id}
            notification={{
              ...item,
              time: getTimeAgo(item.createdAt),
            }}
            onRemove={removeNotification}
          />
        ))}

        {notifications.length === 0 && <p>No notifications</p>}
      </div>
    </div>
  );
}

export default NotificationsPage;