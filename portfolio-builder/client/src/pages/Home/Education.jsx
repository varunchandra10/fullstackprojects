import React, { useState } from 'react';
import { useSelector } from "react-redux";
import SectionTitle from '../../components/SectionTitle';

const Educations = () => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const { portfolioData } = useSelector((state) => state.root);
    const educations = portfolioData?.educations || [];

    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string' || !string.trim()) {
          return '';
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
      };
    

    return (
        <div id='education'>
            <SectionTitle title='Education' />

            <div>
                <div className='flex py-4 gap-10 sm:flex-col'>
                    <div className='flex flex-col gap-10 border-l-2 border-[#474747de] sm:flex-row sm:overflow-auto sm:w-full '>
                        {educations.map((education, index) => (
                            <div key={index} onClick={() => setSelectedItemIndex(index)} className='cursor-pointer'>
                                <h1 className={`text-xl px-5 ${selectedItemIndex === index ? "text-gray-200 border-gray-400 border-l-4 -ml-[3px] bg-[#0000005e] py-3 px-[20px]" : "text-white"}`}>{education.standard}</h1>
                            </div>
                        ))}
                    </div>

                    {educations.length > 0 && (
                        <div className='shadow-custom py-5 px-10 rounded-md w-[70%] sm:w-[95%] sm:m-auto'>
                            <div className='w-[100%] flex flex-col gap-5'>
                                <h1 className="text-secondary font-period sm:text-[1.3rem] vm:text-[1.1rem]">{capitalizeFirstLetter(educations[selectedItemIndex].period)}</h1>
                                <h1 className="text-white font-name sm:text-[1.1rem] vm:text-[0.9rem]">{capitalizeFirstLetter(educations[selectedItemIndex].collegeName)}</h1>
                                <h6 className="text-gray-200 text-sm italic sm:text-xs">{capitalizeFirstLetter(educations[selectedItemIndex].gpa)}</h6>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Educations;
