"use client";
import Header from "@/app/_components/restaurantHeader";
import React, { useState } from "react";
import "../style.css";
import AddFoodItems from "@/app/_components/AddFoodItems";

const Dashboard = () => {
  const [addItems, setAddItems] = useState(false);
  return (
    <div>
      <Header />
      <button onClick={() => setAddItems(true)} className="button">
        Add Food{" "}
      </button>
      <button className="button" onClick={() => setAddItems(false)}>
        Dashboard
      </button>
      {addItems ? <AddFoodItems /> : <h1>Restaurant Dashboard</h1>}
      <div>Welcome to Dashboard</div>
    </div>
  );
};

export default Dashboard;
