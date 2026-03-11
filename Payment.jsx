import { useSearchParams, useNavigate } from "react-router-dom"

export default function Payment() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const ref = params.get("ref")
  const role = params.get("role")

  const goToInstructions = () => {
    navigate(`/payment-instructions?ref=${ref}&role=${role}`)
  }

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h2>Payment Required</h2>

      <p>Reference ID:</p>
      <b>{ref}</b>

      <p style={{ marginTop: 20 }}>
        Amount Due: <b>JMD 1500</b>
      </p>

      <p>
        <b>Role:</b> {role}
      </p>

      <button
        onClick={goToInstructions}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          fontSize: 16,
        }}
      >
        View Payment Instructions
      </button>
    </div>
  )
}