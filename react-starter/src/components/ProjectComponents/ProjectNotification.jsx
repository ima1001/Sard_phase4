import MessageCard from "../MessageCard"; 
import { useState } from "react";

function ProjectNotification() {
    const [notifications, setNotifications] = useState([
        { id: 1, message: "Author request to join the project" },
        { id: 2, message: "Reviewer request to join the project" },
        { id: 3, message: "Editor request to join the project" }
    ]);

    const [message, setMessage] = useState(null);

    const handleAccept = (id) => {
    const confirmed = window.confirm("Are you sure you want to ACCEPT this request?");
    if (confirmed) {
        setNotifications(notifications.filter(n => n.id !== id));
        setMessage({ type: "info", text: "Request accepted successfully" });
    }
};

const handleReject = (id) => {
    const confirmed = window.confirm("Are you sure you want to REJECT this request?");
    if (confirmed) {
        setNotifications(notifications.filter(n => n.id !== id));
        setMessage({ type: "info", text: "Request rejected" });
    }
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
                            <button onClick={() => handleAccept(notification.id)}>Accept</button>
                            <button onClick={() => handleReject(notification.id)}>Reject</button>
                        </div>
                    </div>
                ))}
            </div>
            {message && <MessageCard type={message.type} text={message.text} />}
        </div>
    );
}

export default ProjectNotification;