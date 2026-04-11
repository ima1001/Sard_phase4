import { useEffect, useState } from "react";
import CommunityCard from "./CommunityCard.jsx";
import communities from "../../data/communityData.json";
import { useNavigate } from "react-router-dom";

function Home({ role }) {
    const [communityList, setCommunityList] = useState(communities);
    const [toastMessage, setToastMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!toastMessage) return;
        const timer = setTimeout(() => setToastMessage(null), 3000);
        return () => clearTimeout(timer);
    }, [toastMessage]);

    const handleJoin = (community) => {
        setToastMessage(`Request sent to join ${community.title}`);
    };

    const handleDelete = (community) => {
        setCommunityList((prev) => prev.filter((item) => item.id !== community.id));
        setToastMessage(`${community.title} deleted`);
    };

    const handleEdit = (community) => {
        const newTitle = window.prompt("Edit community title", community.title);
        if (newTitle === null) return;
        const newText = window.prompt("Edit community description", community.text);
        if (newText === null) return;

        setCommunityList((prev) =>
            prev.map((item) =>
                item.id === community.id
                    ? { ...item, title: newTitle.trim() || item.title, text: newText.trim() || item.text }
                    : item
            )
        );
        setToastMessage(`${community.title} updated`);
    };

    return (
        <div className="home">
            <div className="home-top">
                <h1>Welcome to SARD Platform</h1>
            </div>
            <div className="home-bottom">
                <h2>Communities</h2>
                <div className="communities-container">
                    {communityList.map((community) => (
                        <CommunityCard
                            key={community.id}
                            title={community.title}
                            text={community.text}
                            primaryButtonText={role === "admin" ? "Edit" : "Join"}
                            primaryOnClick={() =>
                                role === "admin"
                                    ? handleEdit(community)
                                    : navigate(`/CommunityInterface/${community.id}`)
                            }
                            secondaryButtonText={role === "admin" ? "Delete" : undefined}
                            secondaryOnClick={role === "admin" ? () => handleDelete(community) : undefined}
                        />
                    ))}
                </div>
                {toastMessage && <div className="home-toast">{toastMessage}</div>}
            </div>
        </div>
    );
}

export default Home;
