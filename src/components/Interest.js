import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Gamepad2, MapPin } from 'lucide-react';

const Interest = () => {
  const interests = [
    {
      icon: Camera,
      title: '摄影',
      titleEn: 'Photography',
      description: '用镜头捕捉生活中的美好瞬间，记录每一个动人的故事。',
      color: '#ff6b35',
      gradient: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)'
    },
    {
      icon: Gamepad2,
      title: '游戏',
      titleEn: 'Gaming',
      description: '探索虚拟世界，体验不同的人生，在游戏中寻找乐趣与挑战。',
      color: '#4facfe',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: MapPin,
      title: '旅行',
      titleEn: 'Travel',
      description: '走遍世界各地，体验不同文化，用脚步丈量这个美丽的世界。',
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)'
    }
  ];

  return (
    <section id="interest" className="section interest-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Interests
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          探索世界，记录生活，享受每一个精彩瞬间
        </motion.p>

        <div className="interests-grid">
          {interests.map((interest, index) => {
            const Icon = interest.icon;
            return (
              <motion.div
                key={interest.titleEn}
                className="interest-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className="interest-icon"
                  style={{ background: interest.gradient }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Icon size={40} color="white" />
                </motion.div>

                <div className="interest-content">
                  <h3 className="interest-title">
                    {interest.title}
                    <span className="interest-title-en">{interest.titleEn}</span>
                  </h3>
                  <p className="interest-description">{interest.description}</p>
                </div>

                <motion.div
                  className="interest-decoration"
                  style={{ background: interest.gradient }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Interest;
