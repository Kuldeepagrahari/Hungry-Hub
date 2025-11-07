
import { useContext, useState } from 'react';
// useNavigate is no longer needed since we use window.location.href for external redirect
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

// Define the external Admin URL for redirection
const ADMIN_PANEL_URL = "https://hungry-hub-admin-5v2a.onrender.com/"; 

const LoginPopup = ({ setShowLogin }) => {

    const { setToken, url, loadCartData } = useContext(StoreContext);

    // State for form mode (Login/Sign Up)
    const [currState, setCurrState] = useState("Sign Up");
    
    // Tracks the multi-step flow: 0=Form, 1=OTP Input
    const [authStep, setAuthStep] = useState(0); 

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        otp: "" // Field for OTP input
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    // --- Core Logic for Handling Success (Unified Authentication) ---
    const handleSuccessResponse = (response) => {
        const { token, role, name, message } = response.data;
        
        if (response.data.success) {
            setToken(token);
            localStorage.setItem("token", token);
            localStorage.setItem("userRole", role); 

            loadCartData({ token });
            
            if (role === 'admin') {
                toast.success(`Welcome back, Admin ${name}! Redirecting to Admin Panel...`);
                // FIX: Use window.location.href for EXTERNAL redirect to the admin panel
                window.location.href = ADMIN_PANEL_URL; 
            } else {
                toast.success(`Welcome, ${name}!`);
                setShowLogin(false); // Close modal for standard user
            }
        } else {
            // Handle specific backend signals
            if (response.data.registration_pending) {
                toast.success(message);
                setAuthStep(1); // Move to OTP input screen
            } else if (response.data.message.includes("Account not verified")) {
                 // For users trying to log in but needing verification
                toast.error(message);
                setAuthStep(1); 
            }
            else {
                toast.error(message); // Display general error from backend
            }
        }
    };


    // 1. Traditional Login/Register Handler (Initiates the process)
    const onLogin = async (e) => {
        e.preventDefault();

        let new_url = url;
        if (currState === "Login") {
            new_url += "/api/user/login";
        } else {
            new_url += "/api/user/register"; 
        }
        
        try {
            const response = await axios.post(new_url, data);
            handleSuccessResponse(response);

        } catch (error) {
            toast.error("Network error during login/registration.");
        }
    };


    // 2. OTP Verification Handler (Completes the registration/login)
    const onVerifyOTP = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`${url}/api/user/verify-otp`, {
                email: data.email,
                otp: data.otp // Send the entered OTP
            });

            if (response.data.success) {
                toast.success(response.data.message);
                handleSuccessResponse(response); // Handles token, role, and redirect

            } else {
                toast.error(response.data.message || "OTP Verification Failed.");
            }
        } catch (error) {
            toast.error("Network error during OTP verification.");
        }
    };

    // 3. Google Login Handler (Direct Login/Redirect)
    const handleGoogleResponse = async (credentialResponse) => {
        try {
            const response = await axios.post(`${url}/api/user/google-login`, {
                idToken: credentialResponse.credential // Send the Google ID Token
            });
            
            handleSuccessResponse(response); // Handles token, role, and redirect

        } catch (error) {
            toast.error("Google login failed. Please try again.");
            console.log('Google Login Failed:', error);
        }
    };


    // --- Render Logic: Dynamic Forms ---

    const renderLoginForm = () => (
        <div className="login-popup-inputs">
            {/* Name input only on Step 0 of Sign Up */}
            {currState === "Sign Up" && authStep === 0 && 
                <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
            }
            
            {/* Email input is shown only on Step 0 or explicitly in Login mode */}
            {authStep === 0 && <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />}
            
            {/* Password input only on Step 0 of Sign Up or in Login mode */}
            {currState !== "Login" && authStep === 0 && <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />}
            
            {currState === "Login" && <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />}
            {currState === "Login" && <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />}

            {/* OTP input only on Step 1 */}
            {authStep === 1 && 
                <input name='otp' onChange={onChangeHandler} value={data.otp} type="text" placeholder='Enter 6-digit OTP' required />
            }
        </div>
    );

    return (
        <div className='login-popup'>
            <form 
                onSubmit={authStep === 1 ? onVerifyOTP : onLogin} 
                className="login-popup-container"
            >
                <div className="login-popup-title">
                    <h2>{authStep === 1 ? "Verify Email" : currState}</h2> 
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>

                {renderLoginForm()}
                
                {authStep !== 1 && (
                    <>
                        <button type="submit">{currState === "Login" ? "Login" : "Create account"}</button>
                        
                        <div className="google-auth-separator">
                            <hr /> <p>OR</p> <hr />
                        </div>

                        <div className="google-auth-button">
                            <GoogleLogin
                                onSuccess={handleGoogleResponse}
                                onError={() => toast.error('Google Sign In failed. Please try again.')}
                            />
                        </div>

                        <div className="login-popup-condition">
                            <input type="checkbox" name="" id="" required/>
                            <p>By continuing, i agree to the terms of use & privacy policy.</p>
                        </div>
                    </>
                )}

                {/* Button for OTP submission */}
                {authStep === 1 && <button type="submit">Verify & Login</button>}
                
                {/* Link for switching between Login/Sign Up (hidden during OTP step) */}
                {authStep === 0 && (
                    currState === "Login"
                        ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                        : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                )}
                
            </form>
        </div>
    );
};

export default LoginPopup;