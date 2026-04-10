import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
        notificationLink: "/EditorNotifications",
        projectLinks: [
            { name: "Book1", link: "/ProjectEditor" },
            { name: "Book2", link: "/ProjectEditor" },
        ],
        showProjects: true,
        showActionCard: false,
        actionText: "",
        actionLink: "",
    },
    publisher: {
        label: "PUBLISHER",
        name: "Alex (Penguin House)",
        homeLink: "/HomePublisher",
        notificationLink: "/PublisherNotifications",
        projectLinks: [
            { name: "Book1", link: "/CommunityInterface" },
            { name: "Book2", link: "/CommunityInterface" },
            { name: "Nav Tabs", link: "/NavTabs" },
        ],
        showProjects: true,
        showActionCard: false,
        actionText: "",
        actionLink: "",
    },
    reviewer: {
        label: "REVIEWER",
        name: "Reviewer",
        homeLink: "/HomeReviewer",
        notificationLink: "/ReviewerNotifications",
        projectLinks: [],
        showProjects: false,
        showActionCard: false,
        actionText: "",
        actionLink: "",
    },
    author: {
        label: "AUTHOR",
        name: "Author",
        homeLink: "/HomeAuthor",
        notificationLink: "/AuthorNotifications",
        projectLinks: [],
        showProjects: true,
        showActionCard: true,
        actionText: "Add New Project",
        actionLink: "/CreateProject",
    },
    admin: {
        label: "ADMIN",
        name: "Admin",
        homeLink: "/HomeAdmin",
        notificationLink: "/AdminNotifications",
        projectLinks: [],
        showProjects: false,
        showActionCard: true,
        actionText: "Add New Community",
        actionLink: "/CreateCommunity",
    },
};

const ROLE_PREFIXES = {
    editor:    ["/HomeEditor", "/ProjectEditor", "/EditorNotifications"],
    publisher: ["/HomePublisher", "/CommunityInterface", "/NavTabs", "/PublisherNotifications"],
    reviewer:  ["/HomeReviewer", "/ReviewerNotifications"],
    author:    ["/HomeAuthor", "/CreateProject", "/AuthorNotifications"],
    admin:     ["/HomeAdmin", "/CreateCommunity", "/AdminNotifications"],
};

function detectRole(pathname) {
    for (const [role, prefixes] of Object.entries(ROLE_PREFIXES)) {
        if (prefixes.some((p) => pathname.startsWith(p))) return role;
    }
    return null;
}

function AppLayout({ role }) {
    const config = ROLES[role];
    const navigate = useNavigate();

    return (
        <div style={{ display: "flex" }}>
            <SideBar
                role={config.label}
                name={config.name}
                homeLink={config.homeLink}
                notificationLink={config.notificationLink}
                projectLinks={config.projectLinks}
                showProjects={config.showProjects}
                showActionCard={config.showActionCard}
                actionText={config.actionText}
                onActionClick={() => navigate(config.actionLink)}
            />
            <div style={{ flex: 1 }}>
                <Routes>
                    <Route path="/HomeEditor"              element={<Home role="editor" />} />
                    <Route path="/HomePublisher"           element={<Home role="publisher" />} />
                    <Route path="/HomeReviewer"            element={<Home role="reviewer" />} />
                    <Route path="/HomeAuthor"              element={<Home role="author" />} />
                    <Route path="/HomeAdmin"               element={<Home role="admin" />} />
                    <Route path="/ProjectEditor"           element={<ProjectEditor />} />
                    <Route path="/EditorNotifications"     element={<NotificationsPage />} />
                    <Route path="/PublisherNotifications"  element={<NotificationsPage />} />
                    <Route path="/ReviewerNotifications"   element={<NotificationsPage />} />
                    <Route path="/AuthorNotifications"     element={<NotificationsPage />} />
                    <Route path="/AdminNotifications"      element={<NotificationsPage />} />
                    <Route path="/CommunityInterface"      element={<CommunityInterface />} />
                    <Route path="/NavTabs"                 element={<NavTabs />} />
                    <Route path="/RoleSelect"              element={<RoleSelect />} />
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
                <Route path="/"       element={<Login />} />
                <Route path="/login"  element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*"       element={<Login />} />
            </Routes>
        );
    }

    return <AppLayout role={role} />;
}

export default App;