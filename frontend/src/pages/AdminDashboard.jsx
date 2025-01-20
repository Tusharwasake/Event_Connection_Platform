import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./AdminDashboard.css"

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <li onClick={() => navigate('/admin/users')}>Manage Users</li>
          <li onClick={() => navigate('/event')}>Manage Events</li>
          <li onClick={() => navigate('/admin/analytics')}>Analytics</li>
          <li onClick={() => navigate('/admin/settings')}>Settings</li>
          <li onClick={handleLogout} className="logout-btn">
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        <header className="admin-header">
          <h1>Welcome, Admin</h1>
        </header>

        <section className="dashboard-cards">
          <div className="card">
            <h3>Total Users</h3>
            <p>200</p>
          </div>
          <div className="card">
            <h3>Active Events</h3>
            <p>15</p>
          </div>
          <div className="card">
            <h3>Pending Approvals</h3>
            <p>8</p>
          </div>
          <div className="card">
            <h3>Revenue</h3>
            <p>$10,000</p>
          </div>
        </section>

        <section className="activity-section">
          <h2>Recent Activities</h2>
          <ul>
            <li>User "John" registered for "Music Fest 2025".</li>
            <li>Event "Gaming Night" was created.</li>
            <li>User "Alice" submitted a refund request.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
