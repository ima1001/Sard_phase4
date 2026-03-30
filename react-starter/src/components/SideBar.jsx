/*import { NavLink } from "react-router-dom";
import logo from "../assets/logoD.png";

function SideBar() {
    return (
        <div className="sidebar">

        <div className="logo-container" >   
        <img src={logo} alt="Sard Logo" className="logo" />
         </div> 
          
        <nav>
            <NavLink to="/HomeE">Home</NavLink>
            <NavLink to="/ProjectsE">Projects</NavLink>
            <NavLink to="/NotificationE">Notification</NavLink>
        </nav>
        </div>
    );
}

export default SideBar;*/

import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logoD.png";
import {
  House,
  Pencil,
  Bell,
  ChevronDown,
  ChevronUp,
  PersonCircle
} from "react-bootstrap-icons";

function SideBar({ role, name, homeLink, notificationLink, projectLinks = [] }) {
  const [showProjects, setShowProjects] = useState(false);

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Sard Logo" className="logo" />
      </div>

      <div className="profile-box">
        <PersonCircle className="profile-icon" />
        <div>
          <p className="role-text">{role}</p>
          <p className="name-text">{name}</p>
        </div>
      </div>

      <nav>
        <NavLink to={homeLink} className="nav-item">
          <div className="nav-left">
            <House className="nav-icon" />
            Home
          </div>
        </NavLink>

        <div className="nav-item project-toggle" onClick={() => setShowProjects(!showProjects)}>
          <div className="nav-left">
            <Pencil className="nav-icon" />
            Projects
          </div>
          {showProjects ? <ChevronUp /> : <ChevronDown />}
        </div>

        {showProjects && (
          <div className="dropdown-menu-projects">
            {projectLinks.map((project, index) => (
              <NavLink key={index} to={project.link} className="project-link">
                {project.name}
              </NavLink>
            ))}
          </div>
        )}

        <NavLink to={notificationLink} className="nav-item">
          <div className="nav-left">
            <Bell className="nav-icon" />
            Notification
          </div>
        </NavLink>
      </nav>
    </div>
  );
}

export default SideBar;