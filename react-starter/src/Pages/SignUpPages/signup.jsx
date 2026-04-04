function Signup() {
  return (
    <div style={{ padding: "50px" }}>
      <div class="logo-container">
        <img src="src/assets/logoDT.png" class="logo" alt="Sard logo"/>
      </div>

      <div class="card">
          <div class="card-content">              
            <h3 class="card-title">Sign Up</h3>
            <div>
              <text class="input-label">Email</text>
              <textarea placeholder="Email" class="input-field"></textarea>
            </div>
            <div>
              <text class="input-label">Username</text>
              <textarea placeholder="Username" class="input-field"></textarea>
            </div>
            <div>
              <text class="input-label">Password</text>
              <textarea placeholder="Password" class="input-field"></textarea>
            </div>
            <div>
              <text class="input-label">Confirm Password</text>
              <textarea placeholder="Confirm Password" class="input-field"></textarea>
            </div>
            <div>
                <text class="input-label">Role</text>
                <div class="list-group">
                    <button type="button" class="list-group-item list-group-item-action">Author</button>
                    <button type="button" class="list-group-item list-group-item-action">Editor</button>
                    <button type="button" class="list-group-item list-group-item-action">Reviewer</button>
                    <button type="button" class="list-group-item list-group-item-action">Publisher</button>
                </div>
            </div>
            <div class="button-container">
              <button class="btn btn-primary">Sign Up</button>
            </div>
            <a href="/login" class="signup-link">Already have an account? Login</a>
          </div>
        </div>
    </div>
  );
}

export default Signup;