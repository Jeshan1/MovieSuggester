import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="bg-blue-600 text-white px-36 py-5">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-bold">MovieApp</h1>
          </div>
          <ul className="flex gap-5">
            <li className="text-xl font-bold">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="text-xl font-bold">
              {
                localStorage.getItem("accessToken") ? (
                  <><Link to={"/profile"}>Profile</Link></>
                ):(
                  <><Link to={"/login"}>Login</Link></>
                )
              }
              
            </li>
            <li className="text-xl font-bold">
              <Link to={"/add"}>Add Movie</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
