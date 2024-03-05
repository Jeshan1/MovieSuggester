import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MapData from './MapData';
import Navbar from './Navbar'
const Index = () => {
    const [movies,setMovies] = useState([]);
    const [error,setError] = useState(false);
    const [iserror,setIserror] = useState("");
    const [searchText,setSearchText] = useState("");
    const [searchErrorText,setSearchErrorText] = useState(false);
    const [loading,setLoading] = useState("");
    const [firstRun,setFirstRun] = useState(true);

   
    useEffect(()=>{
        FetchData();
    },[])

    const FetchData = async () => {
        setSearchErrorText("");
        setLoading(true);
        try{
            const response = await axios.get(`https://api.dynoacademy.com/test-api/v1/movies?search=${searchText}`);
            setMovies(response.data.moviesData);
            setError(false);
            setLoading(false);
            setFirstRun(false)
        }
        catch(error){
            setError(true);
            setIserror("Invalid Expression Occured!");
            setLoading(false);
            setFirstRun(false);
        }
    }
   
    useEffect((e)=>{
        if(!firstRun){
            const FetchTimer = setTimeout(()=>{
                if(searchText && searchText.length > 2){
                    FetchData();
                    setSearchErrorText("");
                }
                else if(searchText === ""){
                    FetchData();
                    setSearchErrorText("");
                }
                else{
                    setSearchErrorText("Please type at least 3 characters...");
                }
               
            },2000)
            return () => {
                clearTimeout(FetchTimer)
            }
        }
    },[searchText])

  return (
    <>
    <Navbar/>
       <div className='mx-20 my-10'>
        <div>
            <input type="text" placeholder='search movie here' value={searchText} onChange={(e)=>setSearchText(e.target.value)} className="text-xl font-bold px-4 py-2 rounded-lg bg-slate-200 w-full border-2 border-dashed border-blue-700 text-blue-700 focus:outline-none" />
            <span>{searchErrorText}</span>
        </div>
       <div className='grid grid-cols-3 gap-5 my-5'>
        {
            error ? (
                <>
                <div className=' text-red-600 px-4 py-2 text-xl font-bold'>{iserror}</div>
                </>
            )
             :
             ( 
             
                 <>
                 {
                    loading ? <>Loading........</>:<></>
                 }
                    {
                      !loading &&  movies.length < 1 ? 
                        <div className='text-xl font-bold text-red-600'>No Movies Found......</div> 
                        : 
                        <>
                            {
                                movies.map((item) => {
                                return(
                                <MapData key={item.id} item = {item}/>  
                                )
                            })
                        }
                        </>
                    }
              
                    
                 </>
             
           
                    
            )
        }
       </div>
       </div>
    </>
  )
}

export default Index