function Register() {
  return (
    <div>
      <h1>Registre</h1>
      <form>
        <div>
          <label>Nom: <input type="text" name="nom" /></label>
        </div>
        <div>
          <label>Email: <input type="email" name="email" /></label>
        </div>
        <div>
          <label>Contrasenya: <input type="password" name="password" /></label>
        </div>
        <button type="submit">Registrar-me</button>
      </form>
    </div>
  )
}

export default Register