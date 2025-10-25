import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = useMemo(() => [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'gaming', label: 'Gaming', href: '#gaming' },
    { id: 'travel', label: 'Travel', href: '#travel' },
    { id: 'animations', label: 'Animations', href: '#animations' }
  ], []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems, setActiveSection]);

  return (
    <nav className="nav">
      <div className="nav-container">
        <a href="#home" className="nav-logo" onClick={() => handleNavClick('home')}>
          My Portfolio
        </a>
        
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map(item => (
            <li key={item.id} className="nav-item">
              <a
                href={item.href}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        
        <div className="nav-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
