import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const Login = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modaltext, setModalText] = useState("");
  const LoginForm = async (e) => {
    e.preventDefault();
    const logindata = {
      email: email.current.value,
      password: password.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        logindata,
        {
          timeout: 2000,
        }
      );

      if (response.data.status === "success") {
        setShowModal(true);
        setModalText("Login Successfully!");
        setTimeout(() => {
          navigate("/add");
        }, 2000);
      }

      const getAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", getAccessToken);
    } catch (error) {
      if (error.response) {
        // alert(error.response.data.errors[0].message);
        setModalText(error.response.data.errors[0].message);
        setShowModal(true);
      } else {
        // alert("Unknown Error Occured! Try again later!");
        setModalText("Unknown Error Occured! Try again later!");
        setShowModal(true);
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="mx-72 my-10 border-4 rounded-xl">
        <form className="px-10 py-10" onSubmit={LoginForm}>
          <div className="my-2">
            <input
              type="email"
              ref={email}
              placeholder="Type Your Email"
              className="bg-gray-200 text-xl font-bold shadow-2xl backdrop-filter backdrop-brightness-90 w-full px-4 py-2  border-2 border-blue-600 rounded-xl focus:outline-none focus:border-none"
            />
          </div>

          <div className="my-2">
            <input
              type="password"
              ref={password}
              placeholder="Type Your Password"
              className="bg-gray-200 my-2 text-xl font-bold shadow-2xl backdrop-filter w-full backdrop-brightness-90 px-4 py-2  border-2 border-blue-600 rounded-xl focus:outline-none focus:border-none"
            />
          </div>
          <div className="">
            <button
              type="submit"
              className="bg-blue-600 text-xl font-bold px-4 py-2 rounded-xl hover:bg-blue-800 text-white"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 backdrop-blur-sm z-10">
          <div className="mx-[35%] my-[10%] py-5 rounded-xl bg-slate-300">
            <div className="px-10 py-5 text-center">
              <p className="text-xl font-bold text-blue-600 my-2">
                {modaltext}
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="text-xl font-bold bg-red-600 text-white px-4 py-2 rounded-lg my-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
