import React, { Component, useEffect, useState } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Label
  } from "recharts";
import "./StatsChar.css"
const API_KEY = import.meta.env.VITE_APP_API_KEY;



const StatsChart = () => {
    const [histData, setHistData] = useState(null);  
    const cleanData = (data) => {
        let filteredData = [];
        let countDays = 0;
        console.log(data)
        const last30Events = data.events.slice(-30);
        for (const item of last30Events){
    
            let accurateTime = new Date(item.datetime_local).toLocaleTimeString("en-US");
            let accurateDay = new Date();
            accurateDay.setDate(accurateDay.getDate()- countDays);
    
            filteredData.push({
                'time': accurateDay.toLocaleDateString("en-US") + " " + accurateTime,
                'open price': item.stats.average_price,
            });
            countDays ++;
        }
    
        // data is given counting backwards, so return the reverse to have data ordered from oldest to newest for accurate plotting
        return filteredData.reverse();    
        };
    useEffect(() => {
        const fetchAllEventData = async () => {
          const response = await fetch( 
            `https://api.seatgeek.com/2/events?sort=score.desc&taxonomies.name=sports&taxonomies.name=concert&per_page=50&client_id=${API_KEY}`
          );
          
          const json = await response.json();
          setHistData(json);
          
        };
        fetchAllEventData().catch(console.error);
      
        
      }, []);

    return (
        <div className="Chart">
          {histData ? (// rendering only if API call actually returned us data
            <div>
            <br></br>
            <h2>Average Price the for 30 popular events based on dates</h2>
          
            <LineChart
              width={750}
              height={400}
              data={cleanData(histData)}
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 30,
              }}
            >
              <Line
                type="monotone"
                dataKey="open price"
                stroke="#000000"
              />
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="time" interval={2} angle={35} dx={20}>
                <Label value="Date and Time" offset={0} position="insideBottom" />
              </XAxis>
          
              <YAxis
                label={{
                  value: "Price",
                  angle: -90,
                  position: "insideLeft",
                  textAnchor: "middle",
                }}
              />
              <Tooltip />
            </LineChart>
          </div>
          ) : null}
        </div>
      );
    
  };

export default StatsChart;