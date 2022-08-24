import React from "react";
import authService from "../authService";

const DeleteCartItem = (props) => {
  const handleClick = async (e) => {
    const query = e.target.id;
    try {
      const url = `/api/cart/delete/${query}/`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + authService.getCurrentUser().access,
        },
      });
      const products = await res.json();
      alert("You have removed item from cart!");
    } catch (error) {
      console.log("error.message");
    }
  };

  return (
    <div>
      <button id={props.id} onClick={handleClick}>
        Remove From Cart
      </button>
    </div>
  );
};

export default DeleteCartItem;
