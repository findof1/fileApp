"use server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";

export async function isEmailAvailable(email) {
  const q = query(collection(db, 'users'), where('email', '==', email));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
}