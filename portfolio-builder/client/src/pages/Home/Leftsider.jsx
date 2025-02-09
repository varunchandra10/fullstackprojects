import React from 'react';
import { useSelector } from "react-redux";

const Leftsider = () => {
    const { portfolioData } = useSelector((state) => state.root);
    const contacts = portfolioData?.contacts || {};

    return (
        <div className=' fixed left-0 bottom-0 px-10 sm:static sm:pb-[20px]'>

            <div className='flex flex-col items-center'>

                <div className="flex flex-col gap-4 sm:flex-row">
                    <a href={`mailto:${contacts?.email}`} target='__blank'>
                        <i className='bx bxl-gmail text-gray-500 text-[21px] i-hover'></i>
                    </a>

                    <a href={contacts?.github || {}} target='__blank'>
                        <i className='bx bxl-github text-gray-500 text-[21px] i-hover'></i>
                    </a>

                    <a href={contacts?.linkedIn || {}} target='__blank'>
                        <i className='bx bxl-linkedin text-gray-500 text-[21px] i-hover'></i>
                    </a>

                    <a href={contacts?.instagram || {}} target='__blank'>
                        <i className='bx bxl-instagram text-gray-500 text-[21px] i-hover'></i>
                    </a>

                    <a href={`tel:${contacts?.number || {}}`} target='__blank'>
                        <i className='bx bxs-phone text-gray-500 text-[21px] i-hover'></i>
                    </a>

                </div>
                <div className='w-[1px] h-32 bg-gray-600 sm:hidden' />

            </div>
        </div>
    )
}

export default Leftsider;