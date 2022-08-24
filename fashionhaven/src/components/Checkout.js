import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import authService from "../authService";
import jwt_decode from "jwt-decode";
import MyOrders from "./MyOrders";

const Checkout = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`component is mounted`);
    const token = authService.getCurrentUser().access;
    const decoded = jwt_decode(token);
    console.log(decoded.user_email);
    setEmail(decoded.user_email);
  }, []);

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
      navigate("/market");
    } catch (error) {
      console.log("error.message");
    }
  };

  //   useEffect(() => {
  //     fetchAvailableClothes();
  //   }, []);

  return (
    <div>
      <button onClick={handleClick}>Checkout</button>
    </div>
  );
};

export default Checkout;
