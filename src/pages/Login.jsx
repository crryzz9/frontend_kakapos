function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label>Email: <input type="email" name="email" /></label>
        </div>
        <div>
          <label>Contrasenya: <input type="password" name="password" /></label>
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default Login