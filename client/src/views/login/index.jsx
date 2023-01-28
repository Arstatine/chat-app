import React, { useEffect, useState } from 'react';
import '../Home.css';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from '../../lib/axiosConfig';
import HashLoader from 'react-spinners/HashLoader';

const LoginPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'Login';
    const fetchUser = async () => {
      const response = await axios.get(`/api/users`);
      if (response?.data != null) {
        if (response?.data?.isLoggedIn === true) {
          navigate('/chat-list');
        }
      }
    };

    fetchUser();
  }, []);

  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // on login submit
  const handleLoginForm = async (e) => {
    e.preventDefault();

    const res = await axios.post('/api/users/login', {
      email: email,
      password: password,
    });

    if (!res.data?.err) {
      setIsLoading(true);
      setTimeout(() => {
        setError('');
        navigate('/chat-list');
      }, 1500);
    } else {
      setError(res.data?.err);
      return;
    }
  };

  return isLoading ? (
    <div className='centerLoading'>
      <HashLoader
        color={'#3b8595'}
        loading={isLoading}
        size={150}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  ) : (
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
