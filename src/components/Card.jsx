
import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import './Card.css'

const Card = () => {
  
    return (
        <div className="Card">
            <h1 className="number">New York</h1>
            <h2>New York, USA</h2>
        </div>
      );
};

  
  
export default Card;
