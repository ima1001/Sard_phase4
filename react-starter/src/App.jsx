import { Routes, Route, useLocation } from "react-router-dom";
import SideBar from "./components/SideBar";

import Home from "./components/Home";
import ProjectEditor from "./Pages/EditorPages/ProjectEditor";
import NotificationsPage from "./Pages/NotificationsPage";
import CommunityInterface from "./Pages/CommunityInterface";
import Login from "./Pages/SignUpPages/Login";
import Signup from "./Pages/SignUpPages/Signup";
import NavTabs from "./components/NavTabs";
import RoleSelect from "./Pages/RoleSelect";

import "./App.css";

const ROLES = {
    editor: {
        label: "EDITOR",
        name: "Andrew Smith",
        homeLink: "/HomeEditor",
        notificationLink: "/Notifications",
        projectLinks: [
            { name: "Book1", link: "/ProjectEditor" },
            { name: "Book2", link: "/ProjectEditor" },
        ],
    },
    publisher: {
        label: "PUBLISHER",
        name: "Alex (Penguin House)",
        homeLink: "/HomePublisher",
        notificationLink: "/Notifications",
        projectLinks: [
            { name: "Book1", link: "/CommunityInterface" },
            { name: "Book2", link: "/CommunityInterface" },
            { name: "Nav Tabs", link: "/NavTabs" },
        ],
    },
    reviewer: {
        label: "REVIEWER",
        name: "Reviewer",
        homeLink: "/HomeReviewer",
        notificationLink: "/Notifications",
        projectLinks: [],
    },
    author: {
        label: "AUTHOR",
        name: "Author",
        homeLink: "/HomeAuthor",
        notificationLink: "/Notifications",
        projectLinks: [],
    },
};

const ROLE_PREFIXES = {
    editor:    ["/HomeEditor", "/ProjectEditor"],
    publisher: ["/HomePublisher", "/CommunityInterface", "/NavTabs"],
    reviewer:  ["/HomeReviewer"],
    author:    ["/HomeAuthor"],
};

function detectRole(pathname) {
    for (const [role, prefixes] of Object.entries(ROLE_PREFIXES)) {
        if (prefixes.some((p) => pathname.startsWith(p))) return role;
    }
    if (pathname === "/Notifications") return "editor"; // fallback
    return null;
}

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
                    <Route path="/HomeEditor"        element={<Home role="editor" />} />
                    <Route path="/HomePublisher"     element={<Home role="publisher" />} />
                    <Route path="/HomeReviewer"      element={<Home role="reviewer" />} />
                    <Route path="/HomeAuthor"        element={<Home role="author" />} />
                    <Route path="/ProjectEditor"     element={<ProjectEditor />} />
                    <Route path="/Notifications"     element={<NotificationsPage />} />
                    <Route path="/CommunityInterface" element={<CommunityInterface />} />
                    <Route path="/NavTabs"           element={<NavTabs />} />
                    <Route path="/RoleSelect"        element={<RoleSelect />} />
                </Routes>
            </div>
        </div>
    );
}

function App() {
    const location = useLocation();
    const role = detectRole(location.pathname);

    if (!role) {
        return (
            <Routes>
                <Route path="/"        element={<Login />} />
                <Route path="/login"   element={<Login />} />
                <Route path="/signup"  element={<Signup />} />
                <Route path="*"        element={<Login />} />
            </Routes>
        );
    }

    return <AppLayout role={role} />;
}

export default App;
