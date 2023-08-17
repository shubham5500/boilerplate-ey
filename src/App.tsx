import { Route, Routes } from "react-router-dom"
import Login from "./features/auth/Login"
import ClientOnboarding from "./features/clientOnboarding/ClientOnboarding"
import useAuth from "./hooks/useAuth"
import ProtectedRoutes from "./routes/ProtectedRoute"

function App() {
  const { isAuthenticated, authData } = useAuth()

  return (
    <Routes>
      <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
        <Route index path="/" element={<ClientOnboarding />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
