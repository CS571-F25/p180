import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Clock, 
  Users, 
  Star, 
  MessageCircle, 
  Heart,
  Play
} from 'lucide-react';

const GamingShowcase = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [comments, setComments] = useState({});

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
        achievements: ['Completed 3 Divine Beasts', 'Found 50 Korok Seeds', 'Mastered Paragliding'],
        currentObjective: 'Exploring the Depths and finding all Lightroots',
        playtime: '2-3 hours daily'
      },
      {
        id: 2,
        title: 'Baldur\'s Gate 3',
        platform: 'PC',
        genre: 'RPG',
        status: 'Recently Started',
        hoursPlayed: 12,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
        description: 'A masterpiece of storytelling and character development. Every choice matters.',
        achievements: ['Completed Act 1', 'Romanced Shadowheart', 'Saved the Grove'],
        currentObjective: 'Starting Act 2 and exploring new areas',
        playtime: 'Weekend sessions'
      }
    ],
    favoriteGames: [
      {
        id: 3,
        title: 'The Witcher 3: Wild Hunt',
        platform: 'PC/PS5',
        genre: 'RPG',
        status: 'Completed',
        hoursPlayed: 120,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        description: 'One of the greatest RPGs ever made. The storytelling, world-building, and character development are unmatched.',
        achievements: ['100% Completion', 'All Endings Unlocked', 'Death March Difficulty'],
        playtime: 'Completed in 3 months'
      },
      {
        id: 4,
        title: 'Hollow Knight',
        platform: 'PC/Switch',
        genre: 'Metroidvania',
        status: 'Completed',
        hoursPlayed: 35,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=300&fit=crop',
        description: 'A beautiful and challenging metroidvania with incredible atmosphere and tight gameplay.',
        achievements: ['All Bosses Defeated', '112% Completion', 'Path of Pain Completed'],
        playtime: 'Completed in 2 weeks'
      },
      {
        id: 5,
        title: 'Celeste',
        platform: 'PC/Switch',
        genre: 'Platformer',
        status: 'Completed',
        hoursPlayed: 25,
        rating: 5,
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
        description: 'A perfect platformer that combines challenging gameplay with a touching story about mental health.',
        achievements: ['All Strawberries Collected', 'B-Sides Completed', 'Golden Berries'],
        playtime: 'Completed in 1 week'
      }
    ],
    multiplayerGames: [
      {
        id: 6,
        title: 'Valorant',
        platform: 'PC',
        genre: 'FPS',
        status: 'Regular Play',
        hoursPlayed: 200,
        rating: 4,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
        description: 'Competitive tactical shooter that I play regularly with friends.',
        rank: 'Diamond 2',
        favoriteAgent: 'Sage',
        playtime: 'Evenings and weekends'
      },
      {
        id: 7,
        title: 'Among Us',
        platform: 'PC/Mobile',
        genre: 'Social Deduction',
        status: 'Casual Play',
        hoursPlayed: 50,
        rating: 4,
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop',
        description: 'Fun social game perfect for playing with friends online.',
        achievements: ['100+ Games Played', 'Master Impostor'],
        playtime: 'Party games with friends'
      }
    ]
  };

  const handleLike = (gameId) => {
    // Like functionality can be implemented here
    console.log('Liked game:', gameId);
  };

  const handleComment = (gameId, comment) => {
    if (comment.trim()) {
      setComments(prev => ({
        ...prev,
        [gameId]: [...(prev[gameId] || []), {
          id: Date.now(),
          text: comment,
          author: 'Anonymous',
          timestamp: new Date().toLocaleDateString()
        }]
      }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Currently Playing': return '#10B981';
      case 'Recently Started': return '#3B82F6';
      case 'Completed': return '#8B5CF6';
      case 'Regular Play': return '#F59E0B';
      case 'Casual Play': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? '#FCD34D' : 'none'}
        stroke={i < rating ? '#FCD34D' : '#6B7280'}
      />
    ));
  };

  return (
    <section id="gaming" className="section gaming-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Gaming Showcase
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          My personal gaming space - favorite titles, current adventures, and gaming reflections
        </motion.p>

        <div className="gaming-categories">
          <motion.div
            className="gaming-category"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="category-title">
              <Play size={24} />
              Currently Playing
            </h3>
            <div className="games-grid">
              {gamingData.currentGames.map(game => (
                <motion.div
                  key={game.id}
                  className="game-card current"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedGame(game)}
                >
                  <div className="game-image">
                    <img src={game.image} alt={game.title} />
                    <div className="game-status" style={{ backgroundColor: getStatusColor(game.status) }}>
                      {game.status}
                    </div>
                  </div>
                  <div className="game-info">
                    <h4>{game.title}</h4>
                    <p className="game-platform">{game.platform}</p>
                    <div className="game-stats">
                      <div className="stat">
                        <Clock size={14} />
                        <span>{game.hoursPlayed}h</span>
                      </div>
                      <div className="stat">
                        <Star size={14} />
                        <span>{game.rating}/5</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="gaming-category"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="category-title">
              <Trophy size={24} />
              All-Time Favorites
            </h3>
            <div className="games-grid">
              {gamingData.favoriteGames.map(game => (
                <motion.div
                  key={game.id}
                  className="game-card favorite"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedGame(game)}
                >
                  <div className="game-image">
                    <img src={game.image} alt={game.title} />
                    <div className="game-rating">
                      {renderStars(game.rating)}
                    </div>
                  </div>
                  <div className="game-info">
                    <h4>{game.title}</h4>
                    <p className="game-platform">{game.platform}</p>
                    <div className="game-stats">
                      <div className="stat">
                        <Clock size={14} />
                        <span>{game.hoursPlayed}h</span>
                      </div>
                      <div className="stat">
                        <Trophy size={14} />
                        <span>Completed</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="gaming-category"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="category-title">
              <Users size={24} />
              Multiplayer & Social
            </h3>
            <div className="games-grid">
              {gamingData.multiplayerGames.map(game => (
                <motion.div
                  key={game.id}
                  className="game-card multiplayer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedGame(game)}
                >
                  <div className="game-image">
                    <img src={game.image} alt={game.title} />
                    <div className="game-status" style={{ backgroundColor: getStatusColor(game.status) }}>
                      {game.status}
                    </div>
                  </div>
                  <div className="game-info">
                    <h4>{game.title}</h4>
                    <p className="game-platform">{game.platform}</p>
                    <div className="game-stats">
                      <div className="stat">
                        <Clock size={14} />
                        <span>{game.hoursPlayed}h</span>
                      </div>
                      <div className="stat">
                        <Users size={14} />
                        <span>Multiplayer</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="gaming-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3>Gaming Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Total Hours Played</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">Games Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5</div>
              <div className="stat-label">Platforms</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3</div>
              <div className="stat-label">Years Gaming</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Game Detail Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            className="game-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGame(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setSelectedGame(null)}
              >
                ×
              </button>
              
              <div className="modal-header">
                <div className="modal-image">
                  <img src={selectedGame.image} alt={selectedGame.title} />
                </div>
                <div className="modal-info">
                  <h2>{selectedGame.title}</h2>
                  <div className="modal-meta">
                    <span className="platform">{selectedGame.platform}</span>
                    <span className="genre">{selectedGame.genre}</span>
                    <div className="rating">
                      {renderStars(selectedGame.rating)}
                    </div>
                  </div>
                  <div className="modal-stats">
                    <div className="stat">
                      <Clock size={16} />
                      <span>{selectedGame.hoursPlayed} hours</span>
                    </div>
                    <div className="stat">
                      <Trophy size={16} />
                      <span>{selectedGame.status}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-body">
                <p className="description">{selectedGame.description}</p>
                
                <div className="achievements">
                  <h4>Achievements & Progress</h4>
                  <ul>
                    {selectedGame.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
                
                {selectedGame.currentObjective && (
                  <div className="current-objective">
                    <h4>Current Objective</h4>
                    <p>{selectedGame.currentObjective}</p>
                  </div>
                )}
                
                <div className="playtime-info">
                  <h4>Playtime</h4>
                  <p>{selectedGame.playtime}</p>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="action-btn"
                  onClick={() => handleLike(selectedGame.id)}
                >
                  <Heart size={20} />
                  <span>{selectedGame.likes || 0} Likes</span>
                </button>
                <button className="action-btn">
                  <MessageCircle size={20} />
                  <span>Discuss</span>
                </button>
              </div>
              
              <div className="comments-section">
                <h4>Comments & Discussion</h4>
                <div className="comments-list">
                  {(comments[selectedGame.id] || []).map(comment => (
                    <div key={comment.id} className="comment">
                      <strong>{comment.author}</strong>
                      <span className="comment-date">{comment.timestamp}</span>
                      <p>{comment.text}</p>
                    </div>
                  ))}
                </div>
                <div className="comment-form">
                  <input
                    type="text"
                    placeholder="Share your thoughts about this game..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleComment(selectedGame.id, e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
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
