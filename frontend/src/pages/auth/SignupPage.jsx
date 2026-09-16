import React, { useState } from 'react'

import { motion } from "framer-motion"
import Input from '../../components/Input.jsx';

import { Loader, Lock, Mail, UserIcon, UserKey } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import PasswordStrength from '../../components/auth/PasswordStrength.jsx';
import { useAuthStore } from '../../store/authStore.js';
import { useCategoryStore } from '../../store/categoryStore.js';
import toast from 'react-hot-toast';
import { useEffect } from 'react';


const SignupPage = () => {
    const {
        signup,
        error,
        isLoading
    } = useAuthStore();

    const { fetchCategories, categories } = useCategoryStore();

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('');
    const [isRoleCompany, setIsRoleCompany] = useState(false);
    const [listCategory, setListcategory] = useState([])

    const [categoriesValues, setCategoriesValues] = useState([]);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCategoriesValues([...categoriesValues, value]);
        } else {
            setCategoriesValues(categoriesValues.filter((item) => item !== value));
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            await signup(username, name, email, password, role, categoriesValues);
            navigate('/verify-email');
            toast.success("Registration user successfully");
        } catch (error) {
            console.log("ERROR >>> ", error)
        }

    }

    const handleSelectChange = (event) => {
        setRole(event.target.value);
        if (event.target.value.toLowerCase() === "company") {
            setIsRoleCompany(true)
        }
        else {
            setIsRoleCompany(false)
            fetchCategories();
        }

        // console.log("Selected:", event.target.value);

    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-[550px] w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-xl shadow-lg overflow-hidden'
        >
            <div className="p-8">
                <h2 className='text-2xl font-extrabold mb-6 bg-linear-to-r from-[#B05EE4] to-[#6261D2] text-transparent bg-clip-text uppercase text-center tracking-widest'>Create account</h2>
                <form onSubmit={handleSignUp}>
                    <div className='flex gap-2'>
                        <Input
                            icon={UserIcon}
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <Input
                            icon={UserIcon}
                            type="text"
                            placeholder="Fullname"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <Input
                        icon={Mail}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className='text-red-500 text-md font-semibold mt-2'>{error}</p>}
                    {/* Password strength */}
                    <PasswordStrength password={password} />
                    <div className='relative my-6'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <UserKey className="size-5 text-[#F1F1F1]" />
                        </div>
                        <select className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-white-200 focus:ring-2 focus:ring-white-400 focus:outline-none text-white placeholder-gray-400 transition duration-200'
                            value={role}
                            name="role"
                            onChange={handleSelectChange}>
                            <option value="">You are ...</option>
                            <option value="user">User</option>
                            <option value="company">Company</option>
                        </select>
                    </div>
                    {
                        isRoleCompany && <div className=''>
                            <fieldset className="rounded-lg border border-solid border-gray-300 p-4 dark:border-gray-700">
                                <legend className="text-lg font-semibold text-gray-900 px-2 dark:text-white/80">
                                    Sector of activity
                                </legend>
                                <div className="flex p-2 justify-between align-center flex-wrap">
                                    {categories && categories.map((c) => {
                                        return <label key={c._id} className="flex items-center gap-2 cursor-pointer select-none">
                                            <input
                                                onChange={handleCheckboxChange}
                                                value={c._id}
                                                type="checkbox"
                                                className="w-5 h-5 accent-indigo-600 rounded" />
                                            <span className="text-sm font-medium text-white/80">{c.name}</span>
                                        </label>
                                    })}
                                </div>
                            </fieldset>
                        </div>
                    }
                    <motion.button className='mt-5 w-full py-3 px-4 hover:cursor-pointer
                        bg-linear-to-r from-[#F058AC] to-[#9660F5]
                        text-white font-bold rounded-lg shadow-lg
                        hover:from-[#C45FB3] hover:to-[#9165F7]
                        focus:outline-none transition duration-200 tracking-widest'
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}>
                        {isLoading ? <Loader className='w-6 h-6 text-center animate-spin mx-auto' /> : 'Sign Up'}
                    </motion.button>
                </form>
            </div>
            <div className='px-8 py-4 bg-black bg-opacity-50 flex justify-center'>
                <p className='text-sm text-gray-400'>
                    Already have an account? {" "}
                    <NavLink to="/login" className="text-blue-500 font-bold hover:text-blue-700 transition duration-200">Log in</NavLink>
                </p>
            </div>
        </motion.div>
    )
}

export default SignupPage
