import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import authService from "../authService";
import jwt_decode from "jwt-decode";

const MyOrders = () => {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`component is mounted`);
    const token = authService.getCurrentUser().access;
    const decoded = jwt_decode(token);
    setEmail(decoded.user_email);
  }, []);

  const handleClick = async () => {
    try {
      const url = `/api/orders/${email}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + authService.getCurrentUser().access,
        },
      });
      const products = await res.json();
      console.log(products);

      const final = products.map((item) => {
        const url = "http://localhost:8000";
        return (
          <div key={item.id}>
            <h6>Name:{item.name_of_item}</h6>
            <h6>Brand:{item.brand}</h6>
            <h6>Size:{item.size}</h6>
            <h6>Price:{item.price}</h6>
            <h6>
              image:<img src={url + item.image} width="200px"></img>
            </h6>
          </div>
        );
      });
      setOrders(final);
    } catch (error) {
      console.log("error.message");
    }
  };

  useEffect(() => {
    handleClick();
  }, [email]);

  return <div>{orders}</div>;
};

export default MyOrders;
