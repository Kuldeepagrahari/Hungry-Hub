import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './Context/StoreContext';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; 

ReactDOM.createRoot(document.getElementById('root')).render(
  
    // The StoreContext and App must be inside the GoogleOAuthProvider.
    <GoogleOAuthProvider clientId={CLIENT_ID}> 
        <BrowserRouter>
            <StoreContextProvider>
                <App />
            </StoreContextProvider>
        </BrowserRouter>
    </GoogleOAuthProvider>
);