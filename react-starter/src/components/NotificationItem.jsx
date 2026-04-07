import { useState } from "react";

function NotificationItem({ notification, onRemove }) {
    // This state controls if checkbox is checked or not 
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    // Show the tick immediately
    setChecked(true);

    // wait 500ms so user sees the tick
    // then remove the notification from the list
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
          checked={checked} // controlled by state
          onChange={handleCheck} // when clicked → run function
        />
        <span className="notification-title">{notification.title}</span>
      </div>
      <div className="notification-time">{notification.time}</div>
    </div>
  );
}

export default NotificationItem;