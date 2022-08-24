import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import authService from "../authService";
import jwt_decode from "jwt-decode";
import shopping from "../assets/shopping.jpg";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [getApi, setGetApi] = useState("");
  //   const [profile, setProfile] = useState("");

  useEffect(() => {
    console.log(`component is mounted`);
    const token = authService.getCurrentUser().access;
    const decoded = jwt_decode(token);
    setEmail(decoded.user_email);
  }, []);

  const getProfile = async () => {
    try {
      const url = `/api/profile/${email}/`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + authService.getCurrentUser().access,
        },
      });
      const products = await res.json();
      console.log(products);
      setGetApi(products);

      //   setProfile(results);
    } catch (error) {
      console.log("error.message");
    }
  };

  useEffect(() => {
    getProfile();
  }, [email]);

  return (
    <>
      <div>
        <h1> Your Profile.</h1>
      </div>
      <div>Usename: {getApi.username}</div>
      <div>Address: {getApi.address}</div>
      <div>Contact Number: {getApi.contact_number}</div>
      <div>Postal Code: {getApi.postal_code}</div>
      <div>Wallet: ${getApi.wallet}</div>
      <img src={shopping}></img>
    </>
  );
};

export default Profile;
