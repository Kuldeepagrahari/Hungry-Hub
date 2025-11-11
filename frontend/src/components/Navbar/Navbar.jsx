
import { useContext } from 'react' // useEffect and useState are unused here, removed for cleanliness
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ setShowLogin }) => {

    const context = useContext(StoreContext);
    
    // If context is null (which it is on initial render/crash), return null to avoid destructuring error
    if (!context) {
        return null; 
    }
    
    // Now safely destructure the values from the valid context object
    const { getTotalCartAmount, token, setToken } = context; 
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        // Also clear the userRole upon logout
        localStorage.removeItem("userRole"); 
        setToken("");
        navigate('/')
    }

    return (
        <div className='navbar'>
           
            <Link to='/cart' className='navbar-search-icon'>
                <img src={assets.basket_icon} alt="" />
                <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
            </Link>

            {!token ? (
                <button onClick={() => setShowLogin(true)}>sign in</button>
            ) : (
                <div className='navbar-profile'>
                    <img src={assets.profile_icon} alt="" />
                    <ul className='navbar-profile-dropdown'>
                        <li onClick={()=>navigate('/myorders')}> <img src={assets.bag_icon} alt="" /> <p>Orders</p></li>
                        
                        {/* You might add Admin redirect here for convenience */}
                        {localStorage.getItem('userRole') === 'admin' && (
                            <li onClick={() => window.location.href = "https://hungry-hub-admin-5v2a.onrender.com/"}> 
                                <img src={assets.settings_icon} alt="" /> <p>Admin Panel</p>
                            </li>
                        )}
                        
                        <li onClick={logout}> <img src={assets.logout_icon} alt="" /> <p>Logout</p></li> 
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Navbar;