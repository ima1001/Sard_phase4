import { useState } from "react";
import communities from "../../communityData.json";

function AddNew({ action }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [authNum, setAuthNum] = useState("");
    const [relatedCommunities, setRelatedCommunities] = useState("");
    const [role, setRole] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({});
    
    return (
    <div className="login-container" id="add-new" style={{ padding: "50px"}}>
            <div className="login-card" id="add-new-card" >
                <div className="card-content">
                    <h3 className="card-title" style={{ textAlign: "center" }}>Create New {action.charAt(0).toUpperCase() + action.slice(1)}</h3>

                    <div className="input-group">
                        <span className="input-label">Project Name</span>
                        <input type="text" placeholder="Project Name" className="input-field"
                            value={name} onChange={(e) => setName(e.target.value)} />
                        {errors.name && <p className="error-text">{errors.name}</p>}
                    </div>

                    <div className="input-group">
                        <span className="input-label">Description</span>
                        <input type="text" placeholder="Description" className="input-field"
                            value={description} onChange={(e) => setDescription(e.target.value)} />
                        {errors.description && <p className="error-text">{errors.description}</p>}
                    </div>

                    <div className="input-group">
                        <span className="input-label">Number of Authors</span>
                        <input type="number" placeholder="authNum" className="input-field"
                            value={authNum} onChange={(e) => setAuthNum(e.target.value)} />
                        {errors.authNum && <p className="error-text">{errors.authNum}</p>}
                    </div>

                    <div className="input-group">
                        <span className="input-label">Related Communities</span>
                        <select className="form-select" value={relatedCommunities} onChange={(e) => setRelatedCommunities(e.target.value)}>
                            <option value="" disabled>Select related communities</option>
                            {communities.map((community) => (
                                <option key={community.id} value={community.id}>
                                    {community.name}
                                </option>
                            ))}
                        </select>
                        {errors.relatedCommunities && <p className="error-text">{errors.relatedCommunities}</p>}
                    </div>

                    <div className="input-group">
                        <span className="input-label">Accessibility</span>
                        <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="" disabled>Select accessibility level</option>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                            <option value="restricted">Restricted</option>
                        </select>
                        {errors.role && <p className="error-text">{errors.role}</p>}
                    </div>

                </div>
            </div>
            <div className="button-container" style={{padding: "30px"}}>
                <button className="btn login-btn" style={{width: "100%"}} >Publish</button>
            </div>
        </div>
    );
}

export default AddNew;