import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const usuarios = [
    { email: "admin@aerocode.com", senha: "123", cargo: "Administrador" },
    { email: "engenheiro@aerocode.com", senha: "123", cargo: "Engenheiro" },
    { email: "operador@aerocode.com", senha: "123", cargo: "Operador" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuario = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuario) {
      localStorage.setItem("cargo", usuario.cargo);
      navigate("/gerenciarAeronaves");
    } else {
      alert("Email ou senha inválidos!");
    }
  };

  return (
    <div className='container'>
      <div className='left-side'>
        <img className='logo-text' src='/Aerocode.png' alt='aerocode' />
      </div>

      <div className='right-side'>
        <h2>Login</h2>
        <form className='login-form' onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type='email'
            placeholder='Digite seu email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Senha:</label>
          <input
            type='password'
            placeholder='Digite sua senha'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type='submit'>Logar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
