import { Route, Routes } from "react-router-dom"
import Login from "./features/auth/Login"
import ClientOnboarding from "./features/clientOnboarding/ClientOnboarding"
import ProtectedRoutes from "./routes/ProtectedRoute"

function App() {

  return (
    <Routes>
      <Route element={<ProtectedRoutes/>}>
        <Route path="/" element={<ClientOnboarding />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
