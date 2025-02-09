import React, { useState } from 'react';
import { message, Spin } from 'antd';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signup } from '../../actions/auth';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      message.info('Enter an email and password');
      return;
    }
    if (!username) {
      message.info('Enter a username to continue');
      return;
    }
    setLoading(true);

    try {
      const success = await dispatch(signup({ email, username, password }));
      console.log(success)
      if (success) {
        message.success('Signup successful');
        navigate("/");
      } else {
        message.error('Username or Email already exist in database');
      }
    } catch (error) {
      message.error(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex gap-5 flex-col'>
        <label>
          <h4>Display Name</h4>
          <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter your username' />
        </label>

        <label htmlFor='email'>
          <h4>Email</h4>
          <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
        </label>

        <label htmlFor='password'>
          <h4>Password</h4>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='*******'
          />
          <div className='flex items-center gap-2 justify-end'>
            <input type="checkbox" className='w-3 cursor-pointer ' checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
            <span className="ml">Show Password</span>
          </div>
        </label>

        <button className='bg-primary text-white p-2' onClick={handleSubmit} disabled={loading}>
          {loading ? <Spin /> : 'Signup'}
        </button>
      </div>
    </div>
  )
}

export default Signup;
