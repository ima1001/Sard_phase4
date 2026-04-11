import { useState } from "react";
import communities from "../../data/communityData.json";
import { SuccessToast } from "../components/MessageCard";

function AddNew({ action }) {
    const [showToast, setShowToast] = useState(false);
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
            selectedCommunities: f.selectedCommunities.includes(title)
                ? f.selectedCommunities.filter((c) => c !== title)
                : [...f.selectedCommunities, title],
        }));
    };

    const validateAndSubmit = () => {
        const newErrors = {};

        if (action === "project") {
            if (!form.name.trim()) newErrors.name = "Project name is required.";
            if (form.selectedCommunities.length === 0) newErrors.selectedCommunities = "Please select at least one community.";
            if (!form.accessibility) newErrors.accessibility = "Please select an accessibility option.";
            if (!form.numAuthors || Number(form.numAuthors) < 1) newErrors.numAuthors = "At least 1 author is required.";

        } else {
            if (!form.name.trim()) newErrors.name = "Community name is required.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }

    };

    const label = action.charAt(0).toUpperCase() + action.slice(1);

    if (action === "project") {
        return (
            <div className="login-container" id="add-new" style={{ padding: "50px" }}>
                <h3 className="card-title" style={{ textAlign: "center" }}>Create New {label}</h3>
                <div className="login-card" id="add-new-card">
                    <div className="card-content">

                        <div className="input-group">
                            <span className="input-label">Project Name *</span>
                            <input type="text" placeholder="Project Name" className="input-field"
                                value={form.name} onChange={set("name")} />
                            {errors.name && <p className="error-text">{errors.name}</p>}
                        </div>

                        <div className="input-group">
                            <span className="input-label">Description</span>
                            <input type="text" placeholder="Description" className="input-field"
                                value={form.description} onChange={set("description")} />
                        </div>

                        <div className="input-group">
                            <span className="input-label">Number of Authors *</span>
                            <input type="number" placeholder="Number of authors" className="input-field" min="1"
                                value={form.numAuthors} onChange={set("numAuthors")} />
                            {errors.numAuthors && <p className="error-text">{errors.numAuthors}</p>}

                        </div>

                        <div className="input-group">
                            <span className="input-label">Related Communities *</span>
                            {communities.map((c) => (
                                <div key={c.id}>
                                    <input type="checkbox"
                                        checked={form.selectedCommunities.includes(c.title)}
                                        onChange={() => toggleCommunity(c.title)} />
                                    <span style={{ marginLeft: "8px" }}>{c.title}</span>
                                </div>
                            ))}
                            {errors.selectedCommunities && <p className="error-text">{errors.selectedCommunities}</p>}
                        </div>

                        <div className="input-group">
                            <span className="input-label">Accessibility *</span>
                            {["Private", "Public"].map((opt) => (
                                <div key={opt}>
                                    <input type="radio" name="accessibility" value={opt}
                                        checked={form.accessibility === opt}
                                        onChange={set("accessibility")} />
                                    <span style={{ marginLeft: "8px" }}>{opt}</span>
                                </div>
                            ))}
                            {errors.accessibility && <p className="error-text">{errors.accessibility}</p>}
                        </div>

                    </div>
                </div>
                <div className="button-container" style={{ padding: "30px" }}>
                    <button className="btn login-btn" style={{ width: "100%" }} onClick={validateAndSubmit}>
                        Publish
                    </button>
                </div>

                {showToast && (
                    <div className="alert_toast" style={{backgroundColor: "transparent", boxShadow: "none",border: "none"}}>
                        <SuccessToast text="Project created successfully!" />
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div className="login-container" id="add-new" style={{ padding: "50px" }}>
                <h3 className="card-title" style={{ textAlign: "center" }}>Create New {label}</h3>
                <div className="login-card" id="add-new-card">
                    <div className="card-content">

                        <div className="input-group">
                            <span className="input-label">Community Name *</span>
                            <input type="text" placeholder="Community" className="input-field"
                                value={form.name} onChange={set("name")} />
                            {errors.name && <p className="error-text">{errors.name}</p>}
                        </div>

                        <div className="input-group">
                            <span className="input-label">Description</span>
                            <input type="text" placeholder="Description" className="input-field"
                                value={form.description} onChange={set("description")} />
                        </div>

                    </div>
                </div>
                <div className="button-container" style={{ padding: "30px" }}>
                    <button className="btn login-btn" style={{ width: "100%" }} onClick={validateAndSubmit}>
                        Publish
                    </button>
                </div>

                {showToast && (
                    <div className="alert_toast" style={{backgroundColor: "transparent", boxShadow: "none",border: "none"}}>
                        <SuccessToast text="Community created successfully!" />
                    </div>
                )}
            </div>
        );
    }
}

export default AddNew;