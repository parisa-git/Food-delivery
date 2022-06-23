import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { useStateValue } from '../context/StateProvider';


const RowContainer = ({ flag, scrollValue  ,data}) => {

    // const [{ foodItems }, dispatch] = useStateValue();

    const rowContainer = useRef();


    useEffect(() => {

        rowContainer.current.scrollLeft += scrollValue;
        console.log(rowContainer.current.scrollLeft);

    }, [scrollValue]);

    return (


        <div
            ref={rowContainer}
            className={`w-full flex items-center md:my-12 my-7 gap-3 bg-purple-100 scroll-smooth 
            ${flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap justify-center"}`}>

            {data && data.map((item) => (
                <div key={item?.id} className='w-40 h-[200px] md:h-[250px] min-w-[170px] 
                    md:w-300 md:min-w-[270px] shadow-lg backdrop-blur-lg bg-gray-50 p-2 
                    hover:bg-gray-100 rounded-lg  my-8 hover:drop-shadow-lg scroll-smooth'>
                    <div className='w-full flex  justify-between items-center md:h-[170px] h-[125px]'>
                        <motion.img whileHover={{ scale: 1.2 }}
                            className='md:w-40 w-28 drop-shadow-xl'
                            src={item?.imageURL} />

                        <motion.div whileTap={{ scale: 0.75 }} className='w-8 h-8 rounded-full flex bg-red-500 
                    items-center justify-center cursor-pointer hover:shadow-lg'>
                            <MdShoppingBasket className=' text-white' />
                        </motion.div>
                    </div>
                    <div className='w-full flex flex-col items-end justify-end'>
                        <p className='text-sm font-semibold md:text-lg text-gray-700 text-center'>{item.title}</p>
                        <p className='text-center text-sm  text-gray-500'>{item?.calories}s</p>
                        <p className='font-semibold text-center text-sm  text-gray-700 '><span className='text-red-500'>$</span>{item?.price}</p>
                    </div>
                </div>
            ))}

        </div>

    )
}

export default RowContainer