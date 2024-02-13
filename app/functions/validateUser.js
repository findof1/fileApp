"use server";

import { deleteUserData } from "./deleteUserData";

export const validateUser = async ({userdata}) => {
  const q = query(
    collection(db, "users"),
    where("username", "==", userdata.username),
    where("password", "==", userdata.password),
    where("email", "==", userdata.email),
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