function Login() {
  return (
    <div class="login-container" style={{ padding: "50px" }}>
      <div class="logo-card">
        <img src="src/assets/logoDT.png" class="logo" alt="Sard logo"/>
      </div>

      <div class="login-card">
          <div class="login-content">              
            <h3 class="card-title">Log In</h3>
            <div class="input-group">
              <text class="input-label">Username</text>
              <input type="text" placeholder="Username" class="input-field"></input>
            </div>
            <div class="input-group">
              <text class="input-label">Password</text>
              <input type="password" placeholder="Password" class="input-field"></input>
            </div>
            <div class="button-container">
              <button class="btn login-btn">Login</button>
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