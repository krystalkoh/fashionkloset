import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Landingpage.module.css";

const Home = () => {
  return (
    <div className=" grid grid-cols-3 ">
      <div className="flex ml-24 col-span-1">
        <h1 id="title" className="flex">
          FashionKloset
        </h1>
      </div>
      <div className="grid mt-10 ml-20 col-span-2 grid-rows-2 grid-cols-2 h-36">
        <p className="row-start-1 col-span-2 justify-center italic mt-8">
          A haven for fashion. <br></br>Sell your pre-loved clothes and buy the
          pieces you've been eyeing from other users.
        </p>
        {/* edit this css here */}
        <NavLink
          to="/login"
          id="login"
          className="w-40  text-lg bg-orange-200 mx-10 rounded-tr-xl row-start-3 ml-64 mt-40 "
        >
          <h5>Log In</h5>
        </NavLink>
        <NavLink
          to="/register"
          id="login"
          className="w-40 text-lg bg-orange-200  rounded-tr-xl row-start-3 mt-40"
        >
          <h5>Sign Up</h5>
        </NavLink>
      </div>

      <div className="col-span-3 ml-4 mr-4 mb-3">
        <img src="https://i.imgur.com/j1DLxJd.jpg" className="bg-center"></img>
      </div>
    </div>
  );
};

export default Home;
