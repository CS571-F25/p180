import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, GraduationCap, Briefcase } from 'lucide-react';

const PersonalExperience = () => {
  const timelineData = [
    {
      id: 1,
      type: 'education',
      title: 'Master of Science in Computer Science',
      organization: 'University of Wisconsin-Madison',
      location: 'Madison, WI',
      period: '2023 - 2025',
      description: 'Specializing in web development, machine learning, and software engineering. GPA: 3.8/4.0',
      icon: <GraduationCap size={24} />,
      achievements: ['Dean\'s List', 'Research Assistant', 'Teaching Assistant']
    },
    {
      id: 2,
      type: 'work',
      title: 'Full Stack Developer',
      organization: 'Tech Innovations Inc.',
      location: 'Remote',
      period: '2022 - 2023',
      description: 'Developed and maintained web applications using React, Node.js, and cloud technologies.',
      icon: <Briefcase size={24} />,
      achievements: ['Led 3 major projects', 'Improved performance by 40%', 'Mentored junior developers']
    },
    {
      id: 3,
      type: 'education',
      title: 'Bachelor of Science in Software Engineering',
      organization: 'Beijing Institute of Technology',
      location: 'Beijing, China',
      period: '2018 - 2022',
      description: 'Comprehensive study of software development, algorithms, and system design.',
      icon: <GraduationCap size={24} />,
      achievements: ['Summa Cum Laude', 'President of CS Club', 'Published 2 research papers']
    },
    {
      id: 4,
      type: 'work',
      title: 'Frontend Developer Intern',
      organization: 'Digital Solutions Co.',
      location: 'Beijing, China',
      period: '2021 - 2022',
      description: 'Built responsive user interfaces and collaborated with design teams.',
      icon: <Briefcase size={24} />,
      achievements: ['Created 5+ components', 'Reduced load time by 30%', 'Received outstanding intern award']
    },
    {
      id: 5,
      type: 'achievement',
      title: 'Photography Award',
      organization: 'International Photography Contest',
      location: 'Global',
      period: '2020',
      description: 'First place in landscape photography category with over 10,000 participants.',
      icon: <Award size={24} />,
      achievements: ['Best Landscape Photo', 'Featured in National Geographic', 'Exhibition in 5 countries']
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'education': return '#4F46E5';
      case 'work': return '#059669';
      case 'achievement': return '#DC2626';
      default: return '#6B7280';
    }
  };

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          My Journey
        </motion.h2>
        
        <div className="timeline">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="timeline-content">
                <div 
                  className="timeline-icon"
                  style={{ backgroundColor: getTypeColor(item.type) }}
                >
                  {item.icon}
                </div>
                
                <div className="timeline-card">
                  <div className="timeline-header">
                    <h3 className="timeline-title">{item.title}</h3>
                    <div className="timeline-meta">
                      <span className="timeline-organization">{item.organization}</span>
                      <div className="timeline-location">
                        <MapPin size={16} />
                        <span>{item.location}</span>
                      </div>
                      <div className="timeline-period">
                        <Calendar size={16} />
                        <span>{item.period}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="timeline-description">{item.description}</p>
                  
                  <div className="timeline-achievements">
                    <h4>Achievements:</h4>
                    <ul>
                      {item.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalExperience;
