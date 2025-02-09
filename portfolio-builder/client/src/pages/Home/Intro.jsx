import React from 'react';
import { useSelector } from 'react-redux';

const Intro = () => {
    const { portfolioData } = useSelector((state) => state.root);
    const { intros } = portfolioData || {};
    const { firstName, lastName, caption, welcomeText, description } = intros || {};
    
    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string' || !string.trim()) {
            return '';
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <>
            <div className='pt-[90px] min-h-[80vh] flex items-center justify-between sm:pt-[90px] sm:flex sm:flex-col sm:items-center sm:p-1'>

                <div className='w-[50%] flex flex-col items-start justify-center gap-5 py-4 sm:w-[100%] '>

                    <h1 className='text-white text-[2.4rem] sm:text-[1.5rem] vm:text-[1rem]'>
                        {capitalizeFirstLetter(welcomeText) || ""}
                        <span className='wave'>&nbsp;👋🏻</span>
                    </h1>

                    <div className='text-[2.8rem] flex intro-font sm:text-[1.5rem] vm:text-[1.7rem]'>
                        <h1 className='text-white '>I'M</h1>&nbsp;
                        <h1 className='text-secondary'> {firstName || ""} {lastName || ""} </h1>
                    </div>

                    <h1 className='text-[1.5rem] text-white sm:text-[1rem] '>
                        {capitalizeFirstLetter(caption) || ""}
                    </h1>

                    <h1 className='text-white text-[1.5rem] sm:text-[1.2rem] text-justify vm:text-[1.1rem]'>
                        {capitalizeFirstLetter(description) || ""}
                    </h1>
                </div>

                <div className='w-[50%] m-auto sm:w-[100%]'>
                    <div className='w-[80%] m-auto sm:w-[80%] vm:w-[90%]'>
                        <dotlottie-player src="https://lottie.host/3144aa9a-b97b-47f2-b891-fdf5aef04a4e/y5w3pjpkQn.json" background="transparent" autoplay></dotlottie-player>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Intro;

