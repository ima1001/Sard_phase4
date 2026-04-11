import { useEffect, useState } from "react";
import { ConfirmCard, SuccessToast, ErrorToast } from "./MessageCard";
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
    const [showError, setShowError] = useState(false);

    const handleLockedClick = () => {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
    };

    return (
        <div style={{ display: "flex", flex: 1, position: "relative" }}>
            <ChatList onSelect={setSelectedChat} onLockedClick={handleLockedClick} />
            {selectedChat ? (
                <ChatWindow />
            ) : (
                <ChatEmptyState />
            )}
            {showError && (
                <div style={{ position: "absolute", bottom: "24px", left: "24px", zIndex: 10 }}>
                    <ErrorToast onClose={() => setShowError(false)} />
                </div>
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

function EditorNavTabs() {
    const [edited, setEdited] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleButtonClick = () => {
        if (edited) {
            setEdited(false);
        } else {
            setShowConfirm(true);
        }
    };

    const handleConfirm = () => {
        setEdited(true);
        setShowConfirm(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <>
            <nav className="project-nav-bar" style={{ display: "flex", alignItems: "center" }}>
                <button
                    onClick={handleButtonClick}
                    style={{ backgroundColor: edited ? "#4caf50" : "#30364F", color: "white" }}
                >
                    {edited ? "Edited" : "Mark Edited"}
                </button>
                <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                    <button>chats</button>
                </div>
            </nav>

            {showConfirm && (
                <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 10 }}>
                    <ConfirmCard
                        text="Are you sure you want to mark this project Edited?"
                        onConfirm={handleConfirm}
                        onClose={() => setShowConfirm(false)}
                    />
                </div>
            )}
            {showSuccess && (
                <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 10 }}>
                    <SuccessToast text="You have marked this project Edited." />
                </div>
            )}

            <div className="project-content-box">
                <Chats />
            </div>
        </>
    );
}

function BookSettings({ book }) {
    const [fields, setFields] = useState({
        title: book.name,
        category: "Fiction",
        authors: "1",
        visibility: "Private",
    });
    const [editingField, setEditingField] = useState(null);
    const [draftValue, setDraftValue] = useState(fields.title);

    useEffect(() => {
        const initialFields = {
            title: book.name,
            category: "Fiction",
            authors: "1",
            visibility: "Private",
        };
        setFields(initialFields);
        setEditingField(null);
        setDraftValue(initialFields.title);
    }, [book.name]);

    const beginEdit = (field) => {
        setEditingField(field);
        setDraftValue(fields[field]);
    };

    const saveEdit = () => {
        setFields((prev) => ({ ...prev, [editingField]: draftValue }));
        setEditingField(null);
    };

    const cancelEdit = () => {
        setDraftValue(fields[editingField]);
        setEditingField(null);
    };

    const rows = [
        { key: "title", label: "Book title" },
        { key: "category", label: "Project category" },
        { key: "authors", label: "Number of authors" },
        { key: "visibility", label: "Visibility" },
    ];

    return (
        <div className="book-settings-card">
            <div className="settings-header">
                <div>
                    <p className="settings-label">settings</p>
                    <h2>{book.name}</h2>
                </div>
            </div>

            <div className="settings-grid">
                {rows.map((row) => (
                    <div key={row.key} className="settings-row settings-row-editable">
                        <label>{row.label}</label>
                        <div className="editable-field">
                            {editingField === row.key ? (
                                <>
                                    <input
                                        value={draftValue}
                                        onChange={(event) => setDraftValue(event.target.value)}
                                    />
                                    <div className="edit-actions">
                                        <button className="edit-save" onClick={saveEdit}>
                                            ✓
                                        </button>
                                        <button className="edit-cancel" onClick={cancelEdit}>
                                            ✕
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span className="field-value">{fields[row.key]}</span>
                                    <button
                                        className="edit-trigger"
                                        onClick={() => beginEdit(row.key)}
                                        aria-label={`Edit ${row.label}`}
                                    >
                                        ✎
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="settings-footer">
                <button>Save changes</button>
            </div>
        </div>
    );
}

function NavTabs({ book }) {
    const [activeTab, setActiveTab] = useState("todo");
    const role = localStorage.getItem("role");
    const tabs = [
        { key: "todo", label: "todo list" },
        { key: "chats", label: "chats" },
        { key: "notifications", label: "notification" },
        { key: "drafts", label: "drafts" },
    ];

    if (role === "author") {
        tabs.push({ key: "settings", label: "settings" });
    }

    if (role === "reviewer") return <ReviewerNavTabs />;
    if (role === "editor") return <EditorNavTabs />;

    return (
        <>
            <nav className="project-nav-bar">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={activeTab === tab.key ? "active" : ""}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>

            <div className="project-content-box">
                {activeTab === "todo"          && <ToDoList />}
                {activeTab === "chats"         && <Chats />}
                {activeTab === "notifications" && <Notifications />}
                {activeTab === "drafts"        && <DraftsSection />}
                {activeTab === "settings"      && role === "author" && <BookSettings book={book} />}
            </div>
        </>
    );
}

export default NavTabs;
