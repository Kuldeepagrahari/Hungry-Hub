import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>Lets Order your favourite food here!</h2>
                <p><i>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</i></p>
                <button><a href="#food-display">View Menu</a></button>
            </div>
        </div>
    )
}

export default Header
