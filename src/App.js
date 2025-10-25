import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Interest from './components/Interest';
import Gallery from './components/Gallery';
import GamingShowcase from './components/GamingShowcase';
import TechnicalStack from './components/TechnicalStack';
import TravelMap from './components/TravelMap';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <Router>
      <div className="App">
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero setActiveSection={setActiveSection} />
              <Interest />
              <Gallery />
              <GamingShowcase />
              <TechnicalStack />
              <TravelMap />
            </>
          } />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
