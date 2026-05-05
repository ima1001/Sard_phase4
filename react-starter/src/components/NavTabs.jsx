import { useEffect, useState } from "react";
import { ConfirmCard, SuccessToast, ErrorToast } from "./MessageCard";
import { useNavigate } from "react-router-dom";
import ToDoList from "./ProjectComponents/ToDoList";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import Notifications from "./ProjectComponents/ProjectNotification";
import DraftsSection from "./ProjectComponents/DraftsSection";
//import communities from "../../data/communityData.json";


function ChatEmptyState() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#aaa" }}>
      <p>lets get started</p>
      <p>select a chat to start</p>
      <p>communication</p>
    </div>
  );
}

function Chats({ projectId }) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleLockedClick = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  return (
      <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0, height: "100%" }}>
      <ChatList onSelect={setSelectedChat} onLockedClick={handleLockedClick} />
      {selectedChat ? <ChatWindow projectId={projectId} chatRoom={selectedChat} /> : <ChatEmptyState />}
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
  const projectId = String(book._id);

  console.log("Sending request for project:", projectId);

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Join Request",
        message: `${name} wants to join as ${role}`,
        type: "project",
        projectId: projectId,
      }),
    });

    const data = await res.json();

    console.log("Notification saved:", data);
  } catch (error) {
    console.error("Failed to send join request:", error);
  }
}

function ReviewerNavTabs({ book, projectId }) {
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
        {activeTab === "todo" && <ToDoList projectId={projectId} />}
        {activeTab === "chats" && <Chats projectId={projectId} />}
        {activeTab === "drafts" && <DraftsSection projectId={projectId} />}
      </div>
    </>
  );
}

function EditorNavTabs({ book, projectId }) {
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
        {activeTab === "todo" && <ToDoList projectId={projectId} />}
        {activeTab === "chats" && <Chats projectId={projectId} />}
        {activeTab === "drafts" && <DraftsSection projectId={projectId} />}
      </div>
    </>
  );
}


function PublisherNavTabs({ book, projectId }) {
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
        {activeTab === "drafts" && <DraftsSection projectId={projectId} />}
        {activeTab === "chats" && <Chats projectId={projectId} />}
      </div>
    </>
  );
}

function BookSettings({ book, onSave }) {
  const [fields, setFields] = useState({
      title: book?.name || "",
      description: book?.description || "",
      authors: String(book?.numAuthors || 1),
      selectedCommunities: book?.communityNames || [],
      accessibility: book?.accessibility || "Private",
  });

  useEffect(() => {
      if (book) {
          setFields(prev => ({
        ...prev,
        title: book.name || "",
        description: book.description || "",
        authors: String(book.numAuthors || 1),
        accessibility: book.accessibility || "Private",
        selectedCommunities: prev.selectedCommunities.length > 0
          ? prev.selectedCommunities
          : book.communityNames || [],
        }));
      }
  }, [book]);

  const [communities, setCommunities] = useState([]);
  const [editingField, setEditingField] = useState(null);
  const [draftValue, setDraftValue] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/communities/all`)
      .then(res => res.json())
      .then(data => setCommunities(data))
      .catch(err => console.error(err));
  }, []);

  const beginEdit = (field) => { setEditingField(field); setDraftValue(fields[field]); setError(""); };
  const saveEdit = () => {
    if (!draftValue.trim()) { setError("Field cannot be empty"); return; }
    setFields((prev) => ({ ...prev, [editingField]: draftValue }));
    setEditingField(null); setError("");
  };
  const cancelEdit = () => { setDraftValue(fields[editingField]); setEditingField(null); setError(""); };
  const handleSaveChanges = () => { if (onSave) onSave(fields); setShowToast(true); setTimeout(() => setShowToast(false), 2000); };
  const toggleCommunity = (name) => {
    setFields((prev) => ({
      ...prev,
      selectedCommunities: prev.selectedCommunities.includes(name)
        ? prev.selectedCommunities.filter((c) => c !== name)
        : [...prev.selectedCommunities, name],
    }));
  };
  const setAccessibility = (value) => setFields((prev) => ({ ...prev, accessibility: value }));
  
  const rows = [
    { key: "title", label: "Book title" },
    { key: "description", label: "Description" },
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
                  {row.key === "description" ? (
                    <textarea
                      value={draftValue}
                      onChange={(e) => setDraftValue(e.target.value)}
                      rows={3}
                      style={{ width: "100%", resize: "vertical", fontSize: "14px" }}
                    />
                  ) : (
                    <input value={draftValue} onChange={(e) => setDraftValue(e.target.value)} />
                  )}
                  <div className="edit-actions">
                    <button className="edit-save" onClick={saveEdit}>✓</button>
                    <button className="edit-cancel" onClick={cancelEdit}>✕</button>
                  </div>
                  {error && <p className="error-text">{error}</p>}
                </>
              ) : (
                <>
                  <span className="field-value" style={
                    row.key === "description"
                      ? { fontSize: "13px", color: "#666", fontStyle: "italic" }
                      : {}
                  }>
                    {fields[row.key] || "—"}
                  </span>
                  <button className="edit-trigger" onClick={() => beginEdit(row.key)}>✎</button>
                </>
              )}
            </div>
          </div>
        ))}

        <div className="settings-row">
          <label>Related Communities</label>
          <div className="settings-options">
            {communities.map((c) => (
              <div key={c._id} className="option-item">
                <input type="checkbox"
                  checked={fields.selectedCommunities.includes(c.name)}
                  onChange={() => toggleCommunity(c.name)} />
                <span style={{ marginLeft: "8px" }}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="settings-row">
          <label>Accessibility</label>
          <div className="settings-options">
            {["Private", "Public"].map((opt) => (
              <div key={opt} className="option-item">
                <input type="radio" name="accessibility" value={opt}
                  checked={fields.accessibility === opt}
                  onChange={() => setAccessibility(opt)} />
                <span style={{ marginLeft: "8px" }}>{opt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="settings-footer" style={{display: "flex", justifyContent: "center"}}>
        <button onClick={handleSaveChanges}>Save changes</button>
        <button
            onClick={() => setShowDeleteConfirm(true)}
            style={{ background: "#c0392b", color: "white", marginLeft: "10px" }}
        >
            Delete Project
        </button>
    </div>

      {showDeleteConfirm && (
        <div className="modal-overlay">
            <div className="modal-box">
                <p>Are you sure you want to delete this project? This cannot be undone.</p>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <button
                        style={{ background: "#c0392b", color: "white" }}
                        onClick={async () => {
                            await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${book._id}`, {
                                method: "DELETE"
                            });
                            window.dispatchEvent(new Event("project-updated"));
                            navigate("/Home");
                        }}
                    >
                        Yes, delete
                    </button>
                    <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                </div>
            </div>
        </div>
      )}

      {showToast && (
        <div className="alert_toast">
          <SuccessToast text="Changes saved successfully!" />
        </div>
      )}
    </div>
  );
}

function NavTabs({ book, handleSave }) {
  const [activeTab, setActiveTab] = useState("todo");
  const [currentBook, setCurrentBook] = useState(book);

  useEffect(() => {
    setCurrentBook(book);
    setActiveTab("todo");
  }, [book?._id]);

  if (!book) return <div>Loading...</div>;

  const projectId = book?._id; 
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

  if (role === "reviewer") return <ReviewerNavTabs book={book} projectId={projectId} />;
  if (role === "editor") return <EditorNavTabs book={book} projectId={projectId} />;
  if (role === "publisher") return <PublisherNavTabs book={book} projectId={projectId} />;

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
        {activeTab === "todo"          && <ToDoList projectId={projectId} />}
        {activeTab === "chats"         && <Chats projectId={projectId} />}
        {activeTab === "notifications" && <Notifications projectId={projectId} />}
        {activeTab === "drafts"        && <DraftsSection projectId={projectId} />}
        {activeTab === "settings" && role === "author" && (
          <BookSettings
            book={currentBook}
            onSave={(updatedFields) => {
              setCurrentBook((prev) => ({ ...prev, ...updatedFields }));
              handleSave(updatedFields);
            }}
        />
        )}
      </div>
    </>
  );
}

export default NavTabs;