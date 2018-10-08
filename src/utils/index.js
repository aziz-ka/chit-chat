import firebaseApp from 'firebase/app';
import 'firebase/firestore';


export const getUniqueID = () => '_' + Math.random().toString(36).substr(2, 9);

export const getMinuteDiff = timestamp => new Date(Date.now() - new Date(timestamp)).getMinutes();

export const debounce = (func, wait, immediate) => {
  let timeout;

  return function() {
    const args = arguments;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(this, args);
  };
};

const firebaseConfig = {
  apiKey: "AIzaSyA_2Tft4zE1KSKuCfw1d6T89Pz4msOaubU",
  authDomain: "chat-b2fe1.firebaseapp.com",
  databaseURL: "https://chat-b2fe1.firebaseio.com",
  projectId: "chat-b2fe1",
  storageBucket: "chat-b2fe1.appspot.com",
  messagingSenderId: "1059415312311"
};

export const firebase = firebaseApp.initializeApp(firebaseConfig);

export const DB = firebaseApp.firestore();
