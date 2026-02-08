import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loginAnimation from "../assets/face-scanning.json";
import { login } from "../api/authService";
import { AuthContext } from "../auth/AuthContext";
import FaceVerification from "../components/FaceVerification";
import "../styles/Login.css";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false); // 🔐 NEW

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!verified) {
      setError("Please verify your face first");
      return;
    }

    try {
      const res = await login(username, password);
      loginUser(res.data);

      if (res.data.roles.includes("ROLE_ADMIN")) navigate("/admin");
      else if (res.data.roles.includes("ROLE_MODERATOR")) navigate("/mod");
      else navigate("/user");

    } catch (err) {
      const msg = err.response?.data?.message || "Invalid username or password";
      setError(msg);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* LOTTIE */}
        <div className="login-lottie">
          <Lottie animationData={loginAnimation} loop />
        </div>

        <h2 className="login-title">LOGIN</h2>

        {/* 🔐 FACE VERIFICATION */}
        {!verified && (
          <FaceVerification onVerified={() => setVerified(true)} />
        )}

        {verified && <p style={{ color: "lightgreen" }}>Face verified ✔</p>}
        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={!verified}
            />
            <label>USERNAME</label>
          </div>

          <div className="input-box">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={!verified}
            />
            <label>PASSWORD</label>
          </div>

          <button
            className="login-btn"
            type="submit"
            disabled={!verified}
          >
            SUBMIT
          </button>
        </form>

        <div className="login-links">
          <span onClick={() => navigate("/register")}>REGISTER</span>
          <span>FORGOT PASSWORD</span>
        </div>
      </div>
    </div>
  );
}
