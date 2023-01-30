import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

function Home() {
  const { logout } = useContext(AuthContext)
  const handleLogout = () => {
    logout();
  }
  return (
    <div>
      <h1>SGP</h1>
      <h2>Sistema Gerenciador de Projetos</h2>
      <Link to='/projetos'>Ir para Área de Projetos</Link>
      <br />
      <Link to='/bolsistas'>Ir para Área de Bolsistas</Link>
      <br />
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home;