function ProjectNotification() {
    const notifications =[
        { id: 1, message: "Author request to join the project"},
        { id: 2, message: "Reviewer request to join the project"},
        { id: 3, message: "Editor request to join the project"}
    ];

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
                            <button>Accept</button>
                            <button>Reject</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectNotification;