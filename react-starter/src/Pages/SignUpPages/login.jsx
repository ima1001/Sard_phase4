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
    <div className="login-container" style={{ padding: "50px" }}>
      <div className="logo-container">
        <img src="src/assets/logoDT.png" className="logo" alt="Sard logo"/>
      </div>

      <div className="login-card">
          <div className="login-content">              
            <h3 className="card-title" style={{textAlign: "center"}}>Log In</h3>

            <div className="input-group">
              <span className="input-label">Email</span>
              <input type="email" 
              placeholder="Email" 
              className="input-field" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}/>
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="input-group">
              <span className="input-label">Password</span>
              <input type="password"
               placeholder="Password" 
               className="input-field"
               value={password}
               onChange={(e) => setPassword(e.target.value)}/>
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            <div className="button-container">
              <button 
              className="btn login-btn"
              onClick={handleLogin}>Login</button>
            </div>

            <p>
              Don't have an account? 
              <a href="/signup" className="signup-link">Sign up</a>
            </p>
          </div>
        </div>
    </div>
  );
}

export default Login;