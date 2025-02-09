import React, { useState } from 'react';
import { useSelector } from "react-redux";
import SectionTitle from '../../components/SectionTitle';

const Experiences = () => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const { portfolioData } = useSelector((state) => state.root);
    const experiences = portfolioData?.experiences || [];

    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string' || !string.trim()) {
          return '';
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

    return (
        <div id='experience'>
            <SectionTitle title='Experiences' />

            <div className="flex py-4 gap-10 sm:flex-col">
                <div className='flex flex-col gap-10 border-l-2 border-[#474747de] sm:flex-row sm:overflow-auto sm:w-full'>
                    {experiences.map((experience, index) => (
                        <div key={index} onClick={() => setSelectedItemIndex(index)} className='cursor-pointer'>
                            <h1 className={`text-xl px-5 ${selectedItemIndex === index ? "text-gray-200 border-gray-400 border-l-4 -ml-[3px] bg-[#0000005e] py-3 px-[20px]" : "text-white"}`}>
                                {experience.period}
                            </h1>
                        </div>
                    ))}
                </div>

                {experiences.length > 0 && (
                    <div className='shadow-custom py-5 px-10 rounded-md w-[70%] sm:w-[95%] sm:m-auto'>
                        <div className='w-[100%] flex flex-col gap-5'>
                            <h1 className="text-secondary font-title sm:text-[1.3rem] vm:text-[1.1rem]">{capitalizeFirstLetter(experiences[selectedItemIndex].title)}</h1>
                            <h1 className="text-white font-name sm:text-[1.1rem] vm:text-[0.9rem]">{capitalizeFirstLetter(experiences[selectedItemIndex].company)}</h1>
                            <p className='text-gray-200 italic text-[1.2rem]'>{capitalizeFirstLetter(experiences[selectedItemIndex].description)}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Experiences;
