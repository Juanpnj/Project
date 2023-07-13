import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Fitur from './Components/Fitur';
import DoTask from './Components/DoTask';
import AboutUs from './Components/AboutUs';
import Footer from "./Components/Footer";
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/fitur' element={<Fitur />}/>
        <Route path="/do-task" element={<DoTask />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
