import React from 'react'

const Footer = ({ mainPage }) => {
  

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: 0,
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

  return (
    <>
      {mainPage && (
        <footer id='contact' className="bg-gray-900 text-white b-0 w-full ">
          <div className='flex items-center justify-center p-10 sm:flex-col sm:gap-4 sm:p-3'>

            <div className='w-[30%] sm:w-[100%]'>
              <nav className='p-10 '>
                <ul className="flex flex-col space-y-4 text-[1.2rem] ml-20 sm:ml-0 sm:items-center">
                  <li className="cursor-pointer" onClick={scrollToTop}>Home</li>
                  <li className="cursor-pointer" onClick={() => scrollToSection('features')}>Features</li>
                  <li className="cursor-pointer" onClick={() => scrollToSection('how-it-works')}>How It Works</li>
                  <li className="cursor-pointer" ><a href='/auth'>Login/Signup</a></li>
                </ul>
              </nav>
            </div>

            <div className='flex flex-col gap-4 items-center'>
              <h1 className='text-[3rem] font-bold sm:text-[2rem]'>Portfolio Builder</h1>

              <div className="flex gap-4">

                <a href='tel:9346101109' target='__blank'>
                  <i className='bx bxs-phone text-gray-500 text-[21px] i-hover'></i>
                </a>

                <a href='mailto:kola.varunchandra29@gmail.com' target='__blank'>
                  <i className='bx bxl-gmail text-gray-500 text-[21px] i-hover'></i>
                </a>

                <a href="https://github.com/varunchandra10" target='__blank'>
                  <i className='bx bxl-github text-gray-500 text-[21px] i-hover'></i>
                </a>

                <a href="www.linkedin.com/in/varun-chandra-809b97282" target='__blank'>
                  <i className='bx bxl-linkedin text-gray-500 text-[21px] i-hover'></i>
                </a>

                <a href="https://www.instagram.com/varun.sunny.10?igsh=MXhtM29sZzNqMno5ZQ%3D%3D&utm_source=qr" target='__blank'>
                  <i className='bx bxl-instagram text-gray-500 text-[21px] i-hover'></i>
                </a>
              </div>

              <div className='mt-2'>
                <a href="https://forms.gle/HD42hfS24TEtewX76" className='bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-2 rounded-sm'>Feedback form</a>
              </div>

            </div>

            <div className='w-[35%] sm:w-[100%]'>
              <div className='w-[100%] h-[300px] sm:h-auto'>
                <dotlottie-player src="https://lottie.host/40e78882-8473-4ddf-8cf1-e8c0309d1d33/5vMVTQVhlB.json" background="transparent" speed="1" loop autoplay></dotlottie-player>
              </div>
            </div>
          </div>

          <div className='py-8 bg-primary'>
            <div className='flex gap-2 items-center justify-center sm:flex-col '>
              <h1 className='text-white'>Designed and Developed by </h1>
              <h1 className='text-white font-semibold'>K.Varun chandra ❤️</h1>
            </div>
          </div>
        </footer>
      )}
      {
        !mainPage && (
          <div className='py-8 bg-primary'>
            <div className='flex gap-2 items-center justify-center sm:flex-col '>
              <h1 className='text-white'>Designed and Developed by </h1>
              <h1 className='text-white font-semibold'>K.Varun chandra ❤️</h1>
            </div>
          </div>

        )
      }

    </>
  )
}

export default Footer