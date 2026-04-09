import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
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

    switch (email.toLowerCase()) {
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
        setErrors(newErrors => ({ ...newErrors, email: "Invalid email" }));
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
              <text class="input-label">Email</text>
              <input type="email" 
              placeholder="Email" 
              class="input-field" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}/>
              {errors.email && <p className="error-text">{errors.email}</p>}
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