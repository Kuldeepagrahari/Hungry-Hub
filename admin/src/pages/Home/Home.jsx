import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="home-admin">
      <div className="welcome-text">
        <h1>Welcome, Admin 👋</h1>
        <p>
          You have full control to <span>add items</span>, <span>update menus</span>, 
          handle <span>user complaints</span>, and manage <span>customer orders</span>.
        </p>
        <h3>⚠️ Please act with care — every action impacts the platform.</h3>
      </div>
    </div>
  );
};

export default Home;
