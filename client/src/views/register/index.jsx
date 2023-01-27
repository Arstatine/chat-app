import React, { useEffect, useState, useContext } from 'react';
import '../Home.css';
import { Icon } from '@iconify/react';
import axios from '../../lib/axiosConfig';
import { Context } from '../../App';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const auth = useContext(Context);

  // check if logged in
  useEffect(() => {
    document.title = 'Register';
    if (auth.isLoggedIn) {
      navigate('/chat-list');
    }
  }, [auth, navigate]);

  // states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // on register form submit
  const handleRegisterForm = async (e) => {
    e.preventDefault();

    const response = await axios.post('/api/users', {
      name,
      email,
      password,
    });

    if (response.data?.err) {
      setError(response.data?.err);
    } else {
      setError('');
      setName('');
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
          {error && <div className='error'>{error}</div>}

          <input
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
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
