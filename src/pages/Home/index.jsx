import { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

const Div = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H1 = styled.h1`
  color: #FFF;
`;

const H2 = styled.h2`
  color: #FFF;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  background-color: #FFF;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 8px 20px;
`;

const Button = styled.button`
  cursor: pointer;
`

function Home() {
  const { logout } = useContext(AuthContext)
  const handleLogout = () => {
    logout();
  }
  return (
    <Div>
      <H1>SGP</H1>
      <H2>Sistema Gerenciador de Projetos</H2>
        <StyledLink to='/projetos'>Ir para Área de Projetos</StyledLink>
        <StyledLink to='/bolsistas'>Ir para Área de Bolsistas</StyledLink>
        <Button onClick={handleLogout}>Logout</Button>
    </Div>
  )
}

export default Home;