import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header, MainContainer, CreateContainer } from './components';
import { AnimatePresence } from 'framer-motion'


const App = () => {
    return (
        <AnimatePresence>
            <div className=' w-screen h-auto flex flex-col'>
                <Header />
                <section className='bg-gray-100' >
                    <Routes>
                        <Route path='/*' element={<MainContainer />} />
                        <Route path='/createItem' element={<CreateContainer />} />
                    </Routes>
                </section>
            </div>
        </AnimatePresence>

    )
}

export default App;

