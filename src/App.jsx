import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card.jsx';
import Header from './components/Header.jsx';
import List from './components/List.jsx';
import NavBar from './components/NavBar.jsx';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  
  return (
    <div className="whole-page">
      <div className='App-sidebar'>
        <Header></Header>
        <NavBar></NavBar>
      </div>
      <div className='App-page'>
        <div className='App-row'>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
        <div className='App-row'>
          <List></List>
        </div>
      </div>
      
      
    </div>

  )
}

export default App