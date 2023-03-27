
import React, { useEffect, useState } from "react";
import './Header.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const Header = () => {
  
    return (
    <div className="Header">
        <img className="Logo" alt="cresent moon logo" src="https://img.icons8.com/fluency/344/full-moon.png"/>
        <h3 className="Header-title">SeatGeek Events</h3>
    </div>
      );
};

  
  
export default Header;
