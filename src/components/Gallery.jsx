import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, X, MapPin, Calendar } from 'lucide-react';

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [justifiedRows, setJustifiedRows] = useState([]);
  const [likes, setLikes] = useState({});
  const containerRef = useRef(null);

  // 示例图片数据
  const photos = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=1067',
      width: 1600,
      height: 1067,
      title: 'Mountain Sunrise',
      location: 'Swiss Alps',
      date: '2024-03-15',
      likes: 1247,
      views: 3542
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&h=900',
      width: 1600,
      height: 900,
      title: 'Forest Path',
      location: 'Pacific Northwest',
      date: '2024-03-10',
      likes: 892,
      views: 2341
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=1800',
      width: 1200,
      height: 1800,
      title: 'Ocean Waves',
      location: 'Big Sur, California',
      date: '2024-03-05',
      likes: 1563,
      views: 4123
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1600&h=1200',
      width: 1600,
      height: 1200,
      title: 'City Lights',
      location: 'New York, USA',
      date: '2024-02-28',
      likes: 2103,
      views: 5234
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1400&h=933',
      width: 1400,
      height: 933,
      title: 'Desert Dunes',
      location: 'Sahara Desert',
      date: '2024-02-20',
      likes: 1876,
      views: 4567
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=1067',
      width: 1600,
      height: 1067,
      title: 'Mountain Peak',
      location: 'Rocky Mountains',
      date: '2024-02-15',
      likes: 2345,
      views: 6789
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800',
      width: 1200,
      height: 800,
      title: 'Northern Lights',
      location: 'Iceland',
      date: '2024-02-10',
      likes: 3456,
      views: 8901
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&h=1200',
      width: 1600,
      height: 1200,
      title: 'Autumn Forest',
      location: 'Vermont, USA',
      date: '2024-02-05',
      likes: 1234,
      views: 3456
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&h=900',
      width: 1600,
      height: 900,
      title: 'Lake Reflection',
      location: 'Canadian Rockies',
      date: '2024-01-30',
      likes: 2567,
      views: 5678
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1400&h=1050',
      width: 1400,
      height: 1050,
      title: 'Tropical Beach',
      location: 'Maldives',
      date: '2024-01-25',
      likes: 3890,
      views: 7890
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1600&h=1067',
      width: 1600,
      height: 1067,
      title: 'Sunset Silhouette',
      location: 'California Coast',
      date: '2024-01-20',
      likes: 2123,
      views: 4567
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=1600',
      width: 1200,
      height: 1600,
      title: 'Modern Architecture',
      location: 'Dubai, UAE',
      date: '2024-01-15',
      likes: 1678,
      views: 3890
    }
  ];

  // ===== Justified Gallery 布局算法 =====
  const calculateJustifiedLayout = (photos, containerWidth, targetRowHeight = 250, spacing = 8) => {
    if (!containerWidth || containerWidth <= 0) return [];

    const rows = [];
    let i = 0;
    const isMobile = containerWidth < 768;
    const adjustedTargetHeight = isMobile ? 200 : targetRowHeight;

    while (i < photos.length) {
      let currentRow = [];
      let aspectRatioSum = 0;

      // 至少放一张
      currentRow.push(photos[i]);
      aspectRatioSum += photos[i].width / photos[i].height;
      i++;

      // 添加图片直到宽度填满
      while (i < photos.length) {
        const nextAspect = photos[i].width / photos[i].height;
        const tempSum = aspectRatioSum + nextAspect;
        const totalSpacing = currentRow.length * spacing;
        const estimatedHeight = (containerWidth - totalSpacing) / tempSum;

        if (estimatedHeight < adjustedTargetHeight * 0.8 || (isMobile && currentRow.length >= 2)) break;

        currentRow.push(photos[i]);
        aspectRatioSum = tempSum;
        i++;
      }

      const totalSpacing = (currentRow.length - 1) * spacing;
      const availableWidth = containerWidth - totalSpacing;
      const rowHeight = availableWidth / aspectRatioSum;

      const photosWithSizes = currentRow.map(p => {
        const ratio = p.width / p.height;
        return {
          ...p,
          displayWidth: ratio * rowHeight,
          displayHeight: rowHeight
        };
      });

      rows.push({ photos: photosWithSizes });
    }

    return rows;
  };

  // ===== 响应式布局更新 =====
  useEffect(() => {
    const updateLayout = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width > 0) {
          const rows = calculateJustifiedLayout(photos, width);
          setJustifiedRows(rows);
        }
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // ===== 页面渲染 =====
  return (
    <section className="w-full min-h-screen bg-[#f8f8f8] overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Photography Gallery
          </h1>
          <p className="text-xl text-gray-600">
            用镜头捕捉世界的美好瞬间 · Capturing moments that matter
          </p>
        </motion.div>

        {/* Justified Gallery */}
        <div ref={containerRef} className="w-full">
          {justifiedRows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: rowIndex * 0.1 }}
              className="flex gap-2 mb-2 flex-wrap"
            >
              {row.photos.map(photo => (
                <motion.div
                  key={photo.id}
                  whileHover={{ scale: 1.02, zIndex: 10 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedPhoto(photo)}
                  className="relative cursor-pointer overflow-hidden rounded-xl shadow-md group flex-shrink-0"
                  style={{
                    width: `${photo.displayWidth}px`,
                    height: `${photo.displayHeight}px`
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4"
                  >
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {photo.title}
                    </h3>
                    <div className="flex items-center justify-between text-white/90 text-sm">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => handleLike(photo.id, e)}
                          className="flex items-center gap-1 hover:text-red-400 transition-colors"
                        >
                          <Heart
                            size={16}
                            fill={likes[photo.id] ? '#ff6b6b' : 'none'}
                            className={likes[photo.id] ? 'text-red-400' : ''}
                          />
                          <span>{photo.likes + (likes[photo.id] ? 1 : 0)}</span>
                        </button>
                        <div className="flex items-center gap-1">
                          <Eye size={16} />
                          <span>{photo.views}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span className="text-xs">{photo.location}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-6xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              >
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/3 bg-gray-900 flex items-center justify-center p-8">
                    <img
                      src={selectedPhoto.src}
                      alt={selectedPhoto.title}
                      className="max-w-full max-h-[70vh] object-contain rounded-lg"
                    />
                  </div>

                  <div className="md:w-1/3 p-8 flex flex-col">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {selectedPhoto.title}
                    </h2>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={18} />
                        <span>{selectedPhoto.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={18} />
                        <span>{selectedPhoto.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                      <button
                        onClick={(e) => handleLike(selectedPhoto.id, e)}
                        className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors"
                      >
                        <Heart
                          size={24}
                          fill={likes[selectedPhoto.id] ? '#ef4444' : 'none'}
                          className={likes[selectedPhoto.id] ? 'text-red-500' : ''}
                        />
                        <span className="font-semibold">
                          {selectedPhoto.likes + (likes[selectedPhoto.id] ? 1 : 0)}
                        </span>
                      </button>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Eye size={24} />
                        <span className="font-semibold">{selectedPhoto.views}</span>
                      </div>
                    </div>

                    <div className="text-gray-600 leading-relaxed">
                      <p>
                        This stunning photograph captures the essence of{' '}
                        {selectedPhoto.location}. The composition and lighting
                        create a mesmerizing visual experience that tells a
                        unique story.
                      </p>
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
