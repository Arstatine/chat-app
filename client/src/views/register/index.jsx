import React, { useState } from 'react';
import '../Home.css';
import { Icon } from '@iconify/react';
import axios from '../../lib/axiosConfig';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegisterForm = async (e) => {
    e.preventDefault();

    const response = await axios.post('/api/users', {
      name,
      username,
      email,
      password,
    });

    if (response.data?.err) {
      setError(response.data?.err);
    } else {
      setError('');
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className='login-page'>
      <div className='form'>
        <form className='register-form' onSubmit={handleRegisterForm}>
          <div className='link-btn-back'>
            <a href='/'>
              <Icon
                icon='material-symbols:arrow-back-ios-new-rounded'
                inline={true}
              />{' '}
              HOME
            </a>
          </div>
          <br />
          <br />
          <h1 className='title'>Create an Account</h1>
          {error}
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type='submit' className='btn'>
            Create
          </button>
          <p className='message'>
            Already registered? <a href='/login'>Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
