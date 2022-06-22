import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header, MainContainer, CreateContainer } from './components';
import { AnimatePresence } from 'framer-motion'
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './utils/firebaseFunctions';
import { actionType } from './context/reducer';


const App = () => {
    const [{foodItems }, dispatch] = useStateValue();

    const fetchData = async () => {
        await getAllFoodItems().then(data => {
            console.log(data);
            dispatch({
                type: actionType.SET_FOOD_ITEMS,
                foodItems: data
            })
        })
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AnimatePresence exitBeforeEnter>
            <div className=' w-screen h-auto flex flex-col bg-gray-100'>
                <Header />
                <section className=' md:mt-24 mt-16 py-4 px-6' >
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

