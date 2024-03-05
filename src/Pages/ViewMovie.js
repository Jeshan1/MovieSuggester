import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import {FcRating} from "react-icons/fc"
import Navbar from './Navbar';
const ViewMovie = () => {
  const getParams = useParams();
  const getId = getParams.id;
  const [movie,setMovie] = useState({});

  
  useEffect(()=>{
    const SingleData = async () => {
      const response = await axios.get(`https://api.dynoacademy.com/test-api/v1/movie/${getId}`);
      setMovie(response.data.singleMovieData);
      console.log(response.data.singleMovieData.name);
    }
    SingleData();
  },[getId]);
  
  return (
    <>
    <Navbar/>
    <div className='px-36 py-10 bg-gray-300 h-full'>
      <div className='border-4 border-dashed border-blue-600 px-10 py-5'>
        <h1 className='text-2xl font-bold text-blue-600 my-2'>{movie.name}</h1>
        <img src={movie.image} alt='movie' className='rounded-xl' />
        <p className='text-lg font-bold my-2 text-blue-600'>{movie.info}</p>
        <p className='text-2xl font-bold text-blue-600'>{movie.rating} <FcRating className="inline text-2xl align-middle"/></p>
        {/* <button onClick={() => DeleteData(movie.id)} className='text-xl font-bold bg-red-600 text-white px-4 py-2 rounded-xl my-2'>Delete Data</button> */}
      </div>
    </div>
    </>
  )
}

export default ViewMovie