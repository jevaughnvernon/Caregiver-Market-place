import { useEffect, useMemo, useState } from "react"

export default function Babysitters() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [selectedParish, setSelectedParish] = useState("")

  useEffect(() => {
    const loadBabysitters = async () => {
      try {
        setLoading(true)
        setError("")

        const res = await fetch("http://127.0.0.1:8000/api/babysitters")
        const result = await res.json()

        if (!res.ok) {
          throw new Error(result.detail || "Failed to load babysitters.")
        }

        setData(result)
      } catch (err) {
        setError(err.message || "Something went wrong.")
      } finally {
        setLoading(false)
      }
    }

    loadBabysitters()
  }, [])

  const parishes = useMemo(() => {
    const unique = [...new Set(data.map((b) => b.parish).filter(Boolean))]
    return unique.sort()
  }, [data])

  const filteredData = useMemo(() => {
    return data.filter((b) => {
      const matchesSearch =
        !search ||
        b.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        b.service_type?.toLowerCase().includes(search.toLowerCase()) ||
        b.preferred_age_group?.toLowerCase().includes(search.toLowerCase())

      const matchesParish = !selectedParish || b.parish === selectedParish
      return matchesSearch && matchesParish
    })
  }, [data, search, selectedParish])

  return (
    <div className="page-shell">
      <div className="container section">
        <h2>Available Babysitters</h2>
        <div className="section-sub">
          Browse approved caregivers, compare rates, and review availability before choosing support.
        </div>

        <div className="toolbar">
          <input
            className="input"
            type="text"
            placeholder="Search by name, service, or age group"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: 360 }}
          />

          <select
            className="select"
            value={selectedParish}
            onChange={(e) => setSelectedParish(e.target.value)}
            style={{ maxWidth: 220 }}
          >
            <option value="">All Parishes</option>
            {parishes.map((parish) => (
              <option key={parish} value={parish}>
                {parish}
              </option>
            ))}
          </select>
        </div>

        {loading && <div className="empty-state">Loading babysitters...</div>}
        {error && <div className="status-box status-error">{error}</div>}

        {!loading && !error && filteredData.length === 0 && (
          <div className="empty-state">No babysitters found yet.</div>
        )}

        {!loading && !error && filteredData.length > 0 && (
          <div className="listing-grid">
            {filteredData.map((b) => (
              <div className="listing-card" key={b.id}>
                <span className="tag">{b.parish || "Jamaica"}</span>
                <h3>{b.full_name}</h3>
                <p>{b.bio || "No bio added yet."}</p>

                <div className="listing-meta">
                  <div>
                    <span className="meta-chip">🧠 {b.experience || "Experience not set"}</span>
                    <span className="meta-chip">🛎️ {b.service_type || "Service not set"}</span>
                    <span className="meta-chip">⏰ {b.availability || "Availability not set"}</span>
                    <span className="meta-chip">🕒 {b.hours || "Hours not set"}</span>
                    <span className="meta-chip">👶 {b.preferred_age_group || "Age group not set"}</span>
                    <span className="meta-chip">
                      💵 {b.hourly_rate ? `JMD ${b.hourly_rate}` : "Rate not set"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}