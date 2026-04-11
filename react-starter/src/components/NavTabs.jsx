import { useState } from "react";
import { ConfirmCard, SuccessToast } from "./MessageCard";
import ToDoList from "./ProjectComponents/ToDoList";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
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
                <ChatWindow />
            ) : (
                <ChatEmptyState />
            )}
        </div>
    );
}

function ReviewerNavTabs() {
    const [reviewed, setReviewed] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleButtonClick = () => {
        if (reviewed) {
            setReviewed(false);
        } else {
            setShowConfirm(true);
        }
    };

    const handleConfirm = () => {
        setReviewed(true);
        setShowConfirm(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <>
            <nav className="project-nav-bar" style={{ display: "flex", alignItems: "center" }}>
                <button
                    onClick={handleButtonClick}
                    style={{ backgroundColor: reviewed ? "#4caf50" : "#30364F", color: "white" }}
                >
                    {reviewed ? "Reviewed" : "Mark Reviewed"}
                </button>
                <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                    <button>chats</button>
                </div>
            </nav>

            {/* anchors to position:relative in BookInterface — sits just below the NavTabs bar */}
            {showConfirm && (
                <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 10 }}>
                    <ConfirmCard
                        text="Are you sure you want to mark this project Reviewed?"
                        onConfirm={handleConfirm}
                        onClose={() => setShowConfirm(false)}
                    />
                </div>
            )}
            {showSuccess && (
                <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 10 }}>
                    <SuccessToast text="You have marked this project Reviewed." />
                </div>
            )}

            <div className="project-content-box">
                <Chats />
            </div>
        </>
    );
}

function NavTabs() {
    const [activeTab, setActiveTab] = useState("todo");
    const role = localStorage.getItem("role");

    if (role === "reviewer") return <ReviewerNavTabs />;

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
