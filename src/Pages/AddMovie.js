import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const AddMovie = () => {
  const movie_name = useRef();
  const movie_rating = useRef();
  const movie_description = useRef();
  const navigate = useNavigate();
  const AddMovieHandler = async (e) => {
    e.preventDefault();
    const movieData = {
      movie_name: movie_name.current.value,
      rating: movie_rating.current.value,
      description: movie_description.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        {
          timeout: 1000,
        }
      );
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.errors[0].message);
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown Error Occurred!");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-36 mt-10">
        <form
          onSubmit={AddMovieHandler}
          className="border-4 border-dashed px-10 border-blue-600 rounded-xl py-10"
        >
          <input
            ref={movie_name}
            type="text"
            placeholder="Type Movie Name"
            className="text-xl font-bold my-3 px-4 py-2 block w-full rounded-xl bg-blue-600 text-white"
          />
          <input
            ref={movie_rating}
            type="text"
            placeholder="Type Movie Rating"
            className="text-xl font-bold my-3 px-4 py-2 block w-full rounded-xl bg-blue-600 text-white"
          />
          <textarea
            ref={movie_description}
            placeholder="Type Movie Description"
            rows={5}
            cols="10"
            className="text-xl font-bold px-4 py-2 rounded-xl bg-blue-600 text-white w-full"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 text-xl font-bold rounded-xl my-2"
          >
            Add Movie
          </button>
        </form>
      </div>
    </>
  );
};

export default AddMovie;
