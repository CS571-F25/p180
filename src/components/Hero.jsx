import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowRight, ChevronDown } from 'lucide-react';
import Particles from './Particles';
import TextParticles from './TextParticles';
import DecryptedText from './DecryptedText';
import LogoLoop from './LogoLoop';
import CityULogo from '../assets/CityULogo.png';
import UWMadisonLogo from '../assets/UWMadisonLogo.png';
import XiaohongshuLogo from '../assets/XiaohongshuLogo.png';
import BilibiliLogo from '../assets/BilibiliLogo.png';
import LinkedinLogo from '../assets/LinkedinLogo.png';
import InsLogo from '../assets/InsLogo.png';
import GitHubLogo from '../assets/GitHubLogo.png';

const Hero = ({ setActiveSection }) => {
  const SESSION_KEY = 'heroExpanded';

  // Check if already expanded in this session
  const [hasExpanded, setHasExpanded] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  });

  const [isExpanding, setIsExpanding] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [triggerExplosion, setTriggerExplosion] = useState(false);
  const [showIntroduction, setShowIntroduction] = useState(hasExpanded);
  const [particleColors, setParticleColors] = useState(['#ff6b35', '#ff8c42', '#ffa561', '#ffb87a']);

  // Typewriter effect state
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = ['Tao JR', 'Wu Ruitao', 'a Developer', 'a Photographer', 'a Gamer', 'a Traveler'];

  // Typewriter effect (only when not expanded)
  useEffect(() => {
    if (hasExpanded) return;

    const currentText = texts[currentTextIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseDuration = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentText.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTextIndex, hasExpanded, texts]);

  // Handle expand button click
  const handleExpand = () => {
    if (isExpanding || hasExpanded) return;

    setIsExpanding(true);
    setShowButton(false);
    setTriggerExplosion(true);

    // Change particle colors
    setTimeout(() => {
      setParticleColors(['#4facfe', '#00f2fe', '#a8edea', '#fed6e3']);
    }, 500);

    // Show introduction after explosion
    setTimeout(() => {
      setShowIntroduction(true);
      setHasExpanded(true);
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsExpanding(false);
    }, 2000);
  };

  const handleExplosionComplete = () => {
    setTriggerExplosion(false);
  };

  // Introduction content
  const introText = `Hi there! I'm TaoJR — a developer who builds, a photographer who captures, a gamer who competes, and a traveler who explores. This website is a collection of everything I create and experience — welcome to my world`;

  const education = [
    {
      school: 'City University of Hong Kong',
      degree: 'Bachelor of Engineering',
      major: 'Electrical and Electronic Engineering',
      period: '2022 - 2024',
      icon: CityULogo
    },
    {
      school: 'University of Wisconsin-Madison',
      degree: 'Bachelor of Science',
      major: 'Computer Science',
      period: '2024 - Present',
      icon: UWMadisonLogo
    }
  ];

  const socialLogos = [
    { src: XiaohongshuLogo, alt: 'Xiaohongshu', title: 'Xiaohongshu', href: 'https://www.xiaohongshu.com/user/profile/5fdcbf2d000000000101fed0' },
    { src: GitHubLogo, alt: 'GitHub', title: 'GitHub', href: 'https://github.com/TaoJR' },
    { src: LinkedinLogo, alt: 'LinkedIn', title: 'LinkedIn', href: 'https://www.linkedin.com/in/ruitao-wu-69a8a2330/' },
    { src: BilibiliLogo, alt: 'Bilibili', title: 'Bilibili', href: 'https://space.bilibili.com/272019307?spm_id_from=333.1007.0.0' },
    { src: InsLogo, alt: 'Instagram', title: 'Instagram', href: 'https://www.instagram.com/taojr233/' },
  ];

  return (
    <section id="home" className="hero">
      <Particles
        particleColors={particleColors}
        particleCount={400}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <AnimatePresence mode="wait">
          {!hasExpanded && !isExpanding && (
            <motion.div
              key="typewriter"
              className="hero-content"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Typewriter section */}
              <motion.h1
                className="hero-title typewriter-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="typewriter-line-1">Hi! I'm</div>
                <div className="typewriter-line-2">
                  <span className="gradient-text">{displayedText}</span>
                  <span className="typewriter-cursor">|</span>
                </div>
              </motion.h1>

              {/* Expand Button */}
              <AnimatePresence>
                {showButton && (
                  <motion.button
                    className="btn btn-primary"
                    onClick={handleExpand}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      marginTop: '2rem',
                      boxShadow: '0 8px 30px rgba(255, 107, 53, 0.4)',
                      animation: 'pulse 2s infinite',
                    }}
                  >
                    Explore More <ChevronDown size={20} />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Text Particles Overlay */}
              {triggerExplosion && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                  <TextParticles
                    text={`Hi! I'm\n${texts[currentTextIndex]}`}
                    fontSize={64}
                    trigger={triggerExplosion}
                    onComplete={handleExplosionComplete}
                  />
                </div>
              )}
            </motion.div>
          )}

          {/* Introduction Content */}
          {showIntroduction && (
            <motion.div
              key="introduction"
              className="introduction-section-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ width: '100%' }}
            >
              <div className="introduction-grid">
                {/* Left side - About me */}
                <motion.div
                  className="introduction-about"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="introduction-subtitle">WHOAMI</h3>
                  <p className="introduction-text">
                    <DecryptedText
                      text={introText}
                      animateOn="view"
                      speed={20}
                      sequential={true}
                      revealDirection="start"
                      parentClassName="decrypted-text-wrapper"
                      className="decrypted-char"
                      encryptedClassName="encrypted-char"
                    />
                  </p>
                </motion.div>

                {/* Right side - Education */}
                <motion.div
                  className="introduction-education"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h3 className="introduction-subtitle">
                    <GraduationCap size={28} />
                    Education
                  </h3>
                  <div className="education-timeline">
                    {education.map((edu, index) => (
                      <motion.div
                        key={index}
                        className="education-card"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.2 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className={`education-icon ${index === 1 ? 'uw-madison-icon' : ''}`}>
                          {typeof edu.icon === 'string' && (edu.icon.includes('/') || edu.icon.includes('.')) ? (
                            <img src={edu.icon} alt={`${edu.school} Logo`} />
                          ) : (
                            <div style={{ fontSize: '3rem' }}>{edu.icon}</div>
                          )}
                        </div>
                        <div className="education-content">
                          <h4 className="education-school">{edu.school}</h4>
                          <p className="education-degree">{edu.degree}</p>
                          <p className="education-major">{edu.major}</p>
                          <p className="education-period">{edu.period}</p>
                        </div>
                        {index < education.length - 1 && (
                          <div className="education-arrow">
                            <ArrowRight size={20} />
                            <span className="transfer-label">Transfer</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Social Media Logos */}
              <motion.div
                className="introduction-social"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                  <LogoLoop
                    logos={socialLogos}
                    speed={50}
                    direction="left"
                    logoHeight={48}
                    gap={40}
                    pauseOnHover
                    scaleOnHover
                    fadeOut
                    fadeOutColor="#f8f9fa"
                    ariaLabel="Social media platforms"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx="true">{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 8px 30px rgba(255, 107, 53, 0.4);
          }
          50% {
            box-shadow: 0 8px 40px rgba(255, 107, 53, 0.6);
          }
        }

        .introduction-section-content {
          padding-top: 80px;
        }

        .introduction-social {
          margin-top: 3rem;
        }
      `}</style>
    </section>
  );
};

export default Hero;
