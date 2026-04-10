import { useState, useEffect } from "react";
import NotificationItem from "../components/NotificationItem";
import NotificationForm from "../components/NotificationForm";

function NotificationsPage({ role }) {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Your project was updated", createdAt: Date.now() },
    { id: 2, title: "New review added", createdAt: Date.now() - 60000 },
    { id: 3, title: "Editor accepted request", createdAt: Date.now() - 3600000 },
    { id: 4, title: "New community created", createdAt: Date.now() - 86400000 },
  ]);

  const [timeNow, setTimeNow] = useState(Date.now());

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

  const addNotification = (message) => {
    setNotifications([
      {
        id: Date.now(),
        title: message,
        createdAt: Date.now(),
      },
      ...notifications,
    ]);
  };

  return (
    <div className="notifications-wrapper">
      <h1 className="notifications-heading">previous notification</h1>

      <div className="notifications-list">
        {notifications.length === 0 && <p className="empty-notifications">No notifications</p>}

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
      </div>

      {role === "admin" && (
        <NotificationForm onAddNotification={addNotification} />
      )}
    </div>
  );
}

export default NotificationsPage;