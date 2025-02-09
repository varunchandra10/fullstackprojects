import React, { useState } from 'react';
import Footer from '../../components/Footer';

const scrollToSection = (id) => {
    const navbarHeight = 90;
    const element = document.getElementById(id);
    if (element) {
        const offsetPosition = element.offsetTop - navbarHeight;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

const MainPage = () => {

    const [state = { clicked: false }, setState] = useState();
    const handleClick = () => {
        setState({ clicked: !state.clicked })
    }

    return (
        <>
            <div>
                {/* Header */}
                <header >
                    <nav className="Navbar shadow-a fixed w-[100%] z-10">
                        <h1 className="text-[1.7rem] font-bold text-white sm:text-[1rem] logo">Portfolio Builder</h1>

                        <div className="menu-icon" onClick={handleClick}>
                            <i className={state.clicked ? "bx bx-menu-alt-right" : "bx bx-menu"}></i>
                        </div>

                        <div className={`${state.clicked ? 'menu active' : 'menu'}`}>
                            <ul className="flex gap-6 text-white text-[1.2rem] nav-links sm:text-[1rem] sm:gap-3">
                                <li className='cursor-pointer' onClick={() => scrollToSection('features')}>Features</li>
                                <li className='cursor-pointer' onClick={() => scrollToSection('how-it-works')}>How It Works</li>
                                <li className='cursor-pointer' onClick={() => scrollToSection('get-started')}>Get Started</li>
                                <li className='cursor-pointer' onClick={() => scrollToSection('contact')}>Contact</li>
                            </ul>
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 min-h-[80vh] pt-[100px] sm:min-h-[50vh] sm:py-15">
                    <div className="container mx-auto text-center py-24 sm:">
                        <h2 className="text-[3.5rem] font-bold mb-4 text-white sm:text-[2.5rem]">Welcome to Portfolio Builder</h2>
                        <p className="text-[1.5rem] text-purple-300 sm:text-[0.8rem]">Create your portfolio website quickly and easily.</p>
                        <a href="/auth" className="hover:bg-purple-400 bg-purple-500 text-white font-bold py-2 px-4 mt-8 inline-block shadow-lg">Get Started</a>
                    </div>
                </section>

                {/* Key Features Section */}
                <section id="features" className='flex justify-between bg-gray-100 sm:flex-col'>

                    <div className='w-[50%] text-center m-auto p-10 sm:w-[100%] sm:p-2'>
                        <h1 className='text-3xl font-bold mb-6 sm:pt-4'>Key Features :</h1>
                        <div className='text-start p-5 pl-10 sm:pl-5 '>
                            <div>
                                <h3 className='text-[1.3rem] font-bold sm:text-[1rem]'>Customization:</h3>
                                <p className='mb-4 text-[1.2rem] sm:text-[0.8rem]'>Personalize your portfolio with your details, including your bio, projects, skills, and contact information.</p>
                            </div>
                            <div>
                                <h3 className="text-[1.3rem] font-bold sm:text-[1rem]">Responsive Design</h3>
                                <p className='mb-4 text-[1.2rem] sm:text-[0.8rem]'>Your portfolio will look great on any device, including desktops, tablets, and smartphones.</p>
                            </div>
                            <div>
                                <h3 className="text-[1.3rem] font-bold sm:text-[1rem]">Project Showcase</h3>
                                <p className='mb-4 text-[1.2rem] sm:text-[0.8rem]'>Highlight your projects with beautiful galleries, videos, and descriptions.</p>
                            </div>
                        </div>
                    </div>

                    <div className='w-[50%] h-[400px] drop-shadow-2xl sm:w-[100%] sm:h-auto'>
                        <dotlottie-player src="https://lottie.host/5c21313f-c14b-41f5-972d-30e03cd25f37/sH2OP100Zn.json" background="transparent" speed="1" autoplay></dotlottie-player>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className='flex justify-between bg-gray-100 sm:flex-col'>

                    <div className='w-[50%] text-center m-auto p-10  sm:w-[100%] sm:p-2'>
                        <h1 className='text-3xl font-bold mb-6'>How It Works</h1>
                        <div className='text-start p-5 pl-10 sm:pl-5'>
                            <div>
                                <h3 className='text-[1.3rem] font-bold sm:text-[1rem]'>Sign Up</h3>
                                <p className='mb-4 text-[1.2rem] sm:text-[0.8rem]'>Create an account with Portfolio Builder.</p>
                            </div>
                            <div>
                                <h3 className="text-[1.3rem] font-bold sm:text-[1rem]">Add Details</h3>
                                <p className='mb-4 text-[1.2rem] sm:text-[0.8rem]'>Add details about yourself, your projects, and your skills.</p>
                            </div>
                            <div>
                                <h3 className="text-[1.3rem] font-bold sm:text-[1rem]">Publish</h3>
                                <p className='mb-4 text-[1.2rem] sm:text-[0.8rem]'>Publish your portfolio to the web with just one click.</p>
                            </div>
                        </div>
                    </div>

                    <div className='w-[50%] h-[400px] drop-shadow-2xl sm:w-[100%] sm:h-auto'>
                        <dotlottie-player src="https://lottie.host/5221c211-39dc-442c-8e74-4cb2e88187a0/ndQruUDl14.json" background="transparent" speed="1" autoplay></dotlottie-player>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section id="get-started" className="text-center py-20 bg-white">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold mb-4 sm:text-2xl">Get Started Today!</h2>
                        <p className='text-xl sm:text-lg sm:p-3'>Start building your professional portfolio today with Portfolio Builder and take your career to the next level.</p>
                        <a href="/auth" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-8 inline-block sm:mt-2">Get Started</a>
                    </div>
                </section>

                <Footer mainPage />
            </div>
        </>
    );
}

export default MainPage;
