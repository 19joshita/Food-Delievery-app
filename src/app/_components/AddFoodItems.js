"use client";
import React, { useState } from "react";

const AddFoodItems = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const handleAddFood = async () => {
    if (!name || !path || !price || !description) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    let restro_id;
    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    if (path !== "" || name !== "" || path !== "" || description !== "") {
      if (restaurantData) {
        restro_id = restaurantData?._id;
      }
      let response = await fetch("http://localhost:3000/api/restaurant/foods", {
        method: "POST",
        body: JSON.stringify({ name, price, path, description, restro_id }),
      });
      response = await response.json();
      console.log({ name, price, path, description });
      if (response.success) {
        alert("food items successfully!");
      } else {
        alert("food items failed!");
      }
    }
  };
  return (
    <div className="mainContainer">
      <h1 className="title input-wrapper">Login</h1>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Enter your Name"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && (
          <span className="input-error">Name is required.</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="enter price"
          className="input-field"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && (
          <span className="input-error">Price is required.</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="enter image path"
          className="input-field"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        {error && !path && (
          <span className="input-error">Path is required.</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="enter description"
          className="input-field"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && !description && (
          <span className="input-error">Description is required.</span>
        )}
      </div>

      <button className="button" type="submit" onClick={() => handleAddFood()}>
        Add Food
      </button>
    </div>
  );
};

export default AddFoodItems;
