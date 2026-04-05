import { Routes, Route, useLocation } from "react-router-dom";
import SideBar from "./components/SideBar";

import Home from "./components/Home";
import ProjectEditor from "./Pages/EditorPages/ProjectEditor";
import NotificationsPage from "./Pages/NotificationsPage";
import Community from "./Pages/Community";
import RoleSelect from "./Pages/RoleSelect";
import Login from "./Pages/SignUpPages/login";
import Signup from "./Pages/SignUpPages/signup";
import ToDoList from "./Pages/ProjectComponents/toDoList";
import ProjectNotification from "./Pages/ProjectComponents/projectNotification";

import "./App.css";

const ROLES = {
    editor: {
        label: "EDITOR",
        name: "Andrew Smith",
        homeLink: "/HomeEditor",
        notificationLink: "/Notifications",
        projectLinks: [
            { name: "Book1", link: "/ProjectEditor" },
            { name: "Book2", link: "/ProjectEditor" }
        ],
    },
    publisher: {
        label: "PUBLISHER",
        name: "Alex (Penguin House)",
        homeLink: "/HomePublisher",
        notificationLink: "/Notifications",
        projectLinks: [
            { name: "Book1", link: "/Community" },
            { name: "Book2", link: "/Community" },
            { name: "Todo List", link: "/ToDoList" },
            { name: "Project Notifications", link: "/ProjectNotification" }
        ],
    },
};

function AppLayout({ role }) {
    const config = ROLES[role];
    return (
        <div style={{ display: "flex" }}>
            <SideBar
                role={config.label}
                name={config.name}
                homeLink={config.homeLink}
                notificationLink={config.notificationLink}
                projectLinks={config.projectLinks}
            />
            <div style={{ flex: 1 }}>
                <Routes>
                    <Route path="/HomeEditor" element={<Home role="editor" />} />
                    <Route path="/HomePublisher" element={<Home role="publisher" />} />
                    <Route path="/ProjectEditor" element={<ProjectEditor />} />
                    <Route path="/Notifications" element={<NotificationsPage />} />
                    <Route path="/Community" element={<Community />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/ToDoList" element={<ToDoList />} />
                    <Route path="/ProjectNotification" element={<ProjectNotification />} />
                </Routes>
            </div>
        </div>
    );
}

function App() {
    const location = useLocation();
    const isPublisher = location.pathname.startsWith("/HomePublisher") || location.pathname.startsWith("/Community") || location.pathname.startsWith("/ToDoList")|| location.pathname.startsWith("/ProjectNotification");
;
    const isEditor = location.pathname.startsWith("/HomeEditor") || location.pathname.startsWith("/ProjectEditor");

    if (!isPublisher && !isEditor && location.pathname !== "/Notifications") {
        return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="*" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        );
    }

    const role = isPublisher ? "publisher" : "editor";
    return <AppLayout role={role} />;
}

export default App;
