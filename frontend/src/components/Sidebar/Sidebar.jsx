import React, { useState } from 'react';
import {useNavigate, NavLink } from 'react-router-dom';
import './Sidebar.css';
import Hungry from '../../assets/Hungry.png';
import { BiFoodMenu, BiHomeAlt } from 'react-icons/bi';
import { RiCustomerServiceLine } from 'react-icons/ri';
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { LuClipboardList } from "react-icons/lu";
import { RiSparkling2Fill } from "react-icons/ri";
import { FaBars } from 'react-icons/fa';


const Sidebar = () => {
  const [menu, setMenu] = useState('home');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Handle screen resize to toggle mobile view
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // const navigate = useNavigate();

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isMobileView ? (
          <FaBars style={{ fontSize: "20px", color: "tomato" }} />
        ) : isCollapsed ? (
          <TbLayoutSidebarRightCollapse style={{ fontSize: "30px", color: "tomato" }} />
        ) : (
          <TbLayoutSidebarLeftCollapse style={{ fontSize: "30px", color: "tomato" }} />
        )}
      </button>
      <NavLink to="/">
        <img className="logo" src={Hungry} alt="Logo" />
      </NavLink>
      <ul className="navbar-menu">
        <NavLink
          to="/"
          onClick={() => setMenu('home')}
          className={`${menu === 'home' ? 'active' : ''}`}
        >
          <BiHomeAlt />
          {!isCollapsed && <span>Home</span>}
        </NavLink>
        <NavLink to="/foodMenu"
          onClick={() => setMenu('menu')}
          className={`${menu === 'menu' ? 'active' : ''}`}
        >
          <BiFoodMenu />
          {!isCollapsed && <span>Menu</span>}
        </NavLink>
        <NavLink
          to="/suggestions"
          onClick={() => setMenu('suggestions')}
          className={`${menu === 'suggestions' ? 'active' : ''}`}
        >
          <RiSparkling2Fill />
          {!isCollapsed && <span>What should I eat?</span>}
        </NavLink>
        <NavLink to="myorders"
          onClick={() => setMenu('myorders')}
          className={`${menu === 'myorders' ? 'active' : ''}`}
        >
          <LuClipboardList />
          {!isCollapsed && <span>My Orders</span>}
        </NavLink>
        <NavLink
          to="/customerCare"
          onClick={() => setMenu('contact')}
          className={`${menu === 'contact' ? 'active' : ''}`}
        >
          <RiCustomerServiceLine />
          {!isCollapsed && <span>Customer Care</span>}
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
