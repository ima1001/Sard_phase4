import { useState } from "react";
import { PersonCircle } from "react-bootstrap-icons";

function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSave = () => {
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email");
      setShowSuccess(false);
      return;
    }

    setEmailError("");
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="settings-page">
      <h1 className="settings-title">Account Settings</h1>

      {showSuccess && (
        <div className="settings-success-box">
          <span>Changes saved</span>
        </div>
      )}

      <div className="settings-card-wrapper">
        <div className="settings-card">
          <PersonCircle className="settings-profile-icon" />

          <div className="settings-form">
            <div className="settings-row">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="settings-row">
            <label>Email</label>
            <div className="settings-input-wrapper">
              <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
                }}
              className={emailError ? "settings-input-error" : ""}
              />
            {emailError && <p className="input-error">{emailError}</p>}
          </div>
        </div>

            <div className="settings-row">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <button className="settings-save-btn" onClick={handleSave}>
        Save changes
      </button>
    </div>
  );
}

export default SettingsPage;