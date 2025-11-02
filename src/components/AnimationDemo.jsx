import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Zap, 
  Heart, 
  Star,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

const AnimationDemo = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentDemo, setCurrentDemo] = useState(0);

  const demos = [
    {
      title: "基础动画",
      description: "淡入淡出、缩放、旋转等基础动画效果",
      component: (
        <div className="demo-container">
          <motion.div
            className="demo-box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <Zap size={32} />
            <span>基础动画</span>
          </motion.div>
        </div>
      )
    },
    {
      title: "悬停动画",
      description: "鼠标悬停时的交互效果",
      component: (
        <div className="demo-container">
          <motion.div
            className="demo-box hover-demo"
            whileHover={{ 
              scale: 1.1, 
              rotate: 5,
              boxShadow: "0 10px 30px rgba(255, 107, 53, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Heart size={32} />
            <span>悬停我</span>
          </motion.div>
        </div>
      )
    },
    {
      title: "路径动画",
      description: "沿路径移动的动画效果",
      component: (
        <div className="demo-container">
          <motion.div
            className="demo-box path-demo"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Star size={32} />
            <span>路径动画</span>
          </motion.div>
        </div>
      )
    },
    {
      title: "序列动画",
      description: "多个元素的连续动画",
      component: (
        <div className="demo-container">
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="demo-box sequence-demo"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.2,
                duration: 0.5
              }}
            >
              <span>元素 {index + 1}</span>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: "布局动画",
      description: "布局变化时的平滑过渡",
      component: (
        <div className="demo-container">
          <motion.div
            className="demo-box layout-demo"
            layout
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowRight size={32} />
            <span>布局动画</span>
          </motion.div>
        </div>
      )
    },
    {
      title: "手势动画",
      description: "拖拽和手势交互",
      component: (
        <div className="demo-container">
          <motion.div
            className="demo-box gesture-demo"
            drag
            dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
            whileDrag={{ scale: 1.1, rotate: 10 }}
            dragElastic={0.2}
          >
            <ChevronDown size={32} />
            <span>拖拽我</span>
          </motion.div>
        </div>
      )
    }
  ];

  const nextDemo = () => {
    setCurrentDemo((prev) => (prev + 1) % demos.length);
  };

  const prevDemo = () => {
    setCurrentDemo((prev) => (prev - 1 + demos.length) % demos.length);
  };

  return (
    <section id="animations" className="animation-demo-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Framer Motion 动画演示
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          展示Framer Motion库的强大动画功能
        </motion.p>

        <div className="demo-controls">
          <motion.button
            className="demo-btn"
            onClick={prevDemo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
            上一个
          </motion.button>
          
          <motion.button
            className="demo-btn primary"
            onClick={() => setIsVisible(!isVisible)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isVisible ? <Pause size={16} /> : <Play size={16} />}
            {isVisible ? '暂停' : '播放'}
          </motion.button>
          
          <motion.button
            className="demo-btn"
            onClick={nextDemo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            下一个
            <ArrowRight size={16} />
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={currentDemo}
              className="demo-showcase"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="demo-header">
                <h3>{demos[currentDemo].title}</h3>
                <p>{demos[currentDemo].description}</p>
              </div>
              
              <div className="demo-content">
                {demos[currentDemo].component}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="demo-indicators">
          {demos.map((_, index) => (
            <motion.button
              key={index}
              className={`indicator ${currentDemo === index ? 'active' : ''}`}
              onClick={() => setCurrentDemo(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        <motion.div
          className="demo-features"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3>Framer Motion 特性</h3>
          <div className="features-grid">
            <motion.div
              className="feature-item"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4>声明式动画</h4>
              <p>使用简单的props定义复杂的动画</p>
            </motion.div>
            
            <motion.div
              className="feature-item"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4>手势支持</h4>
              <p>内置拖拽、悬停、点击等手势</p>
            </motion.div>
            
            <motion.div
              className="feature-item"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4>布局动画</h4>
              <p>自动处理布局变化时的动画</p>
            </motion.div>
            
            <motion.div
              className="feature-item"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4>性能优化</h4>
              <p>使用GPU加速，流畅的60fps动画</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimationDemo;
