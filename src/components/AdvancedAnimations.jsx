import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  Heart, 
  Star,
  ArrowRight,
  RotateCcw,
  Move,
  Scale
} from 'lucide-react';

const AdvancedAnimations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState(0);

  // 使用 useMotionValue 和 useTransform 创建复杂的动画值
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [30, -30]);
  const rotateY = useTransform(x, [-300, 300], [-30, 30]);

  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const animations = [
    {
      title: "3D 变换动画",
      description: "使用 rotateX 和 rotateY 创建 3D 效果",
      component: (
        <motion.div
          className="advanced-demo-box 3d-demo"
          style={{
            x: springX,
            y: springY,
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
          drag
          dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
          whileDrag={{ scale: 1.1 }}
          onDrag={(_, info) => {
            x.set(info.point.x - 150);
            y.set(info.point.y - 150);
          }}
        >
          <Sparkles size={32} />
          <span>3D 拖拽</span>
        </motion.div>
      )
    },
    {
      title: "弹性动画",
      description: "使用 spring 物理引擎创建自然的弹性效果",
      component: (
        <motion.div
          className="advanced-demo-box spring-demo"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            borderRadius: ["50%", "20%", "50%"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        >
          <Zap size={32} />
          <span>弹性动画</span>
        </motion.div>
      )
    },
    {
      title: "路径动画",
      description: "沿复杂路径移动的动画",
      component: (
        <motion.div
          className="advanced-demo-box path-demo"
          animate={{
            x: [0, 100, 0, -100, 0],
            y: [0, -50, 0, 50, 0],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Move size={32} />
          <span>路径动画</span>
        </motion.div>
      )
    },
    {
      title: "序列动画",
      description: "多个元素的复杂序列动画",
      component: (
        <div className="sequence-container">
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              className="advanced-demo-box sequence-item"
              initial={{ 
                opacity: 0, 
                scale: 0,
                x: -100,
                rotate: -180
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: 0,
                rotate: 0
              }}
              transition={{
                delay: index * 0.2,
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                scale: 1.2,
                rotate: 10,
                transition: { duration: 0.2 }
              }}
            >
              <Star size={24} />
              <span>{index + 1}</span>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: "手势动画",
      description: "复杂的手势交互和拖拽效果",
      component: (
        <motion.div
          className="advanced-demo-box gesture-demo"
          drag
          dragConstraints={{ left: -200, right: 200, top: -100, bottom: 100 }}
          dragElastic={0.1}
          whileDrag={{ 
            scale: 1.2,
            rotate: 15,
            boxShadow: "0 20px 40px rgba(255, 107, 53, 0.4)"
          }}
          whileHover={{ 
            scale: 1.1,
            transition: { duration: 0.2 }
          }}
          onDragEnd={(_, info) => {
            if (info.offset.x > 100) {
              // 向右拖拽超过100px时的特殊效果
              console.log("向右拖拽!");
            }
          }}
        >
          <Scale size={32} />
          <span>拖拽我</span>
        </motion.div>
      )
    },
    {
      title: "布局动画",
      description: "自动处理布局变化的动画",
      component: (
        <motion.div
          className="layout-container"
          layout
        >
          {isVisible ? (
            <motion.div
              className="advanced-demo-box layout-item"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.05 }}
            >
              <Heart size={32} />
              <span>布局动画</span>
            </motion.div>
          ) : (
            <motion.div
              className="advanced-demo-box layout-item"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.05 }}
            >
              <RotateCcw size={32} />
              <span>点击切换</span>
            </motion.div>
          )}
        </motion.div>
      )
    }
  ];

  const nextAnimation = () => {
    setCurrentAnimation((prev) => (prev + 1) % animations.length);
  };

  const prevAnimation = () => {
    setCurrentAnimation((prev) => (prev - 1 + animations.length) % animations.length);
  };

  // const resetAnimation = () => {
  //   x.set(0);
  //   y.set(0);
  // };

  return (
    <section className="advanced-animations-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          高级 Framer Motion 动画
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          展示 Framer Motion 的高级功能和复杂动画效果
        </motion.p>

        <div className="advanced-controls">
          <motion.button
            className="advanced-btn"
            onClick={prevAnimation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
            上一个
          </motion.button>
          
          <motion.button
            className="advanced-btn primary"
            onClick={() => setIsVisible(!isVisible)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={16} />
            重置
          </motion.button>
          
          <motion.button
            className="advanced-btn"
            onClick={nextAnimation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            下一个
            <ArrowRight size={16} />
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentAnimation}
            className="advanced-showcase"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="advanced-header">
              <h3>{animations[currentAnimation].title}</h3>
              <p>{animations[currentAnimation].description}</p>
            </div>
            
            <div className="advanced-content">
              {animations[currentAnimation].component}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="advanced-indicators">
          {animations.map((_, index) => (
            <motion.button
              key={index}
              className={`advanced-indicator ${currentAnimation === index ? 'active' : ''}`}
              onClick={() => setCurrentAnimation(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        <motion.div
          className="advanced-features"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3>高级特性</h3>
          <div className="features-grid">
            <motion.div
              className="feature-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4>useMotionValue</h4>
              <p>创建可控制的动画值，支持复杂的数学变换</p>
            </motion.div>
            
            <motion.div
              className="feature-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4>useTransform</h4>
              <p>将动画值映射到其他属性，创建复杂的动画链</p>
            </motion.div>
            
            <motion.div
              className="feature-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4>useSpring</h4>
              <p>为动画值添加弹性效果，创建自然的物理动画</p>
            </motion.div>
            
            <motion.div
              className="feature-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4>AnimatePresence</h4>
              <p>处理组件的进入和退出动画，支持复杂的过渡效果</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvancedAnimations;
