"use server";
import { cookies } from "next/headers";

export const getUserData = () => {
  const cookieValue = cookies().get("fileApp")?.value;
  if (cookieValue) {
    let data = JSON.parse(cookieValue);
    if (data[0]) {
      data = data[0];
    }

    return data;
  }
};
