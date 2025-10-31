import "../styles/Login.css";

function login() {
  return (
    <div className='container'>
        <div className='left-side'>
            <img className="logo-text" src='/Aerocode.png' alt='aerocode'></img>
        </div>
        <div className='right-side'>
            <h2>Login</h2>
        <form className='login-form'>
            <label>Email:</label>
            <input type='email' placeholder='Digite seu email:'></input>
            <label>Senha:</label>
            <input type='password' placeholder='Digite sua senha:'></input>

            <button type='submit'>Logar</button>
        </form>
        </div>
    </div>
  );
}

export default login