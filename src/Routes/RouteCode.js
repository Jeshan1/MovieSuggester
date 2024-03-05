import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import AddMovie from '../Pages/AddMovie';
import Index from '../Pages/Index';
import Login from '../Pages/Login';
import Profile from '../Pages/Profile';

import ViewMovie from '../Pages/ViewMovie';
const RouteCode = () => {
  return (
    <>
      
      <Router>
        <Routes>
          <Route path='/' element={<Index/>} exact/>
          <Route path='/view_movie/:id' element={<ViewMovie/>} exact/>
          <Route path='/add' element={<AddMovie/>} exact/>
          <Route path='/login' element={<Login/>} exact/>
          <Route path='/profile' element={<Profile/>} exact/>
        </Routes>
      </Router>

    </>
  )
}

export default RouteCode