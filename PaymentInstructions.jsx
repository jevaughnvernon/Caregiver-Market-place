import { useSearchParams, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function PaymentInstructions() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const ref = params.get("ref")
  const role = params.get("role")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const submitProof = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const form = new FormData(e.target)
      form.append("reference", ref)
      form.append("role", role)

      const res = await fetch("http://127.0.0.1:8000/api/payments/submit-proof", {
        method: "POST",
        body: form,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || "Failed to submit proof of payment.")
      }

      navigate(`/pending-approval?ref=${ref}&role=${role}`)
    } catch (err) {
      setError(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: "Arial", maxWidth: 700 }}>
      <h2>Manual Payment Instructions</h2>

      <p><b>Reference ID:</b> {ref}</p>
      <p><b>Role:</b> {role}</p>
      <p><b>Amount:</b> JMD 1500</p>

      <div style={{ border: "1px solid #ccc", padding: 16, marginTop: 20, borderRadius: 8 }}>
        <h3>How to Pay</h3>
        <p><b>Bank Name:</b> Your Bank Name</p>
        <p><b>Account Name:</b> Omnivar Innovations Group</p>
        <p><b>Account Number:</b> 1234567890</p>
        <p><b>Branch:</b> Main Branch</p>
        <p><b>Payment Note:</b> Use your Reference ID when sending payment</p>
      </div>

      <form onSubmit={submitProof} style={{ marginTop: 30 }}>
        <h3>Submit Proof of Payment</h3>

        <input name="payerName" placeholder="Payer Full Name" required />
        <br /><br />

        <input name="transactionId" placeholder="Transaction ID / Receipt Number" required />
        <br /><br />

        <input name="datePaid" type="date" required />
        <br /><br />

        <input type="file" name="proofImage" required />
        <br /><br />

        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Proof of Payment"}
        </button>
      </form>
    </div>
  )
}