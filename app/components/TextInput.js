"use client";
import React from "react";

const TextInput = ({
  style = "default",
  extraStyles = "",
  type = "text",
  label = null,
  onChange = () => {},
  onEnter = () => {},
  value = null,
  children,
}) => {
  if (style == "default") {
    style =
      "border-4 border-black bg-gray-800 min-w-24 text-white rounded-3xl min-h-5 p-2 pl-3 text-2xl";
  }
  if (style == "sm") {
    style =
      "border-4 border-black bg-gray-800 min-w-18 text-white rounded-3xl min-h-4 p-1 pl-2 text-lg";
  }
  if (style == "xs") {
    style =
      "border-2 border-black bg-gray-800 min-w-12 text-white rounded-2xl min-h-4 pl-2 text-md";
  }
  if (style == "md") {
    style =
      "border-4 border-black bg-gray-800 min-w-24 text-white rounded-3xl min-h-5 p-2 pl-3 text-2xl";
  }
  if (style == "lg") {
    style =
      "border-4 border-black bg-gray-800 min-w-36 text-white rounded-3xl min-h-5 p-2 pl-4 text-3xl";
  }
  return (
    <div className={extraStyles}>
      {value ? (
        <>
          {!label ? (
            <input
              type={type}
              placeholder={children}
              className={`${style}`}
              onChange={onChange}
              onKeyUp={(e)=>{if(e.key == "Enter"){onEnter()}}}
              value={value}
            ></input>
          ) : (
            <div>
              <label className="text-xl">{label}</label>
              <input
                type={type}
                placeholder={children}
                className={`${style}`}
                onChange={onChange}
                onKeyUp={(e)=>{if(e.key == "Enter"){onEnter()}}}
                value={value}
              ></input>
            </div>
          )}
        </>
      ) : (
        <>
          {!label ? (
            <input
              type={type}
              placeholder={children}
              className={`${style}`}
              onKeyUp={(e)=>{if(e.key == "Enter"){onEnter()}}}
              onChange={onChange}
            ></input>
          ) : (
            <div>
              <label className="text-xl">{label}</label>
              <input
                type={type}
                placeholder={children}
                className={`${style}`}
                onKeyUp={(e)=>{if(e.key == "Enter"){onEnter()}}}
                onChange={onChange}
              ></input>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TextInput;
