"use client";
import React from "react";

const TextArea = ({
  style = "default",
  extraStyles = "",
  type = "text",
  label = null,
  onChange = () => {},
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
            <textarea
              type={type}
              placeholder={children}
              className={`${style}`}
              onChange={onChange}
              value={value}
            ></textarea>
          ) : (
            <div>
              <label className="text-xl text-black">{label}</label>
              <textarea
                type={type}
                placeholder={children}
                className={`${style}`}
                onChange={onChange}
                value={value}
              ></textarea>
            </div>
          )}
        </>
      ) : (
        <>
          {!label ? (
            <textarea
              type={type}
              placeholder={children}
              className={`${style}`}
              onChange={onChange}
            ></textarea>
          ) : (
            <div>
              <label className="text-xl text-black">{label}</label>
              <textarea
                type={type}
                placeholder={children}
                className={`${style}`}
                onChange={onChange}
              ></textarea>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TextArea;
