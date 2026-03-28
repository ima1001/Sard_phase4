import { NavLink } from "react-router-dom";

function SideBar() {
    return (
        <div className="sidebar">
        <image src="/assets/logoD.png" alt="Sard Logo" className="logo" />   
        <nav>
            <NavLink to="/HomeE">Home</NavLink>
            <NavLink to="/ProjectsE">Projects</NavLink>
            <NavLink to="/NotificationsE">Notification</NavLink>
        </nav>
        </div>
    );
}

export default SideBar;