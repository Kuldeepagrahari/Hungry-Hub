import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        {/* Business Quote */}
        <div className="footer-quote">
          <h1>Experience the Joy of Food!</h1>
          <p>
            "At <span className="highlight">HungryHub</span>, our mission is to serve the community by connecting people to delicious food while empowering local restaurants. Together, we thrive."
          </p>
        </div>

        {/* Descriptive Promotion */}
        <div className="footer-promotion">
          <p>
            <strong>Why choose us?</strong>
          </p>
          <ul>
            <li>
              <span className="highlight">Quick and Reliable:</span> Delivering your favorite meals in no time!
            </li>
            <li>
              <span className="highlight">Wide Variety:</span> Explore menus from thousands of restaurants across the country.
            </li>
            <li>
              <span className="highlight">Empowering Restaurants:</span> Supporting local businesses to help them grow.
            </li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="footer-social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={assets.facebook_icon} alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={assets.twitter_icon} alt="Twitter" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
