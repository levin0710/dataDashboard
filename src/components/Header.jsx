
import React, { useEffect, useState } from "react";
import './Header.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const Header = () => {
  
    return (
    <div className="Header">
        <h3 className="Header-title">SeatGeek Events</h3>
    </div>
      );
};

  
  
export default Header;
