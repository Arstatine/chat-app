import React from 'react';
import '../Home.css';
import { Icon } from '@iconify/react';

const RegisterPage = () => {
  return (
    <div className='login-page'>
      <div className='form'>
        <form className='register-form'>
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
          <input type='text' name='name' placeholder='Name' />
          <input type='text' name='username' placeholder='Username' />
          <input type='password' name='password' placeholder='Password' />
          <input type='email' name='email' placeholder='Email address' />
          <button className='btn'>Create</button>
          <p className='message'>
            Already registered? <a href='/login'>Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
