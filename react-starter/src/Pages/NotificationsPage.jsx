function NotificationsPage() {
    const notifications = [
        { id: 1, title: "Title", time: "1h ago" },
        { id: 2, title: "Title", time: "1 week ago" },
        { id: 3, title: "Title", time: "2 week ago" },
        { id: 4, title: "Title", time: "3 months ago" },
    ];

    return (
        <div className="home">
            <div className="home-top">
                <h1>Notifications</h1>
            </div>
            <div className="notification-page">
                {notifications.map((item) => (
                    <div key={item.id} className="notification-card">
                        <div className="notification-left">
                            <div className="notification-icon"></div>
                            <span>{item.title}</span>
                        </div>
                        <div className="notification-time">{item.time}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NotificationsPage;
