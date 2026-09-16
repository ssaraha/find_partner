import { HamburgerIcon, Menu, X } from 'lucide-react';
import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Avatar from "../../assets/users/profile/avatar.png"

const navLinks = [
    {
        path: "/",
        display: "Home"
    },
    {
        path: "/my-projects",
        display: "My Projects"
    },
    // {
    //     path: "/services",
    //     display: "Services"
    // },
    // {
    //     path: "/contact",
    //     display: "Contact"
    // }
]


const Navbar = ({ user, handlelogout }) => {
    const headerRef = useRef();
    const menuRef = useRef();

    const [showMenu, setShowMenu] = useState(false)

    // const handleStickyHedear = () => {
    //     window.addEventListener('scroll', () => {
    //         if (document.body.scrollTop > 80 || document.documentElement) {
    //             headerRef.current.classlist.add('sticky_hedear');
    //         }
    //         else {
    //             headerRef.current.classlist.remove('sticky_hedear');
    //         }
    //     })
    // }

    // const toggleMenu = () => menuRef.current.classList.toggle('show_menu');

    // useEffect(() => {
    //     handleStickyHedear();

    //     return () => window.removeEventListener('scroll', handleStickyHedear)
    // }, [])

    const navigate = useNavigate();
    return (
        <header className='header bg-[#0E0E18] text-white/75 flex items-center justify-between text-md py-4 px-16 mb-5 border-b-[#ADADAD] border-b sticky top-0 z-50'>

            {/* <img src={Logo} alt="" className='w-44 cursor-pointer' /> */}
            <span className='text-2xl'>FIND PARTNER</span>
            {/* MENU */}
            <ul className="md:flex items-start gap-5 font-medium hidden">
                {
                    navLinks.map((link, key) => {
                        return <li className='py-1' key={key}>
                            <NavLink
                                className={navClass => navClass.isActive ? `text-primary-color text-[16px] font-semibold leading-7` : `text-text-color text-[16px] font-medium leading-7 hover:text-primary-color`}
                                to={link.path}
                            >{link.display}</NavLink>
                        </li>
                    })
                }
            </ul>

            {/* NAV RIGHT */}
            <div className='flex items-center gap-2 cursor-pointer group relative'>
                <div className=''>
                    {user && <span className=''>Welcome {" "} {user.username}</span>}
                </div>

                {user.profileImg ?
                    <img className='rounded-full w-10 h-10' src={user.profileImg} alt="User image" />
                    : <img className='rounded-full w-10 h-10' src={Avatar} alt="User image" />
                }
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden          group-hover:block'>
                    <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
                        <p
                            onClick={() => navigate('/my-profile')}
                            className='hover:text-black cursor-pointer'
                        >
                            My Profile
                        </p>
                        <p
                            onClick={handlelogout}
                            className='hover:text-black cursor-pointer'
                        >
                            Logout
                        </p>

                    </div>
                </div>

            </div>

            <img onClick={() => setShowMenu(true)} className="w-6 md:hidden text-white" src={HamburgerIcon} alt="" />
            {/* Start Mobile menu */}
            <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6'>
                    {/* <img className='w-36' src={crossIcon} alt="" /> */}
                    {/* <img onClick={() => setShowMenu(false)} src={crossIcon} alt="" className='w-7' /> */}
                    <X size={25} />
                </div>
                <div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>

                        {
                            navLinks.map((link, key) => {
                                return <li className='py-1' key={key}>
                                    <NavLink
                                        className={navClass => navClass.isActive ? `text-primary-color text-[16px] font-semibold leading-7` : `text-text-color text-[16px] font-medium leading-7 hover:text-primary-color`}
                                        to={link.path}
                                    >{link.display}</NavLink>
                                </li>
                            })
                        }

                    </ul>

                </div>
            </div>
            {/* End Mobile menu */}



        </header>
    )
}

export default Navbar
