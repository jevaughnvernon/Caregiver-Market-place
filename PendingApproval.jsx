import { useSearchParams, Link } from "react-router-dom"

export default function PendingApproval() {

  const [params] = useSearchParams()

  const ref = params.get("ref")
  const role = params.get("role")

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h2>Payment Submitted</h2>

      <p>Your proof of payment has been received.</p>

      <p><b>Reference ID:</b> {ref}</p>
      <p><b>Role:</b> {role}</p>

      <p style={{ marginTop: 20 }}>
        Your payment will be verified shortly. You will receive access once it is confirmed.
      </p>

      <div style={{ marginTop: 20 }}>
        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
    </div>
  )
}