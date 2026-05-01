import MessageCard from "../MessageCard";
import { useEffect, useState } from "react";

function ProjectNotification({ projectId }) {
  const [notifications, setNotifications] = useState([]);
  const [pendingConfirmation, setPendingConfirmation] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/notifications/project/${projectId}`)
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.log(err));
  }, [projectId]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  const requestConfirmation = (id, action) => {
    setPendingConfirmation({ id, action });
  };

  const handleConfirm = async () => {
    if (!pendingConfirmation) return;

    const { id, action } = pendingConfirmation;

    await fetch(`http://localhost:5000/api/notifications/${id}/respond`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action }),
    });

    setNotifications(notifications.filter((n) => n._id !== id));

    setToast({
      type: "success",
      text:
        action === "accept"
          ? "Request accepted successfully"
          : "Request rejected",
    });

    setPendingConfirmation(null);
  };

  const handleCancel = () => {
    setPendingConfirmation(null);
  };

  return (
    <div className="project-notifications">
      <div>
        <h1>Project Notifications</h1>
      </div>

      <div className="project-notification-content">
        {notifications.length === 0 && <p>No project notifications</p>}

        {notifications.map((notification) => (
          <div key={notification._id} className="notification-project_card">
            <p>{notification.message}</p>

            <div className="buttons">
              <button
                onClick={() => requestConfirmation(notification._id, "accept")}
              >
                Accept
              </button>

              <button
                onClick={() => requestConfirmation(notification._id, "reject")}
              >
                Reject
              </button>
            </div>
          </div>
        ))}

        {pendingConfirmation && (
          <div className="notification-confirm-card">
            <p>
              {pendingConfirmation.action === "accept"
                ? "Are you sure you want to accept this request?"
                : "Are you sure you want to reject this request?"}
            </p>

            <div className="confirm-buttons">
              <button className="confirm-yes" onClick={handleConfirm}>
                Yes
              </button>
              <button className="confirm-no" onClick={handleCancel}>
                No
              </button>
            </div>
          </div>
        )}
      </div>

      {toast && (
        <div className="notification-toast">
          <MessageCard type={toast.type} text={toast.text} />
        </div>
      )}
    </div>
  );
}

export default ProjectNotification;