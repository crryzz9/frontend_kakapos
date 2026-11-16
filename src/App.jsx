import { NavLink, Outlet } from 'react-router-dom'

function App() {
  const classe = ({ isActive }) => (isActive ? 'font-bold underline' : '')

  return (
    <div>
      <nav className="flex gap-4 bg-gray-100 p-4">
        <NavLink to="/" end className={classe}>Home</NavLink>
        <NavLink to="/login" className={classe}>Login</NavLink>
        <NavLink to="/register" className={classe}>Register</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

export default App