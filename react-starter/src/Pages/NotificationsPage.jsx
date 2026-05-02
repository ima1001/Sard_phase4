import { useState, useEffect } from "react";
import NotificationItem from "../components/NotificationItem";
import NotificationForm from "../components/NotificationForm";

function NotificationsPage({ role }) {
  const [notifications, setNotifications] = useState([]);
  const [timeNow, setTimeNow] = useState(Date.now());

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/notifications/general`)
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.log(err));
  }, []);

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

  const removeNotification = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URI}/api/notifications/${id}/read`, {
      method: "PATCH",
    });

    setNotifications(notifications.filter((item) => item._id !== id));
  };

  const addNotification = async (message) => {
    const res = await fetch(`${import.meta.env.VITE_API_URI}/api/notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: message,
        message: message,
        type: "general",
      }),
    });

    const newNotification = await res.json();
    setNotifications([newNotification, ...notifications]);
  };

  return (
    <div className="notifications-page">
      <div className="notifications-top">
        <h1 className="notifications-title">
          {role === "admin" ? "previous notification" : "Notification"}
        </h1>
      </div>

      <div className="notifications-bottom">
        <div className="notifications-list">
          {notifications.length === 0 && (
            <p className="empty-notifications">No notifications</p>
          )}

          {notifications.map((item) => (
            <NotificationItem
              key={item._id}
              notification={{
                ...item,
                time: getTimeAgo(new Date(item.createdAt).getTime()),
              }}
              onRemove={removeNotification}
            />
          ))}
        </div>

        {role === "admin" && (
          <NotificationForm onAddNotification={addNotification} />
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;