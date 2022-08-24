import React, { useState, useEffect } from "react";
import authService from "../authService";
import jwt_decode from "jwt-decode";
import styles from "./AddToCart.module.css";

const AddToCart = (props) => {
  const [toggleDisable, setToggleDisable] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = authService.getCurrentUser().access;
    const decoded = jwt_decode(token);
    setEmail(decoded.user_email);
  }, []);

  const clothes = props.clothes;
  const price = props.price;

  const handleCart = async () => {
    const url = `/api/cart/add/`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + authService.getCurrentUser().access,
        },
        body: JSON.stringify({
          clothes: clothes,
          price: price,
          user_email: email,
        }),
      });
      const products = await res.json();
      console.log(products);
      setToggleDisable(true);
    } catch (error) {
      console.log("error.message");
    }
    alert("You have added item to cart!");
  };
  return (
    <div>
      <button
        onClick={handleCart}
        className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group disabled:opacity-10 "
        disabled={toggleDisable}
      >
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56 disabled: bg-grey-700"></span>
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700 "></span>
        <span className="relative">Add To Cart</span>
      </button>
    </div>
  );
};

export default AddToCart;
