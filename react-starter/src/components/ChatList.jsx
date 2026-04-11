import chats from "../../data/chatsData.json";

const CHAT_ACCESS = {
    author:    [1, 2, 3],
    editor:    [2],
    reviewer:  [2],
    publisher: [3],
};

function ChatList({ onSelect, onLockedClick }) {
    const role = localStorage.getItem("role") || "editor";
    const accessibleIds = CHAT_ACCESS[role] || [];

    return (
        <div style={{ width: "260px", borderRight: "1px solid #ccc" }}>
            {chats.map(chat => {
                const isLocked = !accessibleIds.includes(chat.id);
                return (
                    <div
                        key={chat.id}
                        onClick={() => isLocked ? onLockedClick() : onSelect(chat)}
                        style={{
                            padding: "16px",
                            cursor: isLocked ? "not-allowed" : "pointer",
                            opacity: isLocked ? 0.5 : 1,
                        }}
                    >
                        {chat.name} {isLocked ? "🔒" : ""}
                    </div>
                );
            })}
        </div>
    );
}

export default ChatList;