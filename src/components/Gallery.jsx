import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhotoAlbum from 'react-photo-album';
import 'react-photo-album/rows.css';
import { Heart, Download, Eye, X } from 'lucide-react';

// 照片卡片组件 - 支持悬浮效果和点击放大
const PhotoCard = ({ photo, imageProps, wrapperStyle, likes, onLike, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLiked = likes[photo.id];
  const { style, ...restImageProps } = imageProps;

  return (
    <div
      style={{
        ...wrapperStyle,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '12px',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(photo)}
    >
      {/* 图片 */}
      <motion.img
        {...restImageProps}
        animate={{
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          ...style,
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        alt={photo.title}
      />

      {/* 悬浮遮罩层 */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
          pointerEvents: isHovered ? 'auto' : 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.5rem',
        }}
      >
        {/* 顶部：点击提示 */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{
            y: isHovered ? 0 : -10,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: '0.9rem',
            fontWeight: '500',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          🔍 点击查看大图
        </motion.div>

        {/* 底部：标题和操作按钮 */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{
            y: isHovered ? 0 : 10,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* 标题 */}
          <h3 style={{
            margin: '0 0 1rem 0',
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'white',
            textTransform: 'capitalize',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          }}>
            {photo.title}
          </h3>

          {/* 操作按钮 */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'center',
          }}>
            {/* 点赞按钮 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike(photo.id);
              }}
              style={{
                background: isLiked ? 'rgba(255, 107, 53, 0.9)' : 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                border: isLiked ? '2px solid #ff6b35' : '2px solid rgba(255,255,255,0.3)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.9rem',
                borderRadius: '8px',
                transition: 'all 0.2s',
                fontSize: '0.9rem',
                fontWeight: '600',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = isLiked ? '#ff6b35' : 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = isLiked ? 'rgba(255, 107, 53, 0.9)' : 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <Heart
                size={18}
                fill={isLiked ? 'white' : 'none'}
                strokeWidth={2}
              />
              <span>{photo.likes + (isLiked ? 1 : 0)}</span>
            </button>

            {/* 下载按钮 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const link = document.createElement('a');
                link.href = photo.src;
                link.download = `${photo.title}.${photo.format}`;
                link.click();
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem 0.9rem',
                borderRadius: '8px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              title="下载图片"
            >
              <Download size={18} strokeWidth={2} />
            </button>

            {/* 浏览数 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255,255,255,0.3)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 0.9rem',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
            }}>
              <Eye size={18} strokeWidth={2} />
              <span>{photo.views}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

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
        const formattedPhotos = data.resources.map((item) => ({
          // react-photo-album 需要的字段
          src: `https://res.cloudinary.com/dbpu6htkt/image/upload/v${item.version}/${item.public_id}.${item.format}`,
          width: item.width,
          height: item.height,

          // 额外的元数据
          id: item.public_id,
          publicId: item.public_id,
          format: item.format,
          createdAt: item.created_at,
          likes: Math.floor(Math.random() * 2000) + 100,
          views: Math.floor(Math.random() * 5000) + 500,
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

  // 渲染函数
  const renderPhoto = (props) => (
    <PhotoCard
      {...props}
      likes={likes}
      onLike={handleLike}
      onSelect={setSelectedPhoto}
    />
  );

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

        {/* 照片墙 */}
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
            <PhotoAlbum
              layout="rows"
              photos={photos}
              renderPhoto={renderPhoto}
              spacing={12}
              targetRowHeight={280}
              rowConstraints={{
                minPhotos: 1,
                maxPhotos: 5
              }}
            />
          </motion.div>
        )}

        {/* Lightbox 放大视图 */}
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
              {/* 关闭按钮 */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: 'fixed',
                  top: '2rem',
                  right: '2rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'all 0.3s',
                  zIndex: 10000,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                <X size={28} strokeWidth={2.5} />
              </motion.button>

              {/* 图片容器 */}
              <motion.div
                className="lightbox-content"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'relative',
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  cursor: 'default'
                }}
              >
                {/* 大图 */}
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '75vh',
                    objectFit: 'contain',
                    borderRadius: '12px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  }}
                />

                {/* 图片信息卡片 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    marginTop: '2rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  {/* 标题 */}
                  <h3 style={{
                    margin: '0 0 1.5rem 0',
                    fontSize: '1.75rem',
                    color: 'white',
                    textTransform: 'capitalize',
                    fontWeight: '600',
                  }}>
                    {selectedPhoto.title}
                  </h3>

                  {/* 操作按钮和信息 */}
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                  }}>
                    {/* 点赞按钮 */}
                    <button
                      onClick={() => handleLike(selectedPhoto.id)}
                      style={{
                        background: likes[selectedPhoto.id] ? '#ff6b35' : 'rgba(255, 255, 255, 0.15)',
                        border: '2px solid ' + (likes[selectedPhoto.id] ? '#ff6b35' : 'rgba(255,255,255,0.3)'),
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        transition: 'all 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,107,53,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <Heart
                        size={20}
                        fill={likes[selectedPhoto.id] ? 'white' : 'none'}
                        strokeWidth={2}
                      />
                      <span>{selectedPhoto.likes + (likes[selectedPhoto.id] ? 1 : 0)} Likes</span>
                    </button>

                    {/* 浏览数 */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '2px solid rgba(255,255,255,0.3)',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                    }}>
                      <Eye size={20} strokeWidth={2} />
                      <span>{selectedPhoto.views} Views</span>
                    </div>

                    {/* 下载按钮 */}
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = selectedPhoto.src;
                        link.download = `${selectedPhoto.title}.${selectedPhoto.format}`;
                        link.click();
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        border: '2px solid rgba(255,255,255,0.3)',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        transition: 'all 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                      }}
                    >
                      <Download size={20} strokeWidth={2} />
                      <span>Download</span>
                    </button>

                    {/* 图片规格 */}
                    <div style={{
                      marginLeft: 'auto',
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.7)',
                      fontWeight: '500',
                    }}>
                      {selectedPhoto.width} × {selectedPhoto.height} · {selectedPhoto.format.toUpperCase()}
                    </div>
                  </div>
                </motion.div>
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
