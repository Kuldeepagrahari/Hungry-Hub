import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <div className='header'>
            <div className='header-contents'>
                <button><NavLink to="foodMenu">View Menu</NavLink></button>
            </div>
        </div>
    )
}

export default Header
