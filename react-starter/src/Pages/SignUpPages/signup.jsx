import { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../../../users.json";

function Signup() {
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, samePassword] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = "Email is required";
        if (!name) newErrors.name = "Name is required";
        if (!password) newErrors.password = "Password is required";
        if (!cpassword) newErrors.cpassword = "Confirm password is required";
        if (password && cpassword && password !== cpassword)
            newErrors.password = "Passwords do not match";
        return newErrors;
    };

    const handlesignup = () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const findUser = (inputEmail) =>
          users.find((u) => u.email.toLowerCase() === inputEmail.toLowerCase());
        
        const routes = {
          admin:     "/HomeAdmin",
          author:    "/HomeAuthor",
          editor:    "/HomeEditor",
          reviewer:  "/HomeReviewer",
          publisher: "/HomePublisher",
        };
        
        const user = findUser(email);
        
        if (!user) {
          setErrors({ email: "No account found with this email" });
          return;
        }
        
        navigate(routes[user.role]);
    };

    return (
        <div className="login-container" style={{ padding: "50px" }}>
            <div className="logo-container">
                <img src="src/assets/logoDT.png" className="logo" alt="Sard logo" />
            </div>

            <div className="login-card">
                <div className="card-content">
                    <h3 className="card-title" style={{ textAlign: "center" }}>Sign Up</h3>

                    <div className="input-group">
                        <span className="input-label">Email</span>
                        <input type="email" placeholder="Email" className="input-field"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>

                    <div className="input-group">
                        <span className="input-label">Name</span>
                        <input type="text" placeholder="Name" className="input-field"
                            value={name} onChange={(e) => setName(e.target.value)} />
                        {errors.name && <p className="error-text">{errors.name}</p>}
                    </div>

                    <div className="input-group">
                        <span className="input-label">Password</span>
                        <input type="password" placeholder="Password" className="input-field"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>

                    <div className="input-group">
                        <span className="input-label">Confirm Password</span>
                        <input type="password" placeholder="Confirm Password" className="input-field"
                            value={cpassword} onChange={(e) => samePassword(e.target.value)} />
                        {errors.cpassword && <p className="error-text">{errors.cpassword}</p>}
                    </div>

                    <div className="input-group">
                        <span className="input-label">Role</span>
                        <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="" disabled>Select a role</option>
                            <option value="author">Author</option>
                            <option value="editor">Editor</option>
                            <option value="reviewer">Reviewer</option>
                            <option value="publisher">Publisher</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <span className="input-label">I agree to the Terms and Conditions</span>
                        <input type="checkbox" className="input-field"
                            checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                    </div>

                    <div className="button-container">
                        <button className="btn login-btn" onClick={handlesignup}>Sign Up</button>
                    </div>
                    <p>
                        Already have an account?{" "}
                        <a href="/login" className="signup-link">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
