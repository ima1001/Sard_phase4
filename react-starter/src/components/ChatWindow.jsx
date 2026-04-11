import { useState, useRef, useEffect } from "react";
import messages from "../../data/messagesData.json";

function SentMessage({ msg }) {
    if (msg.fileUrl) {
        return (
            <div style={{ alignSelf: "flex-end" }}>
                <div style={{ background: "#2d3a4a", color: "white", borderRadius: "16px", padding: "10px 14px" }}>
                    {msg.fileType?.startsWith("image/") ? (
                        <img src={msg.fileUrl} alt={msg.fileName}
                            style={{ maxWidth: "200px", borderRadius: "8px", display: "block", cursor: "pointer" }}
                            onClick={() => window.open(msg.fileUrl, "_blank")} />
                    ) : msg.fileType?.startsWith("video/") ? (
                        <video src={msg.fileUrl} controls style={{ maxWidth: "200px", borderRadius: "8px" }} />
                    ) : msg.fileType?.startsWith("audio/") ? (
                        <audio src={msg.fileUrl} controls />
                    ) : (
                        <a href={msg.fileUrl} target="_blank" rel="noreferrer"
                            style={{ color: "white", display: "flex", alignItems: "center", gap: "6px" }}>
                            📄 {msg.fileName}
                        </a>
                    )}
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

const SHARE_OPTIONS = [
    { label: "Image", accept: "image/*",  icon: "🖼️" },
    { label: "Video", accept: "video/*",  icon: "🎬" },
    { label: "Sound", accept: "audio/*",  icon: "🎵" },
    { label: "PDF",   accept: ".pdf",     icon: "📄" },
];

function ChatWindow() {
    const [chatMessages, setChatMessages] = useState(messages);
    const [text, setText] = useState("");
    const [showShare, setShowShare] = useState(false);
    const [activeAccept, setActiveAccept] = useState("");
    const fileInputRef = useRef(null);
    const bottomRef = useRef(null);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const sendText = () => {
        if (!text.trim()) return;
        setChatMessages(prev => [...prev, {
            id: Date.now(),
            from: "me",
            text: text.trim(),
            time: now(),
        }]);
        setText("");
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileUrl = URL.createObjectURL(file);
        setChatMessages(prev => [...prev, {
            id: Date.now(),
            from: "me",
            text: "",
            fileUrl,
            fileName: file.name,
            fileType: file.type,
            time: now(),
        }]);
        e.target.value = "";
    };

    const handleShareOption = (accept) => {
        setActiveAccept(accept);
        setShowShare(false);
        setTimeout(() => fileInputRef.current?.click(), 50);
    };

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%" }}>

            {/* Messages area */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "24px", overflowY: "auto", gap: "12px" }}>
                <div style={{ textAlign: "center", marginBottom: "4px" }}>
                    <span style={{ background: "#ccc", borderRadius: "12px", padding: "4px 12px", fontSize: "12px" }}>Today</span>
                </div>
                {chatMessages.map(msg =>
                    msg.from === "me"
                        ? <SentMessage key={msg.id} msg={msg} />
                        : <ReceivedMessage key={msg.id} msg={msg} />
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div style={{ position: "relative", padding: "12px 16px", borderTop: "1px solid #eee", background: "#fff" }}>

                {/* Share menu */}
                {showShare && (
                    <div style={{
                        position: "absolute", bottom: "64px", left: "16px",
                        background: "#fff", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                        padding: "8px", display: "flex", flexDirection: "column", gap: "4px", zIndex: 10,
                        minWidth: "150px"
                    }}>
                        {SHARE_OPTIONS.map(({ label, accept, icon }) => (
                            <button key={label} onClick={() => handleShareOption(accept)}
                                style={{
                                    display: "flex", alignItems: "center", gap: "10px",
                                    background: "none", border: "none", padding: "8px 12px",
                                    borderRadius: "8px", cursor: "pointer", fontSize: "14px",
                                    textAlign: "left", color: "#333",
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = "#f5f5f5"}
                                onMouseLeave={e => e.currentTarget.style.background = "none"}
                            >
                                <span>{icon}</span> {label}
                            </button>
                        ))}
                    </div>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#f5f5f5", borderRadius: "24px", padding: "8px 16px" }}>
                    <button onClick={() => setShowShare(p => !p)}
                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#666", padding: "0", lineHeight: 1 }}>
                        📎
                    </button>

                    <input ref={fileInputRef} type="file" accept={activeAccept}
                        style={{ display: "none" }} onChange={handleFileChange} />

                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && sendText()}
                        style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: "14px", color: "#333" }}
                    />
                    <button onClick={sendText}
                        style={{ background: "#2d3a4a", border: "none", cursor: "pointer", borderRadius: "50%", width: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "14px" }}>
                        ➤
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatWindow;