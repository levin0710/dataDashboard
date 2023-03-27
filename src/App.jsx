import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card.jsx';
import Header from './components/Header.jsx';
import List from './components/List.jsx';
import NavBar from './components/NavBar.jsx';

const API_KEY = import.meta.env.VITE_APP_API_KEY;


function App() {
  const [list, setList] = useState(null);
  const [type, setMostPopularType] = useState(null);
  const [state, setMostPopularState] = useState(null);
  const [total, setTotalCount] = useState(null);

  
  useEffect(() => {
    const fetchAllEventData = async () => {
      const response = await fetch( 
        `https://api.seatgeek.com/2/events?taxonomies.name=sports&taxonomies.name=concert&per_page=50&client_id=${API_KEY}`
      );
      const json = await response.json();
      
      // Keep track of counts
      const counts = {
        states: {},
        types: {},
        total: 0,
      };
  
      json.events.forEach((event) => {
        // Count states
        const state = event.venue.state;
        counts.states[state] = (counts.states[state] || 0) + 1;
  
        // Count types
        const type = event.type;
        counts.types[type] = (counts.types[type] || 0) + 1;
  
        // Increment total count
        counts.total += 1;
      });
  
      // Find most popular state
      let mostPopularState = "";
      let mostPopularStateCount = 0;
      Object.entries(counts.states).forEach(([state, count]) => {
        if (count > mostPopularStateCount) {
          mostPopularState = state;
          mostPopularStateCount = count;
        }
      });
  
      // Find most popular type
      let mostPopularType = "";
      let mostPopularTypeCount = 0;
      Object.entries(counts.types).forEach(([type, count]) => {
        if (count > mostPopularTypeCount) {
          mostPopularType = type;
          mostPopularTypeCount = count;
        }
      });
  
      // Set state
      setList(json);
      setMostPopularState(mostPopularState);
      setMostPopularType(mostPopularType);
      setTotalCount(counts.total);
    };
  
    fetchAllEventData().catch(console.error);
  }, []);
  


  return (
    <div className="whole-page">
      <div className='App-sidebar'>
        <Header></Header>
        <NavBar></NavBar>
      </div>
      <div className='App-page'>
        <div className='App-row'>
          <Card title={"Most Popular State"} value={state}></Card>
          <Card title={"Total Entries"} value={total}></Card>
          <Card title={"Most Popular Type"} value={type}></Card>
        </div>
        <div className='App-row'>
          <List list={list}
          setList={setList}></List>
        </div>
      </div>
      
      
    </div>

  )
}

export default App