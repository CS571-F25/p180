import React from 'react';
import { motion } from 'framer-motion';
import FallingText from './FallingText';
import NextSectionButton from './NextSectionButton';

const Introduction = () => {
  const introText = `Welcome to my personal website! As you can see, I am a developer, photographer, gamer, and traveler. This website showcases some of my hobbies and achievements. Feel free to explore and discover more about my journey and passions.`;

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

        <motion.div
          className="introduction-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div style={{ minHeight: '400px', width: '100%' }}>
            <FallingText
              text={introText}
              highlightWords={["developer", "photographer", "gamer", "traveler", "hobbies", "achievements"]}
              highlightClass="highlighted"
              trigger="scroll"
              backgroundColor="transparent"
              wireframes={false}
              gravity={0.56}
              fontSize="1.5rem"
              mouseConstraintStiffness={0.9}
            />
          </div>
        </motion.div>

        <NextSectionButton nextSection="gallery" label="Explore Gallery" />
      </div>
    </section>
  );
};

export default Introduction;
