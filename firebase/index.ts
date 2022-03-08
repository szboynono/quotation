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
