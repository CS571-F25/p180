# 页面转场效果 (Page Transition) 使用指南

## 概述

这个项目实现了一个流畅的**白色遮罩层页面转场效果**，当用户在不同页面之间切换时，提供更加优雅的视觉体验。

## 转场流程

1. **滑入阶段**：白色遮罩层从屏幕右侧快速滑入，完全覆盖整个视口（0.5秒）
2. **内容切换**：在遮罩层后方，页面内容被异步替换
3. **滑出阶段**：遮罩层向左侧滑出，露出新页面内容（0.5秒）
4. **内容显示**：新页面内容淡入显示，转场完成

## 核心文件

### 1. PageTransition 组件

**文件位置**: `src/components/PageTransition.jsx`

这是转场效果的核心组件，负责管理遮罩层动画和内容切换。

**Props**:

| 属性 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `children` | React.ReactNode | 是 | 要显示的页面内容 |
| `pageKey` | string \| number | 是 | 页面的唯一标识符，变化时触发转场 |
| `direction` | number | 否 | 转场方向（1=前进，-1=后退），默认为1 |
| `onTransitionStart` | function | 否 | 转场开始时的回调函数 |
| `onTransitionComplete` | function | 否 | 转场完成时的回调函数 |

**使用示例**:

```jsx
import PageTransition from './components/PageTransition';

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <PageTransition
      pageKey={currentPage}
      onTransitionStart={() => console.log('转场开始')}
      onTransitionComplete={() => console.log('转场完成')}
    >
      <YourPageContent />
    </PageTransition>
  );
}
```

### 2. PageTransition 样式

**文件位置**: `src/components/PageTransition.css`

包含所有转场相关的CSS样式。

## 自定义转场效果

### 修改遮罩层颜色

在 `PageTransition.css` 中修改 `.transition-overlay` 的背景色：

```css
/* 白色遮罩（默认） */
.transition-overlay {
  background: #ffffff;
}

/* 品牌色遮罩 */
.transition-overlay {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
}

/* 深色遮罩 */
.transition-overlay {
  background: #1d1d1f;
}
```

### 修改动画时长

在 `PageTransition.jsx` 中的 `overlayVariants` 修改：

```jsx
const overlayVariants = {
  slideIn: {
    x: 0,
    transition: {
      duration: 0.8, // 改为 0.8 秒
      ease: [0.76, 0, 0.24, 1],
    }
  },
  slideOut: {
    x: '-100%',
    transition: {
      duration: 0.8, // 改为 0.8 秒
      ease: [0.76, 0, 0.24, 1],
    }
  }
};
```

**注意**: 修改时长后，也需要在 `startTransition` 函数中同步修改 setTimeout 的延迟时间。

### 修改滑动方向

**从左侧滑入**:
```jsx
initial: {
  x: '-100%', // 改为负值
}
```

**从上方滑入**:
```jsx
initial: {
  y: '-100%', // 使用 y 轴
},
slideIn: {
  y: 0,
  // ...
}
```

### 添加加载动画

在遮罩层上添加 loading spinner：

```css
.transition-overlay::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #ff6b35;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}
```

## 性能优化

### 1. GPU 加速

遮罩层已使用 `will-change: transform` 来优化性能：

```css
.transition-overlay {
  will-change: transform;
}
```

### 2. 防止布局抖动

使用固定定位确保遮罩层不影响文档流：

```css
.transition-overlay {
  position: fixed; /* 而不是 absolute */
}
```

### 3. 移动端优化

使用动态视口高度 (`dvh`) 适配移动设备：

```css
@media (max-width: 768px) {
  .page-transition-container {
    height: 100dvh;
  }
}
```

## 集成到现有项目

### React + React Router

```jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import PageTransition from './components/PageTransition';

function App() {
  const location = useLocation();

  return (
    <PageTransition pageKey={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* 更多路由... */}
      </Routes>
    </PageTransition>
  );
}
```

### Next.js

```jsx
// pages/_app.js
import PageTransition from '../components/PageTransition';

function MyApp({ Component, pageProps, router }) {
  return (
    <PageTransition pageKey={router.pathname}>
      <Component {...pageProps} />
    </PageTransition>
  );
}
```

## 常见问题

### Q: 转场过程中如何禁用用户交互？

A: 在转场期间添加一个阻止点击的遮罩：

```jsx
const [isTransitioning, setIsTransitioning] = useState(false);

// 在转场时添加
{isTransitioning && <div style={{
  position: 'fixed',
  inset: 0,
  zIndex: 9998,
  cursor: 'wait'
}} />}
```

### Q: 如何在转场时预加载下一页内容？

A: 在 `onTransitionStart` 回调中预加载：

```jsx
<PageTransition
  pageKey={currentPage}
  onTransitionStart={async () => {
    await preloadNextPageData();
  }}
>
```

### Q: 转场动画卡顿怎么办？

A: 检查以下几点：
1. 确保使用了 `will-change: transform`
2. 使用 `transform` 而不是 `left/right/top/bottom`
3. 减少页面中的动画元素数量
4. 使用 Chrome DevTools 的 Performance 面板分析

## 浏览器兼容性

- Chrome/Edge: ✅ 完全支持
- Firefox: ✅ 完全支持
- Safari: ✅ 完全支持
- IE11: ❌ 不支持（需要 polyfills）

## 技术栈

- **React**: 用于组件化开发
- **Framer Motion**: 提供流畅的动画效果
- **CSS3**: 视觉样式和响应式设计

## 参考资源

- [Framer Motion 文档](https://www.framer.com/motion/)
- [CSS Transform 性能优化](https://web.dev/animations-guide/)
- [React Transition 最佳实践](https://reactjs.org/docs/animation.html)

---

**作者**: Claude
**最后更新**: 2025-11-10
