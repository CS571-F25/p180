import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, Download, Share2, Play, X } from 'lucide-react';
import PhotoAlbum from 'react-photo-album';
import { galleryMetadata, videoMetadata, mergeCloudinaryData } from '../gallery-metadata';

const Gallery = () => {
  const [selectedTab, setSelectedTab] = useState('photos'); // 'photos' or 'videos'
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [likes, setLikes] = useState({});
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch photos from Cloudinary
  useEffect(() => {
    const fetchCloudinaryData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://res.cloudinary.com/dbpu6htkt/image/list/1.json');

        if (!response.ok) {
          throw new Error('Failed to fetch images from Cloudinary');
        }

        const data = await response.json();

        // Merge Cloudinary data with local metadata
        const mergedPhotos = mergeCloudinaryData(data.resources || [], galleryMetadata);

        setPhotos(mergedPhotos);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Cloudinary data:', err);
        setError(err.message);

        // Fallback to mock data for development
        const mockPhotos = [
          {
            src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
            width: 1200,
            height: 800,
            thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
            title: 'Mountain Sunrise',
            description: 'Captured during a hiking trip in the Swiss Alps.',
            location: 'Swiss Alps',
            date: '2024-03-15',
            likes: 1247,
            views: 3542
          },
          {
            src: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=1200',
            width: 800,
            height: 1000,
            thumbnail: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=600&fit=crop',
            title: 'Urban Portrait',
            description: 'Street photography session in downtown Chicago.',
            location: 'Chicago, USA',
            date: '2024-02-20',
            likes: 892,
            views: 2341
          },
          {
            src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200',
            width: 1200,
            height: 800,
            thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
            title: 'Ocean Waves',
            description: 'Long exposure of waves crashing against the rocky shore.',
            location: 'Big Sur, California',
            date: '2024-01-10',
            likes: 1563,
            views: 4123
          },
          {
            src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200',
            width: 1200,
            height: 800,
            thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop',
            title: 'City Lights',
            description: 'Night photography from rooftop in Manhattan.',
            location: 'New York, USA',
            date: '2023-12-05',
            likes: 2103,
            views: 5234
          },
          {
            src: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1200',
            width: 1000,
            height: 1200,
            thumbnail: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop',
            title: 'Wildlife Close-up',
            description: 'Macro photography of a butterfly in botanical garden.',
            location: 'Local Botanical Garden',
            date: '2023-11-18',
            likes: 743,
            views: 1876
          },
          {
            src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
            width: 800,
            height: 1200,
            thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
            title: 'Architectural Detail',
            description: 'Modern architecture photography focusing on patterns.',
            location: 'Dubai, UAE',
            date: '2023-10-22',
            likes: 945,
            views: 2654
          }
        ];

        setPhotos(mockPhotos);
        setLoading(false);
      }
    };

    fetchCloudinaryData();
  }, []);

  // Mock video data (keeping original structure since videos aren't from Cloudinary)
  useEffect(() => {
    const mockVideos = [
      {
        id: 1,
        thumbnail: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&h=600&fit=crop',
        src: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1200',
        width: 1200,
        height: 800,
        title: 'Travel Vlog: Japan 2024',
        duration: '15:32',
        description: '探索日本的美食和文化，从东京到京都的旅程记录。',
        location: 'Japan',
        date: '2024-04-10',
        likes: 3456,
        views: 12543
      },
      {
        id: 2,
        thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
        src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200',
        width: 1200,
        height: 675,
        title: 'Gaming Highlights: Epic Moments',
        duration: '8:45',
        description: '本月最精彩的游戏时刻合集，包括多个惊险击杀。',
        location: 'Online',
        date: '2024-03-28',
        likes: 2134,
        views: 8765
      },
      {
        id: 3,
        thumbnail: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop',
        src: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200',
        width: 1200,
        height: 800,
        title: 'Photography Tutorial: Golden Hour',
        duration: '12:18',
        description: '如何在黄金时段拍摄出令人惊艳的照片。',
        location: 'Various',
        date: '2024-03-15',
        likes: 1876,
        views: 6543
      },
      {
        id: 4,
        thumbnail: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
        src: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200',
        width: 1200,
        height: 800,
        title: 'City Life: New York Timelapse',
        duration: '3:24',
        description: '纽约城市生活的延时摄影，展现都市的活力。',
        location: 'New York, USA',
        date: '2024-02-20',
        likes: 4321,
        views: 15234
      },
      {
        id: 5,
        thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop',
        src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
        width: 1200,
        height: 800,
        title: 'Drone Footage: Mountain Adventure',
        duration: '6:55',
        description: '航拍视角下的山间探险，壮丽的自然风光。',
        location: 'Rocky Mountains',
        date: '2024-01-30',
        likes: 2987,
        views: 9876
      },
      {
        id: 6,
        thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop',
        src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200',
        width: 1200,
        height: 800,
        title: 'Behind the Scenes: Photo Shoot',
        duration: '10:12',
        description: '专业摄影拍摄的幕后花絮，分享拍摄技巧。',
        location: 'Studio',
        date: '2024-01-15',
        likes: 1654,
        views: 5432
      }
    ];
    setVideos(mockVideos);
  }, []);

  const handleLike = (item) => {
    const itemId = item.public_id || item.id || item.src;
    setLikes(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const isLiked = (item) => {
    const itemId = item.public_id || item.id || item.src;
    return likes[itemId] || false;
  };

  const getLikesCount = (item) => {
    const itemId = item.public_id || item.id || item.src;
    return (item.likes || 0) + (likes[itemId] ? 1 : 0);
  };

  // Custom photo render with overlay
  const renderPhoto = ({ photo, wrapperStyle, renderDefaultPhoto }) => {
    const itemId = photo.public_id || photo.id || photo.src;
    // Find the original photo object with full-size src
    const originalPhoto = photos.find(p =>
      (p.public_id && p.public_id === photo.public_id) ||
      (p.id && p.id === photo.id) ||
      p.src === photo.src ||
      p.thumbnail === photo.src
    ) || photo;

    return (
      <div style={wrapperStyle} className="photo-album-item">
        <div
          className="photo-album-wrapper"
          onClick={() => setSelectedMedia(originalPhoto)}
        >
          {renderDefaultPhoto({ wrapped: false })}

          {/* Hover Overlay */}
          <div className="gallery-item-overlay">
            <div className="overlay-content">
              <h3>{photo.title || 'Untitled'}</h3>
              <div className="overlay-stats">
                <span className="overlay-stat">
                  <Heart size={16} fill={isLiked(photo) ? '#ff6b35' : 'none'} />
                  {getLikesCount(photo)}
                </span>
                <span className="overlay-stat">
                  <Eye size={16} />
                  {photo.views || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Custom video render with overlay
  const renderVideo = (video, index) => {
    return (
      <motion.div
        key={`video-${video.id || index}`}
        className="video-grid-item"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        onClick={() => setSelectedMedia(video)}
      >
        <div className="video-thumbnail-wrapper">
          <img src={video.thumbnail} alt={video.title} />
          <div className="video-overlay">
            <Play size={48} color="white" />
            <span className="video-duration">{video.duration}</span>
          </div>

          {/* Hover Overlay */}
          <div className="gallery-item-overlay">
            <div className="overlay-content">
              <h3>{video.title}</h3>
              <div className="overlay-stats">
                <span className="overlay-stat">
                  <Heart size={16} fill={isLiked(video) ? '#ff6b35' : 'none'} />
                  {getLikesCount(video)}
                </span>
                <span className="overlay-stat">
                  <Eye size={16} />
                  {video.views || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const currentData = selectedTab === 'photos' ? photos : videos;

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

        {/* Tab Switcher */}
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

        {/* Loading State */}
        {loading && selectedTab === 'photos' && (
          <div className="gallery-loading">
            <p>Loading gallery...</p>
          </div>
        )}

        {/* Error State */}
        {error && selectedTab === 'photos' && (
          <div className="gallery-error">
            <p>Using fallback images (Cloudinary connection issue)</p>
          </div>
        )}

        {/* Gallery Content */}
        <motion.div
          className="gallery-content"
          layout
        >
          <AnimatePresence mode="wait">
            {selectedTab === 'photos' ? (
              <motion.div
                key="photos-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {photos.length > 0 && (
                  <PhotoAlbum
                    layout="rows"
                    photos={photos.map(photo => ({
                      ...photo,
                      src: photo.thumbnail || photo.src
                    }))}
                    renderPhoto={renderPhoto}
                    targetRowHeight={280}
                    spacing={8}
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="videos-grid"
                className="videos-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {videos.map((video, index) => renderVideo(video, index))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Modal (Lightbox) - Split Layout */}
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
                className="modal-content-split"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button className="modal-close" onClick={() => setSelectedMedia(null)}>
                  <X size={24} />
                </button>

                {/* Left Side: Media */}
                <div className="modal-media">
                  <img
                    src={selectedMedia.src || selectedMedia.thumbnail}
                    alt={selectedMedia.title}
                  />
                  {selectedMedia.duration && (
                    <div className="video-play-overlay">
                      <Play size={64} color="white" />
                    </div>
                  )}
                </div>

                {/* Right Side: Info */}
                <div className="modal-info">
                  <div className="modal-info-content">
                    <h2>{selectedMedia.title || 'Untitled'}</h2>

                    <div className="modal-meta">
                      <span>{selectedMedia.location}</span>
                      <span>{selectedMedia.date}</span>
                      {selectedMedia.duration && <span>{selectedMedia.duration}</span>}
                    </div>

                    <p className="modal-description">{selectedMedia.description}</p>

                    {/* Stats */}
                    <div className="modal-stats">
                      <div className="stat-item">
                        <Heart size={18} />
                        <span>{getLikesCount(selectedMedia)} likes</span>
                      </div>
                      <div className="stat-item">
                        <Eye size={18} />
                        <span>{selectedMedia.views || 0} views</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="modal-actions">
                      <button
                        className={`action-btn ${isLiked(selectedMedia) ? 'liked' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(selectedMedia);
                        }}
                      >
                        <Heart size={20} fill={isLiked(selectedMedia) ? '#ff6b35' : 'none'} />
                        <span>Like</span>
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
