import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gallery as GridGallery } from 'react-grid-gallery';
import { Heart, Eye, Download, Share2, X } from 'lucide-react';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [likes, setLikes] = useState({});

  // 从 Cloudinary 获取照片数据
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://res.cloudinary.com/dbpu6htkt/image/list/1.json');

        if (!response.ok) {
          throw new Error('Failed to fetch photos from Cloudinary');
        }

        const data = await response.json();

        // 转换数据为 react-photo-album 所需格式
        const formattedPhotos = data.resources.map((item, index) => ({
          // react-photo-album 需要的字段
          src: `https://res.cloudinary.com/dbpu6htkt/image/upload/v${item.version}/${item.public_id}.${item.format}`,
          width: item.width,
          height: item.height,

          // 额外的元数据
          id: item.public_id,
          publicId: item.public_id,
          format: item.format,
          createdAt: item.created_at,
          likes: Math.floor(Math.random() * 2000) + 100, // 模拟点赞数
          views: Math.floor(Math.random() * 5000) + 500, // 模拟浏览数
          title: item.public_id.split('/').pop().replace(/_/g, ' '),
        }));

        setPhotos(formattedPhotos);
        setError(null);
      } catch (err) {
        console.error('Error fetching photos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const handleLike = (photoId) => {
    setLikes(prev => ({
      ...prev,
      [photoId]: !prev[photoId]
    }));
  };

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

        {/* 加载状态 */}
        {loading && (
          <motion.div
            className="gallery-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '4rem 0',
              fontSize: '1.125rem',
              color: 'var(--text-secondary)'
            }}
          >
            <div className="loading-spinner" style={{
              width: '40px',
              height: '40px',
              border: '4px solid rgba(255, 107, 53, 0.2)',
              borderTop: '4px solid #ff6b35',
              borderRadius: '50%',
              margin: '0 auto 1rem',
              animation: 'spin 1s linear infinite'
            }}></div>
            正在加载照片...
          </motion.div>
        )}

        {/* 错误状态 */}
        {error && (
          <motion.div
            className="gallery-error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'rgba(255, 107, 53, 0.1)',
              borderRadius: '8px',
              color: '#ff6b35'
            }}
          >
            <p>加载照片时出错: {error}</p>
          </motion.div>
        )}

        {/* 照片墙 - 使用 react-grid-gallery */}
        {!loading && !error && photos.length > 0 && (
          <motion.div
            className="gallery-album"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              width: '100%'
            }}
          >
            <GridGallery
              images={photos}
              enableImageSelection={false}
              rowHeight={220}
              margin={4}
              onClick={(index) => setSelectedPhoto(photos[index])}
            />
          </motion.div>
        )}

        {/* Lightbox 模态弹窗 */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              className="gallery-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.95)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                cursor: 'zoom-out'
              }}
            >
              <motion.div
                className="lightbox-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'relative',
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  cursor: 'default'
                }}
              >
                {/* 关闭按钮 */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  style={{
                    position: 'absolute',
                    top: '-3rem',
                    right: 0,
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.target.style.background = 'none'}
                >
                  <X size={32} />
                </button>

                {/* 图片 */}
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                    borderRadius: '8px',
                  }}
                />

                {/* 图片信息 */}
                <div style={{
                  marginTop: '1.5rem',
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    margin: '0 0 1rem 0',
                    fontSize: '1.5rem',
                    textTransform: 'capitalize'
                  }}>
                    {selectedPhoto.title}
                  </h3>

                  <div style={{
                    display: 'flex',
                    gap: '2rem',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <button
                      className={`lightbox-action-btn ${likes[selectedPhoto.id] ? 'liked' : ''}`}
                      onClick={() => handleLike(selectedPhoto.id)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '1rem',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                      onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                    >
                      <Heart
                        size={20}
                        fill={likes[selectedPhoto.id] ? '#ff6b35' : 'none'}
                        color={likes[selectedPhoto.id] ? '#ff6b35' : 'white'}
                      />
                      <span>
                        {selectedPhoto.likes + (likes[selectedPhoto.id] ? 1 : 0)} Likes
                      </span>
                    </button>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '1rem'
                    }}>
                      <Eye size={20} />
                      <span>{selectedPhoto.views} Views</span>
                    </div>

                    <button
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '1rem',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                      onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                    >
                      <Share2 size={20} />
                      <span>Share</span>
                    </button>
                  </div>

                  <div style={{
                    marginTop: '1rem',
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.6)'
                  }}>
                    {selectedPhoto.width} × {selectedPhoto.height} · {selectedPhoto.format.toUpperCase()}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
