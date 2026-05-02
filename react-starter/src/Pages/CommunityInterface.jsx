import { useState, useEffect } from "react";
import CommunityCard from "../components/CommunityCard";
import projects from "../../data/projectsData.json";
//import communities from "../../data/communityData.json";
import { useParams } from "react-router-dom";
import MessageCard from "../components/MessageCard";

function CommunityInterface() {
<<<<<<< HEAD
    const [showToast, setShowToast] = useState(false);
    const { id } = useParams();
    //const community = communities.find((c) => c.id === Number(id));
    const [community, setCommunity] = useState(null);

    useEffect(() => {
        console.log("Community id from URL:", id);
        fetch(`http://localhost:5000/api/communities/${id}`)
            .then(res => res.json())
            .then(data => setCommunity(data))
            .catch(err => console.error("Failed to load community:", err));
    }, [id]);
=======
  const [showToast, setShowToast] = useState(false);
  const { id } = useParams();
  const community = communities.find((c) => c.id === Number(id));
>>>>>>> c1b5c0d70324bf7661ceaa24ec3cfb5b308c456e

  const handleJoin = async (projectId) => {
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name") || "User";

<<<<<<< HEAD
    return (
        <div className="home"  id="community-interface">
            <div className="home-top" style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
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
                            key={project.id}
                            title={project.title}
                            text={project.text}
                            buttonText="Join"
                            primaryOnClick={handleJoin}
                        />
                    ))}
                </div>  
            
            </section>
            {showToast && (
                <div className="alert_toast" style={{backgroundColor: "transparent", boxShadow: "none",border: "none"}}>
                    <MessageCard type="success" text="Your request is sent to the author"/>
                </div>
            )}
=======
    console.log("Sending request for project:", projectId);

    await fetch("http://localhost:3000/api/notifications", {
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

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="home" id="community-interface">
      <div
        className="home-top"
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <h1 style={{ fontSize: "50px", paddingBottom: "40px", fontStyle: "bold" }}>
          {community?.title || "Community"}
        </h1>
        <p>{community?.description}</p>
      </div>

      <section className="home-bottom">
        <h2>Collaborate with other authors</h2>

        <div className="communities-container">
          {projects.map((project) => (
            <CommunityCard
              key={project.id}
              title={project.title}
              text={project.text}
              buttonText="Join"
              primaryOnClick={() => handleJoin(project.id)}
            />
          ))}
>>>>>>> c1b5c0d70324bf7661ceaa24ec3cfb5b308c456e
        </div>
      </section>

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