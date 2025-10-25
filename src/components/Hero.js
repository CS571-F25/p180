import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, User } from 'lucide-react';

const Hero = ({ setActiveSection }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [avatarClicked, setAvatarClicked] = useState(false);

  // 鼠标位置跟踪
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 创建动画值
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // 将鼠标位置转换为动画值
  useEffect(() => {
    mouseX.set(mousePosition.x);
    mouseY.set(mousePosition.y);
  }, [mousePosition, mouseX, mouseY]);

  // 创建弹性动画值
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // 将鼠标位置转换为旋转角度
  const rotateX = useTransform(springY, [0, window.innerHeight], [15, -15]);
  const rotateY = useTransform(springX, [0, window.innerWidth], [-15, 15]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        {/* 头像围绕地球旋转的动画 */}
        <motion.div
          className="hero-animation-container"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* 地球 */}
          <motion.div
            className="earth"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="earth-surface">
              <div className="earth-continent"></div>
              <div className="earth-continent"></div>
              <div className="earth-continent"></div>
            </div>
          </motion.div>

          {/* 围绕地球旋转的头像 */}
          <motion.div
            className="avatar-orbit"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <motion.div
              className="avatar"
              animate={{
                scale: isHovering ? 1.2 : 1,
                rotate: [0, -360],
                boxShadow: avatarClicked 
                  ? "0 0 50px rgba(255, 107, 53, 1), 0 0 100px rgba(255, 107, 53, 0.5)"
                  : "0 0 20px rgba(255, 107, 53, 0.4)"
              }}
              transition={{
                scale: { duration: 0.3 },
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 0.5 }
              }}
              whileHover={{
                scale: 1.3,
                boxShadow: "0 0 40px rgba(255, 107, 53, 0.8)"
              }}
              whileTap={{
                scale: 0.9
              }}
              onClick={() => {
                setAvatarClicked(!avatarClicked);
                setTimeout(() => setAvatarClicked(false), 2000);
              }}
            >
              <User size={32} />
            </motion.div>
          </motion.div>

          {/* 添加一些围绕轨道的小星星 */}
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              className="star"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '4px',
                height: '4px',
                background: '#ff6b35',
                borderRadius: '50%',
                boxShadow: '0 0 10px rgba(255, 107, 53, 0.6)'
              }}
              animate={{
                rotate: [0, 360],
                x: [0, Math.cos(index * 72 * Math.PI / 180) * 100],
                y: [0, Math.sin(index * 72 * Math.PI / 180) * 100],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.5
              }}
            />
          ))}

          {/* 轨道线 */}
          <motion.div
            className="orbit-line"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* 点击波纹效果 */}
          {avatarClicked && (
            <motion.div
              className="ripple-effect"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '40px',
                height: '40px',
                border: '2px solid #ff6b35',
                borderRadius: '50%',
                pointerEvents: 'none'
              }}
            />
          )}
        </motion.div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to My
            <span className="gradient-text"> Digital Universe</span>
          </motion.h1>
          
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A comprehensive showcase of my professional expertise, creative endeavors, 
            and personal passions. Explore my journey through technology, art, and life.
          </motion.p>
          
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button 
              className="btn btn-primary"
              onClick={() => scrollToSection('experience')}
            >
              Explore My Journey
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => scrollToSection('portfolio')}
            >
              View Portfolio
            </button>
          </motion.div>
          
          <motion.div
            className="hero-social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin size={24} />
            </a>
            <a href="mailto:your.email@example.com">
              <Mail size={24} />
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          onClick={() => scrollToSection('experience')}
        >
          <ChevronDown size={24} />
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
