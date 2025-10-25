# Framer Motion 动画库使用指南

## 🎯 概述

Framer Motion 是一个强大的 React 动画库，提供了声明式的动画 API，让您能够轻松创建复杂的动画效果。在我们的个人网站中，我们使用了 Framer Motion 的各种功能来增强用户体验。

## 🚀 已实现的功能

### 1. 基础动画组件

#### 基本动画属性
```jsx
<motion.div
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.5 }}
  transition={{ duration: 0.5 }}
>
  内容
</motion.div>
```

#### 悬停动画
```jsx
<motion.div
  whileHover={{ 
    scale: 1.1, 
    rotate: 5,
    boxShadow: "0 10px 30px rgba(255, 107, 53, 0.3)"
  }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  悬停我
</motion.div>
```

### 2. 高级动画功能

#### 3D 变换动画
```jsx
const x = useMotionValue(0);
const y = useMotionValue(0);
const rotateX = useTransform(y, [-300, 300], [30, -30]);
const rotateY = useTransform(x, [-300, 300], [-30, 30]);

<motion.div
  style={{
    x: springX,
    y: springY,
    rotateX,
    rotateY,
    transformStyle: "preserve-3d"
  }}
  drag
  dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
>
  3D 拖拽元素
</motion.div>
```

#### 路径动画
```jsx
<motion.div
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
  路径动画
</motion.div>
```

#### 序列动画
```jsx
{[0, 1, 2, 3, 4].map((index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, scale: 0, x: -100, rotate: -180 }}
    animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
    transition={{
      delay: index * 0.2,
      duration: 0.6,
      type: "spring",
      stiffness: 100
    }}
  >
    元素 {index + 1}
  </motion.div>
))}
```

### 3. 手势交互

#### 拖拽动画
```jsx
<motion.div
  drag
  dragConstraints={{ left: -200, right: 200, top: -100, bottom: 100 }}
  dragElastic={0.1}
  whileDrag={{ 
    scale: 1.2,
    rotate: 15,
    boxShadow: "0 20px 40px rgba(255, 107, 53, 0.4)"
  }}
  onDragEnd={(_, info) => {
    if (info.offset.x > 100) {
      console.log("向右拖拽!");
    }
  }}
>
  拖拽我
</motion.div>
```

### 4. 布局动画

#### 自动布局动画
```jsx
<motion.div layout>
  <motion.div
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    whileHover={{ scale: 1.05 }}
  >
    布局动画元素
  </motion.div>
</motion.div>
```

### 5. 进入/退出动画

#### AnimatePresence
```jsx
<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      key={currentDemo}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      内容
    </motion.div>
  )}
</AnimatePresence>
```

## 🎨 动画类型

### 1. 基础动画
- **opacity**: 透明度变化
- **scale**: 缩放效果
- **rotate**: 旋转效果
- **x, y**: 位置移动
- **width, height**: 尺寸变化

### 2. 颜色动画
- **backgroundColor**: 背景色变化
- **color**: 文字颜色变化
- **borderColor**: 边框颜色变化

### 3. 阴影动画
- **boxShadow**: 阴影效果
- **textShadow**: 文字阴影

### 4. 滤镜动画
- **blur**: 模糊效果
- **brightness**: 亮度
- **contrast**: 对比度
- **saturate**: 饱和度

## ⚡ 性能优化

### 1. 使用 transform 属性
```jsx
// ✅ 好的做法 - 使用 transform
<motion.div
  animate={{ x: 100, scale: 1.2 }}
>

// ❌ 避免 - 使用 left, top
<motion.div
  animate={{ left: 100, top: 50 }}
>
```

### 2. 使用 will-change
```jsx
<motion.div
  style={{ willChange: 'transform' }}
  animate={{ scale: 1.2 }}
>
```

### 3. 合理使用 repeat
```jsx
// 无限循环
animate={{ rotate: 360 }}
transition={{ repeat: Infinity, duration: 2 }}

// 有限循环
animate={{ scale: [1, 1.2, 1] }}
transition={{ repeat: 3, duration: 1 }}
```

## 🛠️ 常用 Hook

### 1. useMotionValue
```jsx
const x = useMotionValue(0);
const y = useMotionValue(0);
```

### 2. useTransform
```jsx
const rotateX = useTransform(y, [-300, 300], [30, -30]);
const rotateY = useTransform(x, [-300, 300], [-30, 30]);
```

### 3. useSpring
```jsx
const springX = useSpring(x, { stiffness: 100, damping: 30 });
const springY = useSpring(y, { stiffness: 100, damping: 30 });
```

### 4. useAnimation
```jsx
const controls = useAnimation();

const startAnimation = () => {
  controls.start({ x: 100, scale: 1.2 });
};

<motion.div animate={controls}>
```

## 📱 响应式动画

### 1. 基于屏幕尺寸的动画
```jsx
<motion.div
  animate={{
    scale: window.innerWidth > 768 ? 1 : 0.8
  }}
>
```

### 2. 基于滚动位置的动画
```jsx
const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 1000], [0, -100]);

<motion.div style={{ y }}>
```

## 🎯 最佳实践

### 1. 保持动画简洁
- 避免过度动画
- 保持一致的动画时长
- 使用缓动函数

### 2. 考虑用户体验
- 提供动画控制选项
- 尊重用户的动画偏好
- 确保动画不会影响性能

### 3. 测试和优化
- 在不同设备上测试
- 监控性能指标
- 优化动画性能

## 🔧 调试技巧

### 1. 使用 Framer Motion DevTools
```bash
npm install framer-motion-devtools
```

### 2. 控制台调试
```jsx
<motion.div
  onAnimationStart={() => console.log('动画开始')}
  onAnimationComplete={() => console.log('动画完成')}
>
```

### 3. 性能监控
```jsx
<motion.div
  onUpdate={(latest) => {
    console.log('当前值:', latest);
  }}
>
```

## 📚 学习资源

- [Framer Motion 官方文档](https://www.framer.com/motion/)
- [Framer Motion 示例](https://www.framer.com/motion/examples/)
- [React 动画最佳实践](https://reactjs.org/docs/animation.html)

## 🎉 总结

Framer Motion 是一个功能强大的动画库，它让我们能够轻松创建复杂的动画效果。在我们的个人网站中，我们展示了：

- ✅ 基础动画效果
- ✅ 高级 3D 变换
- ✅ 手势交互
- ✅ 布局动画
- ✅ 进入/退出动画
- ✅ 性能优化

通过这些功能，我们创建了一个生动、交互性强的用户体验，同时保持了良好的性能表现。
