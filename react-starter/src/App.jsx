/*import { Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";

import HomeE from "./Pages/EditorPages/HomeE";
import ProjectsE from "./Pages/EditorPages/ProjectsE";
import NotificationE from "./Pages/EditorPages/NotificationE";

import HomeP from "./Pages/PublisherPages/HomeP";
import CommunityP from "./Pages/PublisherPages/CommunityP";
import NotificationP from "./Pages/PublisherPages/NotificationP";

import "./App.css";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/HomeE" element={<HomeE />} />
          <Route path="/ProjectsE" element={<ProjectsE />} />
          <Route path="/NotificationE" element={<NotificationE />} />

          <Route path="/HomeP" element={<HomeP />} />
          <Route path="/CommunityP" element={<CommunityP />} />
          <Route path="/NotificationP" element={<NotificationP />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;*/

import { Routes, Route, useLocation } from "react-router-dom";
import SideBar from "./components/SideBar";

import HomeE from "./Pages/EditorPages/HomeE";
import ProjectsE from "./Pages/EditorPages/ProjectsE";
import NotificationE from "./Pages/EditorPages/NotificationE";

import HomeP from "./Pages/PublisherPages/HomeP";
import CommunityP from "./Pages/PublisherPages/CommunityP";
import NotificationP from "./Pages/PublisherPages/NotificationP";

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
        notificationLink={isPublisher ? "/NotificationP" : "/NotificationE"}
        projectLinks={
          isPublisher
            ? [
                { name: "Book1", link: "/CommunityP" },
                { name: "Book2", link: "/CommunityP" },
              ]
            : [
                { name: "Book1", link: "/ProjectsE" },
                { name: "Book2", link: "/ProjectsE" },
              ]
        }
      />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/HomeE" element={<HomeE />} />
          <Route path="/ProjectsE" element={<ProjectsE />} />
          <Route path="/NotificationE" element={<NotificationE />} />

          <Route path="/HomeP" element={<HomeP />} />
          <Route path="/CommunityP" element={<CommunityP />} />
          <Route path="/NotificationP" element={<NotificationP />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;