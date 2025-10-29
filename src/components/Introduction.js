import React from 'react';
import { motion } from 'framer-motion';
import DecryptedText from './DecryptedText';
import NextSectionButton from './NextSectionButton';

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

        <motion.div
          className="introduction-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
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

        <NextSectionButton nextSection="gallery" label="Explore Gallery" />
      </div>
    </section>
  );
};

export default Introduction;
