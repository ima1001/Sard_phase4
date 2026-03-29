import { Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";

import HomeE from "./Pages/EditorPages/HomeE";
import ProjectsE from "./Pages/EditorPages/ProjectsE";
import NotificationE from "./Pages/EditorPages/NotificationE";

// Publisher pages
import HomeP from "./Pages/PublisherPages/HomeP";
import CommunityP from "./Pages/PublisherPages/CommunityP";
import NotificationP from "./Pages/PublisherPages/NotificationP";

import "./App.css";

function App() {
  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar always visible */}
      <SideBar />

      <div style={{ flex: 1 }}>
        <Routes>
          {/* Editor routes */}
          <Route path="/HomeE" element={<HomeE />} />
          <Route path="/ProjectsE" element={<ProjectsE />} />
          <Route path="/NotificationE" element={<NotificationE />} />
        </Routes>
      </div>

      <div style={{ flex: 1 }}>
        <Routes>
          {/* Publisher routes */}
          <Route path="/HomeP" element={<HomeP />} />
          <Route path="/CommunityP" element={<CommunityP />} />
          <Route path="/NotificationP" element={<NotificationP />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;