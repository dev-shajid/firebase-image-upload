import {initializeApp} from "firebase/app";
import { getStorage } from "firebase/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
    apiKey: "AIzaSyA5XEEuBOXyH-mfF8dvlPLsatmSQhyULuM",
    authDomain: "banner-photo.firebaseapp.com",
    projectId: "banner-photo",
    storageBucket: "banner-photo.appspot.com",
    messagingSenderId: "1037616199779",
    appId: "1:1037616199779:web:050e29f04637ea871d6056"
  };
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp);
 