import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const NextSectionButton = ({ nextSection, label = "Next Section" }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className="next-section-button"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={() => scrollToSection(nextSection)}
    >
      <motion.div
        className="next-button-content"
        whileHover={{ y: 5 }}
        transition={{ duration: 0.3 }}
      >
        <span>{label}</span>
        <ChevronDown size={24} />
      </motion.div>
    </motion.div>
  );
};

export default NextSectionButton;
