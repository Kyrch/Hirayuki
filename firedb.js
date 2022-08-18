const { initializeApp } = require("firebase/app");
const { getFirestore, getDocs, addDoc, collection } = require('firebase/firestore/lite');

const firebaseConfig = {
    apiKey: "AIzaSyCU6fWcI9i6WIBXKaQu8MKRFcmSt4CIyEc",
    authDomain: "hirayuki-2e35b.firebaseapp.com",
    databaseURL: "https://hirayuki-2e35b-default-rtdb.firebaseio.com",
    projectId: "hirayuki-2e35b",
    storageBucket: "hirayuki-2e35b.appspot.com",
    messagingSenderId: "530674149450",
    appId: "1:530674149450:web:ed7d92fa6875b2e4a81eb3"
};

const gamesId_Db = async function gamesId_Db() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app)
    const coll = collection(db, 'games_id')
    return coll
}

module.exports = {
    gamesId_Db
}