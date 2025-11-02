import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Eye, Download, Share2 } from 'lucide-react';

const PhotographyPortfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});

  const portfolioData = [
    {
      id: 1,
      title: 'Mountain Sunrise',
      category: 'landscape',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      description: 'Captured during a hiking trip in the Swiss Alps. The golden hour light created this magical atmosphere.',
      technique: 'Long exposure with ND filter',
      equipment: 'Canon EOS R5, 24-70mm f/2.8',
      likes: 1247,
      comments: 89
    },
    {
      id: 2,
      title: 'Urban Portrait',
      category: 'portrait',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=600&fit=crop',
      description: 'Street photography session in downtown Chicago. Natural lighting and candid moment.',
      technique: 'Natural light, shallow depth of field',
      equipment: 'Sony A7III, 85mm f/1.4',
      likes: 892,
      comments: 45
    },
    {
      id: 3,
      title: 'Ocean Waves',
      category: 'nature',
      image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
      description: 'Long exposure of waves crashing against the rocky shore in Big Sur.',
      technique: '30-second exposure, tripod mounted',
      equipment: 'Nikon D850, 14-24mm f/2.8',
      likes: 1563,
      comments: 112
    },
    {
      id: 4,
      title: 'City Lights',
      category: 'urban',
      image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop',
      description: 'Night photography from rooftop in Manhattan. Long exposure to capture light trails.',
      technique: 'Long exposure, multiple shots blended',
      equipment: 'Canon EOS R5, 16-35mm f/2.8',
      likes: 2103,
      comments: 156
    },
    {
      id: 5,
      title: 'Wildlife Close-up',
      category: 'wildlife',
      image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop',
      description: 'Macro photography of a butterfly in a local botanical garden.',
      technique: 'Macro lens, natural lighting',
      equipment: 'Sony A7RIV, 90mm f/2.8 Macro',
      likes: 743,
      comments: 67
    },
    {
      id: 6,
      title: 'Architectural Detail',
      category: 'architecture',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      description: 'Modern architecture photography focusing on geometric patterns and light play.',
      technique: 'Wide angle, careful composition',
      equipment: 'Canon EOS R5, 11-24mm f/4',
      likes: 945,
      comments: 78
    }
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'landscape', label: 'Landscape' },
    { id: 'portrait', label: 'Portrait' },
    { id: 'nature', label: 'Nature' },
    { id: 'urban', label: 'Urban' },
    { id: 'wildlife', label: 'Wildlife' },
    { id: 'architecture', label: 'Architecture' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === selectedCategory);

  const handleLike = (imageId) => {
    setLikes(prev => ({
      ...prev,
      [imageId]: (prev[imageId] || 0) + 1
    }));
  };

  const handleComment = (imageId, comment) => {
    if (comment.trim()) {
      setComments(prev => ({
        ...prev,
        [imageId]: [...(prev[imageId] || []), {
          id: Date.now(),
          text: comment,
          author: 'Anonymous',
          timestamp: new Date().toLocaleDateString()
        }]
      }));
    }
  };

  return (
    <section id="portfolio" className="section portfolio-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Photography & Video Portfolio
        </motion.h2>

        <motion.div
          className="portfolio-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="portfolio-grid"
          layout
        >
          <AnimatePresence>
            {filteredImages.map((item, index) => (
              <motion.div
                key={item.id}
                className="portfolio-item"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setSelectedImage(item)}
              >
                <div className="portfolio-image">
                  <img src={item.image} alt={item.title} />
                  <div className="portfolio-overlay">
                    <Eye size={24} />
                    <span>View Details</span>
                  </div>
                </div>
                <div className="portfolio-info">
                  <h3>{item.title}</h3>
                  <div className="portfolio-stats">
                    <button 
                      className="stat-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(item.id);
                      }}
                    >
                      <Heart size={16} />
                      <span>{item.likes + (likes[item.id] || 0)}</span>
                    </button>
                    <button className="stat-btn">
                      <MessageCircle size={16} />
                      <span>{item.comments + (comments[item.id]?.length || 0)}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="image-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
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
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
              
              <div className="modal-image">
                <img src={selectedImage.image} alt={selectedImage.title} />
              </div>
              
              <div className="modal-info">
                <h2>{selectedImage.title}</h2>
                <p>{selectedImage.description}</p>
                
                <div className="modal-details">
                  <div className="detail-item">
                    <strong>Technique:</strong> {selectedImage.technique}
                  </div>
                  <div className="detail-item">
                    <strong>Equipment:</strong> {selectedImage.equipment}
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="action-btn"
                    onClick={() => handleLike(selectedImage.id)}
                  >
                    <Heart size={20} />
                    <span>{selectedImage.likes + (likes[selectedImage.id] || 0)}</span>
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
                
                <div className="comments-section">
                  <h3>Comments</h3>
                  <div className="comments-list">
                    {(comments[selectedImage.id] || []).map(comment => (
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
                      placeholder="Add a comment..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleComment(selectedImage.id, e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
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

export default PhotographyPortfolio;
