import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../api/api';
import { message } from 'antd';
import Footer from '../../components/Footer';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!password && !confirmPassword){
            message.info("Please enter the password!! ");
        }
        if (password !== confirmPassword) {
            message.info('Passwords do not match 🙃');
        } else {
            API.post(`/user/reset-password/${token}`, { password })
                .then(response => {
                    if (response.data.status) {
                        message.success('Password updated successfully 🥳');
                        navigate('/auth');
                    } else {
                        message.error('Failed to update password 😓');
                    }
                })
                .catch(err => {
                    console.log(err);
                    message.error('An error occurred 🚫');
                });
        }
    };

    return (
        <>
            <div className='w-[100%] bg-primary h-[80px] flex items-center sm:h-[100px]'>
                <h1 className='text-center w-full text-white text-2xl font-bold'>Portfolio Builder Reset Password Page</h1>
            </div>

            <div className="flex items-center justify-center h-screen bg-gray-200 sm:h-[80vh] ">
                <form className="p-6 bg-white w-[500px]  shadow-lg sm:w-[90%]" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-5 text-center">Reset password</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor='password'>New Password : </label>
                        <input className="mt-1 px-3 py-2 border border-gray-300 rounded w-full" type={showPassword ? 'text' : 'password'} placeholder='******' onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div>
                        <label className="block text-gray-700" htmlFor='confirmPassword'>Confirm Password : </label>
                        <input className="mt-1 px-3 py-2 border border-gray-300 rounded w-full" type={showPassword ? 'text' : 'password'} placeholder='******' onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className='flex items-center gap-2 justify-end mb-4'>
                            <input type="checkbox" className='w-3 cursor-pointer' checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                            <span className="">Show Password</span>
                        </div>

                    <button className="w-full py-2 px-4 bg-primary text-white hover:bg-gray-800" type='submit'>Reset</button>
                </form>
            </div>

            <Footer mainPage={false} />
        </>
    );
};

export default ResetPassword;
