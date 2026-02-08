import { useEffect, useState, useContext } from "react";
import { getUserData } from "../api/dashboardService";
import { AuthContext } from "../auth/AuthContext";
import "../styles/Dashboard.css";

export default function UserDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getUserData()
      .then((res) => setMessage(res.data))
      .catch(() => setError("Access denied"));
  }, []);

  // Sample data for Status Overview bar chart (heights as percentage)
  const statusData = [65, 78, 52, 88, 72, 95, 61, 82, 70, 85];

  // Donut chart: Secured 75%, Open 25%
  const securedPercent = 75;
  const openPercent = 25;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const securedStroke = (securedPercent / 100) * circumference;
  const openStroke = (openPercent / 100) * circumference;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">User Dashboard</h1>
        <div className="dashboard-header-actions">
          {user && (
            <span className="dashboard-user">Welcome, {user.username}</span>
          )}
          <button className="dashboard-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-cards-row">
        <div className="dashboard-info-card role">
          <div className="dashboard-card-label">Role</div>
          <div className="dashboard-card-value">user</div>
        </div>
        <div className="dashboard-info-card status">
          <div className="dashboard-card-label">Status</div>
          <div className="dashboard-card-value active">active</div>
        </div>
        <div className="dashboard-info-card access">
          <div className="dashboard-card-label">Access Type</div>
          <div className="dashboard-card-value">secured</div>
        </div>
      </div>

      <div className="dashboard-charts-row">
        <div className="dashboard-chart-card">
          <h3 className="dashboard-chart-title">Status Overview</h3>
          <div className="status-chart">
            {statusData.map((height, i) => (
              <div
                key={i}
                className="status-bar"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="status-labels">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="status-label">
                {19 + i}
              </span>
            ))}
          </div>
        </div>

        <div className="dashboard-chart-card">
          <h3 className="dashboard-chart-title">Access Security</h3>
          <div className="access-chart-container">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="rgba(100, 116, 139, 0.3)"
                strokeWidth="20"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="url(#securedGradient)"
                strokeWidth="20"
                strokeDasharray={`${securedStroke} ${openStroke}`}
                strokeDashoffset="0"
                transform="rotate(-90 80 80)"
              />
              <defs>
                <linearGradient id="securedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <circle
                cx="80"
                cy="80"
                r={radius - 20}
                fill="#1e293b"
              />
              <text
                x="80"
                y="80"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#f8fafc"
                fontSize="20"
                fontWeight="600"
              >
                {securedPercent}%
              </text>
            </svg>
            <div className="access-legend">
              <div className="access-legend-item">
                <span className="access-legend-dot secured" />
                <span>Secured Access</span>
              </div>
              <div className="access-legend-item">
                <span className="access-legend-dot open" />
                <span>Open Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {message && (
        <p style={{ color: "#10b981", marginTop: "1rem", fontSize: "0.9rem" }}>
          ✓ {message}
        </p>
      )}
      {error && <div className="dashboard-error">{error}</div>}
    </div>
  );
}
