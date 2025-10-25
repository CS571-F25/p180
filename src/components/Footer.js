import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer-main">
            <div className="footer-section">
              <h3>About This Site</h3>
              <p>
                A comprehensive showcase of my professional journey, creative work, 
                and personal passions. Built with React and modern web technologies 
                to provide an interactive and engaging experience.
              </p>
            </div>
            
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#gaming">Gaming</a></li>
                <li><a href="#travel">Travel</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Connect With Me</h3>
              <div className="social-links">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href="mailto:your.email@example.com"
                  aria-label="Email"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>
                © 2024 Personal Website. Made with <Heart size={16} fill="#ef4444" /> and React.
              </p>
            </div>
            
            <button 
              className="scroll-to-top"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
