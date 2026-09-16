import React, { useState } from 'react'

import {Link, NavLink, useNavigate} from "react-router-dom"


import Avatar from "../../assets/users/profile/avatar.png"
import { Bell, Menu } from 'lucide-react'

const Navbar = ({ user, handlelogout }) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();

    return (
        <nav className="header bg-[#0E0E18] text-white/75 flex items-center justify-between text-md py-4 px-16 mb-5 border-b-[#ADADAD] border-b sticky top-0 z-50">

            <NavLink to="/" onClick={() => setOpen(false)}>
                <span className='text-bold'>
                    <Link to='/'>FIND PARTNER</Link>
                </span>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">               

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                </div>

                <div 
                    className="relative cursor-pointer">
                    <Bell size={20} />
                </div>
                {!user ? <button 
                    // onClick={() => setShowUserLogin(true)}
                    className="cursor-pointer px-8 py-2 bg-green-600 hover:bg-green-800 transition text-white rounded-full">
                    Login
                </button> : 
                (
                    <div className='relative group'>
                        <img src={Avatar} alt='profile' className='rounded-full w-10 h-10 ' />
                        <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow w-30 rounded-md text-sm z-40 transition-all text-center'>
                            <li 
                                onClick={() => navigate('/my-profile')}
                                className='cursor-pointer p-1.5  hover:bg-gray-500 font-semibold bg-slate-900'>My Orders</li>
                            <li 
                                onClick={handlelogout}
                                className='cursor-pointer p-1.5  hover:bg-gray-500 font-semibold bg-slate-900'>Logout</li>
                        </ul>
                    </div>
                )}
                
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
               {/* <img src={assets.menu_icon} alt='menu' className='' /> */}
               <Menu />
            </button>

            {/* Mobile Menu */}
            {open && <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
                
                {/* {!user && <button className="cursor-pointer px-6 py-2 mt-2 bg-green-600 hover:bg-green-800 transition text-white rounded-full text-sm">
                    Login
                </button>} */}

                {!user ? <button 
                    onClick={
                        () => {
                           setOpen(false);
                           setShowUserLogin(true); 
                        }
                    }
                    className="cursor-pointer px-6 py-2 mt-2 bg-green-600 hover:bg-green-800 transition text-white rounded-full text-sm">
                    Login
                </button> : <button 
                    onClick={handlelogout}
                    className="cursor-pointer px-6 py-2 mt-2 bg-slate-800 hover:bg-slate-950 transition text-white rounded-full text-sm">
                    Logout
                </button>
                }
            </div>}
            

        </nav>
    )
}

export default Navbar
