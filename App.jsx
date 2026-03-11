import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Babysitters from "./pages/Babysitters"
import Dashboard from "./pages/Dashboard"
import Payment from "./pages/Payment"
import PaymentInstructions from "./pages/PaymentInstructions"
import PendingApproval from "./pages/PendingApproval"
import BabysitterEnrollment from "./pages/BabysitterEnrollment"
import BabysitterDashboard from "./pages/BabysitterDashboard"
import AdminApproval from "./pages/AdminApproval"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/babysitters" element={<Babysitters />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment-instructions" element={<PaymentInstructions />} />
      <Route path="/pending-approval" element={<PendingApproval />} />
      <Route path="/babysitter-enrollment" element={<BabysitterEnrollment />} />
      <Route path="/babysitter-dashboard" element={<BabysitterDashboard />} />
      <Route path="/admin-approval" element={<AdminApproval />} />
    </Routes>
  )
}