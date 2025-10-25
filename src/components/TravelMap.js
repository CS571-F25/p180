import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { 
  MapPin, 
  Heart, 
  MessageCircle, 
  Calendar, 
  Plane,
  Star,
  X
} from 'lucide-react';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const TravelMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [mapCenter, setMapCenter] = useState([39.9042, 116.4074]); // Beijing as default

  const travelData = [
    {
      id: 1,
      name: 'Beijing, China',
      coordinates: [39.9042, 116.4074],
      country: 'China',
      visitDate: '2023-08-15',
      duration: '2 weeks',
      description: 'My hometown and where I spent my undergraduate years. A perfect blend of ancient history and modern innovation.',
      highlights: ['Forbidden City', 'Great Wall of China', 'Temple of Heaven', 'Summer Palace'],
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&h=400&fit=crop',
          caption: 'The magnificent Forbidden City at sunset',
          location: 'Forbidden City'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&h=400&fit=crop',
          caption: 'Great Wall section at Mutianyu',
          location: 'Great Wall of China'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&h=400&fit=crop',
          caption: 'Traditional architecture in the hutongs',
          location: 'Hutong District'
        }
      ],
      rating: 5,
      category: 'hometown'
    },
    {
      id: 2,
      name: 'Madison, Wisconsin',
      coordinates: [43.0731, -89.4012],
      country: 'United States',
      visitDate: '2023-09-01',
      duration: '2+ years',
      description: 'Currently pursuing my Master\'s degree here. A beautiful college town with amazing lakes and vibrant student life.',
      highlights: ['University of Wisconsin', 'Lake Mendota', 'State Capitol', 'Memorial Union'],
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop',
          caption: 'Beautiful sunset over Lake Mendota',
          location: 'Lake Mendota'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop',
          caption: 'The iconic State Capitol building',
          location: 'Wisconsin State Capitol'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop',
          caption: 'Campus life at UW-Madison',
          location: 'University of Wisconsin'
        }
      ],
      rating: 5,
      category: 'current'
    },
    {
      id: 3,
      name: 'Tokyo, Japan',
      coordinates: [35.6762, 139.6503],
      country: 'Japan',
      visitDate: '2022-12-20',
      duration: '1 week',
      description: 'An incredible cultural experience! The perfect mix of traditional temples and futuristic technology.',
      highlights: ['Senso-ji Temple', 'Tokyo Skytree', 'Shibuya Crossing', 'Tsukiji Fish Market'],
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop',
          caption: 'Traditional architecture at Senso-ji Temple',
          location: 'Senso-ji Temple'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop',
          caption: 'The bustling Shibuya Crossing',
          location: 'Shibuya'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop',
          caption: 'Modern Tokyo skyline from Tokyo Skytree',
          location: 'Tokyo Skytree'
        }
      ],
      rating: 5,
      category: 'international'
    },
    {
      id: 4,
      name: 'San Francisco, California',
      coordinates: [37.7749, -122.4194],
      country: 'United States',
      visitDate: '2023-06-10',
      duration: '5 days',
      description: 'Tech hub and cultural melting pot. Loved the diverse neighborhoods and amazing food scene.',
      highlights: ['Golden Gate Bridge', 'Alcatraz Island', 'Fisherman\'s Wharf', 'Lombard Street'],
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop',
          caption: 'Golden Gate Bridge in the fog',
          location: 'Golden Gate Bridge'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop',
          caption: 'Historic Alcatraz Island',
          location: 'Alcatraz Island'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400&fit=crop',
          caption: 'Colorful houses in the Castro District',
          location: 'Castro District'
        }
      ],
      rating: 4,
      category: 'domestic'
    },
    {
      id: 5,
      name: 'Paris, France',
      coordinates: [48.8566, 2.3522],
      country: 'France',
      visitDate: '2022-08-05',
      duration: '4 days',
      description: 'The city of lights and love! Every corner is a work of art. The food, culture, and architecture are simply breathtaking.',
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées'],
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=400&fit=crop',
          caption: 'Eiffel Tower at golden hour',
          location: 'Eiffel Tower'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=400&fit=crop',
          caption: 'Mona Lisa at the Louvre',
          location: 'Louvre Museum'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=400&fit=crop',
          caption: 'Beautiful architecture along the Seine',
          location: 'Seine River'
        }
      ],
      rating: 5,
      category: 'international'
    },
    {
      id: 6,
      name: 'New York City, New York',
      coordinates: [40.7128, -74.0060],
      country: 'United States',
      visitDate: '2023-03-15',
      duration: '3 days',
      description: 'The city that never sleeps! Incredible energy, diverse culture, and endless things to do.',
      highlights: ['Times Square', 'Central Park', 'Statue of Liberty', 'Brooklyn Bridge'],
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop',
          caption: 'Times Square at night',
          location: 'Times Square'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop',
          caption: 'Central Park in spring',
          location: 'Central Park'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop',
          caption: 'Brooklyn Bridge walkway',
          location: 'Brooklyn Bridge'
        }
      ],
      rating: 4,
      category: 'domestic'
    }
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'hometown': return '#10B981';
      case 'current': return '#3B82F6';
      case 'international': return '#8B5CF6';
      case 'domestic': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'hometown': return '🏠';
      case 'current': return '📍';
      case 'international': return '✈️';
      case 'domestic': return '🚗';
      default: return '📍';
    }
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setMapCenter(location.coordinates);
  };

  const handleLike = (locationId) => {
    setLikes(prev => ({
      ...prev,
      [locationId]: (prev[locationId] || 0) + 1
    }));
  };

  const handleComment = (locationId, comment) => {
    if (comment.trim()) {
      setComments(prev => ({
        ...prev,
        [locationId]: [...(prev[locationId] || []), {
          id: Date.now(),
          text: comment,
          author: 'Anonymous',
          timestamp: new Date().toLocaleDateString()
        }]
      }));
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
    <section id="travel" className="section travel-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Interactive Travel Map
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Explore the places I've visited around the world. Click on any pin to see photos and stories from that location.
        </motion.p>

        <motion.div
          className="travel-stats"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{travelData.length}</div>
              <div className="stat-label">Cities Visited</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3</div>
              <div className="stat-label">Continents</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Photos Taken</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2</div>
              <div className="stat-label">Years Traveling</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="map-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <MapContainer
            center={mapCenter}
            zoom={3}
            style={{ height: '500px', width: '100%', borderRadius: '20px' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {travelData.map(location => (
              <Marker
                key={location.id}
                position={location.coordinates}
                eventHandlers={{
                  click: () => handleLocationClick(location)
                }}
              >
                <Popup>
                  <div className="popup-content">
                    <h4>{location.name}</h4>
                    <p>{location.country}</p>
                    <div className="popup-rating">
                      {renderStars(location.rating)}
                    </div>
                    <p className="popup-date">
                      <Calendar size={14} />
                      {new Date(location.visitDate).toLocaleDateString()}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>

        <motion.div
          className="locations-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {travelData.map(location => (
            <motion.div
              key={location.id}
              className="location-card"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleLocationClick(location)}
            >
              <div className="location-image">
                <img src={location.photos[0].url} alt={location.name} />
                <div 
                  className="location-category"
                  style={{ backgroundColor: getCategoryColor(location.category) }}
                >
                  {getCategoryIcon(location.category)}
                </div>
              </div>
              <div className="location-info">
                <h3>{location.name}</h3>
                <p className="location-country">{location.country}</p>
                <div className="location-meta">
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span>{new Date(location.visitDate).toLocaleDateString()}</span>
                  </div>
                  <div className="meta-item">
                    <Plane size={14} />
                    <span>{location.duration}</span>
                  </div>
                </div>
                <div className="location-rating">
                  {renderStars(location.rating)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Location Detail Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            className="location-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLocation(null)}
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
                onClick={() => setSelectedLocation(null)}
              >
                <X size={24} />
              </button>
              
              <div className="modal-header">
                <div className="location-title">
                  <h2>{selectedLocation.name}</h2>
                  <div className="location-badge">
                    <span 
                      className="category-badge"
                      style={{ backgroundColor: getCategoryColor(selectedLocation.category) }}
                    >
                      {getCategoryIcon(selectedLocation.category)} {selectedLocation.category}
                    </span>
                  </div>
                </div>
                <div className="location-meta">
                  <div className="meta-item">
                    <MapPin size={16} />
                    <span>{selectedLocation.country}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>{new Date(selectedLocation.visitDate).toLocaleDateString()}</span>
                  </div>
                  <div className="meta-item">
                    <Plane size={16} />
                    <span>{selectedLocation.duration}</span>
                  </div>
                  <div className="meta-item">
                    <Star size={16} />
                    <span>{selectedLocation.rating}/5</span>
                  </div>
                </div>
              </div>
              
              <div className="modal-body">
                <p className="location-description">{selectedLocation.description}</p>
                
                <div className="highlights">
                  <h4>Key Highlights</h4>
                  <ul>
                    {selectedLocation.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="photo-gallery">
                  <h4>Photo Gallery</h4>
                  <div className="gallery-grid">
                    {selectedLocation.photos.map(photo => (
                      <div key={photo.id} className="gallery-item">
                        <img src={photo.url} alt={photo.caption} />
                        <div className="photo-caption">
                          <h5>{photo.location}</h5>
                          <p>{photo.caption}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="action-btn"
                  onClick={() => handleLike(selectedLocation.id)}
                >
                  <Heart size={20} />
                  <span>{likes[selectedLocation.id] || 0} Likes</span>
                </button>
                <button className="action-btn">
                  <MessageCircle size={20} />
                  <span>Share Experience</span>
                </button>
              </div>
              
              <div className="comments-section">
                <h4>Comments & Memories</h4>
                <div className="comments-list">
                  {(comments[selectedLocation.id] || []).map(comment => (
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
                    placeholder="Share your memories or ask about this place..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleComment(selectedLocation.id, e.target.value);
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

export default TravelMap;
