import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = "Username is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  }

  const handleLogin = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    switch (username.toLowerCase()) {
      case "admin":
        navigate("/HomeAdmin");
        break;
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
        setErrors(newErrors => ({ ...newErrors, username: "Invalid username" }));
    };

  }

  return (
    <div class="login-container" style={{ padding: "50px" }}>
      <div class="logo-container">
        <img src="src/assets/logoDT.png" class="logo" alt="Sard logo"/>
      </div>

      <div class="login-card">
          <div class="login-content">              
            <h3 class="card-title" style={{textAlign: "center"}}>Log In</h3>

            <div class="input-group">
              <text class="input-label">Username</text>
              <input type="text" 
              placeholder="Username" 
              class="input-field" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}/>
              {errors.username && <p className="error-text">{errors.username}</p>}
            </div>

            <div class="input-group">
              <text class="input-label">Password</text>
              <input type="password"
               placeholder="Password" 
               class="input-field"
               value={password}
               onChange={(e) => setPassword(e.target.value)}/>
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            <div class="button-container">
              <button 
              class="btn login-btn"
              onClick={handleLogin}>Login</button>
            </div>

            <p>
              Don't have an account? 
              <a href="/signup" class="signup-link">Sign up</a>
            </p>
          </div>
        </div>
    </div>
  );
}

export default Login;