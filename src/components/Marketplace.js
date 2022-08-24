import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../authService";
import jwt_decode from "jwt-decode";
import AddToCart from "./AddToCart";

const Marketplace = () => {
  const [email, setEmail] = useState("");
  const [availableClothes, setAvailableClothes] = useState([]);

  useEffect(() => {
    console.log(`component is mounted`);
    const token = authService.getCurrentUser().access;
    const decoded = jwt_decode(token);
    setEmail(decoded.user_email);
  }, []);

  const fetchAvailableClothes = async () => {
    try {
      const url = `/api/clothes/posts/${email}/`;
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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAvailableClothes();
  }, [email]);

  const results = availableClothes.map((item) => {
    // const url = "static";
    return (
      <div
        key={item.id}
        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-72 m-5"
      >
        <div>
          <img src= {item.image} className="rounded-t-lg overflow-hidden"></img>
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
          </div>
        </div>
        <div className=" inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg  dark:bg-red-400 opacity-80 dark:hover:bg-rose-600 dark:focus:ring-rose-600">
          <AddToCart price={item.price} clothes={item.id} />
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-3">{results}</div>
    </>
  );
};

export default Marketplace;
