/* function NotificationP() {
  return (
    <div className="text-center mt-5">
      <h2>Notifications</h2>

      <div className="mt-4">
        <p>Your request has been sent</p>
        <p>Author accepted your request</p>
        <p>New project available</p>
      </div>
    </div>
  );
}

export default NotificationP; */

function NotificationP() {
  const notifications = [
    { id: 1, title: "Title", time: "1h ago" },
    { id: 2, title: "Title", time: "1 week ago" },
    { id: 3, title: "Title", time: "2 week ago" },
    { id: 4, title: "Title", time: "3 months ago" },
  ];

  return (
    <div className="home">
      <div className="home-top">
        <h1>Notification</h1>
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

export default NotificationP;