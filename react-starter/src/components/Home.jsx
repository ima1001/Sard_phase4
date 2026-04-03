import CommunityCard from "./CommunityCard.jsx";
import communities from "../../communityData.json";

function Home({ role }) {
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
                            onClick={() => console.log(`Community ${community.title} entered`)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
