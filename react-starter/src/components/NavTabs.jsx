// the tab navigation component(todo list, chats, notification, settings)
import { useState } from "react";
import ToDoList from "../Pages/ProjectComponents/toDoList";
//import Chats from "../Pages/ProjectComponents/chats";
import Notifications from "../Pages/ProjectComponents/projectNotification";
//import Settings from "../Pages/ProjectComponents/settings";

function NavTabs() {
const [activeTab, setActiveTab] = useState("todo");

return (
    <>
      {/* Top Navigation Bar */}
            <nav className="project-nav-bar">
            <button onClick={() => setActiveTab("todo")}>todo list</button>
            {/* <button onClick={() => setActiveTab("chats")}>chats</button> */}
            <button onClick={() => setActiveTab("notifications")}>notification</button>
            {/* <button onClick={() => setActiveTab("drafts")}>drafts</button> */}
            {/* <button onClick={() => setActiveTab("settings")}>settings</button> */}
        </nav>

      {/* Content below the navigation bar based on the active tab */}
        <div className="project-content-box">
            {activeTab === "todo" && <ToDoList />}
            {activeTab === "notifications" && <Notifications />}
        </div>
    </>
    );
}

export default NavTabs;