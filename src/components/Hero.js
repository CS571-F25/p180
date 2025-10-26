import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Instagram } from 'lucide-react';
import Particles from './Particles';

const Hero = ({ setActiveSection }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIcon, setHoveredIcon] = useState(null);

  // 打字机效果状态
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // 要循环显示的文本
  const texts = ['TaoJR', 'Ruitao WU', 'a Developer', 'a Photographer', 'a Gamer', 'a Traveler'];

  // 社交媒体图标数据
  const socialIcons = [
    {
      name: 'GitHub',
      icon: Github,
      color: '#333',
      url: 'https://github.com',
      angle: 0
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: '#0077b5',
      url: 'https://linkedin.com',
      angle: 72
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: '#E4405F',
      url: 'https://instagram.com',
      angle: 144
    },
    {
      name: 'Bilibili',
      icon: null, // 使用文字
      color: '#00A1D6',
      url: 'https://bilibili.com',
      angle: 216,
      text: 'B'
    },
    {
      name: 'XiaoHongShu',
      icon: null, // 使用文字
      color: '#FF2442',
      url: 'https://xiaohongshu.com',
      angle: 288,
      text: '小'
    }
  ];

  // 打字机效果
  useEffect(() => {
    const currentText = texts[currentTextIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseDuration = 2000; // 完整显示后的暂停时间

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // 正在打字
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          // 打字完成，暂停后开始删除
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // 正在删除
        if (displayedText.length > 0) {
          setDisplayedText(currentText.slice(0, displayedText.length - 1));
        } else {
          // 删除完成，切换到下一个文本
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTextIndex, texts]);

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
      <Particles
        particleColors={['#ff6b35', '#ff8c42', '#ffa561', '#ffb87a']}
        particleCount={150}
        particleSpread={12}
        speed={0.05}
        particleBaseSize={80}
        moveParticlesOnHover={true}
        particleHoverFactor={0.5}
        alphaParticles={true}
        disableRotation={false}
      />
      <div className="container">
        {/* 头像围绕地球旋转的动画 */}
        <motion.div
          className="hero-animation-container"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
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

          {/* 围绕地球旋转的社交媒体图标 */}
          {socialIcons.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.div
                key={social.name}
                className="avatar-orbit"
                animate={{
                  rotate: hoveredIcon === null ? [social.angle, social.angle + 360] : social.angle + (hoveredIcon === index ? 0 : ((Date.now() / 1000) % 1) * 360),
                }}
                transition={{
                  duration: hoveredIcon === null ? 20 : 0,
                  repeat: hoveredIcon === null ? Infinity : 0,
                  ease: "linear"
                }}
                style={{
                  rotate: social.angle
                }}
              >
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-orbit"
                  style={{
                    backgroundColor: social.color
                  }}
                  animate={{
                    scale: hoveredIcon === index ? 1.5 : 1,
                    rotate: hoveredIcon === null ? [0, -360] : 0,
                  }}
                  transition={{
                    scale: { duration: 0.3 },
                    rotate: { duration: 20, repeat: hoveredIcon === null ? Infinity : 0, ease: "linear" }
                  }}
                  whileHover={{
                    scale: 1.5,
                    boxShadow: `0 0 30px ${social.color}`
                  }}
                  onMouseEnter={() => setHoveredIcon(index)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  {Icon ? <Icon size={20} color="white" /> : <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>{social.text}</span>}
                </motion.a>
              </motion.div>
            );
          })}

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
              rotate: hoveredIcon === null ? [0, 360] : 0,
            }}
            transition={{
              duration: 20,
              repeat: hoveredIcon === null ? Infinity : 0,
              ease: "linear"
            }}
          />
        </motion.div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
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
        </motion.div>
        
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          onClick={() => scrollToSection('interest')}
        >
          <ChevronDown size={24} />
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
