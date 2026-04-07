import { useState } from "react";

function NotificationForm({ onAddNotification }) {
    // Stores the text written by the admin 
  const [message, setMessage] = useState("");
  // Controls showing the success message popup
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    // Prevent sending empty notifications
    if (message.trim() === "") return;
    // Send the message to parent component (NotificationsPage)
    onAddNotification(message);
    // Clear the textarea after sending the notification
    setMessage("");
    // Show success message
    setShowSuccess(true);
    // Hide success message after 2 seconds
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
          value={message} // controlled input
          onChange={(e) => setMessage(e.target.value) // update state when typing

          }
        />

        <button className="publish-btn" onClick={handleSubmit}>
          Publish
        </button>
      </div>
    </div>
  );
}

export default NotificationForm;