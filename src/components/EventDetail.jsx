import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../App.css'
import './EventDetail.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const EventDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);
    const giveDate = datetime_str => {
      const [date, time_str] = datetime_str.split("T");
      const time_abbreviated = time_str.slice(0, 5); // extract first 5 characters (HH:MM)
  
      const output_str = `${date} at ${time_abbreviated}`;
      return output_str
    }
    useEffect(() => {
        const getEventDetail = async () => {
          const details = await fetch(
            `https://api.seatgeek.com/2/events/${params.symbol}?client_id=${API_KEY}`
          );
        const detailsJson = await details.json();
        
          setFullDetails(detailsJson);
          
        };
        console.log(fullDetails)
        getEventDetail().catch(console.error);
        }, []);

    
    return (
      <div className="whole-page">
        <div className='App-page'>
          <div className="App-row"> 
          {fullDetails != null ? (
          <div className="details">
            <h3>{fullDetails.title}</h3>
            <h3>Average Price: ${fullDetails.stats.average_price}</h3>
            <h3>Venue: {fullDetails.venue.name}, {fullDetails.venue.display_location}</h3>
            <h3>Date and Time: {giveDate(fullDetails.datetime_local)}</h3>
            <a href={fullDetails.url}> Link to Event</a>
          </div>
        ) : (
          <div className="details">
          </div>
        )}   
  
                       
          </div>
        </div>
      </div>
    );
  };
  
  export default EventDetail;