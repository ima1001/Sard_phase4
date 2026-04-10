import { useState } from "react";
import ToDoList from "./ProjectComponents/ToDoList";
import ChatList from "./ChatList";
import Notifications from "./ProjectComponents/ProjectNotification";
import DraftsSection from "./ProjectComponents/DraftsSection";

function ChatEmptyState() {
    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#aaa" }}>
            <p>lets get started</p>
            <p>select a chat to start</p>
            <p>communication</p>
        </div>
    );
}

function Chats() {
    const [selectedChat, setSelectedChat] = useState(null);
    return (
        <div style={{ display: "flex", flex: 1 }}>
            <ChatList onSelect={setSelectedChat} />
            {selectedChat ? (
                <div style={{ flex: 1, padding: "20px" }}>
                    <h3>{selectedChat.name}</h3>
                </div>
            ) : (
                <ChatEmptyState />
            )}
        </div>
    );
}

function NavTabs() {
    const [activeTab, setActiveTab] = useState("todo");

    return (
        <>
            <nav className="project-nav-bar">
                <button onClick={() => setActiveTab("todo")}>todo list</button>
                <button onClick={() => setActiveTab("chats")}>chats</button>
                <button onClick={() => setActiveTab("notifications")}>notification</button>
                <button onClick={() => setActiveTab("drafts")}>drafts</button>
            </nav>

            <div className="project-content-box">
                {activeTab === "todo"          && <ToDoList />}
                {activeTab === "chats"         && <Chats />}
                {activeTab === "notifications" && <Notifications />}
                {activeTab === "drafts"        && <DraftsSection />}
            </div>
        </>
    );
}

export default NavTabs;
