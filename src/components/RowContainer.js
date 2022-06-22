import { motion } from 'framer-motion'
import React from 'react'
import { MdShoppingBasket } from 'react-icons/md'

const RowContainer = ({ flag, data }) => {
    console.log(data)
    return (
        <div className={`w-full flex items-center my-12 gap-3 bg-purple-100 ${flag ? "overflow-x-scroll" : "overflow-x-hidden"}`}>

            {data && data.map((item) => (
                <div key={item.id} className='w-40 h-[200px] md:h-[250px] min-w-[170px] md:w-300 md:min-w-[270px] shadow-lg backdrop-blur-lg bg-gray-50 p-2 hover:bg-gray-100 rounded-lg  my-8 hover:drop-shadow-lg'>
                    <div className='w-full flex justify-between items-center h-auto'>
                        <motion.img whileHover={{ scale: 1.2 }}
                            className='md:w-40 w-28 drop-shadow-xl'
                            src={item.imageURL} />

                        <motion.div whileTap={{ scale: 0.75 }} className='w-8 h-8 rounded-full flex bg-red-500 
                    items-center justify-center cursor-pointer hover:shadow-lg'>
                            <MdShoppingBasket className=' text-white' />
                        </motion.div>
                    </div>
                    <div className='w-full flex flex-col items-end justify-end'>
                        <p className='text-sm font-semibold md:text-lg text-gray-700 text-center'>{item.title}</p>
                        <p className='text-center text-sm  text-gray-500'>{item.calories}s</p>
                        <p className='font-semibold text-center text-sm  text-gray-700 '><span className='text-red-500'>$</span>{item.price}</p>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default RowContainer