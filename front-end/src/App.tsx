import { Navigate, Outlet } from "react-router-dom"

const App = () => {
  const logout = () => {
    localStorage.clear()
    return <Navigate to='/login' />
  }
  return (
    <Outlet />
  )
}

export default App