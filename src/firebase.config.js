import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDKrHX0s4fC1tawiWDteBe5KFO7o4LJGBc",
    authDomain: "food-delivery-5dfad.firebaseapp.com",
    databaseURL: "https://food-delivery-5dfad-default-rtdb.firebaseio.com",
    projectId: "food-delivery-5dfad",
    storageBucket: "food-delivery-5dfad.appspot.com",
    messagingSenderId: "248439522610",
    appId: "1:248439522610:web:b1db5b70478563dfc8432b"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const storage = getStorage(app);

export { app, firestore, storage };