import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { X, Calendar, MapPin as MapPinIcon } from 'lucide-react';
import L from 'leaflet';
import NextSectionButton from './NextSectionButton';

// 自定义红色Pin图标
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.8.0/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.8.0/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const TravelMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const travelData = [
    {
      id: 1,
      name: 'Beijing, China',
      coordinates: [39.9042, 116.4074],
      visitDate: '2023-08-15',
      description: 'My hometown and where I spent my undergraduate years.',
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=600&fit=crop',
          caption: 'The magnificent Forbidden City'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&h=600&fit=crop',
          caption: 'Great Wall at Mutianyu'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1570797197190-8e003a00c846?w=800&h=600&fit=crop',
          caption: 'Traditional hutong architecture'
        },
        {
          id: 4,
          url: 'https://images.unsplash.com/photo-1551655510-34fde1bad8fc?w=800&h=600&fit=crop',
          caption: 'Temple of Heaven'
        }
      ]
    },
    {
      id: 2,
      name: 'Madison, Wisconsin',
      coordinates: [43.0731, -89.4012],
      visitDate: '2023-09-01',
      description: 'Currently pursuing my Master\'s degree here.',
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
          caption: 'Beautiful sunset over Lake Mendota'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
          caption: 'Wisconsin State Capitol'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
          caption: 'Campus at UW-Madison'
        }
      ]
    },
    {
      id: 3,
      name: 'Tokyo, Japan',
      coordinates: [35.6762, 139.6503],
      visitDate: '2022-12-20',
      description: 'Experience the perfect blend of tradition and modernity.',
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
          caption: 'Shibuya Crossing at night'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop',
          caption: 'Mount Fuji view'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=600&fit=crop',
          caption: 'Traditional temple in Asakusa'
        }
      ]
    },
    {
      id: 4,
      name: 'Paris, France',
      coordinates: [48.8566, 2.3522],
      visitDate: '2023-06-10',
      description: 'The city of lights and endless romance.',
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
          caption: 'Eiffel Tower at sunset'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop',
          caption: 'The Louvre Museum'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&h=600&fit=crop',
          caption: 'Seine River cruise'
        }
      ]
    },
    {
      id: 5,
      name: 'New York City, USA',
      coordinates: [40.7128, -74.0060],
      visitDate: '2023-03-15',
      description: 'The city that never sleeps.',
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
          caption: 'Manhattan skyline'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&h=600&fit=crop',
          caption: 'Times Square at night'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&h=600&fit=crop',
          caption: 'Brooklyn Bridge'
        }
      ]
    },
    {
      id: 6,
      name: 'Sydney, Australia',
      coordinates: [-33.8688, 151.2093],
      visitDate: '2023-01-20',
      description: 'Beautiful harbor city with iconic landmarks.',
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop',
          caption: 'Sydney Opera House'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=600&fit=crop',
          caption: 'Sydney Harbour Bridge'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop',
          caption: 'Bondi Beach'
        }
      ]
    }
  ];

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <section id="travel" className="section travel-section-new">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Travel Map
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          探索世界的足迹 - 点击地图上的标记查看照片
        </motion.p>
      </div>

      {/* 地图容器移到container外面，不受宽度限制 */}
      <motion.div
        className="world-map-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
          <MapContainer
            center={[20, 0]}
            zoom={2}
            scrollWheelZoom={true}
            zoomControl={true}
            className="world-map"
            minZoom={2}
            maxZoom={10}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
            />

            {travelData.map((location) => (
              <Marker
                key={location.id}
                position={location.coordinates}
                icon={customIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(location)
                }}
              >
                <Tooltip direction="top" offset={[0, -40]} opacity={0.9}>
                  <div className="map-tooltip">
                    <strong>{location.name}</strong>
                    <div style={{ fontSize: '0.85rem', marginTop: '4px', color: '#666' }}>
                      <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      {location.visitDate}
                    </div>
                  </div>
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>

        {/* 照片集弹窗 */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.div
              className="travel-photo-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLocation(null)}
            >
              <motion.div
                className="modal-content travel-modal-content"
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="modal-close"
                  onClick={() => setSelectedLocation(null)}
                >
                  <X size={24} />
                </button>

                <div className="travel-modal-header">
                  <h2>
                    <MapPinIcon size={24} style={{ display: 'inline', marginRight: '8px' }} />
                    {selectedLocation.name}
                  </h2>
                  <div className="travel-modal-meta">
                    <Calendar size={16} />
                    <span>{selectedLocation.visitDate}</span>
                  </div>
                  <p>{selectedLocation.description}</p>
                </div>

                <div className="travel-photo-grid">
                  {selectedLocation.photos.map((photo) => (
                    <motion.div
                      key={photo.id}
                      className="travel-photo-item"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: photo.id * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <img src={photo.url} alt={photo.caption} />
                      <div className="travel-photo-caption">
                        {photo.caption}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <NextSectionButton nextSection="gaming" label="Explore Gaming" />
      </div>
    </section>
  );
};

export default TravelMap;
