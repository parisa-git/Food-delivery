import React from 'react';

import logo from '../img/logo.png';
import Avatar from '../img/avatar.png';

import { MdAdd, MdLogout, MdShoppingBasket } from 'react-icons/md';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';


const Header = () => {

    const firebaseAuth = getAuth(app);

    const provider = new GoogleAuthProvider();

    const [{ user }, dispatch] = useStateValue();

    const login = async () => {

        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            });
            localStorage.setItem('user', JSON.stringify(providerData[0]));
        }
    }

    return (
        <header className='w-screen z-50  p-5'>

            {/* Desktop */}
            <div className='hidden md:flex w-full h-full items-center  justify-between'>

                <Link to='/' className='flex gap-2 items-center'>
                    <img src={logo} className='w-8 object-cover' />
                    <p className='font-bold text-xl text-zinc-800'>city</p>
                </Link>
                <div className='flex items-center gap-5'>
                    <ul className='flex gap-8 items-center'>
                        <li className='text-base hover:text-headinColor text-textColor cursor-pointer duration-100 transition-all ease-in-out'>Home</li>
                        <li className='text-base hover:text-headinColor text-textColor cursor-pointer duration-100 transition-all ease-in-out'>About</li>
                        <li className='text-base hover:text-headinColor text-textColor cursor-pointer duration-100 transition-all ease-in-out'>Menu</li>
                        <li className='text-base hover:text-headinColor text-textColor cursor-pointer duration-100 transition-all ease-in-out'>Service</li>
                    </ul>
                    <div className='flex items-center relative justify-center '>
                        <MdShoppingBasket className='text-textColor text-2xl cursor-pointer' />
                        <div className='w-5 h-5 bg-red-600 rounded-full flex absolute -top-2 -right-2 items-center justify-center'>
                            <p className='text-sm text-white font-semibold'>2</p>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            className='w-8 drop-shadow cursor-pointer rounded-full'
                            src={user ? user.photoURL : Avatar}
                            onClick={login}
                        />
                    </div>
                    <div className='absolute top-14 right-4 bg-gray-50 flex flex-col w-40 shadow-xl'>
                        <p className='text-neutral-500 hover:bg-gray-200 flex gap-3 items-center px-4 py-2 text-textBase cursor-pointer'>
                            New Item
                            <MdAdd />
                        </p>
                        <p className='text-neutral-500 hover:bg-gray-200 flex gap-3 items-center p-2 text-textBase cursor-pointer'>
                            Logout
                            <MdLogout />
                        </p>
                    </div>
                </div>



                {/* mobile */}
                <div className='flex md:hidden w-full bg-slate-800'>
                    hiiih
                </div>
            </div>

        </header>
    )
}

export default Header