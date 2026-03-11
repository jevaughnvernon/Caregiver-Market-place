import { useState } from "react"

export default function Signup() {
  const [role, setRole] = useState("parent")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const submit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const form = new FormData(e.target)
      form.append("role", role)
      form.append("amount", "1500")
      form.append("currency", "JMD")
      form.append("paymentStatus", "unpaid")

      const res = await fetch("http://127.0.0.1:8000/api/signup/start-payment", {
        method: "POST",
        body: form,
      })

      const data = await res.json()
      console.log("Signup response:", data)

      if (!res.ok) {
        throw new Error(data.detail || "Failed to start payment.")
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl
      } else {
        throw new Error("Payment URL was not returned.")
      }
    } catch (err) {
      console.error(err)
      setError(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h2>Join the Platform</h2>

      <div style={{ marginBottom: 20 }}>
        <button
          type="button"
          onClick={() => setRole("parent")}
          style={{
            marginRight: 10,
            padding: "10px 16px",
            backgroundColor: role === "parent" ? "#111" : "#eee",
            color: role === "parent" ? "#fff" : "#000",
            border: "none",
            cursor: "pointer",
          }}
        >
          Parent
        </button>

        <button
          type="button"
          onClick={() => setRole("babysitter")}
          style={{
            padding: "10px 16px",
            backgroundColor: role === "babysitter" ? "#111" : "#eee",
            color: role === "babysitter" ? "#fff" : "#000",
            border: "none",
            cursor: "pointer",
          }}
        >
          Babysitter
        </button>
      </div>

      <form onSubmit={submit}>
        <input name="fullName" placeholder="Full name" required />
        <br />
        <br />

        <input name="phone" placeholder="Phone" required />
        <br />
        <br />

        <input name="email" type="email" placeholder="Email" required />
        <br />
        <br />

        <input name="parish" placeholder="Parish" required />
        <br />
        <br />

        {role === "babysitter" && (
          <>
            <input type="file" name="governmentId" required />
            <br />
            <br />

            <input type="file" name="policeRecord" required />
            <br />
            <br />
          </>
        )}

        <label>
          <input type="checkbox" name="agree" value="true" required /> Agree to
          terms
        </label>

        <br />
        <br />

        {error && (
          <>
            <div style={{ color: "red", marginBottom: 16 }}>{error}</div>
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Starting Payment..." : "Continue to Payment"}
        </button>
      </form>
    </div>
  )
}