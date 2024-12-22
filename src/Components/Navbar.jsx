import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-around py-[20px] bg-slate-300'>
        <div className="font-bold text-xl cursor-pointer">TO-DO's</div>
        <ul className='flex items-center justify-between gap-[50px]'>
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>My ToDo</li>
            <li className='cursor-pointer hover:font-bold transition-all'>About</li>
        </ul>
    </nav>
  )
}

export default Navbar