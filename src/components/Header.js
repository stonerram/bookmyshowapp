import React, { useState } from "react";
import './styles.css';

const Header = ({ toggleSidebar }) => (
  <header className="header d-flex justify-content-between align-items-center px-3">
    <img src="./images/logo.png" alt="BookMyShow" className="logo" />
    <input
      type="text"
      placeholder="Search for Movies, Events, Plays, Sports and Activities"
      className="search-bar"
    />
    <div className="header-actions">
      <select className="location-dropdown">
        <option>Hyderabad</option>
        <option>Delhi</option>
        <option>Mumbai</option>
        <option>Bangalore</option>
      </select>
      <button className="sign-in-btn">Sign In</button>
      <button className="menu-icon" onClick={toggleSidebar}>
        ☰
      </button>
    </div>
  </header>
);

export default Header;
