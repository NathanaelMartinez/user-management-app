import React, { useState } from 'react';

interface RegisterFormProps {
  onSubmit: (name: string, email: string, password: string) => void; // Pass down the submit handler
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(name, email, password); // call submit handler that was passed as prop
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">Register</button>
    </form>
  );
};

export default RegisterForm;
