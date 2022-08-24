import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import authService from "../authService";
import jwt_decode from "jwt-decode";
import Checkout from "./Checkout";
import DeleteCartItem from "./DeleteCartItem";

const MyCart = () => {
  const [email, setEmail] = useState("");
  const [cart, setCarts] = useState([]);
  const [price, setPrice] = useState(0);
  const [checkedOut, setCheckout] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const token = authService.getCurrentUser().access;
    const decoded = jwt_decode(token);
    setEmail(decoded.user_email);
  }, []);

  // get initial cart
  const handleCart = async () => {
    const url = `/api/cart/${email}/`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + authService.getCurrentUser().access,
        },
      });
      const products = await res.json();
      console.log(products);
      let totalPrice = 0;

      const results = products.map((item) => {
        totalPrice += parseFloat(item.price); //parsefloat to make it an integer
        return (
          <div className="  max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-72 m-5 max-h-128">
            <div className="max-h-64 overflow-hidden">
              <img src={item.imageUrl} width="200px"></img>
            </div>
            <div className="p-5">
              <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.name_of_item}
              </h6>
              <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <h6>${item.price}</h6>
                <h6>Size:{item.size}</h6>
                <h6>Brand:{item.brand}</h6>
              </div>
              {/* <DeleteCartItem id={item.id}></DeleteCartItem> */}
            </div>
          </div>
        );
      });
      setCarts(results);
      console.log(results);
      // console.log(totalPrice);
      setPrice(totalPrice);
    } catch (error) {
      console.log("error.message");
    }
  };
  useEffect(() => {
    handleCart();
  }, [email]);

  const handleClick = async () => {
    try {
      const url = `/api/orders/id/${email}/`;
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + authService.getCurrentUser().access,
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const products = await res.json();
      console.log(products);

      alert("You have made an order!");
      setCheckout(products);
      setPrice(0);
      navigate("/home");
    } catch (error) {
      console.log("error.message");
    }
  };

  return (
    <div className="grid grid-cols-3 grid-rows-3">
      {cart}
      <p>Total Price: ${price}</p>
      <button
        onClick={handleClick}
        className="grid col-start-3 relative px-6 py-3 font-bold text-black group mt-8"
      >
        <span class="absolute inset-0 w-80 h-16 transition duration-300 ease-out transform -translate-x-3 -translate-y-2 bg-red-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
        <span class="absolute inset-0 w-80 h-16 border-4 border-black"></span>
        <span class="absolute inset-5 transform -translate-x-16">
          Ready to Check Out?
        </span>
      </button>
    </div>
  );
};

export default MyCart;
