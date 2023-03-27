
import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import './Card.css'

const Card = ({title, value}) => {
  
    return (
        <div className="Card">
            <h1 className="number">{title}</h1>
            <h2>{value}</h2>
        </div>
      );
};

  
  
export default Card;
