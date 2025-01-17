import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import './Sidebar.css';
import hungry_hub from '../../assets/hungry_hub.png';
import { BiFoodMenu, BiHomeAlt } from 'react-icons/bi';
import { RiCustomerServiceLine } from 'react-icons/ri';
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
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

  const navigate = useNavigate();

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
        <img className="logo" src={hungry_hub} alt="Logo" />
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
        <NavLink to="myorders"
          onClick={() => setMenu('myorders')}
          className={`${menu === 'myorders' ? 'active' : ''}`}
        >
          <LuClipboardList />
          {!isCollapsed && <span>My Orders</span>}
        </NavLink>
        {/* <a
          href="#about-us2"
          onClick={() => setMenu('about')}
          className={`${menu === 'about' ? 'active' : ''}`}
        >
          <RiCustomerServiceLine />
          {!isCollapsed && <span>Contact Us</span>}
        </a> */}
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
