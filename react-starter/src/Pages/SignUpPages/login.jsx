import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter both username and password");
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
        alert("Invalid username or password");
    };

  }

  return (
    <div class="login-container" style={{ padding: "50px" }}>
      <div class="logo-container">
        <img src="src/assets/logoDT.png" class="logo" alt="Sard logo"/>
      </div>

      <div class="login-card">
          <div class="login-content">              
            <h3 class="card-title">Log In</h3>

            <div class="input-group">
              <text class="input-label">Username</text>
              <input type="text" 
              placeholder="Username" 
              class="input-field" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}></input>
            </div>

            <div class="input-group">
              <text class="input-label">Password</text>
              <input type="password"
               placeholder="Password" 
               class="input-field"
               value={password}
               onChange={(e) => setPassword(e.target.value)}></input>
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