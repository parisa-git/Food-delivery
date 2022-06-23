import React, { useEffect, useState } from 'react';
import { IoFastFood } from 'react-icons/io5';
import { categories } from '../utils/data';
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';

const MenuContainer = () => {

    const [filter, setFilter] = useState('chicken');
    console.log(filter);


    const [{ foodItems }, dispatch] = useStateValue();
    console.log(foodItems);

    return (
        <section className='w-full py-4'>
            <div className='w-full flex flex-col items-start justify-start'>
                <p className='md:text-2xl text-base font-semibold relative capitalize
                    before:absolute before:rounded-lg before:content
                    before:h-1 before:w-32  before:-bottom-2 before:left-0 
                    before:bg-gradient-to-tr from-orange-300 to-orange-600'>
                    Our hot dishes
                </p>
                <div className='w-full py-10 flex items-center justify-start gap-3 md:justify-center overflow-x-hidden scrollbar-none '>
                    {categories && categories.map((item) => (
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            key={item.id}
                            onClick={() => setFilter(item.urlParamName)}
                            className={` ${filter === item.urlParamName ? 'bg-cartNumBg' : 'bg-card'} w-24 h-28  
                        cursor-pointer group drop-shadow-xl 
                        flex flex-col gap-3 justify-center items-center p-5 rounded-xl hover:bg-cartNumBg`}>
                            <div className={` ${filter === item.urlParamName ? 'bg-card' : 'bg-cartNumBg'} shadow-lg rounded-full p-3 group-hover:bg-card w-10 h-10 flex j
                            ustify-center items-center`}>
                                <IoFastFood className='text-card text-lg' />
                            </div>
                            <p className={` ${filter === item.urlParamName ? 'text-white' : 'text-gray-600'} text-sm  group-hover:text-white`}>
                                {item.name}
                            </p>
                        </motion.div>
                    ))}
                </div>
                <div className='w-full'>
                    <RowContainer flag={false} data={foodItems?.filter((n) => n.category == filter)} />
                </div>
            </div>

        </section>
    )
}

export default MenuContainer;