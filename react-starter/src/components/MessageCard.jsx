function MessageCard({ type="success", text}) {
    const colors = {
        success: { bg: "#d4edda", icon: "✔️", color: "#155724" },
        error: { bg: "#f8d7da", icon: "❌", color: "#721c24" },
        info: { bg: "#d1ecf1", icon: "ℹ️", color: "#0c5460" },
        warning: { bg: "#fff3cd", icon: "⚠️", color: "#856404" }
    };
    const style = colors[type];

    return (
        <div className="message-card" style={{ backgroundColor: style.bg, color: style.color, flexDirection: "row", display: "flex", alignItems: "center", padding: "10px", borderRadius: "5px" }}>
            <span className="message-icon">{style.icon}</span>
            <p>{text}</p>
        </div>
    );
}
export default MessageCard;