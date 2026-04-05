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

function App() {
    return (
            <div>
<Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<Login />} />
                    <Route path="/HomeEditor" element={<Home role="editor" />} />
                    <Route path="/HomePublisher" element={<Home role="publisher" />} />
                    <Route path="/ProjectEditor" element={<ProjectEditor />} />
                    <Route path="/Notifications" element={<NotificationsPage />} />
                    <Route path="/Community" element={<Community />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/ToDoList" element={<ToDoList />} />
                    <Route path="/ProjectNotification" element={<ProjectNotification />}/>
                </Routes>
            </div>
                
            );
    }

export default App;
