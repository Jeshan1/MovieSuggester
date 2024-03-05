import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const Profile = () => {
    const navigate = useNavigate()
    const [user,setUser] = useState({});
    const [modal,showModal] = useState(false);
    const [modaltext,setModalText] = useState("");
    const onLogout = () => {
        // localStorage.removeItem("accessToken");
        showModal(true);
        setModalText("Are You Sure To Logout......!");
        // setTimeout(()=>{
        //     navigate("/")
        // },2000);
    }

    useEffect(()=>{
        const getProfile = async () => {
            const getAccessToken = localStorage.getItem("accessToken");
            try{
                const response = await axios.get("https://api.dynoacademy.com/test-api/v1/me",{
                    timeout: 1000,
                    headers: {
                        Authorization: `Bearer ${getAccessToken}`
                    }
                })
            //   console.log(response.data.data) 
              setUser(response.data.data); 
            }
            catch(error){
                if(error.response){
                    // alert(error.response.data.errors[0].message);
                    navigate("/login",{replace:true})
                }
                else{
                    alert("unknown Error occured!");
                }
            }
        }
        getProfile();
    },[])

  return (
    <>
        <Navbar/>
        <div className='px-20 py-10'>
            <div className='w-[30%] border-4 border-black backdrop-filter px-10 py-5 rounded-xl z-10'>
                <p className='my-2 text-xl font-bold'>Name: <span className='text-blue-600'>{user.name}</span></p>
                <p className='my-2 text-xl font-bold'>Email: <span className='text-blue-600'>{user.email}</span></p>
                <p className='my-2 text-xl font-bold'>Country: <span className='text-blue-600'>{user.country}</span></p>
                <button onClick={onLogout} className="text-xl font-bold bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-800" >Logout</button>
            </div> 
        </div>
        {modal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 backdrop-blur-sm z-10">
          <div className="mx-[35%] my-[10%] py-5 rounded-xl bg-slate-300">
            <div className="px-10 py-5 text-center">
              <p className="text-xl font-bold text-blue-600 my-2">
                {modaltext}
              </p>
              <button
                onClick={()=>{
                    localStorage.removeItem("accessToken");
                    navigate("/")
                }}
                className="text-xl font-bold bg-blue-600 text-white px-4 py-2 rounded-lg my-2"
              >
                Ok
              </button>
              <Link to={"/profile"}>
              <button onClick={()=>showModal(false)}
                className="text-xl font-bold bg-red-600 text-white px-4 py-2 rounded-lg my-2 mx-2"
              >
                Cancel
              </button>
              </Link>
              
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile