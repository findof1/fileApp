"use server";
import { query, collection, where, getDocs, documentId } from "firebase/firestore";
import { db } from "../firebase-config";
import { deleteUserData } from "./deleteUserData";

export const validateUser = async (userdata) => {
  if (!userdata) {
    return false;
  }
  if(!userdata.id){
    deleteUserData();
    return false;
  }

  const q = query(
    collection(db, "users"),
    where(documentId(), "==", userdata.id)
  );

  const userDoc = await getDocs(q);
  const user = userDoc.docs[0];

  if (user) {
    return true;
  } else {
    deleteUserData();
    return false;
  }
};