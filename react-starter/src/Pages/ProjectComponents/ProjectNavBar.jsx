import {useNavigate} from "react-router-dom";

function ProjectNavBar() {
    const navigate = useNavigate();
    return(
        <nav className="project-nav-bar">
            <p onClick={() => navigate("/toDoList")}>ToDo list</p>
            <p onClick={() => navigate("/chats")}>Chats on</p>
            <p onClick={() => navigate("/projectNotifications")}>Notifications</p>
            <p onClick={() => navigate("/drafts")}>Drafts</p>
            <p onClick={() => navigate("/settings")}>Settings</p>
        </nav>
    );
}
export default ProjectNavBar;