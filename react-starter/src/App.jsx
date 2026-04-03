import { Routes, Route, useLocation } from "react-router-dom";
import SideBar from "./components/SideBar";

import Home from "./components/Home";
import ProjectEditor from "./Pages/EditorPages/ProjectEditor";
import NotificationsPage from "./Pages/NotificationsPage";
import Community from "./Pages/Community";

import "./App.css";

function App() {
  const location = useLocation();
  const isPublisher = location.pathname.includes("P");

  return (
    <div style={{ display: "flex" }}>
      <SideBar
        role={isPublisher ? "PUBLISHER" : "EDITOR"}
        name={isPublisher ? "Alex (Penguin House)" : "Andrew Smith"}
        homeLink={isPublisher ? "/HomeP" : "/HomeE"}
        notificationLink="/Notifications"
        projectLinks={
          isPublisher
            ? [
                { name: "Book1", link: "/Community" },
                { name: "Book2", link: "/Community" },
              ]
            : [
                { name: "Book1", link: "/ProjectEditor" },
                { name: "Book2", link: "/ProjectEditor" },
              ]
        }
      />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/HomeE" element={<Home role="editor" />} />
          <Route path="/HomeP" element={<Home role="publisher" />} />

          <Route path="/ProjectEditor" element={<ProjectEditor />} />

          <Route path="/Notifications" element={<NotificationsPage />} />

          <Route path="/Community" element={<Community />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
