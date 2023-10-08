import app from './app.js';
import dotenv from 'dotenv';
import { initializeApp } from "firebase/app";
dotenv.config();

const firebaseConfig = {
        apiKey: process.env.FIREAPI,
        authDomain: process.env.FIREDOMAIN,
        projectId: process.env.FIREID,
        storageBucket: process.env.FIREBUCKET,
        messagingSenderId: process.env.FIRESENDER,
        appId: process.env.FIREAPPID
    };

const firebaseAPP = initializeApp(firebaseConfig);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`);
    console.log("Firebase OK : " + firebaseAPP.name)    
})