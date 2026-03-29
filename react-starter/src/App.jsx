import { Routes, Route } from "react-router-dom";
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

export default App;