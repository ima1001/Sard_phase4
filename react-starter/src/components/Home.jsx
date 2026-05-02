import { useEffect, useState } from "react";
import CommunityCard from "./CommunityCard.jsx";
import communities from "../../data/communityData.json";
import { useNavigate } from "react-router-dom";

function AddCommunityForm({ newCommunity, handleChange, handleAddCommunity }) {
    return (
        <div className="add-task-form">
            <form onSubmit={(e) => { e.preventDefault(); handleAddCommunity(); }}>
                
                <div className="field">
                    <label>Community Name</label>
                    <input 
                        type="text"
                        name="title"
                        value={newCommunity.title}
                        onChange={handleChange}
                        placeholder="Community name"
                        required
                    />
                </div>

                <div className="field">
                    <label>Community Description</label>
                    <input 
                        type="text"
                        name="description"
                        value={newCommunity.description}
                        onChange={handleChange}
                        placeholder="Description"
                    />
                </div>

                <button type="submit">Add</button>
            </form>
        </div>
    );
}

function Home({ role }) {
    const [communityList, setCommunityList] = useState(communities);
    const [toastMessage, setToastMessage] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    /*const [newCommunity, setNewCommunity] = useState({
        title: "",
        description: ""
    });*/

    const [newCommunity, setNewCommunity] =  useState([]);
    useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/communities/all`)
        .then(res => res.json())
        .then(data => setCommunityList(data));
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        if (!toastMessage) return;
        const timer = setTimeout(() => setToastMessage(null), 3000);
        return () => clearTimeout(timer);
    }, [toastMessage]);

    const handleJoin = (community) => {
        setToastMessage(`Request sent to join ${community.title}`);
    };

     /*const handleDelete = (community) => {
        setCommunityList((prev) => prev.filter((item) => item.id !== community.id));
        setToastMessage(`${community.title} deleted`);
    };

    

    const handleAddCommunity = () => {
        const communityToAdd = {
            id: communityList.length + 1,
            title: newCommunity.title,
            description: newCommunity.description
        };

        setCommunityList([...communityList, communityToAdd]);
        setToastMessage("Community added successfully");
        setShowAddForm(false);

        // Reset form
        setNewCommunity({
            title: "",
            description: ""
        });
    };*/
    
    const handleChange = (e) => {
        setNewCommunity({ ...newCommunity, [e.target.name]: e.target.value });
    };

    const handleDelete = async (community) => {
        await fetch(`${import.meta.env.VITE_API_URL}/api/communities/${community._id}`, {
            method: "DELETE"
        });
        setCommunityList(prev => prev.filter(c => c._id !== community._id));
        setToastMessage(`${community.title} deleted`);
    };

    const handleAddCommunity = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/communities`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCommunity)
        });
        const created = await res.json();
        setCommunityList(prev => [created, ...prev]);
        setToastMessage("Community added successfully");
        setShowAddForm(false);
        setNewCommunity({ title: "", description: "" });
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
                            key={community._id}
                            title={community.name}
                            text={community.description}
                            primaryButtonText={role === "admin" ? "Edit" : "Join"}
                            primaryOnClick={() =>
                                role === "admin"
                                    ? setShowAddForm(true)
                                    : navigate(`/CommunityInterface/${community._id}`)
                            }
                            secondaryButtonText={role === "admin" ? "Delete" : undefined}
                            secondaryOnClick={role === "admin" ? () => handleDelete(community) : undefined}
                        />
                    ))}

                    {showAddForm && (
                        <div className="modal-overlay">
                            <div className="modal-box">
                                <button className="close-modal" onClick={() => setShowAddForm(false)}>×</button>

                                <AddCommunityForm 
                                    newCommunity={newCommunity}
                                    handleChange={handleChange}
                                    handleAddCommunity={handleAddCommunity}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {toastMessage && <div className="home-toast">{toastMessage}</div>}
            </div>
        </div>
    );
}

export default Home;