import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PersonalExperience from './components/PersonalExperience';
import PhotographyPortfolio from './components/PhotographyPortfolio';
import TechnicalStack from './components/TechnicalStack';
import GamingShowcase from './components/GamingShowcase';
import TravelMap from './components/TravelMap';
import AnimationDemo from './components/AnimationDemo';
import AdvancedAnimations from './components/AdvancedAnimations';
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
              <PersonalExperience />
              <PhotographyPortfolio />
              <TechnicalStack />
              <GamingShowcase />
              <TravelMap />
              <AnimationDemo />
              <AdvancedAnimations />
            </>
          } />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
