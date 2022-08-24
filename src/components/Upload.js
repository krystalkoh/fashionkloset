import React, { useEffect, useState } from "react";
import authService from "../authService";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import styles from "./Upload.module.css";

const Upload = () => {
  let navigate = useNavigate();
  const [name_of_item, setName_of_item] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [availableClothes, setAvailableClothes] = useState([]);
  const [url, setUrl] = useState("");

  const handleName = (event) => {
    setName_of_item(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleBrand = (event) => {
    setBrand(event.target.value);
  };
  const handleSize = (event) => {
    setSize(event.target.value);
  };
  const handleTags = (event) => {
    setTags(event.target.value);
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleClick = () => {
    navigate("/kloset");
  };

  useEffect(() => {
    console.log(`component is mounted`);

    const token = authService.getCurrentUser().access;

    const decoded = jwt_decode(token);
    console.log(decoded.user_email);
    setEmail(decoded.user_email);
  }, []);

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "fashionkloset");
    data.append("cloud_name", "krystalk");
    fetch("  https://api.cloudinary.com/v1_1/krystalk/image/upload", {
      method: "POST",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        console.log(data);
        console.log(url);
      })
      .catch((err) => console.log(err + "error with image upload"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadImage();
    let form_data = new FormData();
    url && form_data.append("image", image);
    form_data.append("name_of_item", name_of_item);
    form_data.append("description", description);
    form_data.append("price", price);
    form_data.append("brand", brand);
    form_data.append("size", size);
    form_data.append("email", email);
    form_data.append("tags", tags);
    console.log(form_data);

    try {
      const url = "/api/clothes/posts/";
      const res = await fetch(url, {
        headers: {
          Authorization: "Bearer " + authService.getCurrentUser().access,
        },
        method: "POST",
        body: form_data,
      });

      const products = await res.json();
      console.log(products);
    } catch (error) {
      console.log("error.message with the other form data");
    }
    alert("You have added an item to sell!");
  };

  return (
    <>
      <h1>Sell an item</h1>
      <div className="w-96 col-start-1 row-start-4 align-top text-xl">
        <button className="relative inline-block px-4 py-2 font-medium group">
          <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
          <span
            class="relative text-black group-hover:text-white"
            onClick={handleClick}
          >
            Back To My Kloset
          </span>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-6 grid-rows-9">
        <div className="w-96 col-start-3 row-start-1 mt-2 place-self-center text-xl">
          <label>Name Of Item: </label>
        </div>
        <div className="px-3 py-2 col-start-4 row-start-1 mb-2 ">
          <input
            className="form-input"
            type="text"
            placeholder="Name Of Item"
            value={name_of_item}
            onChange={handleName}
            required
          />
        </div>
        <div className="w-96 col-start-3 row-start-2 mt-4 place-self-center text-xl">
          <label>Description: </label>
        </div>
        <div className=" px-3 py-2 col-start-4 row-start-2 mb-2 ">
          <input
            className="form-input"
            type="text"
            placeholder="Description"
            value={description}
            onChange={handleDescription}
            required
          />
        </div>
        <div className="w-96 col-start-3 row-start-3 mt-4 place-self-center text-xl">
          <label>Price: </label>
        </div>
        <div className="px-3 py-2 col-start-4 row-start-3 mb-2 ">
          <input
            className="form-input"
            type="number"
            placeholder="Price"
            value={price}
            onChange={handlePrice}
            required
          />
        </div>
        <div className="w-96 col-start-3 row-start-4 mt-4 place-self-center text-xl">
          <label>Brand: </label>
        </div>
        <div className=" px-3 py-2 col-start-4 row-start-4 mb-2 ">
          <input
            className="form-input"
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={handleBrand}
            required
          />
        </div>
        <div className="w-96 col-start-3 row-start-5 mt-4 place-self-center text-xl">
          <label>Size: </label>
        </div>
        <div className=" px-3 py-2 col-start-4 row-start-5 mb-2 ">
          <input
            className="form-input"
            type="text"
            placeholder="Size"
            value={size}
            onChange={handleSize}
            required
          />
        </div>
        <div className="w-96 col-start-3 row-start-6 mt-4 place-self-center text-xl">
          <label>Tags: </label>
        </div>
        <div className="px-3 py-2 col-start-4 row-start-6 mb-2 ">
          <select
            className="form-input"
            type="select"
            id="tags"
            placeholder="Tags"
            value={tags}
            onChange={handleTags}
            required
          >
            <option value="TOP"> Top</option>
            <option value="SKIRT"> Skirt</option>
            <option value="SHORTS"> Shorts</option>
            <option value="PANTS"> Pants</option>
            <option value="DRESS"> Dress</option>
            <option value="SET"> Set</option>
            <option value="OUTERWEAR"> Outerwear</option>
            <option value="ACCESSORIES"> Accessories</option>
          </select>
        </div>
        <div className="w-96 col-start-3 row-start-8 mt-4 place-self-center text-xl">
          <label>Image: </label>
        </div>
        <div>
          <input
            className="form-input px-3 py-2 col-start-4 row-start-8 mb-2 "
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="w-96 col-start-6 row-start-3 row-span-2 place-self-center text-xl">
          <button
            type="submit"
            className="relative inline-block px-4 py-2 font-medium group w-52 mr-10"
          >
            <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-slate-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span class="absolute inset-0 w-full h-full bg-slate-600 border-2 border-white group-hover:bg-white"></span>
            <span class="relative text-white group-hover:text-black">
              Submit
            </span>
          </button>
        </div>
      </form>
    </>
  );
};

export default Upload;
