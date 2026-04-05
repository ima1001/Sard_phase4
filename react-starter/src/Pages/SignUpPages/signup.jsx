import { useState } from "react";
import { AlignCenter } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, samePassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!username) {
      newErrors.username = "Username is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    if (!cpassword) {
      newErrors.cpassword = "Confirm password is required";
    }
    if (password && cpassword && password !== cpassword) {
      newErrors.password = "Passwords do not match";
    }
    return newErrors;
  }

    const handlesignup = () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
        
        switch (role) {
        case "author":
            navigate("/HomeAuthor");
            break;
        case "editor":
            navigate("/HomeEditor");
            break; 
        case "reviewer":
            navigate("/HomeReviewer");
            break;
        case "publisher":
            navigate("/HomePublisher");
            break;
        default:
            alert("Choose a role.");
        };

    }


    return (
        <div class="login-container" style={{ padding: "50px" }}>
        <div class="logo-container">
            <img src="src/assets/logoDT.png" class="logo" alt="Sard logo"/>
        </div>

        <div class="login-card">
            <div class="card-content">              
                <h3 class="card-title" style={{textAlign: "center"}}>Sign Up</h3>
                <div class="input-group">

                <text class="input-label">Email</text>
                <input
                type="email"
                placeholder="Email"
                class="input-field"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}/>
                {errors.email && <p className="error-text">{errors.email}</p>}

                </div>

                <div class="input-group">
                <text class="input-label">Username</text>
                <input
                type="text"
                placeholder="Username"
                class="input-field"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}/>
                {errors.username && <p className="error-text">{errors.username}</p>}

                </div>

                <div class="input-group">
                <text class="input-label">Password</text>
                <input
                type="password"
                placeholder="Password"
                class="input-field"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}/>
                {errors.password && <p className="error-text">{errors.password}</p>}
                </div>

                <div class="input-group">
                <text class="input-label">Confirm Password</text>
                <input 
                type="password"
                placeholder="Confirm Password"
                class="input-field"
                 value={cpassword}
                 onChange={(e) => samePassword(e.target.value)}/>
                </div>

                <div class="input-group">
                    <text class="input-label">Role</text>
                    <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                        <div class="dropdown-content">
                            <option value="" disabled>Select a role</option>
                            <option value="author">Author</option>
                            <option value="editor">Editor</option>
                            <option value="reviewer">Reviewer</option>
                            <option value="publisher">Publisher</option>
                        </div>
                    </select>
                </div>
                
                <div class="button-container">
                <button class="btn login-btn" onClick={handlesignup}>Sign Up</button>
                </div>
                <p>
                    Already have an account? 
                    <a href="/login" class="signup-link">Login</a>
                </p>            
            </div>
            </div>
        </div>
    );
    }

export default Signup;