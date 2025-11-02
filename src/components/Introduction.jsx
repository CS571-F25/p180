import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight } from 'lucide-react';
import DecryptedText from './DecryptedText';
import NextSectionButton from './NextSectionButton';

const Introduction = () => {
  const introText = `Welcome to my personal website! As you can see, I am a developer, photographer, gamer, and traveler. This website showcases some of my hobbies and works. Feel free to explore and discover more about my journey and passions.`;

  const education = [
    {
      school: 'City University of Hong Kong',
      degree: 'Bachelor of Engineering',
      major: 'Electrical and Electronic Engineering',
      period: '2022 - 2024',
      icon: '🇭🇰'
    },
    {
      school: 'University of Wisconsin-Madison',
      degree: 'Bachelor of Science',
      major: 'Computer Science',
      period: '2024 - Present',
      icon: '🇺🇸'
    }
  ];

  return (
    <section id="introduction" className="section introduction-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Introduction
        </motion.h2>

        <div className="introduction-grid">
          {/* Left side - About me */}
          <motion.div
            className="introduction-about"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="introduction-subtitle">About Me</h3>
            <p className="introduction-text">
              <DecryptedText
                text={introText}
                animateOn="view"
                speed={30}
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
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="education-icon">{edu.icon}</div>
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

        <NextSectionButton nextSection="gallery" label="Explore Gallery" />
      </div>
    </section>
  );
};

export default Introduction;
