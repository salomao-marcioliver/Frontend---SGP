import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, AuthContext } from '../contexts/auth'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import LoginPage from '../pages/LoginPage'
import { useContext } from 'react'
import Students from '../pages/Students'

function MainRoutes() {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext)

    if (loading) {
      return <div className="loading">Carregando...</div>
    }

    if (!authenticated) {
      return <Navigate to="/login" />
    } else {
      return children
    }
  }
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/' element={<Private><Home /></Private>} />
          <Route exact path='/projetos' element={<Private><Projects /></Private>} />
          <Route exact path='/bolsistas' element={<Private><Students /></Private>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default MainRoutes