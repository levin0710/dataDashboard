
import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import './NavBar.css'
const NavBar = () => {
  
    return (
        <div className="Menu">
            <ul>
                <li className="Menu-item">
                    <a className="menu-link" href="/">
                        <i className="menu-icon tf-icons bx bx-home-circle"></i>
                        <div>🏠  Dashboard</div>
                    </a>
                </li>
                <li className="Menu-item">
                    <a className="menu-link" href="/">
                        <i className="menu-icon tf-icons bx bx-home-circle"></i>
                        <div>🔍  Search</div>
                    </a>
                </li>
                <li className="Menu-item">
                    <a className="menu-link" href="/"><i class="menu-icon tf-icons bx bx-home-circle"></i>
                        <div>ℹ️ About</div>    
                    </a>
                </li>
            </ul>
        </div>
      );
};

  
  
export default NavBar;
