import React, { useState } from 'react';
import { Tabs } from 'antd';

import Login from './Login';
import Signup from './Signup';
import Footer from '../../components/Footer';

const items = [
    {
        key: '1',
        label: 'Login',
        children: <Login />,
    },
    {
        key: '2',
        label: 'Signup',
        children: <Signup />,
    },
];

const Auth = () => {
    const [activeTab, setActiveTab] = useState('1');
    const onChange = (key) => {
        setActiveTab(key);
    };
    return (
        <>
            <div className='flex h-screen sm:flex-col w-full'>

                {/* Portfolio builder  */}
                <div className='flex flex-col gap-2 text-[6.5vw] items-center w-1/2 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 justify-center sm:w-full sm:h-1/3 sm:text-[10vw]' >
                    <h1 className='font-bold text-white'>PORTFOLIO</h1>
                    <h2 className='text-white font-bold animate-bounce'>Builder</h2>
                </div>

                {/* login & signup form */}
                <div className='flex w-1/2 bg-black justify-center items-center sm:w-full sm:h-screen sm:p-5'>
                    <div className='w-[50%] flex p-5 shadow-2xl border border-gray-500 flex-col bg-white rounded-lg sm:w-[90%]'>
                        <h1 className='text-xl'>Portfolio Admin: <b className='text-blue-500'>{activeTab === '1' ? 'Login' : 'Signup'}</b></h1>
                        <Tabs defaultActiveKey="1" activeKey={activeTab} items={items} onChange={onChange} />
                    </div>
                </div>
            </div>
            <div>
                <Footer/>
            </div>

        </>
    )
}

export default Auth;