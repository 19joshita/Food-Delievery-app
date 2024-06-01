import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
const Header = () => {
  const [details, setDetails] = useState();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    let data = localStorage.getItem("restaurantUser");
    if (!data && pathname === "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathname === "/restaurant") {
      router.push("/restaurant/dashboard");
    } else {
      setDetails(JSON.parse(data));
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant");
  };
  return (
    <div className="header-wrapper">
      <div className="logo">
        <img
          src="/_assets/food-delivery-logo1.png"
          alt="#"
          style={{ width: "200px", height: "80px" }}
        />
      </div>
      <div className="">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {details && details.name ? (
            <>
              <li>
                <button onClick={() => logout()}>Logout</button>{" "}
              </li>
              <li>
                {" "}
                <Link href="/">Profile</Link>
              </li>
            </>
          ) : (
            <li>
              {" "}
              <Link href="/">Login/SignUp</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
