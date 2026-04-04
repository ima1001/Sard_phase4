function Login() {
  return (
    <div class="login-container" style={{ padding: "50px" }}>
      <div class="logo-card">
        <img src="src/assets/logoDT.png" class="logo" alt="Sard logo"/>
      </div>

      <div class="card">
          <div class="login-content">              
            <h3 class="card-title">Login</h3>
            <div>
              <text class="input-label">Username</text>
              <textarea placeholder="Username" class="input-field"></textarea>
            </div>
            <div>
              <text class="input-label">Password</text>
              <textarea placeholder="Password" class="input-field"></textarea>
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