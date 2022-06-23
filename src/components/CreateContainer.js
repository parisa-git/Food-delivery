import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable, } from "firebase/storage";
import { storage } from "../firebase.config";

import { MdFastfood, MdCloudUpload, MdDelete, MdAttachMoney, MdFoodBank } from 'react-icons/md';


import { categories } from '../utils/data'
import Loader from './Loader';
import { getAllFoodItems, saveItem } from '../utils/firebaseFunctions';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const CreateContainer = () => {
    const [title, setTitle] = useState('');
    const [calories, setCalories] = useState('');
    const [category, setCategory] = useState(null);
    const [imageAsset, setImageAsset] = useState(null);
    const [price, setPrice] = useState('');
    const [fields, setFields] = useState(false);
    const [alertStatus, setAlertStatus] = useState('danger');
    const [msg, setMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [{ foodItems }, dispatch] = useStateValue();

    const uploadImageHandler = (e) => {
        setIsLoading(true);
        const imageFile = e.target.files[0];
        console.log(imageFile);
        const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on('state_chenged', (snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
            (error) => {
                console.log(error);
                setFields(true);
                setMsg('Error While Uploading: Try Again');
                setAlertStatus('danger');
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 4000)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageAsset(downloadURL);
                    setIsLoading(false);
                    setFields(true);
                    setMsg('Image uploaded successfully');
                    setAlertStatus('success');
                    setTimeout(() => {
                        setFields(false);
                    }, 4000)
                });
            })
    }

    const deleteImageHandler = () => {
        setIsLoading(true);
        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then(() => {
            setImageAsset(null);
            setIsLoading(false);
            setFields(true);
            setMsg('Image Deleted Successfully');
            setAlertStatus('success');
            setTimeout(() => {
                setFields(false);
            }, 4000)
        })

    }
    const saveDetailsHandler = () => {

        try {
            if ((!title || !imageAsset || !price || !calories)) {
                setFields(true);
                setMsg('Required feilds cannot be empty!');
                setAlertStatus('danger');
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 4000)
            } else {
                const data = {
                    id: Date.now(),
                    title: title,
                    imageURL: imageAsset,
                    category: category,
                    price: price,
                    calories: calories,
                    qty: 1
                };
                saveItem(data);
                setIsLoading(false);
                setFields(true);
                setMsg('Data Uploaded successfully');
                setAlertStatus('success');
                clearData();
                setTimeout(() => {
                    setFields(false);
                }, 4000)

            }

        } catch {
            setFields(true);
            setMsg('Error While Uploading: Try Again');
            setAlertStatus('danger');
            setTimeout(() => {
                setFields(false);
                setIsLoading(false);
            }, 4000)
        };

        fetchData();
    };


    const clearData = () => {
        setTitle('');
        setImageAsset(null);
        setCategory('Select Category');
        setCalories('');
        setPrice('');
        

    };


    const fetchData = async () => {
        await getAllFoodItems().then(data => {
            console.log(data);
            dispatch({
                type: actionType.SET_FOOD_ITEMS,
                foodItems: data
            })
        })
    };

    return (

        <div className='w-full flex justify-center items-center min-h-screen '>
            <di className='border border-slate-200 rounded-lg w-[80%] md:w-[60%] p-4 gap-3 flex flex-col justify-center items-center'>
                {
                    fields &&
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`w-full p-2 rounded-lg font-semibold text-center ${alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'}`}>
                        {msg}
                    </motion.p>
                }

                <div className='flex items-center w-full border-b py-2 border-gray-300 gap-2'>
                    <MdFastfood className='text-xl text-gray-700' />
                    <input
                        type='text'
                        required
                        value={title}
                        placeholder='Give me a title..'
                        onChange={(e) => setTitle(e.target.value)}
                        className='w-full h-full bg-transparent border-none outline-none placeholder:text-gray-400 text-gray-600 '
                    />
                </div>

                <div className='w-full'>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className='border-none outline-none w-full p-2 rounded-lg cursor-pointer text-gray-500'
                    >
                        <option value="other" className="bg-white ">Select Category</option>
                        {
                            categories && categories.map(item => (
                                <option
                                    key={item.id}
                                    value={item.urlParamName}
                                    className='border-none outline-none bg-transparent py-2  text-gray-500'
                                >
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className='group w-full h-225 cursor-pointer md:h-420 rounded-lg flex flex-col border-dotted border-2 justify-center items-center border-gray-300'>
                    {isLoading ? <Loader /> : <>
                        {!imageAsset ? <>
                            <label className='w-full h-full flex flex-col justify-center items-center cursor-pointer'>
                                <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
                                    <MdCloudUpload className='text-3xl text-gray-500 hover:text-gray-700' />
                                    <p className='md:text-3xl text-base text-gray-500 hover:text-gray-700'>Click Here to Upload</p>
                                </div>
                                <input
                                    type='file'
                                    accept='img/*'
                                    name='uploadimage'
                                    onChange={uploadImageHandler}
                                    className='w-0 h-0'
                                />
                            </label>
                        </> :
                            <>
                                <div className='relative h-full'>
                                    <img src={imageAsset} alt='upload image' className='w-full h-full object-cover' />
                                    <button
                                        type='button'
                                        className='absolute bottom-3 right-3 p-3 bg-red-600 text-xl rounded-full hover:shadow-md duration-500 transition-all ease-in-out'
                                        onClick={deleteImageHandler}
                                    >
                                        <MdDelete className='text-white' />
                                    </button>
                                </div>
                            </>}
                    </>}
                </div>
                <div className='flex items-center w-full border-b py-2 border-gray-300 gap-2'>
                    <MdFoodBank className='text-xl text-gray-700' />
                    <input
                        type='text'
                        required
                        value={calories}
                        placeholder='Calories'
                        onChange={(e) => setCalories(e.target.value)}
                        className='w-full h-full bg-transparent border-none outline-none placeholder:text-gray-400 text-gray-600 '
                    />
                </div>
                <div className='flex items-center w-full border-b py-2 border-gray-300 gap-2'>
                    <MdAttachMoney className='text-xl text-gray-700' />
                    <input
                        type='text'
                        required
                        value={price}
                        placeholder='Price'
                        onChange={(e) => setPrice(e.target.value)}
                        className='w-full h-full bg-transparent border-none outline-none placeholder:text-gray-400 text-gray-600 '
                    />
                </div>
                <div className='flex items-center w-full'>
                    <button
                        type='button'
                        onClick={saveDetailsHandler}
                        className='border-none bg-green-500 text-white rounded-lg w-full px-10 py-2 ml-0 md:ml-auto md:w-auto'
                    >
                        Save
                    </button>
                </div>
            </di>

        </div>
    )
}

export default CreateContainer