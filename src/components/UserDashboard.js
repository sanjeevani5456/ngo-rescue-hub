import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function UserDashboard({ user, onLogout }) {
  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    locationText: '',
    imageUrl: '',
    date: '',
    time: '',
    day: ''
  });
  const [loading, setLoading] = useState(false);

  // ✅ Fetch reports and normalize field names
  const fetchReports = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/reports?userId=${user.id}`);
      console.log('Fetched reports:', response.data);

      const normalized = response.data.map(r => ({
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
      }));
      setReports(normalized);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await axios.post('http://localhost:8080/api/reports', {
      ...formData,
      userId: user.id,
    });

    console.log('Report response:', response.data);
    alert(response.data.message || 'Report submitted successfully!');

    // ✅ Extract report from response
    const newReport = response.data.report || response.data;

    // Normalize the new report
    const normalizedReport = {
      id: newReport.id,
      title: newReport.title,
      description: newReport.description,
      locationText: newReport.locationText,
      imageUrl: newReport.imageUrl,
      status: newReport.status || 'Submitted',
      createdAt: newReport.createdAt || new Date().toISOString(),
      submittedByUserId: newReport.submittedByUserId,
      submittedByUserName: newReport.submittedByUserName,
    };

    // ✅ Add to reports list
    setReports((prev) => [normalizedReport, ...prev]);

    // Reset form
    setFormData({
      title: '',
      description: '',
      locationText: '',
      imageUrl: '',
      date: '',
      time: '',
      day: '',
    });
    setShowForm(false);
  } catch (error) {
    alert('Error submitting report: ' + (error.response?.data?.error || 'Unknown error'));
  } finally {
    setLoading(false);
  }
};

  // Status color logic
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

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user.fullName}!</h1>
        <button onClick={onLogout} className="btn-secondary">Logout</button>
      </header>

      <div className="dashboard-content">
        <div className="action-section">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : '+ Submit New Report'}
          </button>
        </div>

        {/* ===== Report Submission Form ===== */}
        {showForm && (
          <div className="report-form">
            <h3>Submit a Rescue Report</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Brief title of the issue"
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Detailed description of the situation"
                />
              </div>

              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="locationText"
                  value={formData.locationText}
                  onChange={handleChange}
                  required
                  placeholder="City or Address"
                />
              </div>

              <div className="form-row">
                <div className="form-group half-width">
                  <label>Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group half-width">
                  <label>Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half-width">
                  <label>Image URL (Optional)</label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="Paste image link"
                  />
                </div>

                <div className="form-group half-width">
                  <label>Day *</label>
                  <input
                    type="text"
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                    placeholder="e.g. Monday"
                    required
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Submitting...' : 'Submit Report'}
              </button>
            </form>
          </div>
        )}

        {/* ===== My Reports Section ===== */}
        <div className="reports-section">
          <h3 style={{ marginTop: '20px', marginBottom: '16px' }}>
            My Reports ({reports.length})
          </h3>

          {reports.length === 0 ? (
            <p className="no-reports">No reports submitted yet.</p>
          ) : (
            <div className="reports-grid">
              {reports.map((report) => (
                <div key={report.id} className="report-card">
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
                    Submitted: {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
