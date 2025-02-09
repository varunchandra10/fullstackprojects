import React from 'react'

const SectionTitle = ({
    title,
}) => {
  return (
    <>
    <div className='flex gap-10 items-center py-10 vm:gap-4'>
        <h1 className='text-[280%] text-[#F5F5F5] font-semibold shadow-title vm:text-[2rem]'>{title}</h1>
        <div className='w-60 h-[1px] bg-[#E31C25] '></div>
    </div>
    </>
  )
}

export default SectionTitle

