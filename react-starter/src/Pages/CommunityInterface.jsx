import { useState } from "react";
import CommunityCard from "../components/CommunityCard";
import projects from "../../projectsData.json";

function CommunityInterface() {
    const [showMessage, setShowMessage] = useState(false);

    const handleJoin = (projectName) => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    }   

    return (
        <div className="text-center mt-5">
            <h2>Fantasy Community</h2>
            <p>collaborate with other authors</p>

             <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
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
