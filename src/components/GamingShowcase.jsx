import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Trophy, Clock, Users, Star, Play, X } from 'lucide-react';
import Gamepad3D from './Gamepad3D';

const GamingShowcase = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  // Monitor scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / (scrollHeight * 0.3), 1);

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const gamingData = {
    currentGames: [
      {
        id: 1,
        title: 'The Legend of Zelda: Tears of the Kingdom',
        platform: 'Nintendo Switch',
        genre: 'Action-Adventure',
        status: 'Currently Playing',
        hoursPlayed: 45,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        description: 'An incredible open-world adventure that continues to amaze me with its creativity and depth.',
      },
      {
        id: 2,
        title: 'Elden Ring',
        platform: 'PC',
        genre: 'Action RPG',
        status: 'Currently Playing',
        hoursPlayed: 120,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
        description: 'Challenging and rewarding FromSoftware masterpiece.',
      },
      {
        id: 3,
        title: 'Baldur\'s Gate 3',
        platform: 'PC',
        genre: 'RPG',
        status: 'Currently Playing',
        hoursPlayed: 85,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop',
        description: 'Deep storytelling and tactical combat.',
      }
    ],
    favoriteGames: [
      {
        id: 4,
        title: 'The Witcher 3: Wild Hunt',
        platform: 'PC',
        genre: 'Action RPG',
        hoursPlayed: 200,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
        description: 'Epic fantasy adventure with incredible storytelling.',
      },
      {
        id: 5,
        title: 'Hades',
        platform: 'Nintendo Switch',
        genre: 'Roguelike',
        hoursPlayed: 150,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
        description: 'Perfect blend of story and gameplay.',
      },
      {
        id: 6,
        title: 'Hollow Knight',
        platform: 'PC',
        genre: 'Metroidvania',
        hoursPlayed: 60,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop',
        description: 'Beautiful hand-drawn art and challenging gameplay.',
      }
    ]
  };

  const allGames = [...gamingData.currentGames, ...gamingData.favoriteGames];
  const canvasOpacity = 1 - scrollProgress;

  return (
    <section ref={containerRef} id="gaming" className="gaming-section-3d">
      {/* 3D Gamepad Canvas */}
      <div
        className="gamepad-canvas-container"
        style={{
          opacity: canvasOpacity,
          pointerEvents: scrollProgress > 0.9 ? 'none' : 'auto'
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <Gamepad3D scrollProgress={scrollProgress} />
        </Canvas>

        {/* Hero Title */}
        <div className="gamepad-hero-text" style={{ opacity: canvasOpacity }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Gaming Showcase
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Scroll down to explore my gaming journey
          </motion.p>
        </div>
      </div>

      {/* Game Cards Section */}
      <div className="game-cards-section" style={{ paddingTop: '100vh' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">My Games Collection</h2>
            <p className="section-subtitle">Titles that shaped my gaming experience</p>
          </motion.div>

          <div className="games-grid-3d">
            {allGames.map((game, index) => (
              <motion.div
                key={game.id}
                className="game-card-3d"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => setSelectedGame(game)}
              >
                <div className="game-card-image">
                  <img src={game.image} alt={game.title} loading="lazy" />
                  <div className="game-card-overlay">
                    <Play size={48} />
                  </div>
                </div>
                <div className="game-card-content">
                  <h3>{game.title}</h3>
                  <div className="game-card-meta">
                    <span className="game-platform">{game.platform}</span>
                    <span className="game-genre">{game.genre}</span>
                  </div>
                  <div className="game-stats-row">
                    <div className="stat">
                      <Clock size={16} />
                      <span>{game.hoursPlayed}h</span>
                    </div>
                    <div className="stat">
                      <Star size={16} fill="#ff6b35" color="#ff6b35" />
                      <span>{game.rating}/5</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Game Detail Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            className="game-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGame(null)}
          >
            <motion.div
              className="game-modal-content"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedGame(null)}>
                <X size={24} />
              </button>

              <div className="modal-image">
                <img src={selectedGame.image} alt={selectedGame.title} />
              </div>

              <div className="modal-body">
                <h2>{selectedGame.title}</h2>
                <div className="modal-meta">
                  <span className="badge">{selectedGame.platform}</span>
                  <span className="badge">{selectedGame.genre}</span>
                </div>

                <p className="modal-description">{selectedGame.description}</p>

                <div className="modal-stats">
                  <div className="stat-large">
                    <Clock size={24} />
                    <div>
                      <span className="stat-value">{selectedGame.hoursPlayed}</span>
                      <span className="stat-label">Hours Played</span>
                    </div>
                  </div>
                  <div className="stat-large">
                    <Star size={24} fill="#ff6b35" color="#ff6b35" />
                    <div>
                      <span className="stat-value">{selectedGame.rating}/5</span>
                      <span className="stat-label">Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GamingShowcase;
