import React from "react";
import {FcRating} from "react-icons/fc"
import { Link } from "react-router-dom";
const MapData = ({item}) => {
  return (
    <>
      <div
        key={item.id}
        className="bg-teal-400 rounded-xl px-5 py-5"
      >
        <img className="rounded-xl" src={item.image} alt="" />
        <Link to={`/view_movie/${item.id}`}>
        <h1 className="text-2xl font-bold text-blue-600">{item.name}</h1>
        </Link>
        <p className="py-2 text-lg font-bold text-black">{item.info}</p>
        <span className="text-xl font-bold">{item.rating} <FcRating className="inline text-xl align-text-bottom"/></span>
      </div>
    </>
  );
};

export default MapData;
