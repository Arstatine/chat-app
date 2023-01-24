import React, { useEffect, useState, useContext } from 'react';
import '../Home.css';
import { Icon } from '@iconify/react';
import { Context } from '../../App';
import { useNavigate } from 'react-router-dom';
import axios from '../../lib/axiosConfig';

const LoginPage = () => {
  const auth = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoggedIn) navigate('/chat-list');
  }, [auth, navigate]);

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginForm = async (e) => {
    e.preventDefault();

    const res = await axios.post('/api/users/login', {
      email: email,
      password: password,
    });

    if (!res.data?.err) {
      setError('');
      navigate('/chat-list');
    } else {
      setError(res.data?.err);
      return;
    }
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
          {error && <div className='error'>{error}</div>}
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
