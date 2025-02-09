import React from 'react';
import { useSelector } from 'react-redux';

import SectionTitle from '../../components/SectionTitle';


const About = () => {


  const { portfolioData } = useSelector((state) => state.root);


  const about = portfolioData?.about || {};
  const { lottieUrl, description1, description2, skills } = about;

  const skillIcons = {
    "Html": "bxl-html5",
    "Css": "bxl-css3",
    "Javascript": "bxl-javascript",
    "Typescript": "bxl-typescript",
    "Jquery": "bxl-jquery",

    "Tailwind-css": "bxl-tailwind-css",
    "Bootstrap": "bxl-bootstrap",

    "Reactjs": "bxl-react",
    "Reactnative": "bxl-react",
    "Nodejs": "bxl-nodejs",
    "Vuejs": "bxl-vuejs",
    "Angularjs": "bxl-angular",
    "Redux": "bxl-redux",

    "C++": "bxl-c-plus-plus",
    "Java": "bxl-java",
    "Python": "bxl-python",
    "Django": "bxl-django",
    "Php": "bxl-php",

    "Go-lang": "bxl-go-lang",
    "Flask": "bxl-flask",

    "Mysql": "bxl-data",
    "Firebase": "bxl-firebase",
    "Mongodb": "bxl-mongodb",
    "Postgresql": "bxl-postgresql",
    "Aws": "bxl-aws",

    "Netlify": "bxl-netlify",
    "Heroku": "bxl-heroku",
    "Docker": "bxl-docker",
    "Kubernetes": "bxl-kubernetes",
    "Spring-boot": "bxl-spring-boot",
    "Codepen": "bxl-codepen",

    "Git": "bxl-git",
    "Github": "bxl-github",
    "Gitlab": "bxl-gitlab",
  };

  const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string' || !string.trim()) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>

      <div id='about'>
        <SectionTitle title='About' />

        <div className='flex w-[100%] sm:flex sm:flex-col'>

          {about.lottieUrl && (
            <div className='w-[40%] sm:w-[100%] '>
              <div className='w-[60%] h-[400px] sm:w-[80%] sm:h-[250px] sm:m-auto'>
                <img src={lottieUrl} alt='about' className='w-full h-full object-center rounded-lg' />
              </div>
            </div>
          )
          }

          <div className='w-[60%] p-10 sm:w-[100%] sm:p-4 sm:m-auto'>
            <div className='flex flex-col gap-5 w-[90%] sm:w-[100%]'>
              <p className="text-white text-[1.3rem] sm:text-[0.8rem] ">
                {capitalizeFirstLetter(description1) || ""}
              </p>
              <p className="text-white text-[1.3rem] sm:text-[0.8rem]">
                {capitalizeFirstLetter(description2) || ""}
              </p>
            </div>
          </div>
        </div>

        <div className='w-[90%] pt-[50px] sm:w-[100%] sm:p-2 sm:pt-[20px] '>
          <div className='shadow-custom py-5 px-10 rounded-md'>
            <h1 className='text-white text-[1.5rem] pb-[10px] vm:text-[1.1rem]'> Professional Skillset :</h1>
            <div className='flex flex-wrap gap-10 mt-5'>
              {skills &&
                skills.map((skill, index) => (
                  <div key={index} className='border border-[#E31C25] rounded skills-hover px-[30px] py-[15px] text-white  sm:m-auto vm:px-[15px] vm:py[15px] vm:text-[25px]'>
                    {skillIcons[capitalizeFirstLetter(skill)] ? (
                      <i className={`bx  ${skillIcons[capitalizeFirstLetter(skill)]} text-[50px] `}></i>
                    ) : (
                      <h1 className='text-white px-1 text-[18px] sm:text-[14px]'>{skill}</h1>
                    )}

                  </div>
                ))}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default About;

