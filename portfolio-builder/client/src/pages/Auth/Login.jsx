import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message, Spin } from 'antd';

import { login } from '../../actions/auth';

import ForgotPassword from './Forgotpassword';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [forgotPassVisible, setForgotPassVisible]= useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            message.info('Enter an email and password');
            return;
        }
        setLoading(true);

        try {
            const success = await dispatch(login({ email, password }));
            if (success) {
                message.success('Login successful');
                navigate('/');
            } else {
                message.error('Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            message.error(`An error occurred: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='flex flex-col gap-5'>
                <label htmlFor='email'>
                    <h4>Email</h4>
                    <input type='email' value={email} name='email' id='email' onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
                </label>

                <label htmlFor='password'>
                    <h4>Password</h4>
                    <input type={showPassword ? 'text' : 'password'} value={password} name='password' id='password' onChange={(e) => setPassword(e.target.value)} placeholder='*******' />

                    <div className='flex justify-between items-center'>
                        <div className='text-blue-500' onClick={()=>setForgotPassVisible(true)}>
                            Forgot Password?
                        </div>
                        <div className='flex items-center gap-2 justify-end'>
                            <input type="checkbox" className='w-3 cursor-pointer ' checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                            <span className="">Show Password</span>
                        </div>
                    </div>

                </label>

                <button onClick={handleSubmit} className='bg-primary text-white p-2' disabled={loading}>
                    {loading ? <Spin /> : 'Login'}
                </button>
            </div>
            <ForgotPassword visible={forgotPassVisible} onCancel={() => setForgotPassVisible(false)} />
        </div>
    );
};

export default Login;
