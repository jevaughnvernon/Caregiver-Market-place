import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="page-shell">
      <div className="container">
        <div className="topbar">
          <div className="brand">
            <div className="brand-badge">👶</div>
            CareLink Jamaica
          </div>

          <div className="nav-actions">
            <Link to="/babysitters">
              <button className="btn btn-secondary">Browse Babysitters</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-secondary">Parent Signup</button>
            </Link>
            <Link to="/babysitter-enrollment">
              <button className="btn btn-primary">Babysitter Enrollment</button>
            </Link>
          </div>
        </div>

        <section className="hero">
          <div className="hero-copy">
            <div className="mini-badge">Trusted childcare connection platform</div>
            <h1>
              Find reliable babysitters and caregivers in Jamaica.
            </h1>
            <p>
              A cleaner, safer, and more professional way for parents to find help
              and for babysitters to offer their services with verified payment and approval.
            </p>

            <div className="hero-actions">
              <Link to="/babysitters">
                <button className="btn btn-primary">Find a Babysitter</button>
              </Link>
              <Link to="/babysitter-enrollment">
                <button className="btn btn-secondary">Join as a Babysitter</button>
              </Link>
            </div>

            <div className="hero-badges">
              <div className="mini-badge">✔ Manual verification</div>
              <div className="mini-badge">💳 JMD 1,500 enrollment</div>
              <div className="mini-badge">📍 Jamaica-focused marketplace</div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="glass-card main-visual">
              <div className="visual-top">
                <div className="visual-pill">● Live Platform View</div>
                <span className="tag">Secure enrollment</span>
              </div>

              <div className="visual-title">Childcare marketplace dashboard</div>
              <div className="visual-sub">
                Parents discover trusted caregivers. Babysitters showcase their rates,
                availability, experience, and preferred age groups in one place.
              </div>

              <div className="visual-grid">
                <div className="stat-tile">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Access to listings</div>
                </div>
                <div className="stat-tile">
                  <div className="stat-number">JMD 1,500</div>
                  <div className="stat-label">Entry access fee</div>
                </div>
                <div className="stat-tile">
                  <div className="stat-number">2-Sided</div>
                  <div className="stat-label">Parent + babysitter platform</div>
                </div>
                <div className="stat-tile">
                  <div className="stat-number">Verified</div>
                  <div className="stat-label">Manual approval process</div>
                </div>
              </div>
            </div>

            <div className="glass-card floating-card">
              <span className="tag">Parent side</span>
              <h3>Need help fast?</h3>
              <p style={{ color: "#64748b", lineHeight: 1.6 }}>
                Browse caregiver profiles by parish, age group, schedule, and rate.
              </p>
            </div>

            <div className="glass-card floating-card bottom">
              <span className="tag">Babysitter side</span>
              <h3>Earn from your care skills</h3>
              <p style={{ color: "#64748b", lineHeight: 1.6 }}>
                Create a profile, submit payment, and get approved to be listed.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>How the platform works</h2>
          <div className="section-sub">
            Clean, simple, and structured for a professional childcare experience.
          </div>

          <div className="grid-3">
            <div className="feature-card">
              <div className="icon-box">📝</div>
              <h3>1. Sign up</h3>
              <p>
                Parents and babysitters complete their registration with the right
                details and service information.
              </p>
            </div>

            <div className="feature-card">
              <div className="icon-box">💰</div>
              <h3>2. Submit payment</h3>
              <p>
                Manual payment instructions are shown after signup, then proof of payment
                is uploaded for verification.
              </p>
            </div>

            <div className="feature-card">
              <div className="icon-box">✅</div>
              <h3>3. Get access</h3>
              <p>
                Once payment is confirmed, parents get access and babysitters can be
                approved for public listing.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Quick actions</h2>
          <div className="section-sub">
            Everything important is only one click away.
          </div>

          <div className="action-grid">
            <Link to="/signup">
              <div className="action-card">
                <div className="icon-box">👨‍👩‍👧</div>
                <h3>Parent Signup</h3>
                <p>Create your parent account and start looking for help.</p>
              </div>
            </Link>

            <Link to="/babysitter-enrollment">
              <div className="action-card">
                <div className="icon-box">🧸</div>
                <h3>Babysitter Enrollment</h3>
                <p>Enter your availability, rates, experience, and age preferences.</p>
              </div>
            </Link>

            <Link to="/babysitters">
              <div className="action-card">
                <div className="icon-box">🔎</div>
                <h3>Browse Listings</h3>
                <p>Search approved babysitters by parish, service type, and more.</p>
              </div>
            </Link>

            <Link to="/admin-approval">
              <div className="action-card">
                <div className="icon-box">🛡️</div>
                <h3>Admin Approval</h3>
                <p>Review proof of payment and activate the correct platform access.</p>
              </div>
            </Link>
          </div>
        </section>

        <div className="footer-space" />
      </div>
    </div>
  )
}