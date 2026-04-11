import CommunityCard from "../../components/CommunityCard.jsx";
import projects from "../../../data/projectsData.json";

function ProjectEditor() {
    return (
        <div className="projects">
            <h2>Projects</h2>
            <div>
                {projects.map((project) => (
                    <CommunityCard
                        key={project.id}
                        title={project.title}
                        text={project.text}
                        onClick={() => console.log(`Project ${project.title} entered`)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProjectEditor;
