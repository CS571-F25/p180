import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Eye, Download, Share2, Play } from 'lucide-react';

const Gallery = () => {
  const [selectedTab, setSelectedTab] = useState('photos'); // 'photos' or 'videos'
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [likes, setLikes] = useState({});
  const [justifiedRows, setJustifiedRows] = useState([]);
  const containerRef = useRef(null);

  // 照片数据（添加宽高比信息）
  const photosData = [
    {
      id: 1,
      title: 'Mountain Sunrise',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      description: 'Captured during a hiking trip in the Swiss Alps.',
      location: 'Swiss Alps',
      date: '2024-03-15',
      likes: 1247,
      views: 3542,
      aspectRatio: 1.6 // 宽/高
    },
    {
      id: 2,
      title: 'Urban Portrait',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=600&fit=crop',
      description: 'Street photography session in downtown Chicago.',
      location: 'Chicago, USA',
      date: '2024-02-20',
      likes: 892,
      views: 2341,
      aspectRatio: 0.75 // 竖图
    },
    {
      id: 3,
      title: 'Ocean Waves',
      image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
      description: 'Long exposure of waves crashing against the rocky shore.',
      location: 'Big Sur, California',
      date: '2024-01-10',
      likes: 1563,
      views: 4123,
      aspectRatio: 1.5
    },
    {
      id: 4,
      title: 'City Lights',
      image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop',
      description: 'Night photography from rooftop in Manhattan.',
      location: 'New York, USA',
      date: '2023-12-05',
      likes: 2103,
      views: 5234,
      aspectRatio: 1.33
    },
    {
      id: 5,
      title: 'Wildlife Close-up',
      image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop',
      description: 'Macro photography of a butterfly in botanical garden.',
      location: 'Local Botanical Garden',
      date: '2023-11-18',
      likes: 743,
      views: 1876,
      aspectRatio: 1.0 // 方图
    },
    {
      id: 6,
      title: 'Architectural Detail',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      description: 'Modern architecture photography focusing on patterns.',
      location: 'Dubai, UAE',
      date: '2023-10-22',
      likes: 945,
      views: 2654,
      aspectRatio: 1.4
    }
  ];

  // 视频数据（添加宽高比信息）
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
      views: 12543,
      aspectRatio: 1.77 // 16:9
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
      views: 8765,
      aspectRatio: 1.77
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
      views: 6543,
      aspectRatio: 1.77
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
      views: 15234,
      aspectRatio: 1.77
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
      views: 9876,
      aspectRatio: 1.77
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
      views: 5432,
      aspectRatio: 1.77
    }
  ];

  // Justified Layout 算法
  const calculateJustifiedLayout = (items, containerWidth, targetHeight = 280, spacing = 16) => {
    if (!containerWidth || items.length === 0) return [];

    const rows = [];
    let currentRow = [];
    let currentRowWidth = 0;

    items.forEach((item, index) => {
      const aspectRatio = item.aspectRatio || 1.5;
      const imageWidth = targetHeight * aspectRatio;

      // 如果当前行为空，直接添加
      if (currentRow.length === 0) {
        currentRow.push(item);
        currentRowWidth = imageWidth;
      }
      // 检查添加后是否会超出容器宽度
      else {
        const potentialWidth = currentRowWidth + spacing + imageWidth;

        // 如果添加后宽度合理（不超过容器宽度太多），继续添加到当前行
        if (potentialWidth <= containerWidth * 1.1) {
          currentRow.push(item);
          currentRowWidth = potentialWidth;
        }
        // 否则，当前行已满，计算缩放并开始新行
        else {
          // 计算当前行的缩放比例，使其恰好填满容器
          const availableWidth = containerWidth - (currentRow.length - 1) * spacing;
          const scaleFactor = availableWidth / currentRowWidth;
          const adjustedHeight = targetHeight * scaleFactor;

          rows.push({
            items: [...currentRow],
            height: adjustedHeight,
            scaleFactor
          });

          // 开始新行
          currentRow = [item];
          currentRowWidth = imageWidth;
        }
      }

      // 如果是最后一张图片，将当前行添加到结果中
      if (index === items.length - 1 && currentRow.length > 0) {
        // 最后一行可能不需要完全填满，但也要适当调整
        const availableWidth = containerWidth - (currentRow.length - 1) * spacing;
        const scaleFactor = Math.min(1, availableWidth / currentRowWidth);
        const adjustedHeight = targetHeight * scaleFactor;

        rows.push({
          items: [...currentRow],
          height: adjustedHeight,
          scaleFactor
        });
      }
    });

    return rows;
  };

  const handleLike = (id) => {
    setLikes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const currentData = selectedTab === 'photos' ? photosData : videosData;

  // 计算 justified layout
  useEffect(() => {
    const updateLayout = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const rows = calculateJustifiedLayout(currentData, containerWidth);
        setJustifiedRows(rows);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [currentData, selectedTab]);

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

        {/* Justified Gallery 布局 */}
        <div className="justified-gallery" ref={containerRef}>
          <AnimatePresence mode="wait">
            {justifiedRows.map((row, rowIndex) => (
              <motion.div
                key={`${selectedTab}-row-${rowIndex}`}
                className="justified-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: rowIndex * 0.1 }}
                style={{
                  marginBottom: '16px',
                  display: 'flex',
                  gap: '16px',
                  height: `${row.height}px`
                }}
              >
                {row.items.map((item, itemIndex) => {
                  const width = row.height * item.aspectRatio;
                  return (
                    <motion.div
                      key={`${selectedTab}-${item.id}`}
                      className="justified-item"
                      whileHover={{ y: -8, boxShadow: '0 12px 35px rgba(0, 0, 0, 0.2)' }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedMedia(item)}
                      style={{
                        width: `${width}px`,
                        height: `${row.height}px`,
                        flexShrink: 0,
                        cursor: 'pointer',
                        position: 'relative',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: '#ffffff',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                      }}
                    >
                      <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%'
                      }}>
                        <img
                          src={selectedTab === 'photos' ? item.image : item.thumbnail}
                          alt={item.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                        {selectedTab === 'videos' && (
                          <div className="video-overlay">
                            <Play size={48} color="white" />
                            <span className="video-duration">{item.duration}</span>
                          </div>
                        )}

                        {/* 悬浮信息层 */}
                        <div className="justified-item-overlay">
                          <div className="justified-item-info">
                            <h3>{item.title}</h3>
                            <p className="location-text">{item.location}</p>
                            <div className="stats-row">
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
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

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
      </div>
    </section>
  );
};

export default Gallery;
