import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';

import Header from '../../components/Header';

import AdminIntro from './adminIntro';
import AdminAbout from './adminAbout';
import AdminExp from './adminExp';
import AdminProj from './adminProj';
import AdminCon from './adminCon';
import AdminEdu from './adminEdu';

import Footer from '../../components/Footer';

const Index = () => {

    const [activeTab, setActiveTab] = useState('1');
    const onChange = (key) => {
        setActiveTab(key);
    };

    const { portfolioData } = useSelector((state) => state.root);

    const items = [
        {
            key: '1',
            label: 'Intro',
            children: <AdminIntro />,
        },
        {
            key: '2',
            label: 'About',
            children: <AdminAbout />,
        },
        {
            key: '3',
            label: 'Education',
            children: <AdminEdu />,
        },
        {
            key: '4',
            label: 'Experience',
            children: <AdminExp />,
        },
        {
            key: '5',
            label: 'Projects',
            children: <AdminProj />,
        },
        {
            key: '6',
            label: 'Contact',
            children: <AdminCon />,
        },
    ];

    return (
        <>
            <Header displayAll={false} />

            {portfolioData && (
                <>
                    <div className='px-5 min-h-[110vh]'>
                        <Tabs defaultActiveKey="1" activeKey={activeTab} items={items} onChange={onChange} />
                    </div>
                </>
            )}
            <Footer/>
        </>
    )
}
export default Index;