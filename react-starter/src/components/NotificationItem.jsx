import { useState } from "react";

function NotificationItem({ notification, onRemove }) {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(true);

    // wait 500ms so user sees the tick
    setTimeout(() => {
      onRemove(notification.id);
    }, 500);
  };

  return (
    <div className="notification-card">
      <div className="notification-left">
        <input
          type="checkbox"
          className="notification-checkbox"
          checked={checked}
          onChange={handleCheck}
        />
        <span className="notification-title">{notification.title}</span>
      </div>
      <div className="notification-time">{notification.time}</div>
    </div>
  );
}

export default NotificationItem;