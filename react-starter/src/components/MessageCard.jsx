import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle} from "react-icons/fa";

function MessageCard({ type="success", text}) {
    const colors = {
        success: { bg: "#d4edda", icon: <FaCheckCircle />, color: "#155724" },
        error: { bg: "#f8d7da", icon: <FaExclamationCircle />, color: "#721c24" },
        info: { bg: "#d1ecf1", icon: <FaInfoCircle />, color: "#0c5460" },
        warning: { bg: "#fff3cd", icon: <FaExclamationTriangle />, color: "#856404" }
    };
    const style = colors[type];

    return (
        <div className="message-card" style={{ backgroundColor: style.bg, color: style.color, flexDirection: "row", display: "flex", alignItems: "center", padding: "10px", borderRadius: "5px" }}>
            <div style={{ marginRight: "10px" }}>{style.icon}</div>
            <p>{text}</p>
        </div>
    );
}
export default MessageCard;