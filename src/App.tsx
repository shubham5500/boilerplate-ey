import { Route, Routes } from "react-router-dom"
import Login from "./features/auth/Login"
import ClientOnboarding from "./features/clientOnboarding/ClientOnboarding"
import ProtectedRoutes from "./routes/ProtectedRoute"
import CreateClient from "./features/clientOnboarding/CreateClient"
import Home from "./components/Home"

function App() {

  return (
    <Routes>
      <Route element={<ProtectedRoutes/>}>
        <Route path="/" element={<ClientOnboarding />} />
        <Route path="/onboard" element={<CreateClient />} />
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
