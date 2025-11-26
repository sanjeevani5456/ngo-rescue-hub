import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function NgoDashboard({ user, onLogout }) {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all rescue reports (not just NGO's)
  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/reports');
      console.log('Fetched reports for NGO:', response.data);

      // Normalize report data so both User + NGO dashboards match
      const normalized = response.data.map((r) => ({
        id: r.id,
        title: r.title || r.reportTitle,
        description: r.description || r.reportDescription,
        locationText: r.locationText || r.location,
        imageUrl: r.imageUrl || r.imgUrl,
        date: r.date || r.reportDate,
        time: r.time || r.reportTime,
        day: r.day,
        status: r.status || 'Submitted',
        createdAt: r.createdAt || new Date().toISOString(),
        userId: r.userId,
      }));

      setReports(normalized);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Update report status (In-Progress → Resolved)
  const handleStatusUpdate = async (reportId, newStatus) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/reports/${reportId}/resolve`, {
      status: newStatus,
      ngoUserId: user.id,
    });

    alert(response.data.message || `Report status updated to ${newStatus}!`);
    fetchReports(); // Refresh the list
  } catch (error) {
    alert('Error updating status: ' + (error.response?.data?.error || 'Unknown error'));
  }
};

  // Color coding by status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted':
        return '#f39c12';
      case 'In-Progress':
        return '#3498db';
      case 'Resolved':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  // Filter reports by status
  const filteredReports = reports.filter((report) => {
    if (filter === 'all') return true;
    return report.status === filter;
  });

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>NGO Dashboard - {user.fullName}</h1>
        <button onClick={onLogout} className="btn-secondary">Logout</button>
      </header>

      <div className="dashboard-content">
        {/* ===== Summary Cards ===== */}
        <div className="stats-section">
          <div className="stat-card">
            <h3>{reports.length}</h3>
            <p>Total Reports</p>
          </div>
          <div className="stat-card">
            <h3>{reports.filter((r) => r.status === 'Submitted').length}</h3>
            <p>Pending</p>
          </div>
          <div className="stat-card">
            <h3>{reports.filter((r) => r.status === 'In-Progress').length}</h3>
            <p>In Progress</p>
          </div>
          <div className="stat-card">
            <h3>{reports.filter((r) => r.status === 'Resolved').length}</h3>
            <p>Resolved</p>
          </div>
        </div>

        {/* ===== Filter Dropdown ===== */}
        <div className="filter-section">
          <label>Filter by status: </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Reports</option>
            <option value="Submitted">Submitted</option>
            <option value="In-Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {/* ===== Reports Section ===== */}
        <div className="reports-section">
          <h3>All Rescue Reports ({filteredReports.length})</h3>
          {loading ? (
            <p>Loading reports...</p>
          ) : filteredReports.length === 0 ? (
            <p className="no-reports">No reports available.</p>
          ) : (
            <div className="reports-grid">
              {filteredReports.map((report) => (
                <div key={report.id} className="report-card ngo-card">
                  <div className="report-header">
                    <h4>{report.title}</h4>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(report.status) }}
                    >
                      {report.status}
                    </span>
                  </div>

                  {report.imageUrl && (
                    <img
                      src={report.imageUrl}
                      alt={report.title}
                      className="report-image"
                    />
                  )}

                  <p className="report-description">{report.description}</p>
                  <p className="report-location">📍 {report.locationText}</p>
                  <p className="report-date">
                    📅 {report.date} ({report.day}) 🕒 {report.time}
                  </p>
                  <p className="report-meta">
                    Submitted: {new Date(report.createdAt).toLocaleDateString()}
                  </p>

                  <div className="action-buttons">
                    {report.status === 'Submitted' && (
                      <button
                        onClick={() => handleStatusUpdate(report.id, 'In-Progress')}
                        className="btn-action btn-progress"
                      >
                        Mark In Progress
                      </button>
                    )}
                    {report.status === 'In-Progress' && (
                      <button
                        onClick={() => handleStatusUpdate(report.id, 'Resolved')}
                        className="btn-action btn-resolve"
                      >
                        Mark Resolved
                      </button>
                    )}
                    {report.status === 'Resolved' && (
                      <span className="resolved-text">✓ Case Closed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NgoDashboard;
