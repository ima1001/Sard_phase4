import CommunityCard from "./CommunityCard.jsx";
import communities from "../../data/communityData.json";
import { useNavigate } from "react-router-dom";

function Home({ role }) {
    const navigate = useNavigate();
    return (
        <div className="home">
            <div className="home-top">
                <h1>Welcome to SARD Platform</h1>
            </div>
            <div className="home-bottom">
                <h2>Communities</h2>
                <div className="communities-container">
                    {communities.map((community) => (
                        <CommunityCard
                            key={community.id}
                            title={community.title}
                            text={community.text}
                            onClick={() => navigate(`/CommunityInterface/${community.id}`)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
