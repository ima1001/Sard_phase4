// the tab navigation component(todo list, chats, notification, settings)
import { useState } from "react";
import ToDoList from "./ProjectComponents/ToDoList";
//import Chats from "./ProjectComponents/chats";
import Notifications from "./ProjectComponents/ProjectNotification";
//import Settings from "./ProjectComponents/settings";
import DraftsSection from "./ProjectComponents/DraftsSection";       


function NavTabs() {
const [activeTab, setActiveTab] = useState("todo");

return (
    <>
      {/* Top Navigation Bar */}
            <nav className="project-nav-bar">
            <button onClick={() => setActiveTab("todo")}>todo list</button>
            {/* <button onClick={() => setActiveTab("chats")}>chats</button> */}
            <button onClick={() => setActiveTab("notifications")}>notification</button>
            <button onClick={() => setActiveTab("drafts")}>drafts</button>
            {/* <button onClick={() => setActiveTab("settings")}>settings</button> */}
        </nav>

      {/* Content below the navigation bar based on the active tab */}
        <div className="project-content-box">
            {activeTab === "todo" && <ToDoList />}
            {activeTab === "notifications" && <Notifications />}
            {activeTab === "drafts" && <DraftsSection />}
        </div>
    </>
    );
}

export default NavTabs;