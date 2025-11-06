import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for forward, -1 for backward

  const pages = [
    { id: 'home', label: 'Home', component: Hero },
    { id: 'introduction', label: 'Introduction', component: Introduction },
    { id: 'gallery', label: 'Gallery', component: Gallery },
    { id: 'travel', label: 'Travel', component: TravelMap },
    { id: 'gaming', label: 'Gaming', component: GamingShowcase },
    { id: 'skills', label: 'Skills', component: TechnicalStack }
  ];

  const navItems = pages.map(page => ({
    label: page.label,
    href: `#${page.id}`
  }));

  // Navigation functions
  const goToPage = (pageIndex) => {
    if (pageIndex >= 0 && pageIndex < pages.length && pageIndex !== currentPage) {
      setDirection(pageIndex > currentPage ? 1 : -1);
      setCurrentPage(pageIndex);
    }
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Handle navigation clicks
  const handleNavClick = (href) => {
    const pageId = href.replace('#', '');
    const pageIndex = pages.findIndex(page => page.id === pageId);
    if (pageIndex !== -1) {
      goToPage(pageIndex);
    }
  };

  // Animation variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  const CurrentPageComponent = pages[currentPage].component;

  return (
    <Router>
      <div className="App">
        <PillNav
          logo={logo}
          items={navItems}
          activeHref={`#${pages[currentPage].id}`}
          baseColor="rgba(255, 255, 255, 0.95)"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#1d1d1f"
          onNavClick={handleNavClick}
        />

        <div className="page-container">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="page-wrapper"
            >
              <CurrentPageComponent setActiveSection={() => {}} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        {currentPage > 0 && (
          <button className="nav-arrow nav-arrow-left" onClick={prevPage}>
            <ChevronLeft size={32} />
          </button>
        )}

        {currentPage < pages.length - 1 && (
          <button className="nav-arrow nav-arrow-right" onClick={nextPage}>
            <ChevronRight size={32} />
          </button>
        )}

        {/* Page Indicators */}
        <div className="page-indicators">
          {pages.map((page, index) => (
            <button
              key={page.id}
              className={`page-indicator ${index === currentPage ? 'active' : ''}`}
              onClick={() => goToPage(index)}
              aria-label={`Go to ${page.label}`}
            />
          ))}
        </div>

        {/* Footer only on last page */}
        {currentPage === pages.length - 1 && <Footer />}
      </div>
    </Router>
  );
}

export default App;
