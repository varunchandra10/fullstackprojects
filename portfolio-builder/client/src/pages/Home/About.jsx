import React from 'react';
import { useSelector } from 'react-redux';

import SectionTitle from '../../components/SectionTitle';

const About = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const about = portfolioData?.about || {};
  const { lottieUrl, description1, description2, skills = [] } = about;

  const skillIcons = {
    "html": "bxl-html5",
    "css": "bxl-css3",
    "javascript": "bxl-javascript",
    "typescript": "bxl-typescript",
    "jquery": "bxl-jquery",
    "tailwind-css": "bxl-tailwind-css",
    "bootstrap": "bxl-bootstrap",
    "reactjs": "bxl-react",
    "reactnative": "bxl-react",
    "nodejs": "bxl-nodejs",
    "vuejs": "bxl-vuejs",
    "angularjs": "bxl-angular",
    "redux": "bxl-redux",
    "c++": "bxl-c-plus-plus",
    "java": "bxl-java",
    "python": "bxl-python",
    "django": "bxl-django",
    "php": "bxl-php",
    "go-lang": "bxl-go-lang",
    "flask": "bxl-flask",
    "mysql": "bxl-data",
    "firebase": "bxl-firebase",
    "mongodb": "bxl-mongodb",
    "postgresql": "bxl-postgresql",
    "aws": "bxl-aws",
    "netlify": "bxl-netlify",
    "heroku": "bxl-heroku",
    "docker": "bxl-docker",
    "kubernetes": "bxl-kubernetes",
    "spring-boot": "bxl-spring-boot",
    "codepen": "bxl-codepen",
    "git": "bxl-git",
    "github": "bxl-github",
    "gitlab": "bxl-gitlab",
  };

  return (
    <div id='about'>
      <SectionTitle title='About' />
      <div className='flex w-[100%] sm:flex sm:flex-col'>
        {lottieUrl && (
          <div className='w-[40%] sm:w-[100%]'>
            <div className='w-[60%] h-[400px] sm:w-[80%] sm:h-[250px] sm:m-auto'>
              <img
                src={lottieUrl}
                alt='about'
                className='w-full h-full object-center rounded-lg'
              />
            </div>
          </div>
        )}
        <div className='w-[60%] p-10 sm:w-[100%] sm:p-4 sm:m-auto'>
          <div className='flex flex-col gap-5 w-[90%] sm:w-[100%]'>
            <p className="text-white text-[1.3rem] sm:text-[0.8rem]">
              {description1 || ""}
            </p>
            <p className="text-white text-[1.3rem] sm:text-[0.8rem]">
              {description2 || ""}
            </p>
          </div>
        </div>
      </div>
      <div className='w-[90%] pt-[50px] sm:w-[100%] sm:p-2 sm:pt-[20px]'>
        <div className='shadow-custom py-5 px-10 rounded-md'>
          <h1 className='text-white text-[1.5rem] pb-[10px] vm:text-[1.1rem]'>
            Professional Skillset:
          </h1>
          <div className='flex flex-wrap gap-10 mt-5'>
            {skills.length > 0 ? (
              skills.map((skill, index) => {
                const normalizedSkill = skill.toLowerCase();
                const iconClass = skillIcons[normalizedSkill];

                console.log(`Skill: ${normalizedSkill}, Icon: ${iconClass}`);

                return (
                  <div
                    key={index}
                    className='border border-[#E31C25] rounded skills-hover px-[30px] py-[15px] text-white sm:m-auto vm:px-[15px] vm:py-[15px] vm:text-[25px]'
                  >
                    {iconClass ? (
                      <i className={`bx ${iconClass} text-[50px]`} aria-label={skill}></i>
                    ) : (
                      <h1 className='text-white px-1 text-[18px] sm:text-[14px]'>
                        {skill}
                      </h1>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-white">No skills available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;