import { useState } from "react";
import CommunityCard from "../components/CommunityCard";
import projects from "../../projectsData.json";
import { useParams } from "react-router-dom";


function CommunityInterface() {
    const [showToast, setShowToast] = useState(false);

    const { id } = useParams();
    const community = projects.find((p) => p.id === Number(id));

    const handleJoin = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="text-center mt-5">
            <h2>{community?.title || "Community"}</h2>
            <p>collaborate with other authors</p>

             <div className="card-container">
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
