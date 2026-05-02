import { useEffect, useState } from "react";
import { ConfirmCard, SuccessToast, ErrorToast } from "./MessageCard";
import ToDoList from "./ProjectComponents/ToDoList";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import Notifications from "./ProjectComponents/ProjectNotification";
import DraftsSection from "./ProjectComponents/DraftsSection";
import communities from "../../data/communityData.json";

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
      {selectedChat ? <ChatWindow /> : <ChatEmptyState />}
      {showError && (
        <div style={{ position: "absolute", bottom: "24px", left: "24px", zIndex: 10 }}>
          <ErrorToast onClose={() => setShowError(false)} />
        </div>
      )}
    </div>
  );
}

async function sendJoinRequest(book) {
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name") || "User";

  console.log("Sending request for project:", book.id);

  await fetch("http://localhost:5000/api/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Join Request",
      message: `${name} wants to join as ${role}`,
      type: "project",
      projectId: book.id,
    }),
  });
}

function ReviewerNavTabs({ book }) {
  const [reviewed, setReviewed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("chats");

  const handleButtonClick = () => {
    reviewed ? setReviewed(false) : setShowConfirm(true);
  };

  const handleConfirm = async () => {
    await sendJoinRequest(book);
    setReviewed(true);
    setShowConfirm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const tabs = [
    { key: "todo", label: "todo list" },
    { key: "chats", label: "chats" },
    { key: "drafts", label: "drafts" },
  ];

  return (
    <>
      <nav className="project-nav-bar" style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={handleButtonClick}
          style={{ backgroundColor: reviewed ? "#4caf50" : "#30364F", color: "white" }}
        >
          {reviewed ? "Request Sent" : "Request to Join"}
        </button>

        <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: "10px" }}>
          {tabs.map((tab) => (
            <button key={tab.key} className={activeTab === tab.key ? "active" : ""} onClick={() => setActiveTab(tab.key)}>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {showConfirm && (
        <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 10 }}>
          <ConfirmCard
            text="Are you sure you want to request joining this project?"
            onConfirm={handleConfirm}
            onClose={() => setShowConfirm(false)}
          />
        </div>
      )}

      {showSuccess && (
        <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 10 }}>
          <SuccessToast text="Join request sent successfully." />
        </div>
      )}

      <div className="project-content-box">
        {activeTab === "todo" && <ToDoList projectId={project._id} />}
        {activeTab === "chats" && <Chats />}
        {activeTab === "drafts" && <DraftsSection projectId={project._id} />}
      </div>
    </>
  );
}

function EditorNavTabs({ book }) {
  const [edited, setEdited] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("chats");

  const handleButtonClick = () => {
    edited ? setEdited(false) : setShowConfirm(true);
  };

  const handleConfirm = async () => {
    await sendJoinRequest(book);
    setEdited(true);
    setShowConfirm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const tabs = [
    { key: "todo", label: "todo list" },
    { key: "chats", label: "chats" },
    { key: "drafts", label: "drafts" },
  ];

  return (
    <>
      <nav className="project-nav-bar" style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={handleButtonClick}
          style={{ backgroundColor: edited ? "#4caf50" : "#30364F", color: "white" }}
        >
          {edited ? "Request Sent" : "Request to Join"}
        </button>

        <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: "10px" }}>
          {tabs.map((tab) => (
            <button key={tab.key} className={activeTab === tab.key ? "active" : ""} onClick={() => setActiveTab(tab.key)}>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {showConfirm && (
        <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 10 }}>
          <ConfirmCard
            text="Are you sure you want to request joining this project?"
            onConfirm={handleConfirm}
            onClose={() => setShowConfirm(false)}
          />
        </div>
      )}

      {showSuccess && (
        <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 10 }}>
          <SuccessToast text="Join request sent successfully." />
        </div>
      )}

      <div className="project-content-box">
        {activeTab === "todo" && <ToDoList projectId={project._id} />}
        {activeTab === "chats" && <Chats />}
        {activeTab === "drafts" && <DraftsSection projectId={project._id} />}
      </div>
    </>
  );
}

function BookSettings({ book, onSave }) {
  const [fields, setFields] = useState({
    title: book.name,
    category: "Fiction",
    authors: "1",
    selectedCommunities: book.selectedCommunities || [],
    accessibility: book.accessibility || "Private",
  });

  const [editingField, setEditingField] = useState(null);
  const [draftValue, setDraftValue] = useState(fields.title);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setFields({
      title: book.name,
      category: "Fiction",
      authors: "1",
      selectedCommunities: book.selectedCommunities || [],
      accessibility: book.accessibility || "Private",
    });
  }, [book.id]);

  const beginEdit = (field) => {
    setEditingField(field);
    setDraftValue(fields[field]);
    setError("");
  };

  const saveEdit = () => {
    if (!draftValue.trim()) {
      setError("Field cannot be empty");
      return;
    }

    setFields((prev) => ({ ...prev, [editingField]: draftValue }));
    setEditingField(null);
    setError("");
  };

  const cancelEdit = () => {
    setDraftValue(fields[editingField]);
    setEditingField(null);
    setError("");
  };

  const handleSaveChanges = () => {
    if (onSave) onSave(fields);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const toggleCommunity = (title) => {
    setFields((prev) => {
      const exists = prev.selectedCommunities.includes(title);
      return {
        ...prev,
        selectedCommunities: exists
          ? prev.selectedCommunities.filter((c) => c !== title)
          : [...prev.selectedCommunities, title],
      };
    });
  };

  const setAccessibility = (value) => {
    setFields((prev) => ({ ...prev, accessibility: value }));
  };

  const rows = [
    { key: "title", label: "Book title" },
    { key: "category", label: "Project category" },
    { key: "authors", label: "Number of authors" },
  ];

  return (
    <div className="book-settings-card">
      <div className="settings-header">
        <div>
          <p className="settings-label">settings</p>
          <h2>{fields.title}</h2>
        </div>
      </div>

      <div className="settings-grid">
        {rows.map((row) => (
          <div key={row.key} className="settings-row settings-row-editable">
            <label>{row.label}</label>

            <div className="editable-field">
              {editingField === row.key ? (
                <>
                  <input value={draftValue} onChange={(event) => setDraftValue(event.target.value)} />
                  <div className="edit-actions">
                    <button className="edit-save" onClick={saveEdit}>✓</button>
                    <button className="edit-cancel" onClick={cancelEdit}>✕</button>
                  </div>
                  {error && <p className="error-text">{error}</p>}
                </>
              ) : (
                <>
                  <span className="field-value">{fields[row.key]}</span>
                  <button className="edit-trigger" onClick={() => beginEdit(row.key)} aria-label={`Edit ${row.label}`}>
                    ✎
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        <div className="settings-row">
          <label>Related Communities</label>
          <div className="settings-options">
            {communities.map((c) => (
              <div key={c.id} className="option-item">
                <input
                  type="checkbox"
                  checked={fields.selectedCommunities.includes(c.title)}
                  onChange={() => toggleCommunity(c.title)}
                />
                <span style={{ marginLeft: "8px" }}>{c.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="settings-row">
          <label>Accessibility</label>
          <div className="settings-options">
            {["Private", "Public"].map((opt) => (
              <div key={opt} className="option-item">
                <input
                  type="radio"
                  name="accessibility"
                  value={opt}
                  checked={fields.accessibility === opt}
                  onChange={() => setAccessibility(opt)}
                />
                <span style={{ marginLeft: "8px" }}>{opt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="settings-footer">
        <button onClick={handleSaveChanges}>Save changes</button>
      </div>

      {showToast && (
        <div className="alert_toast">
          <SuccessToast text="Changes saved successfully!" />
        </div>
      )}
    </div>
  );
}

function PublisherNavTabs({ book }) {
  const [activeTab, setActiveTab] = useState("drafts");
  const [requestSent, setRequestSent] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = async () => {
    await sendJoinRequest(book);
    setRequestSent(true);
    setShowConfirm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const tabs = [
    { key: "drafts", label: "drafts" },
    { key: "chats", label: "chats" },
  ];

  return (
    <>
      <nav className="project-nav-bar" style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={() => setShowConfirm(true)}
          style={{ backgroundColor: requestSent ? "#4caf50" : "#30364F", color: "white" }}
        >
          {requestSent ? "Request Sent" : "Request to Join"}
        </button>

        <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: "10px" }}>
          {tabs.map((tab) => (
            <button key={tab.key} className={activeTab === tab.key ? "active" : ""} onClick={() => setActiveTab(tab.key)}>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {showConfirm && (
        <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 10 }}>
          <ConfirmCard
            text="Are you sure you want to request joining this project?"
            onConfirm={handleConfirm}
            onClose={() => setShowConfirm(false)}
          />
        </div>
      )}

      {showSuccess && (
        <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 10 }}>
          <SuccessToast text="Join request sent successfully." />
        </div>
      )}

      <div className="project-content-box">
        {activeTab === "drafts" && <DraftsSection />}
        {activeTab === "chats" && <Chats />}
      </div>
    </>
  );
}

function NavTabs({ book }) {
  const [activeTab, setActiveTab] = useState("todo");
  const [currentBook, setCurrentBook] = useState(book);

  const role = localStorage.getItem("role");
  const tabs = [
    { key: "todo", label: "todo list" },
    { key: "chats", label: "chats" },
    { key: "drafts", label: "drafts" },
  ];

  if (role === "author") {
    tabs.push(
      { key: "notifications", label: "notification" },
      { key: "settings", label: "settings" }
    );
  }

  if (role === "reviewer") return <ReviewerNavTabs book={book} />;
  if (role === "editor") return <EditorNavTabs book={book} />;
  if (role === "publisher") return <PublisherNavTabs book={book} />;

  return (
    <>
      <nav className="project-nav-bar">
        {tabs.map((tab) => (
          <button key={tab.key} className={activeTab === tab.key ? "active" : ""} onClick={() => setActiveTab(tab.key)}>
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="project-content-box">
        {activeTab === "todo" && <ToDoList />}
        {activeTab === "chats" && <Chats />}
        {activeTab === "notifications" && role === "author" && <Notifications projectId={book.id} />}
        {activeTab === "drafts" && <DraftsSection />}
        {activeTab === "settings" && role === "author" && (
          <BookSettings
            book={currentBook}
            onSave={(updatedFields) => {
              setCurrentBook((prev) => ({
                ...prev,
                ...updatedFields,
              }));
            }}
            communities={communities}
          />
        )}
      </div>
    </>
  );
}

export default NavTabs;