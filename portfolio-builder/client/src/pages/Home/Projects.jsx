import React, { useState } from 'react';
import { useSelector } from "react-redux";
import SectionTitle from '../../components/SectionTitle';

const Projects = () => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const { portfolioData } = useSelector((state) => state.root);
    const projects = portfolioData?.projects || [];

    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string' || !string.trim()) {
            return '';
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <>
            <div id='projects'>
                <SectionTitle title="Projects" />

                <div className="flex py-4 gap-10 sm:flex-col">
                    <div className='flex flex-col gap-10 border-l-2 border-[#474747de] sm:flex-row sm:overflow-auto sm:w-full '>
                        {projects.map((project, index) => (
                            <div key={index} onClick={() => setSelectedItemIndex(index)} className='cursor-pointer w-56'>
                                <h1 className={`text-xl px-5 ${selectedItemIndex === index ? "text-gray-200 border-gray-400 border-l-4 -ml-[3px] bg-[#0000005e] py-3 " : "text-white"}`}>{capitalizeFirstLetter(project.title)}</h1>
                            </div>
                        ))}
                    </div>

                    {projects.length > 0 && (
                        <div className='shadow-custom py-5 px-10 rounded-md w-[70%] sm:w-[95%] sm:m-auto'>
                            <div className='flex w-[100%] items-center justify-center gap-10 sm:flex-col'>
                                {projects[selectedItemIndex].image && (
                                    <img src={projects[selectedItemIndex].image} alt='Aboutimage' className='h-60 w-80 m-auto rounded-lg' /> 
                                )}
                                <div className='flex flex-col gap-5'>
                                    <h1 className="text-secondary font-title sm:text-[1.3rem]  vm:text-[1.1rem]">{capitalizeFirstLetter(projects[selectedItemIndex].title)}</h1>
                                    <h1 className="text-white font-name sm:text-[1.1rem]  vm:text-[0.9rem]">{capitalizeFirstLetter(projects[selectedItemIndex].description)}</h1>
                                    <h1 className='text-gray-200 italic text-[1.2rem]  vm:text-[0.9rem]'><span className='font-semibold'>Technologies Used: </span> {projects[selectedItemIndex].technologies.join(', ')}</h1>
                                    <div className='border border-red w-fit px-4 py-1 text-white rounded-md vm:m-auto'>
                                        <a href={projects[selectedItemIndex].link} target='_blank' rel='noreferrer' className='flex items-center align-middle tooltip'>
                                            <i className='bx bxl-github'></i>&nbsp;/&nbsp;<i className='bx bx-news'></i>&nbsp;Link
                                            <span className="tooltiptext">Visit project</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Projects;
