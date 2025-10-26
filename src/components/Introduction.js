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

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Click to interact with the text
        </motion.p>

        <motion.div
          className="introduction-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="falling-text-box">
            <FallingText
              text={introText}
              highlightWords={["developer", "photographer", "gamer", "traveler", "hobbies", "achievements"]}
              highlightClass="highlighted"
              trigger="click"
              backgroundColor="transparent"
              wireframes={false}
              gravity={0.8}
              fontSize="1.3rem"
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
