import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import SideBar from "./components/SideBar";

import Home from "./components/Home";
import ProjectEditor from "./Pages/EditorPages/ProjectEditor";
import NotificationsPage from "./Pages/NotificationsPage";
import CommunityInterface from "./Pages/CommunityInterface";
import Login from "./Pages/SignUpPages/Login";
import Signup from "./Pages/SignUpPages/Signup";
import NavTabs from "./components/NavTabs";
import BookInterface from "./Pages/BookInterface";
<<<<<<< HEAD
import SettingsPage from "./Pages/SettingsPage";
=======
import AddNew from "./Pages/AddNew";

>>>>>>> c1fe6ab090298eea6bfc79b872c38b5d17eef8e7

import "./App.css";

const ROLES = {
    editor: {
        label: "EDITOR",
        notificationLink: "/Notifications",
        projectLinks: [
            { name: "Book1", link: "/BookInterface" },
            { name: "Book2", link: "/BookInterface" },
        ],
        showProjects: true,
        showActionCard: false,
        actionText: "",
        actionLink: "",
    },
    publisher: {
        label: "PUBLISHER",
        notificationLink: "/Notifications",
        projectLinks: [
            { name: "Book1", link: "/BookInterface" },
            { name: "Book2", link: "/BookInterface" },
            { name: "Nav Tabs", link: "/NavTabs" },
        ],
        showProjects: true,
        showActionCard: false,
        actionText: "",
        actionLink: "",
    },
    reviewer: {
        label: "REVIEWER",
        notificationLink: "/Notifications",
        projectLinks: [],
        showProjects: false,
        showActionCard: false,
        actionText: "",
        actionLink: "",
    },
    author: {
        label: "AUTHOR",
        notificationLink: "/Notifications",
        projectLinks: [],
        showProjects: true,
        showActionCard: true,
        actionText: "Add New Project",
        actionLink: "/CreateProject",
    },
    admin: {
        label: "ADMIN",
        notificationLink: "/Notifications",
        projectLinks: [],
        showProjects: false,
        showActionCard: true,
        actionText: "Add New Community",
        actionLink: "/CreateCommunity",
    },
};

const AUTH_PATHS = ["/", "/login", "/signup"];

function AppLayout() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role") || "editor";
    const name = localStorage.getItem("name") || "";
    const config = ROLES[role] || ROLES.editor;
    

    return (
        <div style={{ display: "flex" }}>
            <SideBar
                role={config.label}
                name={name}
                homeLink="/Home"
                notificationLink={config.notificationLink}
                projectLinks={config.projectLinks}
                showProjects={config.showProjects}
                showActionCard={config.showActionCard}
                actionText={config.actionText}
                onActionClick={() => navigate(config.actionLink)}
            />
            <div style={{ flex: 1 }}>
                <Routes>
                    <Route path="/Home"                element={<Home />} />
                    <Route path="/Notifications"       element={<NotificationsPage />} />
                    <Route path="/ProjectEditor"       element={<ProjectEditor />} />
                    <Route path="/CommunityInterface/:id" element={<CommunityInterface />} />
                    <Route path="/BookInterface"       element={<BookInterface />} />
                    <Route path="/NavTabs"             element={<NavTabs />} />
<<<<<<< HEAD
                    <Route path="/Settings" element={<SettingsPage />} />
=======
                    <Route path="/Settings"            element={<div>Settings Page</div>} />
                    <Route path="/CreateProject"   element={<AddNew action="project" />} />
                    <Route path="/CreateCommunity" element={<AddNew action="community" />} />
>>>>>>> c1fe6ab090298eea6bfc79b872c38b5d17eef8e7
                </Routes>
            </div>
        </div>
    );
}

function App() {
    const location = useLocation();

    if (AUTH_PATHS.includes(location.pathname)) {
        return (
            <Routes>
                <Route path="/"       element={<Login />} />
                <Route path="/login"  element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        );
    }

    return <AppLayout />;
}

export default App;
