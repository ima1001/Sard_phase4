import { useState, useEffect } from "react";
import CommunityCard from "../components/CommunityCard";
//import projects from "../../data/projectsData.json";
import { useParams } from "react-router-dom";
import MessageCard from "../components/MessageCard";

function CommunityInterface() {
    const [showToast, setShowToast] = useState(false);
    const { id } = useParams();
    const [community, setCommunity] = useState(null);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [joinStatus, setJoinStatus] = useState({});
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        console.log("Community id from URL:", id);
        fetch(`${import.meta.env.VITE_API_URL}/api/communities/${id}`)
            .then(res => res.json())
            .then(data => {
              setCommunity(data);
              return fetch(`${import.meta.env.VITE_API_URL}/api/projects/by-community/${data.name}`);
            })
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error("Failed to load community:", err));
    }, [id]);

    useEffect(() => {
        if (!userId || projects.length === 0) return;
        const statusMap = {};
        projects.forEach(project => {
            const member = project.members?.find(m => m.userId === userId);
            if (member) statusMap[project._id] = "joined";
        });
        setJoinStatus(statusMap);
    }, [projects]);

  const handleJoin = async (projectId) => {
    if (joinStatus[projectId]) return;

    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name") || "User";

    console.log("Sending request for project:", projectId);

    await fetch(`${import.meta.env.VITE_API_URL}/api/notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Join Request",
        message: `${name} wants to join as ${role}`,
        type: "project",
        projectId: String(projectId),
      }),
    });

    setJoinStatus(prev => ({ ...prev, [projectId]: "pending" }));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getButtonText = (projectId) => {
        if (joinStatus[projectId] === "joined") return "Already Joined";
        if (joinStatus[projectId] === "pending") return "Pending...";
        return "Join";
    };

  return (
    <div className="home" id="community-interface">
      <div
        className="home-top"
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <h1 style={{ fontSize: "50px", paddingBottom: "40px", fontStyle: "bold" }}>
          {community?.name || "Community"}
        </h1>
        <p>{community?.description}</p>
      </div>

      <section className="home-bottom">
        <h2>Collaborate with other authors</h2>

        <div className="communities-container">
          {projects.map((project) => (
            <CommunityCard
              key={project._id}
              title={project.name}
              text={`${project.numAuthors} author(s) · ${project.accessibility}`}
              primaryButtonText={getButtonText(project._id)}
              primaryOnClick={() => {
                  if (!joinStatus[project._id]) handleJoin(project);
              }}
              secondaryButtonText="Description"
              secondaryOnClick={() => setSelectedProject(project)}
              primaryDisabled={!!joinStatus[project._id]}
            />
          ))}
        </div>
      </section>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
                <button className="close-modal" onClick={() => setSelectedProject(null)}>×</button>
                <h2>{selectedProject.name}</h2>
                <p>{selectedProject.description || "No description provided."}</p>
                <p><strong>Author:</strong> {selectedProject.createdBy}</p>
            </div>
        </div>
      )}

      {showToast && (
        <div
          className="alert_toast"
          style={{
            backgroundColor: "transparent",
            boxShadow: "none",
            border: "none",
          }}
        >
          <MessageCard type="success" text="Your request is sent to the author" />
        </div>
      )}
    </div>
  );
}

export default CommunityInterface;