import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>SGP</h1>
            <h2>Sistema Gerenciador de Projetos</h2>
            <Link to='/projetos'>Ir para projetos</Link>
        </div>
    )
}

export default Home;