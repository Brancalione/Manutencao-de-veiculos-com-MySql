import React, { useState } from 'react';
import authService from '../authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(email, password);
      window.location.href = '/listar'; // Redireciona para a página principal ou outra rota
    } catch (error) {
      setMessage('Credenciais inválidas');
    }
  };

  return (
    <div className='login'>
      <div className='container1'>
        <form  className="form" onSubmit={handleLogin}>
          <div>
            <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
