import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header, MainContainer, CreateContainer } from './components';
import { AnimatePresence } from 'framer-motion'


const App = () => {
    return (
        <AnimatePresence exitBeforeEnter>
            <div className=' w-screen h-auto flex flex-col bg-gray-100'>
                <Header />
                <section className=' md:mt-20 mt-16 py-4 px-4' >
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

