import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchCurrentUser } from '../redux/currentReducer';
import { Logout } from '../redux/authReducer';

const Header = ({ displayAll }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { portfolioData } = useSelector((state) => state.root);
    const User = useSelector((state) => state.currentUser);

    const contacts = portfolioData?.contacts || {};
    const navbarHeight = 90;

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offsetPosition = element.offsetTop - navbarHeight;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleLogout = () => {
        dispatch(Logout());;
        navigate('/');
        dispatch(fetchCurrentUser(null));
    };

    const [state = { clicked: false }, setState] = useState();
    const handleClick = () => {
        setState({ clicked: !state.clicked })
    }

    return (
        <>
            {displayAll && (
                <nav className="Navbar">
                    <div className='logo'>
                        <h1 className='text-[2rem] sm:text-[1.5rem] vm:text-[1.4rem] font-bold cursor-pointer text-[#E31C25] ' onClick={scrollToTop}>{contacts.name}</h1>
                    </div>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={state.clicked ? "bx bx-menu-alt-right" : "bx bx-menu"}></i>
                    </div>
                    <div className={`${state.clicked ? 'menu active' : 'menu'}`}>
                        <ul className="flex gap-6 text-white text-[1.3rem] nav-links sm:text-[1rem] sm:gap-3">
                            <li className="cursor-pointer" onClick={() => scrollToSection('about')}>About</li>
                            <li className="cursor-pointer" onClick={() => scrollToSection('education')}>Education</li>
                            <li className="cursor-pointer" onClick={() => scrollToSection('experience')}>Experience</li>
                            <li className="cursor-pointer" onClick={() => scrollToSection('projects')}>Projects</li>
                            <li className="cursor-pointer" onClick={() => scrollToSection('contact')}>Contact</li>
                            <li className="cursor-pointer"><a href={contacts?.resume} target='_blank' rel="noreferrer">Resume</a></li>
                        </ul>
                    </div>
                </nav>
            )}

            {!displayAll && (
                <nav className="flex bg-navbar h-[90px] items-center text-white py-4 px-6 ">
                    <div className='flex items-center justify-between w-full'>
                        <div className='flex items-center gap-5 text-[20px] text-white sm:text-[15px]'>
                            {User?.result?.username && (
                                <h1>{User.result.username.charAt(0).toUpperCase() + User.result.username.slice(1)}</h1>
                            )}
                            <h1>Portfolio Admin</h1>
                        </div>
                        <div className='text-[20px] px-5 py-2 text-white sm:text-[15px]'>
                            <h1 className='underline cursor-pointer h1' onClick={handleLogout}>Logout</h1>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
};

export default Header;
