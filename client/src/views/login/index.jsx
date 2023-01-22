import React from 'react';
import '../Home.css';
import { Icon } from '@iconify/react';

const LoginPage = () => {
  return (
    <div className='login-page'>
      <div className='form'>
        <form className='login-form'>
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
          <input className='text' placeholder='Username' />
          <input className='password' placeholder='Password' />
          <button className='btn'>Login</button>
          <p className='message'>
            Not registered? <a href='/register'>Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
