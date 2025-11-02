import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Eye, Download, Share2, Play } from 'lucide-react';
import NextSectionButton from './NextSectionButton';

const Gallery = () => {
  const [selectedTab, setSelectedTab] = useState('photos'); // 'photos' or 'videos'
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [likes, setLikes] = useState({});

  // 照片数据
  const photosData = [
    {
      id: 1,
      title: 'Mountain Sunrise',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      description: 'Captured during a hiking trip in the Swiss Alps.',
      location: 'Swiss Alps',
      date: '2024-03-15',
      likes: 1247,
      views: 3542
    },
    {
      id: 2,
      title: 'Urban Portrait',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=600&fit=crop',
      description: 'Street photography session in downtown Chicago.',
      location: 'Chicago, USA',
      date: '2024-02-20',
      likes: 892,
      views: 2341
    },
    {
      id: 3,
      title: 'Ocean Waves',
      image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
      description: 'Long exposure of waves crashing against the rocky shore.',
      location: 'Big Sur, California',
      date: '2024-01-10',
      likes: 1563,
      views: 4123
    },
    {
      id: 4,
      title: 'City Lights',
      image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop',
      description: 'Night photography from rooftop in Manhattan.',
      location: 'New York, USA',
      date: '2023-12-05',
      likes: 2103,
      views: 5234
    },
    {
      id: 5,
      title: 'Wildlife Close-up',
      image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop',
      description: 'Macro photography of a butterfly in botanical garden.',
      location: 'Local Botanical Garden',
      date: '2023-11-18',
      likes: 743,
      views: 1876
    },
    {
      id: 6,
      title: 'Architectural Detail',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      description: 'Modern architecture photography focusing on patterns.',
      location: 'Dubai, UAE',
      date: '2023-10-22',
      likes: 945,
      views: 2654
    }
  ];

  // 视频数据
  const videosData = [
    {
      id: 1,
      title: 'Travel Vlog: Japan 2024',
      thumbnail: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&h=600&fit=crop',
      duration: '15:32',
      description: '探索日本的美食和文化，从东京到京都的旅程记录。',
      location: 'Japan',
      date: '2024-04-10',
      likes: 3456,
      views: 12543
    },
    {
      id: 2,
      title: 'Gaming Highlights: Epic Moments',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
      duration: '8:45',
      description: '本月最精彩的游戏时刻合集，包括多个惊险击杀。',
      location: 'Online',
      date: '2024-03-28',
      likes: 2134,
      views: 8765
    },
    {
      id: 3,
      title: 'Photography Tutorial: Golden Hour',
      thumbnail: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop',
      duration: '12:18',
      description: '如何在黄金时段拍摄出令人惊艳的照片。',
      location: 'Various',
      date: '2024-03-15',
      likes: 1876,
      views: 6543
    },
    {
      id: 4,
      title: 'City Life: New York Timelapse',
      thumbnail: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
      duration: '3:24',
      description: '纽约城市生活的延时摄影，展现都市的活力。',
      location: 'New York, USA',
      date: '2024-02-20',
      likes: 4321,
      views: 15234
    },
    {
      id: 5,
      title: 'Drone Footage: Mountain Adventure',
      thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
      duration: '6:55',
      description: '航拍视角下的山间探险，壮丽的自然风光。',
      location: 'Rocky Mountains',
      date: '2024-01-30',
      likes: 2987,
      views: 9876
    },
    {
      id: 6,
      title: 'Behind the Scenes: Photo Shoot',
      thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop',
      duration: '10:12',
      description: '专业摄影拍摄的幕后花絮，分享拍摄技巧。',
      location: 'Studio',
      date: '2024-01-15',
      likes: 1654,
      views: 5432
    }
  ];

  const handleLike = (id) => {
    setLikes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const currentData = selectedTab === 'photos' ? photosData : videosData;

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Gallery · 展览馆
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          用镜头记录世界，用作品讲述故事
        </motion.p>

        {/* 标签切换 */}
        <motion.div
          className="gallery-tabs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            className={`gallery-tab ${selectedTab === 'photos' ? 'active' : ''}`}
            onClick={() => setSelectedTab('photos')}
          >
            <Eye size={20} />
            <span>照片 Photos</span>
          </button>
          <button
            className={`gallery-tab ${selectedTab === 'videos' ? 'active' : ''}`}
            onClick={() => setSelectedTab('videos')}
          >
            <Play size={20} />
            <span>视频 Videos</span>
          </button>
        </motion.div>

        {/* 内容网格 */}
        <motion.div
          className="gallery-grid"
          layout
        >
          <AnimatePresence mode="wait">
            {currentData.map((item, index) => (
              <motion.div
                key={`${selectedTab}-${item.id}`}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedMedia(item)}
              >
                <div className="gallery-item-image">
                  <img src={selectedTab === 'photos' ? item.image : item.thumbnail} alt={item.title} />
                  {selectedTab === 'videos' && (
                    <div className="video-overlay">
                      <Play size={48} color="white" />
                      <span className="video-duration">{item.duration}</span>
                    </div>
                  )}
                </div>

                <div className="gallery-item-content">
                  <h3>{item.title}</h3>
                  <p className="gallery-item-location">{item.location}</p>

                  <div className="gallery-item-stats">
                    <button
                      className={`stat-btn ${likes[item.id] ? 'liked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(item.id);
                      }}
                    >
                      <Heart size={16} fill={likes[item.id] ? '#ff6b35' : 'none'} />
                      <span>{item.likes + (likes[item.id] ? 1 : 0)}</span>
                    </button>
                    <div className="stat-btn">
                      <Eye size={16} />
                      <span>{item.views}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 详情模态框 */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              className="gallery-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMedia(null)}
            >
              <motion.div
                className="modal-content"
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close" onClick={() => setSelectedMedia(null)}>×</button>

                <div className="modal-image">
                  <img src={selectedTab === 'photos' ? selectedMedia.image : selectedMedia.thumbnail} alt={selectedMedia.title} />
                  {selectedTab === 'videos' && (
                    <div className="video-play-button">
                      <Play size={64} color="white" />
                    </div>
                  )}
                </div>

                <div className="modal-info">
                  <h2>{selectedMedia.title}</h2>
                  <div className="modal-meta">
                    <span>{selectedMedia.location}</span>
                    <span>{selectedMedia.date}</span>
                    {selectedTab === 'videos' && <span>{selectedMedia.duration}</span>}
                  </div>
                  <p>{selectedMedia.description}</p>

                  <div className="modal-actions">
                    <button
                      className={`action-btn ${likes[selectedMedia.id] ? 'liked' : ''}`}
                      onClick={() => handleLike(selectedMedia.id)}
                    >
                      <Heart size={20} fill={likes[selectedMedia.id] ? '#ff6b35' : 'none'} />
                      <span>Like ({selectedMedia.likes + (likes[selectedMedia.id] ? 1 : 0)})</span>
                    </button>
                    <button className="action-btn">
                      <Download size={20} />
                      <span>Download</span>
                    </button>
                    <button className="action-btn">
                      <Share2 size={20} />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <NextSectionButton nextSection="travel" label="Explore Travel Map" />
      </div>
    </section>
  );
};

export default Gallery;
