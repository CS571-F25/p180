import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhotoAlbum from 'react-photo-album';
import 'react-photo-album/rows.css';
import { Heart, Eye, Share2, X, MapPin } from 'lucide-react';
import { metadata } from './gallery-metadata';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [likes, setLikes] = useState({});

  // Fetch photos from Cloudinary
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://res.cloudinary.com/dbpu6htkt/image/list/1.json');

        if (!response.ok) {
          throw new Error('Failed to fetch photos from Cloudinary');
        }

        const data = await response.json();

        // Transform data for react-photo-album and merge with local metadata
        const formattedPhotos = data.resources.map((item) => {
          const meta = metadata[item.public_id] || {};

          return {
            // Fields required by react-photo-album
            src: `https://res.cloudinary.com/dbpu6htkt/image/upload/v${item.version}/${item.public_id}.${item.format}`,
            width: item.width,
            height: item.height,

            // Additional metadata
            id: item.public_id,
            publicId: item.public_id,
            format: item.format,
            createdAt: item.created_at,

            // Merge with local metadata or use defaults/fallbacks
            title: meta.title || item.public_id.split('/').pop().replace(/_/g, ' '),
            description: meta.description || '',
            location: meta.location || 'Unknown Location',
            likes: meta.likes || Math.floor(Math.random() * 200) + 50,
            views: meta.views || Math.floor(Math.random() * 1000) + 100,
          };
        });

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

  // Custom photo renderer for hover effects
  const renderPhoto = ({ photo, wrapperStyle, imageProps }) => {
    return (
      <div
        style={{ ...wrapperStyle, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
        className="group rounded-lg pointer-events-auto z-10"
        onClick={() => setSelectedPhoto(photo)}
      >
        <img {...imageProps} className="transition-transform duration-500 group-hover:scale-110" />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 pointer-events-none">
          {/* Top Info Bar: Title */}
          <div className="transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-bold text-lg truncate">{photo.title}</h3>
          </div>

          {/* Bottom Info Bar: Likes & Location */}
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex justify-between items-center text-white/90 text-sm font-medium">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{photo.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={14} fill={likes[photo.id] ? "#ff6b35" : "none"} color={likes[photo.id] ? "#ff6b35" : "white"} />
              <span>{photo.likes + (likes[photo.id] ? 1 : 0)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="gallery" className="section gallery-section min-h-screen bg-gray-50 py-20" >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Gallery</h2>
          <p className="text-xl text-gray-600">Capturing moments, one frame at a time.</p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-orange-200 border-t-[#ff6b35] rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Loading photos...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-10 text-red-500 bg-red-50 rounded-lg">
            <p>Error loading photos: {error}</p>
          </div>
        )}

        {/* Photo Album */}
        {!loading && !error && photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <PhotoAlbum
              layout="rows"
              photos={photos}
              targetRowHeight={300}
              renderPhoto={renderPhoto}
              spacing={12}
              componentsProps={{ imageProps: { style: { width: '100%', height: '100%', objectFit: 'cover' } } }}
            />
          </motion.div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 md:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <div
                className="relative max-w-7xl w-full max-h-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2"
                >
                  <X size={32} />
                </button>

                {/* Image */}
                <motion.img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />

                {/* Info & Actions */}
                <div className="mt-6 text-white text-center w-full max-w-2xl">
                  <h3 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h3>
                  <p className="text-white/60 mb-6">{selectedPhoto.description}</p>

                  <div className="flex items-center justify-center gap-8">
                    <button
                      onClick={() => handleLike(selectedPhoto.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${likes[selectedPhoto.id] ? 'bg-white/20 text-[#ff6b35]' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                    >
                      <Heart size={20} fill={likes[selectedPhoto.id] ? "#ff6b35" : "none"} />
                      <span>{selectedPhoto.likes + (likes[selectedPhoto.id] ? 1 : 0)}</span>
                    </button>

                    <div className="flex items-center gap-2 text-white/80">
                      <Eye size={20} />
                      <span>{selectedPhoto.views}</span>
                    </div>

                    <div className="flex items-center gap-2 text-white/80">
                      <MapPin size={20} />
                      <span>{selectedPhoto.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section >
  );
};

export default Gallery;
