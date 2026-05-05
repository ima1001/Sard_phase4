import { useState, useRef, useEffect } from "react";
import "./ChatWindow.css";

function FileContent({ fileUrl, fileType, fileName, linkColor = "white" }) {
    if (!fileUrl) return null;
    if (fileType?.startsWith("image/"))
        return <img src={fileUrl} alt={fileName} className="msg-img" onClick={() => window.open(fileUrl, "_blank")} />;
    if (fileType?.startsWith("video/"))
        return <video src={fileUrl} controls className="msg-video" />;
    if (fileType?.startsWith("audio/"))
        return <audio src={fileUrl} controls />;
    return (
        <a href={fileUrl} target="_blank" rel="noreferrer" className="msg-file-link" style={{ color: linkColor }}>
            📄 {fileName}
        </a>
    );
}

function SentMessage({ msg }) {
    const time = msg.createdAt
        ? new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : msg.time || "";

    return (
        <div className="chat-msg-sent">
            <div className="msg-sender-name">{msg.senderName}</div>
            <div className="msg-bubble">
                {msg.fileUrl
                    ? <FileContent fileUrl={msg.fileUrl} fileType={msg.fileType} fileName={msg.fileName} linkColor="white" />
                    : <span>{msg.content}</span>
                }
            </div>
            <div className="msg-time">{time}</div>
        </div>
    );
}

function ReceivedMessage({ msg }) {
    const time = msg.createdAt
        ? new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : msg.time || "";

    return (
        <div className="chat-msg-received">
            <div className="msg-avatar" />
            <div>
                <div className="msg-sender-name">{msg.senderName}</div>
                <div className="msg-bubble">
                    {msg.fileUrl
                        ? <FileContent fileUrl={msg.fileUrl} fileType={msg.fileType} fileName={msg.fileName} linkColor="#333" />
                        : <span>{msg.content}</span>
                    }
                </div>
                <div className="msg-time">{time}</div>
            </div>
        </div>
    );
}

const SHARE_OPTIONS = [
    { label: "Image", accept: "image/*", icon: "🖼️" },
    { label: "Video", accept: "video/*", icon: "🎬" },
    { label: "Sound", accept: "audio/*", icon: "🎵" },
    { label: "PDF",   accept: ".pdf",    icon: "📄" },
];

function ChatWindow({ chatRoom, projectId }) {
    const [chatMessages, setChatMessages] = useState([]);
    const [text, setText] = useState("");
    const [showShare, setShowShare] = useState(false);
    const [activeAccept, setActiveAccept] = useState("");
    const fileInputRef = useRef(null);
    const bottomRef = useRef(null);

    const userId = localStorage.getItem("userId");
    const senderName = localStorage.getItem("name");
    const senderRole = localStorage.getItem("role");
    const API = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (!projectId || !chatRoom) return;
        fetch(`${API}/api/messages/${projectId}/${chatRoom}`)
            .then(res => res.json())
            .then(data => setChatMessages(Array.isArray(data) ? data : []))
            .catch(err => console.error("Failed to load messages:", err));
    }, [chatRoom, projectId]);

    // auto-scroll to latest message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    const isMine = (msg) => String(msg.sender) === String(userId);

    const sendText = async () => {
        if (!text.trim()) return;
        const res = await fetch(`${API}/api/messages`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: text.trim(), sender: userId, senderName, senderRole, chatRoom, projectId })
        });
        const newMsg = await res.json();
        setChatMessages(prev => [...prev, { ...newMsg, sender: String(newMsg.sender) }]);
        setText("");
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("sender", userId);
        formData.append("senderName", senderName);
        formData.append("senderRole", senderRole);
        formData.append("chatRoom", chatRoom);
        formData.append("projectId", projectId);
        const res = await fetch(`${API}/api/messages/file`, { method: "POST", body: formData });
        const newMsg = await res.json();
        setChatMessages(prev => [...prev, { ...newMsg, sender: String(newMsg.sender) }]);
        e.target.value = "";
    };

    const handleShareOption = (accept) => {
        setActiveAccept(accept);
        setShowShare(false);
        setTimeout(() => fileInputRef.current?.click(), 50);
    };

    return (
        <div className="chat-window">

            {/* scrollable messages area */}
            <div className="chat-messages">
                <div className="chat-date-label">
                    <span>Today</span>
                </div>

                {chatMessages.map(msg =>
                    isMine(msg)
                        ? <SentMessage key={msg._id} msg={msg} />
                        : <ReceivedMessage key={msg._id} msg={msg} />
                )}
                <div ref={bottomRef} />
            </div>

            {/* input bar */}
            <div className="chat-input-bar">
                {showShare && (
                    <div className="chat-share-menu">
                        {SHARE_OPTIONS.map(({ label, accept, icon }) => (
                            <button key={label} className="chat-share-option" onClick={() => handleShareOption(accept)}>
                                <span>{icon}</span> {label}
                            </button>
                        ))}
                    </div>
                )}

                <div className="chat-input-row">
                    <button className="chat-attach-btn" onClick={() => setShowShare(p => !p)}>📎</button>
                    <input ref={fileInputRef} type="file" accept={activeAccept} style={{ display: "none" }} onChange={handleFileChange} />
                    <input
                        className="chat-text-input"
                        type="text"
                        placeholder="Type a message..."
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && sendText()}
                    />
                    <button className="chat-send-btn" onClick={sendText}>➤</button>
                </div>
            </div>
        </div>
    );
}

export default ChatWindow;