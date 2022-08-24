import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../authService";
import styles from "./Login.module.css";

const Login = () => {
  //states for login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);
  let navigate = useNavigate();

  //handling changes
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    authService
      .login(email, password)
      .then(() => {
        // window.location.reload();
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.message);
        setLogin(false);
      });
    setLogin(true);
  };

  const handleBack = () => {
    navigate("/welcome");
  };
  //Password
  return (
    <>
      <div>
        <h1>Login</h1>
      </div>
      {login && <p>Please log in with your email and password.</p>}
      {!login && <p>Username or password is wrong. Please try again.</p>}
      <div>
        <form onSubmit={handleLogin} className="grid grid-cols-6 grid-rows-6">
          <div className="w-96 col-start-3 row-start-2 mt-2 place-self-center text-xl">
            <label>Email: </label>
          </div>
          <input
            className="form-input px-3 py-2 col-start-4 row-start-2 mb-2 "
            id="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={handleEmail}
            required
          ></input>
          <div className="w-96 col-start-3 row-start-3 mt-4 place-self-center text-xl">
            <label> Password: </label>
          </div>

          <input
            className="form-input px-3 py-2 col-start-4 row-start-3 mt-2"
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePassword}
            required
          />

          <div className="grid row-start-5 col-start-3 col-span-2 justify-center">
            <button type="submit" className="bg-red-200 px-8 ">
              Submit
            </button>
          </div>
        </form>
        <div className="grid row-start-6 col-start-4 col-span-1 hover:text-red-800">
          <button onClick={handleBack}>Back To Home</button>
        </div>
      </div>
    </>
  );
};

export default Login;
