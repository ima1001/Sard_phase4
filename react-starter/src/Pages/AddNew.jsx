import { useState } from "react";
import communities from "../../data/communityData.json";

function AddNew({ action }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [authNum, setAuthNum] = useState("");
    const [relatedCommunities, setRelatedCommunities] = useState("");
    const [role, setRole] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        name: "",
        description: "",
        numAuthors: "",
        selectedCommunities: [],
        accessibility: "",
    });
        const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
    const toggleCommunity = (title) => {
        setForm((f) => ({
            ...f,
            selectedCommunities: f.selectedCommunities.includes(title)?
             f.selectedCommunities.filter((c) => c !== title)
             : [...f.selectedCommunities, title],
        }));
    };
    if (action == "project") {
        return (
            
        <div className="login-container" id="add-new" style={{ padding: "50px"}}>
                <h3 className="card-title" style={{ textAlign: "center" }}>Create New {action.charAt(0).toUpperCase() + action.slice(1)}</h3>
                <div className="login-card" id="add-new-card" >
                    <div className="card-content">
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
                            {communities.map((c) => (
                                <div key={c.id}>
                                    <input type="checkbox"
                                        checked={form.selectedCommunities.includes(c.title)}
                                        onChange={() => toggleCommunity(c.title)} />
                                    <span style={{ marginLeft: "8px" }}>{c.title}</span>
                                </div>
                            ))}
                            {errors.relatedCommunities && <p className="error-text">{errors.relatedCommunities}</p>}
                        </div>

                        <div className="input-group">
                            <span className="input-label">Accessibility</span>
                            {["Private", "Public"].map((opt) => (
                                <div key={opt}>
                                    <input type="radio" name="accessibility" value={opt}
                                        checked={form.accessibility === opt}
                                        onChange={set("accessibility")} />
                                    <span style={{ marginLeft: "8px" }}>{opt}</span>
                                </div>
                            ))}

                            {errors.role && <p className="error-text">{errors.role}</p>}
                        </div>

                    </div>
                </div>
                <div className="button-container" style={{padding: "30px"}}>
                    <button className="btn login-btn" style={{width: "100%"}} >Publish</button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="login-container" id="add-new" style={{ padding: "50px" }}>
                <div className="login-card" id="add-new-card">
                    <div className="card-content">
                        <h3 className="card-title" style={{ textAlign: "center" }}>
                            Create New {action.charAt(0).toUpperCase() + action.slice(1)}
                        </h3>

                        <div className="input-group">
                            <span className="input-label">Community</span>
                            <input type="text" placeholder="Community" className="input-field"
                                value={name} onChange={(e) => setName(e.target.value)} required/>
                            {errors.name && <p className="error-text">{errors.name}</p>}
                        </div>

                        <div className="input-group">
                            <span className="input-label">Description</span>
                            <input type="text" placeholder="Description" className="input-field"
                                value={description} onChange={(e) => setDescription(e.target.value)} required />
                            {errors.description && <p className="error-text">{errors.description}</p>}
                        </div>
                    </div>
                </div>
                <div className="button-container" style={{ padding: "30px" }}>
                    <button className="btn login-btn" style={{ width: "100%" }}>Publish</button>
                </div>
            </div>
        );
    }
}

export default AddNew;