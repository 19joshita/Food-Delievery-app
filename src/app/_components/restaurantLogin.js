"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body: JSON.stringify({ email, password, login: true }),
    });
    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      alert(response?.message);
      router.push("/restaurant/dashboard");
    } else {
      alert("Login failed");
    }
    console.log("login console***********", { email, password });
  };
  return (
    <div className="mainContainer">
      <h1 className="title input-wrapper">Login</h1>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Enter your Email Address"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && !email && (
          <span className="input-error">Email is required.</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          placeholder="enter your passwords"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && !password && (
          <span className="input-error">Password is required.</span>
        )}
      </div>
      <button className="button" type="submit" onClick={() => handleLogin()}>
        Login
      </button>
    </div>
  );
};

export default RestaurantLogin;
