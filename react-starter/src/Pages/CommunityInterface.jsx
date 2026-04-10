import { useState } from "react";
import CommunityCard from "../components/CommunityCard";
import projects from "../../projectsData.json";
import communities from "../../communityData.json";
import { useParams } from "react-router-dom";
import MessageCard from "../components/MessageCard";



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
                            onClick={handleJoin}
                        />
                    ))}
                </div>  
                
            </section>
            {showToast && (
                <div className="alert_toast">
                    <MessageCard type="success" text="Your request is sent to the author" style={{backgroundColor: "eef6ef"}} />
                </div>
            )}
        </div>
    );
    
}

export default CommunityInterface;
