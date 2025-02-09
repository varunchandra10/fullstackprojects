import React from 'react';
import { Search } from 'lucide-react';

const SearchSection = ({onSearchInput}:any) => {
  return (
    <div className='p-10 bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600 flex flex-col justify-center items-center text-white'>
        <h2 className='text-3xl font-bold'>Browse all Templates</h2>
        <p> What would you like to create today? </p>

        <div className='w-full flex justify-center'>
            <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-1/2'>
                <Search className='text-primary'/>
                <input type='text'  placeholder='search' className=' bg-transparent w-full outline-none text-black' onChange={(e)=>onSearchInput(e.target.value)}/>
            </div>
        </div>
    </div>
  )
}

export default SearchSection