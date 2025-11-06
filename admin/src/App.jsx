import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home';


const App = () => {
  const [inputKey, setInputKey] = useState(""); // ✅ state for input
  const [admin, setAdmin] = useState(false);
  const secretKey = import.meta.env.VITE_SECRET_KEY


  const verifyKey = () => {
    if (inputKey === secretKey) {
      setAdmin(true);
      toast.success("Access granted");
    } else {
      toast.error("Invalid Secret Key");
    }
  };

  return (
    <div className='app'>
      <ToastContainer />
      <Navbar />

      {!admin ? (
        // 🔐 Show key input only if not verified
        <div style={{ margin: "20px" }}>
          <h3>Enter Admin Secret Key</h3>
          <input
            type="text"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="Secret Key"
          />
          <button onClick={verifyKey}>Verify</button>
        </div>
      ) : (
        // 🧭 Admin content after verification
        <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
