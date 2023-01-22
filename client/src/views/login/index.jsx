import React, { useState } from 'react';
import '../Home.css';
import { Icon } from '@iconify/react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginForm = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
  };

  return (
    <div className='login-page'>
      <div className='form'>
        <form className='login-form' onSubmit={handleLoginForm}>
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
          <h1 className='title'>Login</h1>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit' className='btn'>
            Login
          </button>
          <p className='message'>
            Not registered? <a href='/register'>Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
