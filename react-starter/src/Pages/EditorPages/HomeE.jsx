import CommunitytCard from "../../components/Card.jsx";
import communities from "../../../communityData.json";

function HomeE() {
    return (
        <div className="home">
            <h1>Welcome to SARD Platform</h1>
        <div className="communities">
            <h2>Communities</h2>
            <div>
                {communities.map((community) => (
                    <CommunitytCard
                    key={community.id}
                    title={community.title}
                    text={community.text}
                    imageSrc={community.imageSrc}
                    onClick={() => alert(community.title)}
                    />
                ))}
            </div>
        </div>
        </div>
    );
}

export default HomeE;