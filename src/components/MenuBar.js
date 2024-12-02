import React, { useState } from "react";
import './styles.css';

const MenuBar = () => {
  const [activeMenu, setActiveMenu] = useState("movies");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <nav className="menu-bar">
      <div className="menu-left">
        <a
          href="#"
          className={activeMenu === "movies" ? "active" : ""}
          onClick={() => handleMenuClick("movies")}
        >
          Movies
        </a>
        <a
          href="#"
          className={activeMenu === "streams" ? "active" : ""}
          onClick={() => handleMenuClick("streams")}
        >
          Streams
        </a>
        <a
          href="#"
          className={activeMenu === "events" ? "active" : ""}
          onClick={() => handleMenuClick("events")}
        >
          Events
        </a>
        <a
          href="#"
          className={activeMenu === "plays" ? "active" : ""}
          onClick={() => handleMenuClick("plays")}
        >
          Plays
        </a>
        <a
          href="#"
          className={activeMenu === "sports" ? "active" : ""}
          onClick={() => handleMenuClick("sports")}
        >
          Sports
        </a>
        <a
          href="#"
          className={activeMenu === "activities" ? "active" : ""}
          onClick={() => handleMenuClick("activities")}
        >
          Activities
        </a>
      </div>
      <div className="menu-right">
        <a
          href="#"
          className={activeMenu === "listYourShows" ? "active" : ""}
          onClick={() => handleMenuClick("listYourShows")}
        >
          ListYourShows
        </a>
        <a
          href="#"
          className={activeMenu === "corporates" ? "active" : ""}
          onClick={() => handleMenuClick("corporates")}
        >
          Corporates
        </a>
        <a
          href="#"
          className={activeMenu === "offers" ? "active" : ""}
          onClick={() => handleMenuClick("offers")}
        >
          Offers
        </a>
        <a
          href="#"
          className={activeMenu === "giftCards" ? "active" : ""}
          onClick={() => handleMenuClick("giftCards")}
        >
          Gift Cards
        </a>
      </div>
    </nav>
  );
};

export default MenuBar;
