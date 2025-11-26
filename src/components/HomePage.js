import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const [showModal, setShowModal] = useState(false);

  // Add the paw background only on this page
  useEffect(() => {
    document.body.classList.add("home-bg");
    return () => document.body.classList.remove("home-bg");
  }, []);

  return (
    <div className="homepage">
      {/* Header */}
      <header className="home-header">
        <img
          src="/assets/guardian-logo-hero.png"
          alt="Project Guardian logo"
          className="logo-img"
        />
        <h1>NGO Rescue Hub</h1>
        <p className="tagline">Compassion. Protection. Community.</p>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>Together we rescue, heal and re-home.</h2>
          <p>
            Our Rescue Hub connects caring people, volunteers and NGOs to
            respond quickly to animals in need. Report an injured animal,
            collaborate with rescue teams, or donate to support urgent care.
          </p>

          <div className="cta-buttons">
            <Link to="/register" className="btn-cta btn-join">
              Join Us as NGO
            </Link>
            <Link to="/login" className="btn-cta btn-report">
              Report Now
            </Link>
            {/* ✅ Donate button opens modal */}
            <button 
              onClick={() => setShowModal(true)} 
              className="btn-cta btn-donate"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              Donate
            </button>
          </div>
        </div>

        <div className="hero-image-box">
          <img
            src="/assets/guardian-logo-hero.png"
            alt="Rescue logo illustration"
            className="hero-logo"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h3>How you can help</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>Report an Injured Animal</h4>
            <p>
              Fast reporting with photo, location and urgency level so
              responders reach them sooner.
            </p>
          </div>

          <div className="feature-card">
            <h4>NGO Collaboration</h4>
            <p>
              Coordinate across shelters and NGOs — manage capacity, share
              resources, and route cases.
            </p>
          </div>

          <div className="feature-card">
            <h4>Donate to Help</h4>
            <p>
              Support medical care, transport and shelter costs for rescued
              animals in urgent need.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        {new Date().getFullYear()} Project Guardian • 
        Contact us: guardianhelp@ngo.org
      </footer>

      {/* ✅ Under Construction Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">🚧</div>
            <h2>Under Construction</h2>
            <p>
              Our donation feature is currently being built! We're working hard
              to make it easy and secure for you to support rescued animals.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#6b6a75', marginTop: '10px' }}>
              Check back soon or contact us at <strong>guardianhelp@ngo.org</strong>
            </p>
            <button 
              onClick={() => setShowModal(false)} 
              className="modal-close-btn"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      
    </div>
  );
}

export default HomePage;