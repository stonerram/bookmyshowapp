import React from "react";
import './styles.css';

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <aside className={`sidebar ${isOpen ? "open" : ""}`}>
    <button className="close-btn" onClick={toggleSidebar}>
      ×
    </button>
    <ul>
      <li>Login/Register</li>
      <li>Notifications</li>
      <li>Your Orders</li>
      <li>Stream Library</li>
      <li>Pay Credit Card</li>
      <li>Help & Support</li>
      <li>Account & Settings</li>
      <li>Rewards</li>
      <li>BookAChange</li>
    </ul>
  </aside>
);

export default Sidebar;
