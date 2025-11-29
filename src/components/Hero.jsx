import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowRight, UserCircle, Mail, MapPin, Gamepad2, Code2 } from 'lucide-react';
import Particles from './Particles';
import DecryptedText from './DecryptedText';
import LogoLoop from './LogoLoop';
import CityULogo from '../assets/CityULogo.png';
import UWMadisonLogo from '../assets/UWMadisonLogo.png';
import XiaohongshuLogo from '../assets/XiaohongshuLogo.png';
import BilibiliLogo from '../assets/BilibiliLogo.png';
import LinkedinLogo from '../assets/LinkedinLogo.png';
import InsLogo from '../assets/InsLogo.png';
import GitHubLogo from '../assets/GitHubLogo.png';

// Bento Grid Item Component
const BentoItem = ({ children, className, delay = 0 }) => (
  <motion.div
    className={`bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

const Hero = ({ setActiveSection }) => {
  const SESSION_KEY = 'heroExpanded';

  // Check if already expanded in this session
  const [hasExpanded, setHasExpanded] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  });

  const [particleColors, setParticleColors] = useState(['#ff6b35', '#ff8c42', '#ffa561', '#ffb87a']);

  // Typewriter effect state
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = ['Tao JR', 'Wu Ruitao', 'a Developer', 'a Photographer', 'a Gamer', 'a Traveler'];

  // Typewriter effect - always running
  useEffect(() => {
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
  }, [displayedText, isDeleting, currentTextIndex, texts]);

  // Handle expand button click
  const handleExpand = () => {
    if (hasExpanded) return;

    setHasExpanded(true);
    sessionStorage.setItem(SESSION_KEY, 'true');

    // Change particle colors
    setTimeout(() => {
      setParticleColors(['#4facfe', '#00f2fe', '#a8edea', '#fed6e3']);
    }, 300);
  };

  // Introduction content
  const introText = `Hi there! I'm TaoJR — a developer who builds, a photographer who captures, a gamer who competes, and a traveler who explores. This website is a collection of everything I create and experience — welcome to my world!`;

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
    <section id="home" className="hero relative overflow-hidden min-h-screen flex items-center justify-center bg-gray-50">
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

      <div className="container relative z-10 w-full max-w-7xl px-4">
        {/* Typewriter Section - Always visible, moves from center to top */}
        <motion.div
          className="hero-content mx-auto"
          initial={false}
          animate={{
            marginTop: hasExpanded ? '2rem' : '0',
            marginBottom: hasExpanded ? '2rem' : '0',
            scale: hasExpanded ? 0.9 : 1,
          }}
          transition={{
            duration: 1,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            textAlign: 'center',
            height: hasExpanded ? 'auto' : '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <motion.h1
            className="hero-title flex flex-col items-center justify-center gap-2"
          >
            <div className="text-4xl md:text-6xl font-bold text-gray-900">Hi! I'm</div>
            <div className="text-4xl md:text-6xl font-bold text-gray-900 flex items-center min-h-[4rem]">
              <span className="text-[#ff6b35] mr-2">{displayedText}</span>
              <span className="w-1 h-12 bg-[#ff6b35] animate-pulse"></span>
            </div>
          </motion.h1>

          {/* Expand Button - only show if not expanded */}
          <AnimatePresence>
            {!hasExpanded && (
              <motion.button
                className="mt-8 px-8 py-3 bg-[#ff6b35] text-white rounded-full font-semibold shadow-lg hover:bg-[#e55a2b] hover:shadow-xl transition-all"
                onClick={handleExpand}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show More
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bento Grid Content - appears after expand */}
        <AnimatePresence>
          {hasExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full pb-20"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

                {/* 1. Who Am I - Large Card */}
                <BentoItem className="md:col-span-2 md:row-span-1 flex flex-col justify-center min-h-[280px]" delay={0.2}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-100 rounded-full text-[#ff6b35]">
                      <UserCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">WHOAMI</h3>
                  </div>
                  <div className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
                    Hi there! I'm TaoJR — a <span className="text-[#ff6b35] font-bold">developer</span> who builds,
                    a <span className="text-[#ff6b35] font-bold">photographer</span> who captures,
                    a <span className="text-[#ff6b35] font-bold">gamer</span> who competes,
                    and a <span className="text-[#ff6b35] font-bold">traveler</span> who explores.
                    This website is a collection of everything I create and experience — welcome to my world!
                  </div>
                </BentoItem>

                {/* 2. Avatar - New Card */}
                <BentoItem className="md:col-span-1 md:row-span-1 flex items-center justify-center p-0 overflow-hidden relative group min-h-[280px]" delay={0.3}>
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-50 opacity-50"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center text-6xl mb-4 border-4 border-white">
                      👨‍💻
                    </div>
                    <p className="font-bold text-gray-800 text-lg">Tao JR</p>
                    <p className="text-[#ff6b35] font-medium">Full Stack Developer</p>
                  </div>
                </BentoItem>

                {/* 3. Connect - Small Card (Shrunk) */}
                <BentoItem className="md:col-span-1 md:row-span-1 flex flex-col justify-center py-6" delay={0.6}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                      <Mail size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">CONNECT</h3>
                  </div>

                  <div className="h-24 relative overflow-hidden rounded-xl flex items-center justify-center">
                    <LogoLoop
                      logos={socialLogos}
                      speed={30}
                      direction="left"
                      logoHeight={50}
                      gap={30}
                      pauseOnHover
                      scaleOnHover
                      ariaLabel="Social media platforms"
                    />
                  </div>
                </BentoItem>

                {/* 4. Education - Wide Card (Expanded) */}
                <BentoItem className="md:col-span-2 md:row-span-1 flex flex-col justify-center" delay={0.4}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                      <GraduationCap size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">EDUCATION</h3>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">

                    {/* School 1 */}
                    <div className="flex-1 flex flex-col items-center text-center p-4 hover:bg-blue-50/50 rounded-2xl transition-colors duration-300">
                      <div className="w-24 h-24 mb-4 p-2 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden">
                        {typeof education[0].icon === 'string' ? (
                          <img src={education[0].icon} alt={education[0].school} className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-4xl">🎓</span>
                        )}
                      </div>

                      <h4 className="font-bold text-gray-900 leading-tight text-xl mb-1">{education[0].school}</h4>
                      <p className="text-[#ff6b35] text-lg font-bold mb-1">{education[0].degree}</p>
                      <p className="text-gray-600 text-base font-medium">{education[0].major}</p>
                      <p className="text-gray-400 text-sm mt-2">{education[0].period}</p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex flex-col items-center justify-center text-[#ff6b35] opacity-60">
                      <ArrowRight size={40} strokeWidth={2.5} />
                      <span className="text-xs font-bold uppercase tracking-widest mt-1">Transfer</span>
                    </div>
                    {/* Mobile Arrow (Down) */}
                    <div className="md:hidden flex items-center justify-center text-[#ff6b35] opacity-60 py-2">
                      <ArrowRight size={32} strokeWidth={2.5} className="rotate-90" />
                    </div>

                    {/* School 2 */}
                    <div className="flex-1 flex flex-col items-center text-center p-4 hover:bg-blue-50/50 rounded-2xl transition-colors duration-300">
                      <div className="w-24 h-24 mb-4 p-2 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden">
                        {typeof education[1].icon === 'string' ? (
                          <img src={education[1].icon} alt={education[1].school} className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-4xl">🎓</span>
                        )}
                      </div>

                      <h4 className="font-bold text-gray-900 leading-tight text-xl mb-1">{education[1].school}</h4>
                      <p className="text-[#ff6b35] text-lg font-bold mb-1">{education[1].degree}</p>
                      <p className="text-gray-600 text-base font-medium">{education[1].major}</p>
                      <p className="text-gray-400 text-sm mt-2">{education[1].period}</p>
                    </div>

                  </div>
                </BentoItem>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;

