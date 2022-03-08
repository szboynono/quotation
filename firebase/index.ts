// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbBFhc-nSGU1aAqIfctpgSfB3xTiHBzQk",
  authDomain: "quotation-c3269.firebaseapp.com",
  projectId: "quotation-c3269",
  storageBucket: "quotation-c3269.appspot.com",
  messagingSenderId: "767311983585",
  appId: "1:767311983585:web:b2415a1a4bdc52568318a0",
  measurementId: "G-7R3VV34QN2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
const db = getFirestore();

export const getQuotes = () => {
  const quotesCollection = collection(db, "quotations");
  return getDocs(quotesCollection);
};

export const checkIfQuoteExists = (quote: string) => {
  const quotesRef = collection(db, "quotations");
  const q = query(quotesRef, where("quote", "==", quote));
  return getDocs(q);
};

export const addQuote = (tokenId: string, quote: string, by: string) => {
  if (!tokenId || !quote || !by) return;
  return addDoc(collection(db, "quotations"), {
    tokenId,
    quote,
    by,
  });
};
