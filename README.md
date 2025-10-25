# Personal Website

一个功能丰富的个人网站，展示专业经验、创意作品和个人爱好。使用React构建，具有现代化的设计和交互功能。

## 功能特性

### 🎯 核心模块

1. **个人经历时间线** - 展示教育和职业发展历程
2. **摄影作品集** - 高分辨率照片和视频展示，支持点赞和评论
3. **技术栈展示** - 详细的技能展示和项目经验
4. **游戏展示** - 个人游戏收藏和当前游戏状态
5. **交互式旅行地图** - 全球旅行足迹，支持照片展示和互动

### ✨ 技术特性

- **响应式设计** - 完美适配桌面和移动设备
- **现代化UI** - 渐变背景、毛玻璃效果、流畅动画
- **交互式地图** - 使用Leaflet地图库
- **动画效果** - Framer Motion动画库
- **模块化组件** - 可复用的React组件

## 技术栈

- **前端框架**: React 18
- **路由**: React Router DOM
- **地图**: React Leaflet + Leaflet
- **动画**: Framer Motion
- **图标**: Lucide React
- **样式**: CSS3 (渐变、毛玻璃效果、响应式)

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

项目将在 `http://localhost:3000` 启动

### 构建生产版本

```bash
npm run build
```

## 项目结构

```
src/
├── components/          # React组件
│   ├── Navigation.js    # 导航栏
│   ├── Hero.js         # 首页英雄区
│   ├── PersonalExperience.js  # 个人经历时间线
│   ├── PhotographyPortfolio.js # 摄影作品集
│   ├── TechnicalStack.js      # 技术栈展示
│   ├── GamingShowcase.js      # 游戏展示
│   ├── TravelMap.js           # 旅行地图
│   └── Footer.js              # 页脚
├── App.js              # 主应用组件
├── App.css             # 应用样式
├── index.js            # 入口文件
└── index.css           # 全局样式
```

## 功能说明

### 1. 个人经历时间线
- 展示教育背景和工作经验
- 时间线可视化设计
- 成就和里程碑展示

### 2. 摄影作品集
- 分类筛选功能
- 高分辨率图片展示
- 点赞和评论系统
- 图片详情模态框

### 3. 技术栈展示
- 技能分类展示
- 熟练度进度条
- 项目经验统计
- 技术亮点展示

### 4. 游戏展示
- 当前游戏状态
- 历史游戏收藏
- 游戏评分和评论
- 游戏统计信息

### 5. 交互式旅行地图
- 全球旅行足迹
- 点击查看详细信息
- 照片画廊展示
- 旅行统计

## 自定义配置

### 更新个人信息
编辑各个组件中的数据对象来更新您的个人信息：

- `PersonalExperience.js` - 更新教育和工作经历
- `PhotographyPortfolio.js` - 更新摄影作品
- `TechnicalStack.js` - 更新技术技能
- `GamingShowcase.js` - 更新游戏信息
- `TravelMap.js` - 更新旅行地点

### 样式定制
- 修改 `src/index.css` 中的颜色变量
- 调整渐变背景色
- 自定义动画效果

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 部署

### Netlify
1. 运行 `npm run build`
2. 将 `build` 文件夹上传到Netlify

### Vercel
1. 连接GitHub仓库
2. 自动部署

### GitHub Pages
1. 运行 `npm run build`
2. 将 `build` 文件夹内容推送到 `gh-pages` 分支

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

---

**注意**: 这是一个演示项目，请根据您的实际需求修改内容和样式。
