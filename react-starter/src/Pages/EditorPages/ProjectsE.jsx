import ProjectCard from "../../components/Card.jsx";
import projects from "../../../projectsData.json";

function ProjectsE() {
    return (
        <div className="projects">
            <h2>Projects</h2>
            <div>
                {projects.map((project) => (
                    <ProjectCard
                    key={project.id}
                    title={project.title}
                    text={project.text}
                    imageSrc={project.imageSrc}
                    onClick={() => alert(project.title)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProjectsE;