import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Particles from './Particles';

const Hero = ({ setActiveSection }) => {
  // 打字机效果状态
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // 要循环显示的文本
  const texts = ['Tao JR', 'Wu Ruitao', 'a Developer', 'a Photographer', 'a Gamer', 'a Traveler'];

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

  return (
    <section id="home" className="hero">
      <Particles
        particleColors={['#ff6b35', '#ff8c42', '#ffa561', '#ffb87a']}
        particleCount={400}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />

      <div className="container">
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
      </div>
    </section>
  );
};

export default Hero;
