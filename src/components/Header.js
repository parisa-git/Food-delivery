import React, { useState } from 'react';

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

    const [isMenu, setIsMenu] = useState(false);

    const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

    const loginHandler = async () => {

        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            });
            localStorage.setItem('user', JSON.stringify(providerData[0]));
        } else {
            setIsMenu(!isMenu);
        }
    };

    const logoutHandler = () => {

        setIsMenu(false);
        localStorage.clear();
        dispatch({
            type: actionType.SET_USER,
            user: null
        });

    }

    const cartShowHandler = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow
        })
    }


    return (
        <header className='fixed w-screen z-50  md:p-5 md:px-16 p-3 px-4 bg-gray-100'>

            {/* Desktop */}
            <div className='hidden md:flex w-full h-full items-center  justify-between'>

                <Link to='/' className='flex gap-2 items-center'>
                    <img src={logo} className='w-8 object-cover' />
                    <p className='font-bold text-xl text-zinc-800'>city</p>
                </Link>
                <div className='flex items-center gap-5'>
                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className='flex gap-8 items-center'>
                        <li className='text-base hover:text-headinColor text-textColor cursor-pointer duration-100 transition-all ease-in-out'>Home</li>
                        <li className='text-base hover:text-headinColor text-textColor cursor-pointer duration-100 transition-all ease-in-out'>About</li>
                        <li className='text-base hover:text-headinColor text-textColor cursor-pointer duration-100 transition-all ease-in-out'>Menu</li>
                        <li className='text-base hover:text-headinColor text-textColor cursor-pointer duration-100 transition-all ease-in-out'>Service</li>
                    </motion.ul>
                    <div className='flex items-center relative justify-center ' onClick={cartShowHandler}>
                        <MdShoppingBasket className='text-textColor text-2xl cursor-pointer' />
                        {cartItems && cartItems.length > 0 &&
                            <div className='w-5 h-5 bg-red-600 rounded-full flex absolute -top-2 -right-2 items-center justify-center'>
                                <p className='text-sm text-white font-semibold'>{cartItems.length}</p>
                            </div>
                        }

                    </div>
                    <div className='flex items-center'>
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            className='w-8 drop-shadow cursor-pointer rounded-full'
                            src={user ? user.photoURL : Avatar}
                            onClick={loginHandler}
                        />
                    </div>
                    {isMenu &&
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            className='absolute top-14 right-4 bg-gray-50 flex flex-col w-40 shadow-xl'>
                            {user && user.email === 'mbkparisa@gmail.com' &&
                                <Link to='/createItem'>
                                    <p onClick={() => { setIsMenu(false) }} className='text-neutral-500 hover:bg-gray-200  flex gap-3 items-center px-4 py-2 text-textBase cursor-pointer'>
                                        New Item
                                        <MdAdd />
                                    </p>
                                </Link>
                            }

                            <p
                                className='text-neutral-500 hover:bg-gray-200 flex gap-3 items-center px-4 py-2 text-textBase cursor-pointer'
                                onClick={logoutHandler}

                            >
                                Logout
                                <MdLogout />
                            </p>
                        </motion.div>
                    }
                </div>

            </div>


            {/* mobile */}
            <div className="w-full flex md:hidden items-center">

                <Link to='/' className='flex gap-2 items-center'>
                    <img src={logo} className='w-8 object-cover' />
                    <p className='font-bold text-xl text-zinc-800'>city</p>
                </Link>

                <div className='flex ml-auto gap-4 '>

                    <div className='flex items-center relative justify-center ' onClick={cartShowHandler}>
                        <MdShoppingBasket className='text-textColor text-2xl cursor-pointer' />
                        {cartItems && cartItems.length > 0 &&
                            <div className='w-5 h-5 bg-red-600 rounded-full flex absolute -top-2 -right-2 items-center justify-center'>
                                <p className='text-sm text-white font-semibold'>{cartItems.length}</p>
                            </div>
                        }
                    </div>
                    <div className='flex items-center'>
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            className='w-8 drop-shadow cursor-pointer rounded-full'
                            src={user ? user.photoURL : Avatar}
                            onClick={loginHandler}
                        />
                    </div>
                    {isMenu &&
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            className='absolute top-14 right-4 bg-gray-50 flex flex-col w-40 shadow-xl'>
                            {user && user.email === 'mbkparisa@gmail.com' &&
                                <Link to='/createItem'>
                                    <p onClick={() => { setIsMenu(false) }} className='text-neutral-500 hover:bg-gray-200  flex gap-3 items-center px-4 py-2 text-textBase cursor-pointer'>
                                        New Item
                                        <MdAdd />
                                    </p>
                                </Link>
                            }
                            <ul className='items-center'>
                                <li onClick={() => { setIsMenu(false) }} className='text-neutral-500 hover:bg-gray-200  flex gap-3 items-center px-4 py-2 text-textBase cursor-pointer'>Home</li>
                                <li onClick={() => { setIsMenu(false) }} className='text-neutral-500 hover:bg-gray-200  flex gap-3 items-center px-4 py-2 text-textBase cursor-pointer'>About</li>
                                <li onClick={() => { setIsMenu(false) }} className='text-neutral-500 hover:bg-gray-200  flex gap-3 items-center px-4 py-2 text-textBase cursor-pointer'>Menu</li>
                                <li onClick={() => { setIsMenu(false) }} className='text-neutral-500 hover:bg-gray-200  flex gap-3 items-center px-4 py-2 text-textBase cursor-pointer'>Service</li>
                            </ul>
                            <p
                                className='text-neutral-500 bg-gray-200 hover:bg-gray-300 m-2 p-2 text-center ro unded-md shadow-md flex gap-3 items-center px-4 py-2 text-textBase cursor-pointer'
                                onClick={logoutHandler}
                            >
                                Logout
                                <MdLogout />
                            </p>
                        </motion.div>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header