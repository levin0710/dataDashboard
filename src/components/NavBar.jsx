
import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Header from "./Header";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import './NavBar.css'
const NavBar = () => {
  
    return (
        <div className="">        
            <div  className="App-sidebar">
                <Header></Header>
                <div className="Menu">     
                    <ul>
                        <li className="Menu-item">
                                <i className="menu-icon tf-icons bx bx-home-circle"></i>
                                <Link  to="/">
                                    🏠  Dashboard
                                </Link>
                        
                        </li>
                        <li className="Menu-item">
                            <a className="menu-link">
                                <i className="menu-icon tf-icons bx bx-home-circle"></i>
                                <div>🔍  Search</div>
                            </a>
                        </li>
                        <li className="Menu-item">
                            <a className="menu-link" ><i class="menu-icon tf-icons bx bx-home-circle"></i>
                                <div>ℹ️ About</div>    
                            </a>
                        </li>
                    </ul> 
                </div>
                
            </div>
            <Outlet />
        </div>
        
      );
};

  
  
export default NavBar;
