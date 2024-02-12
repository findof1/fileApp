"use client";
import React from "react";
import Button from "./Button";

const Modal = ({ visible, close, extraStyles = "", children }) => {
  return (
    <div
      className={`${
        visible ? "visible" : "hidden"
      } border-8 p-4 z-10 border-black bg-gray-700 rounded-3xl min-w-[50%]
     min-h-[80%] absolute top-[10%] left-[25%] flex flex-col ${extraStyles}`}
    >
      {children}

      <Button style="sm" extraStyles="ml-auto mt-auto" onClick={close}>
        Close
      </Button>
    </div>
  );
};

export default Modal;
