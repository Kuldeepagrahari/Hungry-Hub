import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <center >Hello, ADMIN !</center>
      <img className='profile' src={assets.profile_image} alt="" />
      {/* <center>ADMIN PANEL</center> */}
    </div>
  )
}

export default Navbar
