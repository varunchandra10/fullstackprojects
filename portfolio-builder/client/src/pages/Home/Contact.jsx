import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from "react-redux";

const Contact = () => {
    const { portfolioData } = useSelector((state) => state.root);
    const contact = portfolioData?.contacts || {};

    return (
        <>
            <div id='contact'>
                <SectionTitle title='Say Hello' />

                <div className="flex sm:flex-col items-center justify-between">
                    <div className="w-[50%] flex text-[1.2rem] flex-col gap-2 sm:items-start sm:w-[100%] sm:text-[0.9rem]">
                        <p className='text-teritary'>{'{'}</p>
                        <div className='ml-5  text-teritary flex flex-col gap-2 '>
                            <p>Name         : {contact.name}</p>
                            <p>Age          : {contact.age}</p>
                            <p>Email        : {contact.email}</p>
                            <p>Mobile Number: {contact.mobile}</p>
                            <p>Address      : {contact.address}</p>
                        </div>
                        <p className='text-teritary'>{'}'}</p>
                    </div>

                    <div className='w-[50%] sm:w-[100%]'>
                        <div className='w-[100%] sm:w-[100%] sm:m-auto'>
                            <dotlottie-player
                                src="https://lottie.host/1d76bfb7-0b8c-451a-b28d-9e4481513073/dymb13lcKa.json"
                                background="transparent"
                                speed="1"
                                autoplay
                                aria-label="Lottie animation"
                            ></dotlottie-player>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact;
