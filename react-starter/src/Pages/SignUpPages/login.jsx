function Login() {
  return (
    <div style={{ padding: "50px" }}>
      <div class="logo-container">
        <img src="src/assets/logoDT.png" class="logo" alt="Sard logo"/>
      </div>

      <div class="card">
          <div class="card-content">              
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
              <button class="btn btn-primary">Login</button>
            </div>
            <a href="/signup" class="signup-link">Don't have an account? Sign up</a>
          </div>
        </div>
    </div>
  );
}

export default Login;