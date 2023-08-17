import { Navigate, Outlet } from "react-router-dom"
import Layout from "../components/Layout"
import useAuth from "../hooks/useAuth"

const ProtectedRoutes = () => {
  const { isAuthenticated, authData, logout } = useAuth()

  return isAuthenticated ? (
    <Layout logout={logout}>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to={"/login"} />
  )
}

export default ProtectedRoutes
