import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
    const { portfolioData } = useSelector((state) => state.root);
    const contact = portfolioData?.contacts || {};
    return (
        <>
            <div className='py-10 '>
                <div className="h-[1px] w-full bg-gray-700"/>

                <div className='flex items-center justify-center flex-col mt-10 opacity-70' >
                    <h1 className='text-white'>
                        Designed and Developed By
                    </h1>

                    <h1 className='text-white'>
                       {contact.name||" K. Varun Chandra"} ❤️
                    </h1>
                </div>

            </div>
        </>
    )
}

export default Footer