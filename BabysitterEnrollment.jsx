import { useState } from "react"

export default function BabysitterEnrollment() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const form = new FormData(e.target)
      form.append("role", "babysitter")
      form.append("amount", "1500")
      form.append("currency", "JMD")
      form.append("paymentStatus", "unpaid")

      const res = await fetch("http://127.0.0.1:8000/api/signup/start-payment", {
        method: "POST",
        body: form,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || "Failed to start payment.")
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl
      } else {
        throw new Error("Payment URL was not returned.")
      }
    } catch (err) {
      setError(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-shell">
      <div className="container section">
        <div className="form-wrap">
          <h2 className="form-title">Babysitter Enrollment</h2>
          <div className="form-sub">
            Build your public caregiver profile with service details parents can trust.
          </div>

          <form onSubmit={submit}>
            <div className="form-grid">
              <input className="input" name="fullName" placeholder="Full Name" required />
              <input className="input" name="phone" placeholder="Phone / WhatsApp" required />
              <input className="input" name="email" type="email" placeholder="Email" required />
              <input className="input" name="parish" placeholder="Parish" required />
              <input className="input" name="experience" placeholder="Years of experience" required />
              <input className="input" name="serviceType" placeholder="Service type" required />
              <input className="input" name="availability" placeholder="Availability" required />
              <input className="input" name="hours" placeholder="Working hours" required />
              <input className="input" name="preferredAgeGroup" placeholder="Preferred age group" required />
              <input className="input" name="hourlyRate" placeholder="Hourly rate in JMD" required />

              <div className="form-full">
                <textarea
                  className="textarea"
                  name="bio"
                  placeholder="Short bio about your childcare experience"
                  required
                />
              </div>

              <div>
                <input className="input" type="file" name="governmentId" required />
              </div>

              <div>
                <input className="input" type="file" name="policeRecord" required />
              </div>
            </div>

            <div className="form-note">
              Enrollment fee is <b>JMD 1,500</b>. After submitting, you will receive manual
              payment instructions and can upload proof of payment for admin review.
            </div>

            <label style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18 }}>
              <input type="checkbox" name="agree" value="true" required />
              I confirm that the information I entered is correct.
            </label>

            {error && <div className="status-box status-error">{error}</div>}

            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Starting Payment..." : "Continue to Payment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}