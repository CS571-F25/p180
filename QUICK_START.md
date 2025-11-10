# 页面转场效果 - 快速入门

## 🚀 一分钟上手

你的项目已经成功集成了页面转场效果！现在可以直接使用。

### 查看效果

```bash
npm run dev
```

访问本地服务器，点击导航菜单或使用方向键切换页面，你就能看到流畅的转场效果！

---

## 🎨 自定义转场效果

所有配置都在一个文件中，无需修改组件代码！

### 配置文件位置

```
src/config/transitionConfig.js
```

### 常用配置示例

#### 1️⃣ 修改转场速度

```js
// 在 transitionConfig.js 中
timing: {
  slideIn: 0.8,      // 改为 0.8 秒（更慢）
  slideOut: 0.4,     // 改为 0.4 秒（更快）
}
```

#### 2️⃣ 更改遮罩颜色

```js
overlay: {
  backgroundColor: 'brand',  // 使用品牌色渐变
  // 或者自定义颜色
  backgroundColor: '#ff6b35', // 橙色
  // 或者使用渐变
  backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
}
```

#### 3️⃣ 显示加载动画

```js
overlay: {
  showLoader: true,           // 显示 spinner
  loaderColor: '#ff6b35',     // spinner 颜色
}
```

#### 4️⃣ 改变滑动方向

```js
direction: {
  slideInFrom: 'left',   // 从左侧滑入
  slideOutTo: 'right',   // 向右侧滑出
  // 可选: 'left', 'right', 'top', 'bottom'
}
```

#### 5️⃣ 启用调试模式

```js
debug: {
  enabled: true,        // 在控制台显示转场日志
  showTimings: true,    // 显示性能时间
}
```

---

## 📦 项目结构

```
src/
├── components/
│   ├── PageTransition.jsx    # 转场组件（无需修改）
│   └── PageTransition.css     # 转场样式
├── config/
│   └── transitionConfig.js    # 🎯 在这里修改所有配置
└── App.jsx                    # 已集成转场效果
```

---

## 🎯 配置完整说明

### 时长配置（timing）

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `slideIn` | 0.5 | 遮罩层滑入时长（秒） |
| `slideOut` | 0.5 | 遮罩层滑出时长（秒） |
| `contentFade` | 0.3 | 内容淡入时长（秒） |
| `contentDelay` | 0.2 | 内容淡入延迟（秒） |

### 遮罩配置（overlay）

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `backgroundColor` | 'white' | 背景颜色（预设或自定义） |
| `opacity` | 1 | 不透明度（0-1） |
| `showLoader` | false | 是否显示加载动画 |
| `loaderColor` | '#ff6b35' | 加载动画颜色 |

### 方向配置（direction）

| 参数 | 默认值 | 可选值 |
|------|--------|--------|
| `slideInFrom` | 'right' | 'left', 'right', 'top', 'bottom' |
| `slideOutTo` | 'left' | 'left', 'right', 'top', 'bottom', 'same' |

---

## 🔥 精选配置方案

### 方案 1：快速敏捷

```js
timing: {
  slideIn: 0.3,
  slideOut: 0.3,
}
```

### 方案 2：优雅缓慢

```js
timing: {
  slideIn: 0.8,
  slideOut: 0.8,
}
```

### 方案 3：品牌色 + 加载动画

```js
overlay: {
  backgroundColor: 'brand',
  showLoader: true,
  loaderColor: '#ffffff',
}
```

### 方案 4：深色模式

```js
overlay: {
  backgroundColor: 'dark',
  showLoader: true,
  loaderColor: '#ff6b35',
}
```

### 方案 5：从上方滑入

```js
direction: {
  slideInFrom: 'top',
  slideOutTo: 'bottom',
}
```

---

## 🛠️ 高级用法

### 在转场时执行自定义逻辑

```jsx
<PageTransition
  pageKey={currentPage}
  onTransitionStart={() => {
    // 转场开始时执行
    console.log('转场开始');
    // 例如：暂停背景音乐
    pauseBackgroundMusic();
  }}
  onTransitionComplete={() => {
    // 转场完成时执行
    console.log('转场完成');
    // 例如：加载页面分析
    trackPageView();
  }}
>
  <YourContent />
</PageTransition>
```

---

## 📱 响应式设计

转场效果已针对移动设备优化：

- 使用 `100dvh`（动态视口高度）适配移动浏览器
- GPU 加速确保流畅动画
- 自动禁用转场期间的用户交互

---

## ❓ 常见问题

### Q: 转场感觉太快/太慢？

A: 修改 `transitionConfig.js` 中的 `timing.slideIn` 和 `timing.slideOut` 值。

### Q: 如何完全禁用转场效果？

A: 将时长设置为 0：

```js
timing: {
  slideIn: 0,
  slideOut: 0,
}
```

### Q: 能否在不同页面使用不同的转场效果？

A: 可以！在 `PageTransition` 组件中传入不同的配置：

```jsx
// 创建多个配置
const fastTransition = { slideIn: 0.3, slideOut: 0.3 };
const slowTransition = { slideIn: 0.8, slideOut: 0.8 };

// 根据页面选择配置
<PageTransition config={currentPage === 0 ? fastTransition : slowTransition}>
```

---

## 🎉 完成！

现在你已经掌握了页面转场效果的所有配置方法。

**记住**：只需修改 `src/config/transitionConfig.js` 即可实现大部分自定义需求！

有问题？查看完整文档：`TRANSITION_USAGE.md`
