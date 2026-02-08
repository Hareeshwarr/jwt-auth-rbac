import { useEffect, useState, useContext } from "react";
import { getAdminData } from "../api/dashboardService";
import { AuthContext } from "../auth/AuthContext";
import "../styles/Dashboard.css";

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminData()
      .then((res) => setMessage(res.data))
      .catch(() => setError("Access denied"));
  }, []);

  const statusData = [72, 85, 68, 92, 78, 88, 95, 82, 90, 75];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
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
          <div className="dashboard-card-value">admin</div>
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
                r={60}
                fill="none"
                stroke="rgba(100, 116, 139, 0.3)"
                strokeWidth="20"
              />
              <circle
                cx="80"
                cy="80"
                r={60}
                fill="none"
                stroke="url(#adminSecuredGradient)"
                strokeWidth="20"
                strokeDasharray={`${282.7} ${94.2}`}
                transform="rotate(-90 80 80)"
              />
              <defs>
                <linearGradient id="adminSecuredGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <circle cx="80" cy="80" r={40} fill="#1e293b" />
              <text x="80" y="80" textAnchor="middle" dominantBaseline="middle" fill="#f8fafc" fontSize="20" fontWeight="600">75%</text>
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
