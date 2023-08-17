import { useEffect, useState } from "react"
import { isEmpty } from "lodash"
import { LocalStorageService } from "../utils/localStorageService"
import { useNavigate } from "react-router-dom"

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const data = LocalStorageService.get("auth")
    return !isEmpty(data)
  })
  const [authData, setAuthData] = useState(() => {
    const data = LocalStorageService.get("auth")
    return data
  })
  const navigate = useNavigate()

  const logout = () => {
    setAuthData(null)
    setIsAuthenticated(false)
    LocalStorageService.clear()
    navigate("/login")
    window.location.reload()
  }

  return { isAuthenticated, authData, logout }
}

export default useAuth
