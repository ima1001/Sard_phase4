import MessageCard from "../MessageCard"; 
import { useEffect, useState } from "react";
import notificationsData from "../../../data/projectNotifications.json";

function ProjectNotification() {
    const [notifications, setNotifications] = useState(notificationsData);
    const [pendingConfirmation, setPendingConfirmation] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (!toast) return;
        const timer = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(timer);
    }, [toast]);

    const requestConfirmation = (id, action) => {
        setPendingConfirmation({ id, action });
    };

    const handleConfirm = () => {
        if (!pendingConfirmation) return;

        const { id, action } = pendingConfirmation;
        setNotifications(notifications.filter((n) => n.id !== id));
        setToast({
            type: "success",
            text: action === "accept" ? "Request accepted successfully" : "Request rejected",
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
                {notifications.map((notification) => (
                    <div key={notification.id} className="notification-project_card">
                        <p>{notification.message}</p>
                        <div className="buttons">
                            <button onClick={() => requestConfirmation(notification.id, "accept")}>Accept</button>
                            <button onClick={() => requestConfirmation(notification.id, "reject")}>Reject</button>
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
                            <button className="confirm-yes" onClick={handleConfirm}>Yes</button>
                            <button className="confirm-no" onClick={handleCancel}>No</button>
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