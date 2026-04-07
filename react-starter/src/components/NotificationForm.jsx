import { useState } from "react";

function NotificationForm({ onAddNotification }) {
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (message.trim() === "") return;

    onAddNotification(message);
    setMessage("");
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="notification-form-wrapper">
      {showSuccess && (
        <div className="success-box">
          <span>Successfully Send</span>
        </div>
      )}

      <div className="notification-form-card">
        <h2>send notification to users</h2>

        <textarea
          className="notification-textarea"
          placeholder="notify users"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="publish-btn" onClick={handleSubmit}>
          Publish
        </button>
      </div>
    </div>
  );
}

export default NotificationForm;