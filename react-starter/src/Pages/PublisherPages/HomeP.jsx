import DataCard from "../../components/Card.jsx";
import communities from "../../../communityData.json";

function HomeP() {
  return (
    <div className="home">
      <div className="home-top">
        <h1>Welcome to SARD Platform</h1>
      </div>

      <div className="home-bottom">
        <h2>Communities</h2>
        <div className="communities-container">
          {communities.map((community) => (
            <DataCard
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

export default HomeP;