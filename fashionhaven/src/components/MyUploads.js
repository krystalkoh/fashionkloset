import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../authService";
import jwt_decode from "jwt-decode";
import Upload from "./Upload";
import UploadButton from "./UploadButton";


const MyUploads = () => {
  const [availableClothes, setAvailableClothes] = useState([]);

  const fetchAvailableClothes = async () => {
    try {
      const token = authService.getCurrentUser().access;
      const decoded = jwt_decode(token);
      const query = decoded.user_email;
      const url = `/api/clothes/uploads/${query}/`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + authService.getCurrentUser().access,
        },
      });
      const products = await res.json();
      setAvailableClothes(products);
    } catch (error) {
      console.log("error.message");
    }
  };

  useEffect(() => {
    fetchAvailableClothes();
  }, []);

  const handleClick = async (e) => {
    const query = e.target.id;
    const url = `/api/clothes/posts/delete/${query}/`;

    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + authService.getCurrentUser().access,
        },
      });
      const products = await res.json();
      fetchAvailableClothes();
    } catch (error) {
      console.log("error.message");
    }
  };

  const results = availableClothes.map((item) => {
    // const url = 'https://localhost.com/'
    return (
      <div
        key={item.id}
        className="  max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-72 m-5 max-h-128"
      >
        <div className="rounded-t-lg overflow-hidden">
          <img src={item.image} className="rounded-t-lg"></img>
        </div>
        <div className="p-5">
          <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item.name_of_item}
          </h6>
          <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <h6> ${item.price}</h6>
            <h6> Size: {item.size}</h6>
            <h6> Brand: {item.brand}</h6>
            <h6> Description: {item.description}</h6>
            <h6> Date Listed: {item.date_listed}</h6>

            <button
              id={item.id}
              onClick={handleClick}
              className=" relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg "
            >
              Delete Item
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div>
        <UploadButton></UploadButton>
      </div>
      <div className="grid grid-cols-3 grid-rows-3">{results}</div>
    </>
  );
};

export default MyUploads;
