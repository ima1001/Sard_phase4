import { useState } from "react";
import CommunityCard from "../components/CommunityCard";
import projects from "../../projectsData.json";
import communities from "../../communityData.json";
import { useParams } from "react-router-dom";


function CommunityInterface() {
    const [showToast, setShowToast] = useState(false);
    const { id } = useParams();
    const community = communities.find((c) => c.id === Number(id));

    const handleJoin = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="home"  id="community-interface">
            <div className="home-top" style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h1 style={{ fontSize: "50px", paddingBottom: "40px", fontStyle: "bold" }}> 
                    {community?.title || "Community"}
                </h1>
                <p>{community?.description || "Collaborate with other authors"}</p>
            </div>
        
            <section className="home-bottom">
                <div className="communities-container">
                    {projects.map((project) => (
                        <CommunityCard
                            key={project.id}
                            title={project.title}
                            text={project.text}
                            buttonText="Join"
                            onClick={handleJoin}
                        />
                    ))}
                </div>  
                
            </section>
            {showToast && (
                <div className="alert_toast">
                    <span className="check_mark">✓</span>
                    <div>
                        <strong>Project Join Request</strong>
                        <p style={{ margin: 0, fontSize: "13px" }}>Your request is sent to the author</p>
                    </div>
                    <span style={{ cursor: "pointer", marginLeft: "10px" }} onClick={() => setShowToast(false)}>✕</span>
                </div>
            )}
        </div>
    );
    
}

export default CommunityInterface;
