import { useEffect, useState } from "react"

export default function AdminApproval() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const loadPayments = async () => {
    try {
      setLoading(true)
      setError("")
      const res = await fetch("http://127.0.0.1:8000/api/admin/payments")
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || "Failed to load payments.")
      }

      setPayments(data)
    } catch (err) {
      setError(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPayments()
  }, [])

  const confirmPayment = async (reference) => {
    try {
      setMessage("")
      setError("")

      const res = await fetch(`http://127.0.0.1:8000/api/admin/confirm-payment/${reference}`, {
        method: "POST",
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || "Failed to confirm payment.")
      }

      setMessage(data.message || "Payment confirmed.")
      loadPayments()
    } catch (err) {
      setError(err.message || "Something went wrong.")
    }
  }

  return (
    <div className="page-shell">
      <div className="container section">
        <h2>Admin Approval</h2>
        <div className="section-sub">
          Review payment submissions and activate access manually.
        </div>

        {message && <div className="status-box status-success">{message}</div>}
        {error && <div className="status-box status-error">{error}</div>}
        {loading && <div className="empty-state">Loading payments...</div>}

        {!loading && payments.length === 0 && (
          <div className="empty-state">No payment submissions yet.</div>
        )}

        {!loading &&
          payments.map((payment) => (
            <div className="dashboard-card" key={payment.id} style={{ marginBottom: 18 }}>
              <h3>{payment.payer_name}</h3>
              <p><b>Reference:</b> {payment.reference}</p>
              <p><b>Role:</b> {payment.role}</p>
              <p><b>Transaction ID:</b> {payment.transaction_id}</p>
              <p><b>Date Paid:</b> {payment.date_paid}</p>
              <p><b>Status:</b> {payment.status}</p>
              <p><b>Proof:</b> {payment.proof_image || "No file uploaded"}</p>

              {payment.status !== "verified" && (
                <button
                  className="btn btn-primary"
                  style={{ marginTop: 12 }}
                  onClick={() => confirmPayment(payment.reference)}
                >
                  Confirm Payment
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}