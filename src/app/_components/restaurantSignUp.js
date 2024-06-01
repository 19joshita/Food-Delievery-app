import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RestaurantSignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const handleSignUp = async () => {
    if (password !== c_password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (
      !email ||
      !password ||
      !c_password ||
      !name ||
      !city ||
      !address ||
      !contact
    ) {
      setError(true);
    } else {
      setError(false);
    }
    // return false;
    let response = await fetch("http://localhost:3000s/api/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        c_password,
        name,
        city,
        address,
        contact,
      }),
    });
    response = await response.json();
    if (response.success === true) {
      console.log("response===========>>", response);
      const { restaurant } = response;
      delete restaurant.password;
      localStorage.setItem("restaurantUser", JSON.stringify(restaurant));
      router.push("/restaurant/dashboard");
    }
  };

  return (
    <div className="mainContainer">
      <h1 className="title input-wrapper">Sign Up</h1>
      <div className="input-wrapper">
        <input
          type="email"
          placeholder="Enter your email"
          className="input-field"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {error && !email && (
          <span className="input-error">Please enter valid email.</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          placeholder="enter your passwords"
          className="input-field"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {passwordError && (
          <span className="input-error">
            Password and confirm Password should match.
          </span>
        )}
        {error && !password && (
          <span className="input-error">Password is required.</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          placeholder="enter your Confirm Password"
          className="input-field"
          value={c_password}
          onChange={(event) => setC_password(event.target.value)}
        />
        {passwordError && (
          <span className="input-error">
            Password and confirm Password should match.
          </span>
        )}
        {error && !c_password && (
          <span className="input-error">Please enter Confirm Password.</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="enter Reataurant Name"
          className="input-field"
          value={name}
          onChange={(event) => setName(event.target?.value)}
        />
        {error && !name && (
          <span className="input-error">Please enter a name.</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="enter City Name"
          className="input-field"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        {error && !city && (
          <span className="input-error">Please enter a valid city name.</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="enter Full Address"
          className="input-field"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        {error && !address && (
          <span className="input-error">Please enter your address.</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="enter Contact Number "
          className="input-field"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
        />
        {error && !contact && (
          <span className="input-error">Please enter contact number.</span>
        )}
      </div>
      <button className="button" type="submit" onClick={() => handleSignUp()}>
        Sign Up
      </button>
    </div>
  );
};

export default RestaurantSignUp;
