import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import './List.css'


const List = () => {
  const stateAbbreviations = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
  
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedState, setSelectedState] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleStateChange = searchValue => {
    setSelectedState(searchValue);
    if (searchValue !== "") {
      const filteredData = list.events.filter((item) => 
       
          item.venue.state == searchValue
      )
      setFilteredResults(filteredData);
    }
  };

  const handleTypeChange = searchValue => {
    setSelectedType(searchValue);
    if (searchValue !== "") {
      const filteredData = list.events.filter((item) => 
       
          item.type == searchValue
      )
      setFilteredResults(filteredData);
    }
  };

  const giveDate = datetime_str => {
    const [date, time_str] = datetime_str.split("T");
    const time_abbreviated = time_str.slice(0, 5); // extract first 5 characters (HH:MM)

    const output_str = `${date} at ${time_abbreviated}`;
    return output_str
  }
  

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = list.events.filter((item) => 
       
          item.short_title.toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData);
    }
  };

  useEffect(() => {
    const fetchAllEventData = async () => {
      const response = await fetch( 
        `https://api.seatgeek.com/2/events?taxonomies.name=sports&taxonomies.name=concert&client_id=${API_KEY}`
      );
      
      const json = await response.json();
      setList(json);
    };
    fetchAllEventData().catch(console.error);
  
    
  }, []);

    return (
        <div className="List">
          <div className="filters">
            <div className="dateFilter">
              <input type="text"
                    placeholder="Search by title..."
                    onChange={(inputString) => searchItems(inputString.target.value)}/>
            </div>
            <div className="phaseFilter">
            <label htmlFor="state-select">State:</label>
              <select id="state-select" value={selectedState} onChange={(inputString) => handleStateChange(inputString.target.value)}>
                <option value="">-- Select a State --</option>
              {list && stateAbbreviations.map(abbreviation => (
                <option key={abbreviation} value={abbreviation}>{abbreviation}</option>
              ))}
              </select>
            </div>

            <div className="phaseFilter">
            <label htmlFor="type-select">Event Type:</label>
              <select id="type-select" value={selectedType} onChange={(inputString) => handleTypeChange(inputString.target.value)}>
                <option value="">-- Select an Event type --</option>
                {list && [...new Set(list.events.map((event) => event.type))].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
              {(searchInput.length > 0 || selectedState.length > 0 || selectedType.length > 0)
          ? filteredResults.map((event) =>  
                <tr>
                  <td>{giveDate(event.datetime_local)}</td>
                  <td>{event.type}</td>
                  <td>{event.short_title}</td>
                  <td>{event.venue.display_location}</td>
                  <td><a href={event.url}>Link</a></td>
                </tr>
            )
          : list && list.events.map((event) =>  
                
                <tr>
                  <td>{giveDate(event.datetime_local)}</td>
                  <td>{event.type}</td>
                  <td>{event.short_title}</td>
                  <td>{event.venue.display_location}</td>
                  <td><a href={event.url}>Link</a></td>
                </tr>
          
            )}
                
              </tbody>
            </table>
          </div>
        </div>
      );
};

  
  
  export default List;