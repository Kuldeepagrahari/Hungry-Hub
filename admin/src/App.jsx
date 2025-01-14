import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home'
const App = () => {
  return (
    <div className='app'>
      <ToastContainer/>
      <Navbar/>
      
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/add" element={<Add/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/orders" element={<Orders/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
