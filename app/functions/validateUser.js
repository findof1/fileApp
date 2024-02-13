"use server";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { deleteUserData } from "./deleteUserData";

export const validateUser = async ({userdata}) => {
  const q = query(
    collection(db, "users"),
    where("id", "==", userdata.id)
  );
  const userDoc = await getDocs(q);
  const user = userDoc.docs[0];
  if (user) {
    return true;
  }else{
    deleteUserData()
    return false;
  }
};