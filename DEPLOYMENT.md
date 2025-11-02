# GitHub Pages 部署指南

你的项目已经成功迁移到 Vite，现在可以按照 CS571 课程要求部署到 GitHub Pages 了！

## ✅ 已完成的迁移工作

1. **✅ 从 Create React App 迁移到 Vite**
   - 创建了 `vite.config.js` 配置文件
   - 更新了 `package.json` 依赖
   - 所有构建输出到 `docs/` 文件夹

2. **✅ Router 配置**
   - 将 `BrowserRouter` 改为 `HashRouter`
   - 符合 GitHub Pages 部署要求

3. **✅ 文件结构调整**
   - 创建了 `src/main.jsx` 入口文件（已移除 StrictMode）
   - 将 `index.html` 移动到项目根目录
   - 所有组件文件重命名为 `.jsx` 扩展名

4. **✅ 构建测试**
   - 成功运行 `npm run build`
   - 输出文件位于 `docs/` 文件夹
   - 构建大小: 581.93 kB (gzip: 188.98 kB)

## 📋 部署步骤

### 第一步：配置 GitHub Pages

1. 访问你的 GitHub 仓库：`https://github.com/CS571-F25/p180`
2. 进入 **Settings** > **Pages**
3. 在 "Build and deployment" 下：
   - **Source**: 选择 "Deploy from a branch"
   - **Branch**: 选择 `main`
   - **Folder**: 选择 `/docs`
4. 点击 **Save**

### 第二步：合并到 main 分支并部署

目前你的更改在 `claude/read-project-readme-011CUUMm7DB5cmqYhk9dZknX` 分支。要部署，你需要：

```bash
# 1. 确保所有更改已提交
git status

# 2. 切换到 main 分支
git checkout main

# 3. 合并你的更改
git merge claude/read-project-readme-011CUUMm7DB5cmqYhk9dZknX

# 4. 运行构建（确保 docs/ 文件夹是最新的）
npm run build

# 5. 提交构建文件
git add docs/
git commit -m "Build for deployment"

# 6. 推送到 GitHub
git push origin main
```

### 第三步：访问你的网站

部署完成后（通常需要几分钟），你的网站将在以下地址可访问：

```
https://cs571-f25.github.io/p180/
```

## 🔄 后续更新流程

每次修改代码后，按以下步骤更新部署：

```bash
# 1. 修改代码...

# 2. 运行构建
npm run build

# 3. 提交更改
git add -A
git commit -m "描述你的更改"

# 4. 推送到 main 分支
git push origin main
```

**重要提示**: 每次推送到 main 分支前，**必须**先运行 `npm run build`！

## 🛠️ 开发命令

```bash
# 开发模式（热重载）
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

## 📦 项目配置说明

### vite.config.js
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/p180/',           // GitHub Pages 子路径
  build: {
    outDir: 'docs'          // 构建输出到 docs 文件夹
  }
})
```

### package.json 脚本
- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本到 docs/
- `npm run preview` - 预览生产构建

## ✨ 符合课程要求

✅ 使用 React + Vite
✅ 使用 HashRouter（不是 BrowserRouter）
✅ 移除了 StrictMode
✅ 构建输出到 docs/ 文件夹
✅ base 路径配置为 '/p180/'

## 🚨 注意事项

1. **必须使用 HashRouter**: 项目已配置，不要改回 BrowserRouter
2. **每次推送前构建**: 运行 `npm run build` 确保 docs/ 是最新的
3. **不要修改 docs/ 文件夹**: 这个文件夹由构建自动生成
4. **使用正确的分支**: 部署必须从 main 分支

## 🎉 完成！

你的项目现在完全符合 CS571 的部署要求。按照上面的步骤操作，你的网站将成功部署到 GitHub Pages！
