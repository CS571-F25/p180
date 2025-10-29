import React from 'react';
import { motion } from 'framer-motion';
import DecryptedText from './DecryptedText';
import NextSectionButton from './NextSectionButton';
import FallingText from './FallingText';

const Introduction = () => {
  const introText = `Welcome to my personal website! As you can see, I am a developer, photographer, gamer, and traveler. This website showcases some of my hobbies and works. Feel free to explore and discover more about my journey and passions.`;

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

<div
  style={{
    width: '700px',
    height: '400px',
    border: '4px solid #ff6b35',
    borderRadius: '16px',
    overflow: 'hidden', 
    position: 'relative',
    background: '#f8fafc', 
    margin: '0 auto'
  }}
>
  <FallingText
    text={introText}
    highlightWords={["developer", "photographer", "gamer", "traveler", "hobbies", "works"]}
    highlightClass="highlighted"
    trigger="click"
    backgroundColor="transparent"
    wireframes={false}
    gravity={0.5}
    fontSize="2rem"
    mouseConstraintStiffness={0.1}
  />
</div>


        <NextSectionButton nextSection="gallery" label="Explore Gallery" />
      </div>
    </section>
  );
};

export default Introduction;
