import messages from "../../data/messagesData.json";

function SentMessage({ msg }) {
    if (msg.type === "voice") {
        return (
            <div style={{ alignSelf: "flex-end" }}>
                <div style={{ background: "#2d3a4a", color: "white", borderRadius: "20px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
                    ▶ ━━━━━━━━━━ {msg.duration}
                </div>
                <div style={{ fontSize: "11px", color: "#aaa", textAlign: "right", marginTop: "4px" }}>{msg.time}</div>
            </div>
        );
    }
    return (
        <div style={{ alignSelf: "flex-end" }}>
            <div style={{ background: "#2d3a4a", color: "white", borderRadius: "16px", padding: "10px 14px" }}>
                {msg.text}
            </div>
            <div style={{ fontSize: "11px", color: "#aaa", textAlign: "right", marginTop: "4px" }}>{msg.time}</div>
        </div>
    );
}

function ReceivedMessage({ msg }) {
    return (
        <div style={{ alignSelf: "flex-start", display: "flex", gap: "8px", alignItems: "flex-start" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #ccc", flexShrink: 0 }} />
            <div>
                <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>{msg.name}</div>
                <div style={{ background: "#e8e8e8", borderRadius: "16px", padding: "10px 14px" }}>{msg.text}</div>
                {msg.time && <div style={{ fontSize: "11px", color: "#aaa", marginTop: "4px" }}>{msg.time}</div>}
            </div>
        </div>
    );
}

function ChatWindow() {
    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "24px", overflowY: "auto" }}>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <span style={{ background: "#ccc", borderRadius: "12px", padding: "4px 12px", fontSize: "12px" }}>Today</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {messages.map(msg =>
                    msg.from === "me"
                        ? <SentMessage key={msg.id} msg={msg} />
                        : <ReceivedMessage key={msg.id} msg={msg} />
                )}
            </div>
        </div>
    );
}

export default ChatWindow;
