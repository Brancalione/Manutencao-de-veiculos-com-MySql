import React, { useState } from 'react';
import authService from '../authService';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authService.register(email, password, role);
      window.location.href = '/login';
    } catch (error) {
      setMessage('Erro ao registrar');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>Role:</label>
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
      </div>
      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Register;
