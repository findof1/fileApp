"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { deleteUserData } from "../functions/deleteUserData";
import Button from "./Button";

const LogOutButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        deleteUserData();
        router.refresh();
      }}
      style="none"
    >
      Log Out
    </Button>
  );
};

export default LogOutButton;
