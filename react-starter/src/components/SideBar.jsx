import { NavLink } from "react-router-dom";
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

export default SideBar;