import {Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import HomeE from "./Pages/EditorPages/HomeE";
import ProjectsE from "./Pages/EditorPages/ProjectsE";
import NotificationE from "./Pages/EditorPages/NotificationE";
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
          </Routes>
        </div>
      </div>
  );
}

export default App;