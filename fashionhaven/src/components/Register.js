import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

function Register() {
  const [failedLogin, setFailedLogin] = useState(true);
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const addressRef = useRef();
  const postalRef = useRef();
  const contactRef = useRef();

  const navigate = useNavigate();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: emailRef.current.value,
      username: capitalizeFirstLetter(usernameRef.current.value),
      password: passwordRef.current.value,
      address: addressRef.current.value,
      postal_code: postalRef.current.value,
      contact_number: contactRef.current.value,
    };
    if (data.email === "") {
      alert("Email field is empty.");
      return false;
    } else if (data.password === "") {
      alert("Password field is empty.");
      return false;
    } else if (data.username === "") {
      alert("Username field is empty.");
      return false;
    } else if (data.address === "") {
      alert("Address field is empty.");
      return false;
    } else if (data.postal_code === "") {
      alert("Postal code field is empty.");
      return false;
    } else if (data.contact_number === "") {
      alert("Contact number field is empty.");
      return false;
    }
    const url = "/api/user/create/";
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    const loginData = await res.json();
    console.log(res.status);
    console.log(loginData);

    if (res.status === 400) {
      console.log(loginData.message);
      alert(
        `User already exists. Please register with a different email address.`
      );
    } else {
      setFailedLogin(!failedLogin);
      failedLogin ? navigate("/login") : console.log("No change");
    }
  };
  const handleBack = () => {
    navigate("/welcome");
  };
  return (
    <div>
      <div>
        <div>
          <h1>Register</h1>
        </div>
        <h2 className="text-2xl text-slate-600">
          Please sign up for an account
        </h2>
      </div>
      <div>
        <form
          onSubmit={handleOnSubmit}
          className="grid grid-cols-6 grid-rows-6 mt-14"
        >
          <div>
            <label> Email </label>
            <input
              type="text"
              name="email"
              ref={emailRef}
              placeholder="Log In Email"
            />
          </div>
          <div>
            <label> Password </label>
            <input
              type="password"
              name="password"
              ref={passwordRef}
              placeholder="Password"
            />
          </div>
          <div>
            <label> Username </label>
            <input
              type="text"
              name="username"
              ref={usernameRef}
              placeholder="Username"
            />
          </div>
          <div>
            <label> Address </label>
            <input
              type="text"
              name="text"
              ref={addressRef}
              placeholder="Address"
            />
          </div>
          <div>
            <label> Postal Code </label>
            <input
              type="text"
              name="text"
              ref={postalRef}
              placeholder="Postal Code"
            />
          </div>
          <div>
            <label> Contact Number</label>
            <input
              type="text"
              name="text"
              ref={contactRef}
              placeholder="Contact Number"
            />
          </div>
          <div className="grid row-start-3 col-start-3 col-span-2 justify-center">
            <button type="submit" className="bg-red-200 px-8 py-3 my-2">
              Register
            </button>
          </div>
          <div className="row-start-5 col-span-2 col-start-3 hover:text-red-800">
            <button onClick={handleBack}>Back To Home</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
