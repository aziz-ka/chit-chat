import firebaseApp from 'firebase/app';
import 'firebase/firestore';


export const getChatId = (userId='', selectedUserId='') =>
  (userId.substr(-6) + selectedUserId.substr(-6))
  .split('')
  .sort()
  .join('');

export const getMinuteDiff = timestamp => new Date(Date.now() - new Date(timestamp)).getMinutes();

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
