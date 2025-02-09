import React from 'react';
import loaderSvg from '../resources/pre.svg';

const Loader = () => {
  return (
    <div className='h-screen flex items-center justify-center fixed inset-0 bg-primary z-[10000]'>
      <img src={loaderSvg} alt="Loading..." className="w-24 h-auto animate-spin" />
    </div>
  );
}

export default Loader;
