"use server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";

export async function isUsernameAvailable(username) {
  const q = query(collection(db, 'users'), where('username', '==', username));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
}