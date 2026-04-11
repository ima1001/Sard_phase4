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

const baseStyle = {
    display: "flex", alignItems: "center", padding: "12px 16px",
    borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
    backgroundColor: "white", gap: "12px", position: "relative", minWidth: "320px",
};

export function ConfirmCard({ text, onConfirm, onClose }) {
    return (
        <div style={{ ...baseStyle }}>
            <div style={{ width: "28px", height: "28px", backgroundColor: "#f0a500", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", flexShrink: 0 }}>!</div>
            <p style={{ flex: 1, margin: 0, fontSize: "0.9rem", color: "#333" }}>{text}</p>
            <button onClick={onConfirm} style={{ backgroundColor: "#30364F", color: "white", border: "none", borderRadius: "8px", padding: "6px 14px", cursor: "pointer", fontSize: "0.85rem" }}>Yes</button>
            <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.1rem", cursor: "pointer", color: "#888", position: "absolute", top: "6px", right: "10px" }}>×</button>
        </div>
    );
}

export function SuccessToast({ text }) {
    return (
        <div style={{ ...baseStyle, border: "1.5px solid #17a589" }}>
            <div style={{ width: "28px", height: "28px", backgroundColor: "#17a589", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", flexShrink: 0 }}>✓</div>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#333" }}>{text}</p>
        </div>
    );
}

export function ErrorToast({ onClose }) {
    return (
        <div style={{ ...baseStyle, border: "1.5px solid #e74c3c" }}>
            <div style={{ width: "28px", height: "28px", backgroundColor: "#e74c3c", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", flexShrink: 0 }}>×</div>
            <div>
                <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: "bold", color: "#333" }}>Error Occurred</p>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#555" }}>You don't have access to this chat.</p>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.1rem", cursor: "pointer", color: "#888", position: "absolute", top: "6px", right: "10px" }}>×</button>
        </div>
    );
}

export default MessageCard;