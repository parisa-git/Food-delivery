import React from 'react'
import Delivery from '../img/delivery.png';
import heroBg from '../img/heroBg.png';
import ice1 from '../img/i1.png';
import { heroData } from '../utils/data';


const HomeContainer = () => {
    return (

        <section className='grid grid-cols-1 gap-3 md:grid-cols-2' id='home'>

            <div className='items-start flex flex-1 flex-col gap-6 md:px-4 ' >
                <div className='flex items-center bg-orange-100 rounded-full px-3 gap-2 md:px-4 py-1'>
                    <p className='text-orange-500 font-semibold text-sm md:text-md'>Biyk Delivery</p>
                    <div className='w-8 h-8 bg-white rounded-full drop-shadow-xl'>
                        <img className='w-full h-full object-contain' src={Delivery} />
                    </div>
                </div>

                <p className='font-bold text-[2.5rem] tracking-wide text-gray-700 '>
                    The bestes Delivery in <span className='text-orange-600 text-[3rem] '>your City</span>
                </p>

                <p className='text-gray-500 md:w-[80%]'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut maximus nisl magna,
                    ac condimentum risus ultrices vel. Sed volutpat pulvinar arcu,
                    ornare euismod dui imperdiet ac. Proin bibendum finibus efficitur.
                    In ultricies orci non enim dignissim, vel aliquam justo molestie.
                </p>
                <button className='bg-orange-500 text-white w-full md:w-auto px-4 py-2 hover:shadow-lg cursor-pointer rounded-md '>Order Now</button>
            </div>


            <div className='flex flex-1 ml-auto w-full h-auto relative'>
                <img src={heroBg} className='ml-auto h-outo w-full lg:w-auto lg:h-555' />
                <div className='flex flex-wrap gap-2 items-center justify-center w-full h-full absolute px-3 py-4 top-0 right-0 '>
                    {heroData && heroData.map(n => (

                        <div key={n.id} className='bg-cardOverlay rounded-3xl w-40 md:w-190 flext flex-col md:min-w-[190px]'>
                            <img className='w-40 -mt-20' src={n.imageSrc} />
                            <p className='font-semibold text-lg text-gray-700 text-center'>{n.name}</p>
                            <p className='text-center text-sm  py-3 text-gray-500'>{n.decp}</p>
                            <p className='font-semibold text-center text-sm  text-gray-700 mb-3'><span className='text-red-500'>$</span>{n.price}</p>
                        </div>

                    ))}
                </div>
            </div>

        </section>

    )
}

export default HomeContainer