import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Database, 
  Cloud, 
  Smartphone, 
  Monitor, 
  Server,
  GitBranch,
  Shield,
  Zap
} from 'lucide-react';

const TechnicalStack = () => {
  const [selectedCategory, setSelectedCategory] = useState('frontend');

  const techStack = {
    frontend: {
      title: 'Frontend Development',
      icon: <Monitor size={32} />,
      color: '#3B82F6',
      skills: [
        { name: 'React', level: 95, experience: '3+ years', projects: 15 },
        { name: 'TypeScript', level: 90, experience: '2+ years', projects: 12 },
        { name: 'Next.js', level: 85, experience: '2+ years', projects: 8 },
        { name: 'Vue.js', level: 80, experience: '1+ years', projects: 5 },
        { name: 'Angular', level: 75, experience: '1+ years', projects: 3 },
        { name: 'HTML5/CSS3', level: 95, experience: '4+ years', projects: 25 },
        { name: 'JavaScript (ES6+)', level: 92, experience: '4+ years', projects: 20 },
        { name: 'Sass/SCSS', level: 88, experience: '3+ years', projects: 18 },
        { name: 'Tailwind CSS', level: 85, experience: '2+ years', projects: 10 }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: <Server size={32} />,
      color: '#10B981',
      skills: [
        { name: 'Node.js', level: 90, experience: '3+ years', projects: 12 },
        { name: 'Python', level: 85, experience: '2+ years', projects: 8 },
        { name: 'Express.js', level: 88, experience: '3+ years', projects: 10 },
        { name: 'Django', level: 80, experience: '1+ years', projects: 4 },
        { name: 'FastAPI', level: 75, experience: '1+ years', projects: 3 },
        { name: 'RESTful APIs', level: 92, experience: '3+ years', projects: 15 },
        { name: 'GraphQL', level: 78, experience: '1+ years', projects: 5 },
        { name: 'Microservices', level: 82, experience: '2+ years', projects: 6 }
      ]
    },
    database: {
      title: 'Database & Storage',
      icon: <Database size={32} />,
      color: '#F59E0B',
      skills: [
        { name: 'PostgreSQL', level: 88, experience: '3+ years', projects: 10 },
        { name: 'MongoDB', level: 85, experience: '2+ years', projects: 8 },
        { name: 'Redis', level: 80, experience: '2+ years', projects: 6 },
        { name: 'MySQL', level: 82, experience: '2+ years', projects: 7 },
        { name: 'Firebase', level: 75, experience: '1+ years', projects: 4 },
        { name: 'Elasticsearch', level: 70, experience: '1+ years', projects: 3 },
        { name: 'Docker', level: 85, experience: '2+ years', projects: 12 },
        { name: 'Kubernetes', level: 72, experience: '1+ years', projects: 4 }
      ]
    },
    cloud: {
      title: 'Cloud & DevOps',
      icon: <Cloud size={32} />,
      color: '#8B5CF6',
      skills: [
        { name: 'AWS', level: 85, experience: '2+ years', projects: 8 },
        { name: 'Google Cloud', level: 80, experience: '1+ years', projects: 5 },
        { name: 'Azure', level: 75, experience: '1+ years', projects: 4 },
        { name: 'CI/CD', level: 88, experience: '2+ years', projects: 10 },
        { name: 'Terraform', level: 70, experience: '1+ years', projects: 3 },
        { name: 'Jenkins', level: 78, experience: '1+ years', projects: 6 },
        { name: 'GitHub Actions', level: 85, experience: '2+ years', projects: 12 },
        { name: 'Monitoring', level: 80, experience: '2+ years', projects: 8 }
      ]
    },
    mobile: {
      title: 'Mobile Development',
      icon: <Smartphone size={32} />,
      color: '#EF4444',
      skills: [
        { name: 'React Native', level: 85, experience: '2+ years', projects: 6 },
        { name: 'Flutter', level: 78, experience: '1+ years', projects: 3 },
        { name: 'iOS Development', level: 70, experience: '1+ years', projects: 2 },
        { name: 'Android Development', level: 72, experience: '1+ years', projects: 2 },
        { name: 'PWA', level: 88, experience: '2+ years', projects: 8 },
        { name: 'Expo', level: 80, experience: '1+ years', projects: 4 }
      ]
    },
    tools: {
      title: 'Development Tools',
      icon: <Code size={32} />,
      color: '#06B6D4',
      skills: [
        { name: 'Git', level: 92, experience: '4+ years', projects: 30 },
        { name: 'VS Code', level: 95, experience: '4+ years', projects: 30 },
        { name: 'Webpack', level: 80, experience: '2+ years', projects: 8 },
        { name: 'Vite', level: 85, experience: '1+ years', projects: 6 },
        { name: 'Jest', level: 82, experience: '2+ years', projects: 10 },
        { name: 'Cypress', level: 75, experience: '1+ years', projects: 5 },
        { name: 'Figma', level: 88, experience: '2+ years', projects: 15 },
        { name: 'Postman', level: 90, experience: '3+ years', projects: 20 }
      ]
    }
  };

  const categories = Object.keys(techStack);

  const getLevelColor = (level) => {
    if (level >= 90) return '#10B981';
    if (level >= 80) return '#3B82F6';
    if (level >= 70) return '#F59E0B';
    return '#6B7280';
  };

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Technical Stack
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          A comprehensive overview of my technical capabilities across various domains
        </motion.p>

        <motion.div
          className="skills-categories"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              style={{ '--category-color': techStack[category].color }}
            >
              <div className="category-icon">
                {techStack[category].icon}
              </div>
              <span>{techStack[category].title}</span>
            </button>
          ))}
        </motion.div>

        <motion.div
          className="skills-content"
          key={selectedCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="skills-header">
            <div 
              className="skills-title"
              style={{ color: techStack[selectedCategory].color }}
            >
              {techStack[selectedCategory].icon}
              <h3>{techStack[selectedCategory].title}</h3>
            </div>
          </div>

          <div className="skills-grid">
            {techStack[selectedCategory].skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="skill-header">
                  <h4 className="skill-name">{skill.name}</h4>
                  <div className="skill-level" style={{ color: getLevelColor(skill.level) }}>
                    {skill.level}%
                  </div>
                </div>
                
                <div className="skill-progress">
                  <div 
                    className="skill-progress-bar"
                    style={{ 
                      width: `${skill.level}%`,
                      backgroundColor: getLevelColor(skill.level)
                    }}
                  />
                </div>
                
                <div className="skill-details">
                  <div className="skill-experience">
                    <Zap size={16} />
                    <span>{skill.experience}</span>
                  </div>
                  <div className="skill-projects">
                    <GitBranch size={16} />
                    <span>{skill.projects} projects</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="tech-highlights"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3>Key Achievements</h3>
          <div className="highlights-grid">
            <div className="highlight-item">
              <Shield size={24} />
              <div>
                <h4>Security Focus</h4>
                <p>Implemented OAuth 2.0, JWT authentication, and security best practices across all projects</p>
              </div>
            </div>
            <div className="highlight-item">
              <Zap size={24} />
              <div>
                <h4>Performance Optimization</h4>
                <p>Improved application performance by 40% through code optimization and caching strategies</p>
              </div>
            </div>
            <div className="highlight-item">
              <GitBranch size={24} />
              <div>
                <h4>Version Control</h4>
                <p>Expert in Git workflows, code reviews, and collaborative development practices</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalStack;
