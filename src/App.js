import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import PillNav from './components/PillNav';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import Gallery from './components/Gallery';
import GamingShowcase from './components/GamingShowcase';
import TechnicalStack from './components/TechnicalStack';
import TravelMap from './components/TravelMap';
import Footer from './components/Footer';
import logo from './assets/logo.svg';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Introduction', href: '#introduction' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Travel', href: '#travel' },
    { label: 'Gaming', href: '#gaming' },
    { label: 'Skills', href: '#skills' }
  ];

  // Track scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'introduction', 'gallery', 'travel', 'gaming', 'skills'];
      const scrollPos = window.scrollY + 100;

      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="App">
        <PillNav
          logo={logo}
          items={navItems}
          activeHref={`#${activeSection}`}
          baseColor="rgba(255, 255, 255, 0.95)"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#1d1d1f"
        />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero setActiveSection={setActiveSection} />
              <Introduction />
              <Gallery />
              <TravelMap />
              <GamingShowcase />
              <TechnicalStack />
            </>
          } />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
