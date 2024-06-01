"use client";
import React, { useState } from "react";
import RestaurantLogin from "../_components/restaurantLogin";
import RestaurantSignUp from "../_components/restaurantSignUp";
import "./style.css";
import Header from "../_components/restaurantHeader";
import Footer from "../_components/RestaurantFooter";
const Restaurant = () => {
  const [login, setLogin] = useState(true);
  return (
    <div>
      <div>
        <Header />
      </div>
      {login ? <RestaurantLogin /> : <RestaurantSignUp />}
      <button onClick={() => setLogin(!login)} className="textStyle">
        {login
          ? "Do not have an account ? SingUp"
          : "Already have and account? Login"}
      </button>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Restaurant;
