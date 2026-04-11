import chats from "../../data/chatsData.json";

function ChatList({ onSelect, onLockedClick }) {
    return (
        <div style={{ width: "260px", borderRight: "1px solid #ccc" }}>
            {chats.map(chat => (
                <div key={chat.id} onClick={() => chat.locked ? onLockedClick() : onSelect(chat)} style={{ padding: "16px", cursor: "pointer" }}>
                    {chat.name} {chat.locked ? "🔒" : ""}
                </div>
            ))}
        </div>
    );
}

export default ChatList;
