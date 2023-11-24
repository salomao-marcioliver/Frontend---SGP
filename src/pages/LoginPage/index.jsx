import { useState, useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import "./styles.css"

const LoginPage = () => {
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassoword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    login(email, password)
  }

  return (
    <div id="login">
      <h1 className="title">SGP</h1>
      <h2 className="description">Sistema Gerenciador de Projetos</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="field">
          <label htmlFor="password">Senha</label>
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassoword(e.target.value)}/>
        </div>
        <div className="actions">
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
