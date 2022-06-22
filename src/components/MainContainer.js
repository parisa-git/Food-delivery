import { motion } from 'framer-motion';
import React from 'react';
import HomeContainer from './HomeContainer';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';


const MainContainer = () => {

    const [{ foodItems }, dispatch] = useStateValue();
    
    return (
        <div className='flex flex-col w-full h-outo justify-center items-center'>
            <HomeContainer />

            <section className='w-full py-4'>
                <div className='w-full flex items-center justify-between'>
                    <p className='text-2xl font-semibold relative capitalize
                    before:absolute before:rounded-lg before:content
                    before:h-1 before:w-32  before:-bottom-2 before:left-0 
                    before:bg-gradient-to-tr from-orange-300 to-orange-600'>
                        Our fresh & healcy fruits
                    </p>
                    <div className='hidden md:flex gap-3 items-center'>
                        <motion.div whileTap={{ scale: 0.75 }} className='bg-orange-300 w-8 h-8 rounded-lg hover:bg-orange-600 
                        flex hover:shadow-lg  justify-center items-center cursor-pointer'>
                            <MdChevronLeft className='text-white text-lg' />
                        </motion.div>
                        <motion.div whileTap={{ scale: 0.75 }} className='bg-orange-300 w-8 h-8 rounded-lg hover:bg-orange-600 
                        flex hover:shadow-lg  justify-center items-center cursor-pointer'>
                            <MdChevronRight className='text-white text-lg' />
                        </motion.div>
                    </div>
                </div>
                <RowContainer flag={true} data={foodItems} />
            </section>
        </div>
    )
}

export default MainContainer;