import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logoD.png";
import books from "../../data/booksData.json";
import {
  House,
  Pencil,
  Bell,
  ChevronDown,
  ChevronUp,
  PersonCircle,
  BoxArrowLeft,
} from "react-bootstrap-icons";

function SideBar({
  role,
  name,
  homeLink,
  notificationLink,
  projectLinks = [],
  showProjects = true,
  showActionCard = false,
  actionText = "",
  onActionClick,
}) {
  const [openProjects, setOpenProjects] = useState(false);
  const navigate = useNavigate();

  return (
      <div className={`sidebar ${showActionCard ? "sidebar-with-action" : ""}`}>
        <div className="logo-container">
          <img src={logo} alt="Sard Logo" className="logo" />
        </div>

        <div
          className={`profile-box ${role?.toLowerCase() !== "admin" ? "clickable-profile" : ""}`}
          onClick={() => {
          if (role?.toLowerCase() !== "admin") {
            navigate("/Settings");
          }
          }}
        >
        <PersonCircle className="profile-icon" />
          <div className="profile-text">
            <p className="role-text">{role}</p>
            <p className="name-text">{name}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to={homeLink} className="nav-item">
            <div className="nav-left">
              <House className="nav-icon" />
              <span>Home</span>
            </div>
          </NavLink>

          {showProjects && (
    <>
      <div
        className="nav-item project-toggle"
        role="button"
        onClick={() => { setOpenProjects(!openProjects); navigate(books[0].link); }}
      >
        <div className="nav-left">
          <Pencil className="nav-icon" />
          <span>Projects</span>
        </div>
        {openProjects ? (
          <ChevronUp className="arrow-icon" />
        ) : (
          <ChevronDown className="arrow-icon" />
        )}
      </div>

      {openProjects && (
        <div className="dropdown-menu-projects">
          {projectLinks.length > 0 ? (
            projectLinks.map((project, index) => (
              <NavLink key={index} to={project.link} className="project-link">
                {project.name}
              </NavLink>
            ))
          ) : (
            <div className="project-link">No projects yet</div>
          )}
        </div>
      )}
    </>
  )}

          <NavLink to={notificationLink} className="nav-item">
            <div className="nav-left">
              <Bell className="nav-icon" />
              <span>Notification</span>
            </div>
          </NavLink>
        </nav>

        {showActionCard && (
          <div className="action-card">
            <p className="action-title">Let's start!</p>
            <p className="action-subtitle">
              Creating or adding new content couldn't be easier
            </p>
            <button className="action-btn" onClick={onActionClick}>
              + {actionText}
            </button>
          </div>
        )}

        <div className="logout-icon" onClick={() => { localStorage.clear(); navigate("/login"); }}>
          <BoxArrowLeft />
        </div>
      </div>
  );
}

export default SideBar;