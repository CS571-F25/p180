# Personal Website

A feature-rich personal website showcasing professional experience, creative work, and personal interests. Built with React and Vite, featuring modern design and interactive functionality.

## Features

### 🎯 Core Modules

1. **Hero Section** - Dynamic typewriter animation with particle background
2. **Introduction** - About me with education timeline and DecryptedText animation
3. **Gallery** - Photography portfolio with photo and video showcase
4. **Travel Map** - Interactive global travel footprint with Leaflet integration
5. **Gaming Showcase** - Personal game collection and current gaming status
6. **Technical Stack** - Detailed skill showcase and project experience

### ✨ Technical Features

- **Responsive Design** - Perfect adaptation for desktop and mobile devices
- **Modern UI** - Gradient backgrounds, glassmorphism effects, smooth animations
- **Interactive Map** - Using React Leaflet library
- **Advanced Animations** - Framer Motion, GSAP, and custom physics-based effects
- **Modular Components** - Reusable React components
- **Hash Routing** - GitHub Pages compatible navigation

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Router**: React Router DOM (HashRouter)
- **Maps**: React Leaflet + Leaflet
- **Animations**:
  - Framer Motion
  - GSAP
  - Matter.js (Physics engine)
  - OGL (WebGL particle system)
- **Icons**: Lucide React
- **Styling**: CSS3 (gradients, glassmorphism, responsive design)

## Quick Start

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The project will start at `http://localhost:3000/p180/`

### Build for Production

```bash
npm run build
```

Build output will be in the `docs/` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/           # React components
│   ├── PillNav.jsx      # Animated navigation bar
│   ├── Hero.jsx         # Hero section with particles
│   ├── Introduction.jsx # Introduction with education
│   ├── DecryptedText.jsx # Text decryption animation
│   ├── Particles.jsx    # WebGL particle background
│   ├── Gallery.jsx      # Photography portfolio
│   ├── TravelMap.jsx    # Interactive travel map
│   ├── GamingShowcase.jsx # Gaming showcase
│   ├── TechnicalStack.jsx # Technical skills
│   ├── FallingText.jsx  # Physics-based text animation
│   └── Footer.jsx       # Footer component
├── App.jsx              # Main application component
├── main.jsx             # Entry point
├── App.css              # Application styles
└── index.css            # Global styles
```

## Component Features

### 1. Hero Section
- Dynamic typewriter animation
- WebGL particle background with mouse interaction
- Smooth scroll indicator

### 2. Introduction
- DecryptedText animation on scroll
- Education timeline with transfer history
- Bilingual school names (English/Chinese)
- Responsive two-column layout

### 3. Gallery
- Category filtering
- High-resolution image display
- Like and comment system
- Image detail modal

### 4. Technical Stack
- Skill categorization
- Proficiency progress bars
- Project experience statistics
- Technical highlights

### 5. Gaming Showcase
- Current game status
- Historical game collection
- Game ratings and reviews
- Gaming statistics

### 6. Interactive Travel Map
- Global travel footprint
- Click to view details
- Photo gallery display
- Travel statistics

## Customization

### Update Personal Information

Edit the data objects in each component to update your information:

- `Introduction.jsx` - Update education and about me text
- `Gallery.jsx` - Update photography works
- `TechnicalStack.jsx` - Update technical skills
- `GamingShowcase.jsx` - Update gaming information
- `TravelMap.jsx` - Update travel locations

### Style Customization

- Modify color variables in `src/index.css`
- Adjust gradient backgrounds
- Customize animation effects

## Browser Support

- Chrome (Recommended)
- Firefox
- Safari
- Edge

## Deployment to GitHub Pages

This project is configured to deploy to GitHub Pages following CS571 course requirements.

### First-Time Deployment

1. **Configure GitHub Pages**
   - Go to your repository Settings > Pages
   - Source: "Deploy from a branch"
   - Branch: `main`
   - Folder: `/docs`

2. **Merge to Main Branch**

```bash
# Switch to main branch
git checkout main

# Merge your changes
git merge claude/read-project-readme-011CUUMm7DB5cmqYhk9dZknX

# Install dependencies
npm install

# Build for production
npm run build

# Commit build files
git add docs/
git commit -m "Build for deployment"

# Push to GitHub
git push origin main
```

3. **Access Your Site**

Your website will be available at: `https://cs571-f25.github.io/p180/`

### Updating the Site

For future updates:

```bash
# Make your changes...

# Build
npm run build

# Commit and push
git add -A
git commit -m "Your update message"
git push origin main
```

**Important**: Always run `npm run build` before pushing to main!

See `DEPLOYMENT.md` for detailed deployment instructions.

## Development

### Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Vite Configuration

The project uses Vite with the following configuration:
- Base path: `/p180/`
- Output directory: `docs/`
- Dev server port: 3000 (auto-increments if taken)

## License

MIT License

## Contributing

Issues and Pull Requests are welcome to improve this project!

---

**Note**: This is a personal portfolio project. Please modify the content and styles according to your needs.
