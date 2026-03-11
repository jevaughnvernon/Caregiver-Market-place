import { useSearchParams, Link } from "react-router-dom"

export default function BabysitterDashboard() {
  const [params] = useSearchParams()
  const ref = params.get("ref")

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h2>Babysitter Dashboard</h2>

      <p>Welcome to your babysitter account.</p>

      <p>
        <b>Reference:</b> {ref || "Not available"}
      </p>

      <div style={{ marginTop: 20 }}>
        <p>Your enrollment was submitted successfully.</p>
        <p>You can now manage your babysitter profile and view your status.</p>
      </div>

      <div style={{ marginTop: 30 }}>
        <Link to="/babysitters">
          <button>View Public Babysitter Listings</button>
        </Link>
      </div>
    </div>
  )
}