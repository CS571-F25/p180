import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, X, MapPin, Calendar } from 'lucide-react';

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [likes, setLikes] = useState({});
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const photos = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
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
      src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
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
      src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
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
      src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800',
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
      src: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800',
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
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
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
      src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
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
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
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
      src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800',
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
      src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
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
      src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800',
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
      src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      width: 1200,
      height: 1600,
      title: 'Modern Architecture',
      location: 'Dubai, UAE',
      date: '2024-01-15',
      likes: 1678,
      views: 3890
    }
  ];


  // 简化的Justified Gallery布局算法
  const buildJustifiedLayout = (photos, containerWidth) => {
    const targetHeight = containerWidth < 768 ? 200 : 250;
    const spacing = 8;
    const rows = [];

    let index = 0;
    while (index < photos.length) {
      const row = [];
      let rowAspectRatio = 0;


      // 至少添加一张照片
      row.push(photos[index]);
      rowAspectRatio += photos[index].width / photos[index].height;
      index++;

      // 尝试添加更多照片
      while (index < photos.length && row.length < 5) {
        const nextAspectRatio = photos[index].width / photos[index].height;
        const newRowAspectRatio = rowAspectRatio + nextAspectRatio;

        // 计算添加这张照片后的行高
        const newHeight = (containerWidth - (row.length) * spacing) / newRowAspectRatio;

        // 如果新高度太小，停止添加
        if (newHeight < targetHeight * 0.75) {
          break;
        }

        // 移动端限制每行2张
        if (containerWidth < 768 && row.length >= 2) {
          break;
        }

        row.push(photos[index]);
        rowAspectRatio = newRowAspectRatio;
        index++;
      }

      // 计算这一行的实际高度
      const rowHeight = (containerWidth - (row.length - 1) * spacing) / rowAspectRatio;

      rows.push({
        photos: row.map(photo => ({
          ...photo,
          height: rowHeight,
          width: (photo.width / photo.height) * rowHeight
        })),
        height: rowHeight
      });
    }

    return rows;
  };


  const [rows, setRows] = useState([]);

  // 监听容器宽度变化
  useEffect(() => {
    const updateLayout = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;

        setContainerWidth(width);
        if (width > 0) {
          const newRows = buildJustifiedLayout(photos, width);
          setRows(newRows);
        }
      }
    };
    // 初始化布局
    const timer = setTimeout(updateLayout, 100);

    // 监听窗口大小变化
    window.addEventListener('resize', updateLayout);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateLayout);
    };
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
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}

              className="flex mb-2"
              style={{
                gap: '8px',
                height: `${row.height}px`
              }}
            >
              {row.photos.map(photo => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: rowIndex * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedPhoto(photo)}

                  className="relative cursor-pointer overflow-hidden rounded-xl shadow-md"
                  style={{
                    width: `${photo.width}px`,
                    height: `${photo.height}px`,
                    flexShrink: 0
                  }}
                >
                  {/* Image */}
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
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

                  </div>
                </motion.div>
              ))}
            </div>
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
