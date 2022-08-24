import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UploadButton.module.css";

const UploadButton = () => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/upload");
  };
  return (
    <>
      <div className="mt-3">
        <button
          onClick={handleClick}
          className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold group"
        >
          <span class="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-black opacity-[3%]"></span>
          <span class="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-rose-700 opacity-70 group-hover:-translate-x-8"></span>
          <span class="relative w-full text-left text-rose-700 transition-colors duration-200 ease-in-out group-hover:text-white">
            <h4>Add Item To Sell</h4>
          </span>
          <span class="absolute inset-0 border-2 border-black "></span>
        </button>
      </div>
    </>
  );
};

export default UploadButton;
